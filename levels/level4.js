class Level4 extends Level {
    constructor() { 
        super(21, 12);
        this.helpPopup = new HelpPopup(null, "help", "help3");
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            17,12,13,13,13,13,17,13,13,13,13,13,13,13,13,13,13,13,13,13,17,
            17,13,13,13,13,13,17,13,13,13,13,13,13,13,13,13,12,13,13,13,17,
            17,13,13,12,13,13,17,13,13,12,13,13,13,12,13,13,13,13,13,13,17,
            17,13,13,13,13,13,22,13,13,13,13,13,13,13,13,13,13,13,13,12,17,
            17,22,22,22,22,28,4,32,18,18,18,18,18,18,18,18,18,18,18,18,17,
            21,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,20,
            17,23,23,23,23,30,4,26,19,19,19,30,4,26,19,19,19,19,19,19,17,
            17,13,13,13,13,13,23,12,13,13,13,13,19,13,13,13,13,13,13,13,17,
            17,12,13,13,13,13,17,13,13,13,12,13,17,13,13,13,13,13,12,13,17,
            17,13,13,13,12,13,17,13,13,13,13,13,17,13,13,13,13,13,13,13,17,
            17,13,13,13,13,13,17,13,13,13,13,13,17,12,13,13,13,13,13,13,17,
            17,13,13,13,13,13,17,13,13,13,12,13,17,13,13,13,13,13,13,13,17
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
        this.checkpoints.push(new Checkpoint(19, 5, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 1));
       
        var movingTile = new MovingTile(6, 6, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(5));
        movingTile.addVertex(4 * this.mapWidth + 6);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(8, 5, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(8));
        movingTile.addVertex(5 * this.mapWidth + 16);
        this.enemies.push(movingTile);
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