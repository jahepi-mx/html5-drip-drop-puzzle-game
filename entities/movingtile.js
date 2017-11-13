class MovingTile extends Tile {
    
    constructor(x, y, w, h) {
        super(x, y, w, h, 0, true, "movingtile2");
        this.toX = 0;
        this.toY = 0;
        this.vertexPath = [];
        
        var xTmp = Math.floor(this.x / Tile.getWidth());
        var yTmp = Math.floor(this.y / Tile.getHeight());
        this.addVertex(yTmp * Level.getWidth() + xTmp);
        this.shift = true;
    }
    
    addVertex(vertex) {
        this.vertexPath.push(vertex);
        return this;
    }
    
    update(deltatime) {
        
        if (this.shift) {
            this.shift = false;
            var vertex = this.vertexPath.shift();
            this.toX = Math.floor(vertex % Level.getWidth()) * Tile.getWidth();
            this.toY = Math.floor(vertex / Level.getWidth()) * Tile.getHeight();
            this.addVertex(vertex);
        }
        
        this.x += (this.toX - this.x) * deltatime;
        this.y += (this.toY - this.y) * deltatime;
        
        var diffX = Math.abs(this.toX - this.x);
        var diffY = Math.abs(this.toY - this.y);
        
        if (diffX <= 2 && diffY <= 2) {
            this.shift = true;
        }
    }  
}


