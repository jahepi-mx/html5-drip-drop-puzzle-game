class Level1 extends Level {
    constructor() { 
        super(20, 12); 
    }
    
    init(ice) {
        this.ice = ice;
        this.tileSize = 50;
        
        this.map = [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ];
        
        this.ice.reset();
        this.ice.setXY(2 * this.tileSize + this.tileSize / 2 - this.ice.w / 2, 1 * this.tileSize + this.tileSize / 2 -  this.ice.h / 2);

        this.fadeTiles[3 * this.mapWidth + 4] = new FadeTile(4, 3, this.tileSize, this.tileSize, 2, 3, 1);
        var tileId = Math.ceil(Math.random() * 6);
        var bgTileId = Math.ceil(Math.random() * 4);
        
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] === 1) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileSize, this.tileSize, this.map[y * this.mapWidth + x], false, "tile" + tileId);
                } else if (this.map[y * this.mapWidth + x] === 2) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileSize, this.tileSize, this.map[y * this.mapWidth + x], true, "bg2");
                }
            }
        }
        this.ice.tiles = this.tiles;
        this.checkpoints.push(new Checkpoint(1, 1, 50, 50, 1, "#fe00ab", this.tileSize));
        this.checkpoints.push(new Checkpoint(8, 1, 50, 50, 2, "#aa8877", this.tileSize));
        this.checkpoints.push(new Checkpoint(4, 4, 50, 50, 3, "#66efbb", this.tileSize));
        
        var smartTile = new SmartTile(1, 4, this.tileSize, this.tileSize, this.ice, this.tiles);
        this.enemies.push(smartTile);
    }
    
    reset() {
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }
        this.ice.reset();
        this.ice.setXY(2 * this.tileSize + this.tileSize / 2 - this.ice.w / 2, 1 * this.tileSize + this.tileSize / 2 -  this.ice.h / 2);
        this.currCheckpoint = 1;
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

