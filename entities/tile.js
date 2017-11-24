let TILE_WIDTH = 0;
let TILE_HEIGHT = 0;

class Tile extends Entity {
    
    constructor(x, y, w, h, value, walkable, img, backgroundImage) {
        super(x, y, w, h);
        this.value = value;
        this.visible = true;
        this.walkable = walkable;
        this.img = img;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.backgroundImage = backgroundImage;
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
        if (this.backgroundImage !== null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.backgroundImage].x, this.atlas.sprites[this.backgroundImage].y, this.atlas.sprites[this.backgroundImage].width, this.atlas.sprites[this.backgroundImage].height, this.x, this.y, this.w + 1, this.h + 1);
        }
        var image = this.img;
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};


