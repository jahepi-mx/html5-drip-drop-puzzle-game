class MovingTile extends Tile {
    
    constructor(x, y, w, h) {
        super(x, y, w, h, 0, true, "");
        this.toX = 0;
        this.toY = 0;
        this.vertexPath = [];
        
        var xTmp = Math.floor(this.x / Tile.getWidth());
        var yTmp = Math.floor(this.y / Tile.getHeight());
        this.addVertex(yTmp * Level.getWidth() + xTmp);
        this.sleepAnimation = new Animation(5, 2);
        this.sleepAnimation.stopAtSequenceNumber(1, null);
        this.wakeupAnimation = new Animation(5, 2);
        this.wakeupAnimation.stopAtSequenceNumber(1, null);
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
        
        if (diffX <= 10 && diffY <= 10) {
            this.sleepAnimation.update(deltatime);
            this.wakeupAnimation.reset();
        } else {
            this.wakeupAnimation.update(deltatime);
            this.sleepAnimation.reset();
        }
    }
    
    render(context) {
        var diffX = Math.abs(this.toX - this.x);
        var diffY = Math.abs(this.toY - this.y);
        if (diffX <= 10 && diffY <= 10) {
            var frame = "sleep" + (this.sleepAnimation.getFrame() + 1);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        } else {
            var frame = "wakeup" + (this.wakeupAnimation.getFrame() + 1);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        }
    }
    
    reset() {
        
    }
}


