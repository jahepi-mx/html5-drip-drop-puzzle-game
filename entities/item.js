class Item extends Entity {
    
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.animation = new Animation(9, 1);
        this.visible = true;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance(); 
    }
    
    update(deltatime) {
        this.animation.update(deltatime);
    }
    
    render(context) {
        if (this.visible) {
            var frame = "god" + (this.animation.getFrame() + 1);
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x + this.w / 2 - (this.w / 2 / 2), this.y + this.h / 2 - (this.h / 2 / 2), this.w / 2, this.h / 2);
        }
    }
    
    reset() {
        this.visible = true;
    }
}


