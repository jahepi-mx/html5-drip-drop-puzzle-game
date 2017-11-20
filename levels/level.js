let LEVEL_WIDTH = 0;
let LEVEL_HEIGHT = 0;

class Level {
    constructor(width, height) {
        this.tiles = [];
        this.fadeTiles = [];
        this.enemies = [];
        this.checkpoints = [];
        this.map = [];
        this.ice = null;
        this.mapWidth = width;
        this.mapHeight = height;
        this.currCheckpoint = 1;
        this.config = Config.getInstance();
        this.tileWidth = this.config.mapWidth / this.mapWidth;
        this.tileHeight = this.config.mapHeight / this.mapHeight;
        this.isFinish = false;
        LEVEL_WIDTH = width;
        LEVEL_HEIGHT = height;
    }
    
    static setWithHeight(w, h) {
        LEVEL_WIDTH = w;
        LEVEL_HEIGHT = h;
    }
    
    static getWidth() {
        return LEVEL_WIDTH;
    }
    
    static getHeight() {
        return LEVEL_HEIGHT;
    }
    
    init(ice) {};
    
    reset() {}
    
    reachCheckpoint(checkpoint) {}
};

