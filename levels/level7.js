class Level7 extends Level {
    constructor() { 
        super(21, 12);
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            17,18,14,18,14,18,14,18,14,18,14,18,14,18,14,18,14,18,14,18,17,
            21,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,20,
            21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,
            14,38,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,40,14,
            21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,
            21,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,20,
            21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,
            14,38,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,40,14,
            21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,
            21,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,20,
            21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,20,
            17,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,17
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 2 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] >= 6 && this.map[y * this.mapWidth + x] <= 45) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], false, "tiles" + this.map[y * this.mapWidth + x], "bg1");
                } else if (this.map[y * this.mapWidth + x] === 5) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], true, "bg" + this.map[y * this.mapWidth + x], null);
                }
            }
        }
        
        this.ice.tiles = this.tiles;
        this.ice.drops = this.drops;
        this.checkpoints.push(new Checkpoint(4, 4, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 1));
        this.checkpoints.push(new Checkpoint(10, 6, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 2));
        this.checkpoints.push(new Checkpoint(15, 8, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 3));
        
        var smartTile = new SmartTile(11, 6, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(200), 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(16, 3, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(150), 1);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(19, 10, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(120), 0.5);
        this.enemies.push(smartTile);
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 2 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }
        for (var a = 0; a < this.enemies.length; a++) {
            this.enemies[a].reset();
        }
         for (var a = 0; a < this.items.length; a++) {
            this.items[a].reset();
        }
        this.currCheckpoint = 1;
        this.drops = [];
    }
    
    reachCheckpoint(checkpoint) {
        if (this.currCheckpoint === checkpoint.id) {
            if (this.currCheckpoint === this.checkpoints.length) {
                this.isFinish = true;
            }
            this.currCheckpoint++;
            return true;
        }
        return false;
    }
};

