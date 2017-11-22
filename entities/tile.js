let TILE_WIDTH = 0;
let TILE_HEIGHT = 0;

class Tile extends Entity {
    
    constructor(x, y, w, h, value, walkable, img) {
        super(x, y, w, h);
        this.value = value;
        this.visible = true;
        this.walkable = walkable;
        this.img = img;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        TILE_WIDTH = w;
        TILE_HEIGHT = h;
    }
    
    static getWidth() {
        return TILE_WIDTH;
    }
    
    static getHeight() {
        return TILE_HEIGHT;
    }
    
    render(context) {
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["bg2"].x, this.atlas.sprites["bg2"].y, this.atlas.sprites["bg2"].width, this.atlas.sprites["bg2"].height, this.x, this.y, this.w + 1, this.h + 1);
        var image = this.img;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};


