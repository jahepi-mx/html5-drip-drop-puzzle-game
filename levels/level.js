let LEVEL_WIDTH = 0;
let LEVEL_HEIGHT = 0;

class Level {
    constructor(width, height, ice) {
        this.tiles = [];
        this.enemies = [];
        this.checkpoints = [];
        this.map = [];
        this.ice = ice;
        this.mapWidth = width;
        this.mapHeight = height;
        this.currCheckpoint = 1;
        this.tileSize = 0;
        this.isFinish = false;
        LEVEL_WIDTH = width;
        LEVEL_HEIGHT = height;
    }
    
    static getWidth() {
        return LEVEL_WIDTH;
    }
    
    static getHeight() {
        return LEVEL_HEIGHT;
    }
    
    reset() {}
    
    reachCheckpoint(checkpoint) {}
};

