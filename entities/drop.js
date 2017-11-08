class Drop extends Entity {
    
    constructor(x, y, w, h, speed, tiles) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.oldX = 0;
        this.oldY = 0;
        this.speedX = speed;
        this.speedY = speed;
        this.bounceSpeedY = 20;
        this.gravity = 50;
        this.lifetime = 10;
        this.lifetimeCount = 0;
        this.isDisposable = false;
        this.tiles = tiles;
    }
    
    render(context) {
        context.fillStyle = "#ff0000";
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
        
        for (var a = 0; a < this.tiles.length; a++) {
            if (this.tiles[a] !== null && this.tiles[a].collide(this)) {
                this.y = this.oldY;
                this.speedY = this.bounceSpeedY;
                this.bounceSpeedY *= 0.5;
                this.speedY = -this.speedY;
                break;
            }
        }    
    }
}

