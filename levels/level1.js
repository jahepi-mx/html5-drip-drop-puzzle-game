class Level1 extends Level {
    constructor(ice) {
        
        super(10, 7, ice);
        
        this.tileSize = 50;
        
        this.map = [
            1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,
            1,1,1,1,0,1,1,1,1,1,
            1,1,1,1,0,1,1,1,1,1,
            1,0,0,0,0,0,1,1,1,1,
            1,1,1,1,1,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1
        ];
        
        this.ice.x = 5 * this.tileSize + this.tileSize / 2 - this.ice.w / 2;
        this.ice.y = 4 * this.tileSize + this.tileSize / 2 -  this.ice.h / 2;
                
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] === 1) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileSize, this.tileSize, this.map[y * this.mapWidth + x]);
                } else {
                    this.tiles[y * this.mapWidth + x] = null;
                }
            }
        }
        this.ice.tiles = this.tiles;
        this.checkpoints.push(new Checkpoint(1, 1, 30, 30, 1, "#fe00ab", this.tileSize));
        this.checkpoints.push(new Checkpoint(8, 1, 30, 30, 2, "#aa8877", this.tileSize));
        this.checkpoints.push(new Checkpoint(8, 5, 30, 30, 3, "#66efbb", this.tileSize));
        
        var smartTile = new SmartTile(1, 4, this.tileSize, this.tileSize, this.ice, this.tiles);
        this.enemies.push(smartTile);
        
    }
    
    reset() {
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }

        this.ice.x = 3 * this.tileSize + this.tileSize / 2 - this.ice.w / 2;
        this.ice.y = 1 * this.tileSize + this.tileSize / 2 -  this.ice.h / 2;
        this.currCheckpoint = 1;
    }
    
    reachCheckpoint(checkpoint) {
        if (this.currCheckpoint === checkpoint.id) {
            this.currCheckpoint++;
            if (this.currCheckpoint === this.checkpoints.length) {
                this.isFinish = true;
            }
            return true;
        }
        return false;
    }
};

