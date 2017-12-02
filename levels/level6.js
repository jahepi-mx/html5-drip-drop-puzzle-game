class Level6 extends Level {
    constructor() { 
        super(21, 12);
        this.helpPopup = new HelpPopup(null, "help", "help4");
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,
            17,17,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,17,17,
            17,25,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,24,17,
            17,25,1,45,1,1,1,1,1,45,1,45,1,1,1,1,1,45,1,24,17,
            17,28,1,33,19,19,19,19,19,28,1,33,19,19,19,19,19,28,1,33,17,
            25,1,1,1,24,17,17,17,25,1,1,1,24,17,17,17,25,1,1,1,24,
            25,1,1,1,24,17,17,17,25,1,1,1,24,17,17,17,25,1,1,1,24,
            17,31,1,27,18,18,18,18,18,31,1,27,18,18,18,18,18,31,1,27,17,
            17,25,1,43,1,1,1,1,1,43,1,43,1,1,1,1,1,43,1,24,17,
            17,25,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,24,17,
            17,17,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,17,17,
            17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 5 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] >= 6 && this.map[y * this.mapWidth + x] <= 45) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], false, "tiles" + this.map[y * this.mapWidth + x], "bg4");
                } else if (this.map[y * this.mapWidth + x] === 5) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], true, "bg" + this.map[y * this.mapWidth + x], null);
                }
            }
        }
        
        this.ice.tiles = this.tiles;
        this.ice.drops = this.drops;
        this.checkpoints.push(new Checkpoint(2, 6, 50, 50, 1));
        this.checkpoints.push(new Checkpoint(10, 6, 50, 50, 2));
        this.checkpoints.push(new Checkpoint(18, 6, 50, 50, 3));
        
        var smartTile = new SmartTile(9, 5, this.tileWidth, this.tileHeight, this.ice, 250, 0.5);
        this.enemies.push(smartTile);
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 5 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
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

