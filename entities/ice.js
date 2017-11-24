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
        this.config = Config.getInstance();
        this.godMode = false;
        this.godModeCount = 0;
        this.drops = [];
        this.animation = new Animation(12, 3);
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
            if (this.godMode) {
                var frame = "icegod" + (this.animation.getFrame() + 1);
                context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x - 5, this.y - 5, this.w + 10, this.h + 10);
            } else {
                context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["ice"].x, this.atlas.sprites["ice"].y, this.atlas.sprites["ice"].width, this.atlas.sprites["ice"].height, this.x, this.y, this.w, this.h);
            }
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

        if (this.godMode) {
            this.animation.update(deltatime);
            this.godModeCount -= deltatime;
            if (this.godModeCount <= 0) {
                this.godMode = false;
            }
        }
        
        var fps = Math.floor(1 / deltatime);
        var level = LevelManager.getInstance().current();
        
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
        
        if (this.explosiveDrop) {
            for (var a = 0; a < 10; a++) {
                var dropSize = Math.ceil(Math.random() * 3 + 5);
                var drop = new Drop(this.left() + this.w / 2 - dropSize / 2, this.top() + this.h / 2 - dropSize / 2 , dropSize, dropSize, Math.ceil(Math.random() * 10 + 5), "#a6d3fd");
                drop.collided = true;
                drop.speedY = -drop.speedY;
                this.drops.push(drop);
            }
            this.explosiveDrop = false;
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
                if (tmpX >= 0 && tmpX < level.getWidth() && tmpY >= 0 && tmpY < level.getHeight()) {
                    var tile = this.tiles[tmpY * level.getWidth() + tmpX];
                    if (tile.visible && !tile.walkable && this.collide(tile)) {
                        this.x = this.oldX;
                        if (this.godMode && tile instanceof FadeTile) {
                            tile.die();
                        } else {
                            this.die();
                            if (tile instanceof FadeTile) {
                                tile.die();
                            }
                        }
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
                if (tmpX >= 0 && tmpX < level.getWidth() && tmpY >= 0 && tmpY < level.getHeight()) {
                    var tile = this.tiles[tmpY * level.getWidth() + tmpX];
                    if (tile.visible && !tile.walkable && this.collide(tile)) {
                        this.y = this.oldY;
                        if (this.godMode && tile instanceof FadeTile) {
                            tile.die();
                        } else {
                            if (tile instanceof FadeTile) {
                                tile.die();
                            }
                            this.die();
                        }
                        break;
                    }
                }
            }
        }

        if (this.drop) {
            var drop = new Drop(this.left() + Math.random() * this.w - 5 / 2, this.top(), 5, 5, 10, "#a6d3fd");
            this.drops.push(drop);
            this.drop = false;
        }
    }
    
    activeGodMode() {
        this.godMode = true;
        this.godModeCount = 5;
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
        this.godMode = false;
        this.godModeCount = 0;
    }
    
    collide(entity) {
        var width = entity.w / 2 + this.w / 2 - 5;
        var height = entity.h / 2 + this.h / 2 - 5;
        var distanceX = Math.abs((this.left() + this.w / 2) - (entity.left() + entity.w / 2));
        var distanceY = Math.abs((this.top() + this.h / 2) - (entity.top() + entity.h / 2));
        return distanceX < width && distanceY < height;
    }
};