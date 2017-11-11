class MovingTile extends Tile {
    
    constructor(x, y, w, h, toX, toY) {
        super(x, y, w, h, 0);
        this.toX = toX * this.w;
        this.toY = toY * this.h;
        this.origX = this.x;
        this.origY = this.y;
    }
    
    update(deltatime) {
        
        this.x += (this.toX - this.x) * deltatime;
        this.y += (this.toY - this.y) * deltatime;
        
        var diffX = Math.abs(this.toX - this.x);
        var diffY = Math.abs(this.toY - this.y);
        
        if (diffX <= 1 && diffY <= 1) {
            var tmpX = this.origX;
            var tmpY = this.origY;
            this.origX = this.toX;
            this.origY = this.toY;
            this.toX = tmpX;
            this.toY = tmpY;
        }
    }  
}


