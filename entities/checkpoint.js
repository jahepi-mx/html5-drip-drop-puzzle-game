class Checkpoint extends Entity {
            
    constructor(x, y, w, h, id, color, tileSize) {
        super(x, y, w, h);
        
        this.x = x * tileSize + tileSize / 2 - this.w / 2;
        this.y = y * tileSize + tileSize / 2 -  this.h / 2;
        
        this.id = id;
        this.color = color;
        this.collided = false;
        this.fireAnimation = new Animation(4, 2);
        this.offAnimation = new Animation(4, 2);
        this.explosiveDrop = false;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.config = Config.getInstance();
    }
    
    update(deltatime) {
        if  (this.collided) {
            this.offAnimation.update(deltatime);
        } else {
            this.fireAnimation.update(deltatime);
        }
        
        if (this.explosiveDrop) {
            this.assets.playAudio(this.assets.torch, false, 0.5);
        }
    }

    render(context) {
        var frame = "";

        if (this.collided) {
            frame = "torchoff" + (this.offAnimation.getFrame() + 1);
        } else {
            frame = "torch" + (this.fireAnimation.getFrame() + 1);
        }
        
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        
        context.font = "30px joystix";
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.fillText(this.id, this.x + this.w + 5, this.y + this.h / 2);
    }
    
    collide(entity) {
        return (
            (entity.left() >= this.left() && entity.left() <= this.right()) || 
            (entity.right() >= this.left() && entity.right() <= this.right())
           ) && (entity.top() >= this.top() && entity.top() <= this.top() + this.h / 2);
    }
    
    reset() {
        this.collided = false;
        this.explosiveDrop = false;
    }
};
