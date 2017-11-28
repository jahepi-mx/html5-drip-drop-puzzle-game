class Drop extends Entity {
    
    constructor(x, y, w, h, speed, color) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.oldX = 0;
        this.oldY = 0;
        this.speedX = Math.ceil(Math.random() * 80 + 50)  * (Math.random() < 0.5 ? 1 : -1);
        this.speedY = speed;
        this.bounceSpeedY = 20;
        this.gravity = 50;
        this.lifetime = 10;
        this.lifetimeCount = 0;
        this.collided = false;
        this.isDisposable = false;
        this.color = color;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.config = Config.getInstance();
        this.level = LevelManager.getInstance().current();
        this.tiles = this.level.tiles;
    }
    
    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    update(deltatime) {
        
        this.lifetimeCount += deltatime;
        
        if (this.lifetimeCount > this.lifetime) {
            this.isDisposable = true;
        }
        
        this.oldY = this.y;     
        this.y += this.speedY * deltatime;
        this.speedY += this.gravity * deltatime;
        
        var x = Math.floor(Math.round(this.x / Tile.getWidth()));
        var y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
        for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
            for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                if (tmpX >= 0 && tmpX < this.level.getWidth() && tmpY >= 0 && tmpY < this.level.getHeight()) {
                    var tile = this.tiles[tmpY * this.level.getWidth() + tmpX];
                    if (tile.visible && !tile.walkable && tile.collide(this)) {
                        this.y = this.oldY;
                        this.speedY = this.bounceSpeedY;
                        this.bounceSpeedY *= 0.5;
                        this.speedY = -this.speedY;
                        this.speedX *= 0.3;
                        this.collided = true;                       
                        if (this.bounceSpeedY >= 5 && Math.abs(this.speedX) >= 2) {
                            this.assets.playAudio(this.assets.drop, false, this.config.soundEffectVolume * 0.5);
                        }
                        break;
                    }
                }
            }
        }
        
        if (this.collided) {
            
            this.oldX = this.x;
            this.x += this.speedX * deltatime;
            
            x = Math.floor(Math.round(this.x / Tile.getWidth()));
            y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
            for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
                for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                    if (tmpX >= 0 && tmpX < this.level.getWidth() && tmpY >= 0 && tmpY < this.level.getHeight()) {
                        var tile = this.tiles[tmpY * this.level.getWidth() + tmpX];
                        if (tile.visible && !tile.walkable && tile.collide(this)) {
                            this.x = this.oldX;
                            this.speedX = -this.speedX;
                            if (this.bounceSpeedY >= 5 && Math.abs(this.speedX) >= 2) {
                                this.assets.playAudio(this.assets.drop, false, this.config.soundEffectVolume * 0.5);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}

