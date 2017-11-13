class Checkpoint extends Entity {
            
    constructor(x, y, w, h, id, color, tileSize) {
        super(x, y, w, h);
        
        this.x = x * tileSize + tileSize / 2 - this.w / 2;
        this.y = y * tileSize + tileSize / 2 -  this.h / 2;
        
        this.id = id;
        this.color = color;
        this.collided = false;
        this.fireAnimation = new Animation(4, 2);
        this.offAnimation = new Animation(3, 2);
    }
    
    update(deltatime) {
        if  (this.collided) {
            this.offAnimation.update(deltatime);
        } else {
            this.fireAnimation.update(deltatime);
        }
    }

    render(context) {
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        
        var frame = "";
        
        if (this.collided) {
            frame = "torchoff" + (this.offAnimation.getFrame() + 1);
        } else {
            frame = "torch" + (this.fireAnimation.getFrame() + 1);
        }
        
        context.drawImage(assets.spritesAtlas, atlas.sprites[frame].x, atlas.sprites[frame].y, atlas.sprites[frame].width, atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        
        context.font = "30px joystix";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(this.id, this.x + this.w + 5, this.y + this.h / 2);
    }
    
    reset() {
        this.collided = false;
    }
};
