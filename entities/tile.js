let TILE_WIDTH = 0;
let TILE_HEIGHT = 0;

class Tile extends Entity {
    
    constructor(x, y, w, h) {
        super(x, y, w, h);
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
        context.drawImage(assets.spritesAtlas, atlas.sprites["wall"].x, atlas.sprites["wall"].y, atlas.sprites["wall"].width, atlas.sprites["wall"].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};


