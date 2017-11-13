class Ice extends Entity {
            
    constructor(x, y, w, h, speed) {
        super(x, y, w, h);
        this.oldX = 0;
        this.oldY = 0;
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
        this.cursor = Cursor.getInstance();
    }

    render(context) {
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        if (!this.isDead) {
            context.drawImage(assets.spritesAtlas, atlas.sprites["ice"].x, atlas.sprites["ice"].y, atlas.sprites["ice"].width, atlas.sprites["ice"].height, this.x, this.y, this.w + 1, this.h + 1);
        }
    }
    
    update(deltatime) {
        
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
        
        if (this.cursor.isPressed) {
            if (this.cursor.x >= this.left() && this.cursor.x <= this.right() && this.cursor.y >= this.top() && this.cursor.y <= this.bottom()) {
                this.speedX = this.cursor.x - this.left() - this.w / 2;
            } else {
                this.speedX = 0;
            }   
        } else {
            this.speedX = 0;
        }

        this.oldX = this.x;
        this.x += this.speedX;

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

        if (this.cursor.isPressed) {
            if (this.cursor.x >= this.left() && this.cursor.x <= this.right() && this.cursor.y >= this.top() && this.cursor.y <= this.bottom()) {
                this.speedY = this.cursor.y - this.top() - this.h / 2;
            } else {
                this.speedY = 0;
            } 
        } else {
            this.speedY = 0;
        }

        this.oldY = this.y;
        this.y += this.speedY;

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
        this.isDead = true;
        this.explosiveDrop = true;
        this.cursor.isPressed = false;
    }
    
    reset() {
        this.isDead = false;
        this.isDisposable = false;
    }
};