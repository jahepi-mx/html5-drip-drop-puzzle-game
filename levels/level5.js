class Level5 extends Level {
    constructor() { 
        super(21, 12);
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            14,18,14,18,14,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,13,
            21,4,42,4,33,18,18,18,14,18,14,17,17,14,18,18,18,14,17,13,17,
            21,4,4,4,4,4,4,4,42,4,33,18,14,21,4,4,4,20,17,17,13,
            14,19,30,4,44,4,4,4,4,4,4,4,20,21,4,10,4,20,17,17,17,
            17,17,14,19,21,4,4,4,44,4,44,4,20,21,4,4,4,20,17,17,13,
            17,17,17,17,14,19,19,19,14,19,21,4,33,28,4,4,4,20,17,13,17,
            17,17,17,17,17,17,17,17,17,17,21,4,4,4,4,4,4,20,17,17,13,
            17,17,17,13,17,17,17,13,17,17,14,30,4,44,4,4,4,20,17,17,17,
            17,17,13,17,17,17,17,17,13,17,17,14,19,21,4,7,4,20,17,17,17,
            17,13,17,17,17,17,17,17,17,13,17,17,17,21,4,4,4,20,17,17,17,
            17,17,17,17,17,17,17,17,17,17,17,17,17,21,4,4,4,20,17,13,17,
            17,17,17,17,17,17,17,17,17,17,17,17,17,14,19,19,19,14,17,17,13
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        
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
        this.checkpoints.push(new Checkpoint(6, 3, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 1));
        this.checkpoints.push(new Checkpoint(15, 4, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 2));
        this.checkpoints.push(new Checkpoint(15, 9, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 3));
       
        var movingTile = new MovingTile(3, 1, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(5));
        movingTile.addVertex(3 * this.mapWidth + 3);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(9, 4, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(5));
        movingTile.addVertex(2 * this.mapWidth + 9);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(5, 2, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(2 * this.mapWidth + 7);
        movingTile.addVertex(4 * this.mapWidth + 7);
        movingTile.addVertex(4 * this.mapWidth + 5);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(11, 3, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(6 * this.mapWidth + 11);
        movingTile.addVertex(6 * this.mapWidth + 16);
        movingTile.addVertex(6 * this.mapWidth + 11);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(14, 2, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(2 * this.mapWidth + 16);
        movingTile.addVertex(5 * this.mapWidth + 16);
        movingTile.addVertex(5 * this.mapWidth + 14);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(16, 5, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(2 * this.mapWidth + 16);
        movingTile.addVertex(2 * this.mapWidth + 14);
        movingTile.addVertex(5 * this.mapWidth + 14);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(14, 7, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(10 * this.mapWidth + 14);
        movingTile.addVertex(10 * this.mapWidth + 16);
        movingTile.addVertex(7 * this.mapWidth + 16);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(16, 10, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(10 * this.mapWidth + 14);
        movingTile.addVertex(7 * this.mapWidth + 14);
        movingTile.addVertex(7 * this.mapWidth + 16);
        this.enemies.push(movingTile);
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
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