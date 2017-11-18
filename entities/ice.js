class Ice extends Entity {
            
    constructor(x, y, w, h, speed) {
        super(x, y, w, h);
        this.oldX = 0;
        this.oldY = 0;
        this.toX = 0;
        this.toY = 0;
        this.speedX = speed;
        this.speedY = speed;
        this.drop = false;
        this.explosiveDrop = false;
        this.tiles = [];
        this.dropTime = Math.random() * 2;
        this.dropTimeCount = 0;
        this.deadTime = 3;
        this.deadTimeCount = 0;
        this.isDead = false;
        this.isDisposable = false;
        this.isCursorOn = false;
        this.ratios = [];
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.cursor = Cursor.getInstance();
        this.calculateMovingRatios();
    }
    
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.toX = x;
        this.toY = y;
    }

    render(context) {
        if (!this.isDead) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["ice"].x, this.atlas.sprites["ice"].y, this.atlas.sprites["ice"].width, this.atlas.sprites["ice"].height, this.x, this.y, this.w + 1, this.h + 1);
        }
    }
    
    calculateMovingRatios() {
        /*
         At 60 fps the default moving ratio is 0.2, ej:
        
         x += (toX - x) * 0.2;
        
         According to this, if the distance to move is 100 pixels, 
         we need about 20 frames to reach destination (1 pixel offset), it is about 20/60 fps.
         
         Example:
         (ratio ^ x) * 100 = 1;
        
         Replace variables to solve equation:
         =>   ((1 - 0.2) ^ x) * 100 = 1;
         =>   x = Math.log(1 / 100) / Math.log(1 - 0.2); --> Why?, lets do a simpler example: 2^x = 8 --> x = Math.log(8) / Math.log(2)
         =>   x = 20.63 
        
         So, it is about 1/3 of the framerate, so if our framerate is 30fps, 1/3 is 10fps, now our ratio is x:
         =>   (x ^ 10) * 100 = 1 
         =>   x ^ 10 = 1 / 100
         =>   x = (1 / 10) ^ (1 / 10)
         =>   x = 0.630
         =>   x = 1 - 0.630
         =>   x = 0.369 <- This is the ratio to use when the framerate is 30 fps
        
        Populate a hashtable from 1fps to 144fps with ratios to use.
        Note: this is not a perfect ratio table, if we move more or less distance, the frames to reach destination
        may vary, so this is just an aproximation.
         */
        for (var a = 1; a <= 144; a++) {
            this.ratios[a] = 1 - Math.pow(1 / 100, 1 / (a * 0.33));
        }
    }
    
    update(deltatime) {
        
        var fps = Math.floor(1 / deltatime);
        
        this.dropTimeCount += deltatime;
        if (!this.isDead && this.dropTimeCount > this.dropTime) {
            this.dropTime = Math.random() * 2;
            this.dropTimeCount = 0;
            this.drop = true;
        }
        
        if (this.isDead) {
            this.deadTimeCount += deltatime; 
            if (this.deadTimeCount > this.deadTime) {
                this.isDisposable = true;
                this.deadTimeCount = 0;
            }
        }
        
        if (this.isDead) return;
        
        if (!this.cursor.isPressed) {
            this.isCursorOn = false;
        }
        
        if (this.cursor.isPressed) {
            if (this.cursor.x >= this.left() && this.cursor.x <= this.right() && this.cursor.y >= this.top() && this.cursor.y <= this.bottom()) {
                this.isCursorOn = true;
            }
        }
        
        if (this.isCursorOn) {
            this.toX = this.cursor.x - this.w / 2;
            this.toY = this.cursor.y - this.h / 2;
        }
        
        this.oldX = this.x;
        this.x += (this.toX - this.x) * this.ratios[fps];

        var x = Math.floor(Math.round(this.x / Tile.getWidth()));
        var y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
        for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
            for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                if (tmpX >= 0 && tmpX < Level.getWidth() && tmpY >= 0 && tmpY < Level.getHeight()) {
                    var tile = this.tiles[tmpY * Level.getWidth() + tmpX];
                    if (tile.visible && !tile.walkable && tile.collide(this)) {
                        this.x = this.oldX;
                        this.die();
                        break;
                    }
                }
            }
        }

        this.oldY = this.y;
        this.y += (this.toY - this.y) * this.ratios[fps];

        x = Math.floor(Math.round(this.x / Tile.getWidth()));
        y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
        for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
            for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                if (tmpX >= 0 && tmpX < Level.getWidth() && tmpY >= 0 && tmpY < Level.getHeight()) {
                    var tile = this.tiles[tmpY * Level.getWidth() + tmpX];
                    if (tile.visible && !tile.walkable && tile.collide(this)) {
                        this.y = this.oldY;
                        this.die();
                        break;
                    }
                }
            }
        }
    }
    
    die() {
        this.assets.playAudio(this.assets.dead, false, 0.5);
        this.isDead = true;
        this.explosiveDrop = true;
        this.cursor.isPressed = false;
        this.isCursorOn = false;
    }
    
    reset() {
        this.isDead = false;
        this.isDisposable = false;
        this.deadTimeCount = 0;
        this.isCursorOn = false;
        this.cursor.isPressed = false;
        this.explosiveDrop = false;
    }
};