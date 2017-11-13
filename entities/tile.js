let TILE_WIDTH = 0;
let TILE_HEIGHT = 0;

class Tile extends Entity {
    
    constructor(x, y, w, h, value, walkable, img) {
        super(x, y, w, h);
        this.value = value;
        this.visible = true;
        this.walkable = walkable;
        this.img = img;
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
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        if (this.value === 1) {
            context.drawImage(assets.spritesAtlas, atlas.sprites["wall"].x, atlas.sprites["wall"].y, atlas.sprites["wall"].width, atlas.sprites["wall"].height, this.x, this.y, this.w + 1, this.h + 1);
        } else {
            context.fillStyle = "#ffff00";
            context.fillRect(this.x, this.y, this.w + 1, this.h + 1);
        }
    }
};


