class Level1 extends Level {
    constructor() { 
        super(21, 12); 
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,
            1,1,1,1,0,1,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,
            1,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,1,
            1,0,0,0,0,0,0,1,1,0,1,1,1,0,0,1,0,1,1,1,0,
            1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
            1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
            1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,
            1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ];
        
        this.ice.reset();
        this.ice.setXY(2 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        this.fadeTiles[7 * this.mapWidth + 3] = new FadeTile(3, 7, this.tileWidth, this.tileHeight, 2, 3, 1);
        this.fadeTiles[7 * this.mapWidth + 16] = new FadeTile(16, 7, this.tileWidth, this.tileHeight, 1, 1, 1);
        this.fadeTiles[7 * this.mapWidth + 12] = new FadeTile(12, 7, this.tileWidth, this.tileHeight, 1, 1, 1);
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
        
        this.items.push(new Item(7, 1, this.tileWidth, this.tileHeight));
        
        this.ice.tiles = this.tiles;
        this.ice.drops = this.drops;
        this.checkpoints.push(new Checkpoint(1, 1, 50, 50, 1, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(8, 1, 50, 50, 2, "#aa8877"));
        this.checkpoints.push(new Checkpoint(4, 4, 50, 50, 3, "#66efbb"));
        this.checkpoints.push(new Checkpoint(15, 9, 50, 50, 4, "#66efbb"));
        
        var smartTile = new SmartTile(1, 4, this.tileWidth, this.tileHeight, this.ice, 50);
        var smartTile2 = new SmartTile(15, 9, this.tileWidth, this.tileHeight, this.ice, 100);
        var smartTile3 = new SmartTile(8, 5, this.tileWidth, this.tileHeight, this.ice, 150);
        this.enemies.push(smartTile);
        this.enemies.push(smartTile2);
        this.enemies.push(smartTile3);
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(2 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }
        for (var a = 0; a < this.enemies.length; a++) {
            this.enemies[a].reset();
        }
         for (var a = 0; a < this.items.length; a++) {
            this.items[a].reset();
        }
        this.fadeTiles[7 * this.mapWidth + 3].reset();
        this.fadeTiles[7 * this.mapWidth + 16].reset();
        this.fadeTiles[7 * this.mapWidth + 12].reset();
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

