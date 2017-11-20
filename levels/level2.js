class Level2 extends Level {
    constructor() { 
        super(21, 12); 
    }
    
    init(ice) {
        
        Level.setWithHeight(this.mapWidth, this.mapHeight);
        
        this.ice = ice;
        
        this.map = [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ];
        
        this.ice.reset();
        this.ice.setXY(5 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 4 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        var tileId = Math.ceil(Math.random() * 6);
        var bgTileId = Math.ceil(Math.random() * 4);
        
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] === 1) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], false, "tile" + tileId);
                } else if (this.map[y * this.mapWidth + x] === 2) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], true, "bg2");
                }
            }
        }
        this.ice.tiles = this.tiles;
        this.checkpoints.push(new Checkpoint(1, 1, 50, 50, 1, "#fe00ab"));
        //this.checkpoints.push(new Checkpoint(8, 1, 50, 50, 2, "#aa8877", this.tileWidth));
        //this.checkpoints.push(new Checkpoint(4, 4, 50, 50, 3, "#66efbb", this.tileWidth));
        
        var smartTile = new SmartTile(1, 4, this.tileWidth, this.tileHeight, this.ice, 50, this.tiles);
        var movingTile = new MovingTile(3, 3, this.tileWidth, this.tileHeight);
        movingTile.addVertex(1 * Level.getWidth() + 3).addVertex(1 * Level.getWidth() + 5).addVertex(3 * Level.getWidth() + 5);
        this.enemies.push(smartTile);
        this.enemies.push(movingTile);
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(5 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 4 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }
        for (var a = 0; a < this.enemies.length; a++) {
            this.enemies[a].reset();
        }
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

