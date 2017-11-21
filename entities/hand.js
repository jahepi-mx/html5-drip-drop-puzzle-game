class Hand extends Entity {
    
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.cursor = Cursor.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    render(context) {
        var image = "handopen";
        if (this.cursor.isPressed) {
            image = "handclose";
        }
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.cursor.x - this.w / 2, this.cursor.y - this.h / 2, this.w, this.h);
    }
}