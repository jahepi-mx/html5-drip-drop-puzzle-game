class Level10 extends Level {
    constructor() { 
        super(21, 12);
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            17,22,22,22,22,22,22,22,22,22,14,22,22,22,22,22,22,22,22,22,17,
            25,2,2,2,2,2,2,2,2,2,35,2,5,2,5,2,5,2,5,2,24,
            25,2,45,2,45,2,45,2,45,2,35,2,2,2,2,2,2,2,2,2,24,
            14,37,22,37,22,37,22,37,28,2,35,2,5,2,5,2,5,2,5,2,24,
            25,2,2,2,2,2,2,2,2,2,35,2,5,2,5,2,5,2,5,2,24,
            25,2,27,23,31,2,41,37,37,37,25,2,2,2,2,2,2,2,2,2,24,
            17,23,17,17,25,2,5,5,5,5,35,2,5,2,5,2,5,2,5,2,24,
            17,22,22,22,22,36,36,36,39,5,35,2,5,2,5,2,5,2,5,2,24,
            25,5,5,5,5,5,5,5,5,5,35,2,2,2,2,2,2,2,2,2,24,
            25,5,41,36,36,36,36,36,36,36,18,39,2,5,2,5,2,5,2,5,24,
            25,5,5,5,5,5,5,5,5,5,2,5,2,5,2,5,2,5,2,5,24,
            17,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,17
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        this.fadeTiles[6 * this.mapWidth + 6] = new FadeTile(6, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 1);
        this.fadeTiles[6 * this.mapWidth + 7] = new FadeTile(7, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 1.2);
        this.fadeTiles[6 * this.mapWidth + 8] = new FadeTile(8, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 1.4);
        this.fadeTiles[6 * this.mapWidth + 9] = new FadeTile(9, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 1.6);
        this.fadeTiles[7 * this.mapWidth + 9] = new FadeTile(9, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 1.8);
        this.fadeTiles[8 * this.mapWidth + 9] = new FadeTile(9, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 2);
        this.fadeTiles[8 * this.mapWidth + 8] = new FadeTile(8, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 2.2);
        this.fadeTiles[8 * this.mapWidth + 7] = new FadeTile(7, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 2.4);       
        this.fadeTiles[8 * this.mapWidth + 6] = new FadeTile(6, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 2.6);
        this.fadeTiles[8 * this.mapWidth + 5] = new FadeTile(5, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 2.8);
        this.fadeTiles[8 * this.mapWidth + 4] = new FadeTile(4, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 3);
        this.fadeTiles[8 * this.mapWidth + 3] = new FadeTile(3, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 3.2);
        this.fadeTiles[8 * this.mapWidth + 2] = new FadeTile(2, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 3.4);
        this.fadeTiles[8 * this.mapWidth + 1] = new FadeTile(1, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 3.6);
        this.fadeTiles[9 * this.mapWidth + 1] = new FadeTile(1, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 3.8);
        this.fadeTiles[10 * this.mapWidth + 1] = new FadeTile(1, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 4);   
        this.fadeTiles[10 * this.mapWidth + 2] = new FadeTile(2, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 4.2);
        this.fadeTiles[10 * this.mapWidth + 3] = new FadeTile(3, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 4.4);
        this.fadeTiles[10 * this.mapWidth + 4] = new FadeTile(4, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 4.6);
        this.fadeTiles[10 * this.mapWidth + 5] = new FadeTile(5, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 4.8);
        this.fadeTiles[10 * this.mapWidth + 6] = new FadeTile(6, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 5);
        this.fadeTiles[10 * this.mapWidth + 7] = new FadeTile(7, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 5.2);
        this.fadeTiles[10 * this.mapWidth + 8] = new FadeTile(8, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 5.4);
        this.fadeTiles[10 * this.mapWidth + 9] = new FadeTile(9, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 5.6);
        
        this.fadeTiles[10 * this.mapWidth + 11] = new FadeTile(11, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg2", 0);
        
        this.fadeTiles[1 * this.mapWidth + 12] = new FadeTile(12, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[1 * this.mapWidth + 14] = new FadeTile(14, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[1 * this.mapWidth + 16] = new FadeTile(16, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[1 * this.mapWidth + 18] = new FadeTile(18, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[3 * this.mapWidth + 12] = new FadeTile(12, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[3 * this.mapWidth + 14] = new FadeTile(14, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[3 * this.mapWidth + 16] = new FadeTile(16, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[3 * this.mapWidth + 18] = new FadeTile(18, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[4 * this.mapWidth + 12] = new FadeTile(12, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[4 * this.mapWidth + 14] = new FadeTile(14, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[4 * this.mapWidth + 16] = new FadeTile(16, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[4 * this.mapWidth + 18] = new FadeTile(18, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[6 * this.mapWidth + 12] = new FadeTile(12, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[6 * this.mapWidth + 14] = new FadeTile(14, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[6 * this.mapWidth + 16] = new FadeTile(16, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[6 * this.mapWidth + 18] = new FadeTile(18, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[7 * this.mapWidth + 12] = new FadeTile(12, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[7 * this.mapWidth + 14] = new FadeTile(14, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[7 * this.mapWidth + 16] = new FadeTile(16, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[7 * this.mapWidth + 18] = new FadeTile(18, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[9 * this.mapWidth + 13] = new FadeTile(13, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[9 * this.mapWidth + 15] = new FadeTile(15, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[9 * this.mapWidth + 17] = new FadeTile(17, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[9 * this.mapWidth + 19] = new FadeTile(19, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        this.fadeTiles[10 * this.mapWidth + 13] = new FadeTile(13, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[10 * this.mapWidth + 15] = new FadeTile(15, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        this.fadeTiles[10 * this.mapWidth + 17] = new FadeTile(17, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 1);
        this.fadeTiles[10 * this.mapWidth + 19] = new FadeTile(19, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg4", 2);
        
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] >= 6 && this.map[y * this.mapWidth + x] <= 45) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], false, "tiles" + this.map[y * this.mapWidth + x], "bg2");
                } else if (this.map[y * this.mapWidth + x] === 5) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], true, "bg" + this.map[y * this.mapWidth + x], null);
                }
            }
        }
        
        this.ice.tiles = this.tiles;
        this.ice.drops = this.drops;
        this.checkpoints.push(new Checkpoint(1, 4, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 1));
        this.checkpoints.push(new Checkpoint(5, 6, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 2));
        this.checkpoints.push(new Checkpoint(15, 5, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 3));
        this.checkpoints.push(new Checkpoint(13, 2, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 4));
        this.checkpoints.push(new Checkpoint(17, 2, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 5));
        this.checkpoints.push(new Checkpoint(13, 8, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 6));
        this.checkpoints.push(new Checkpoint(17, 8, this.config.getWidthByResolution(50), this.config.getHeightByResolution(50), 7));

        
        var smartTile = new SmartTile(19, 1, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(160), 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(18, 10, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(140), 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(15, 5, this.tileWidth, this.tileHeight, this.ice, this.config.getWidthByResolution(120), 0.5);
        this.enemies.push(smartTile);
        
        this.items.push(new Item(11, 1, this.tileWidth, this.tileHeight));
        this.items.push(new Item(19, 8, this.tileWidth, this.tileHeight));

        var movingTile = new MovingTile(3, 1, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(2 * this.mapWidth + 3);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(5, 2, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(1 * this.mapWidth + 5);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(7, 1, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(2 * this.mapWidth + 7);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(9, 4, this.tileWidth, this.tileHeight, this.config.getWidthByResolution(2));
        movingTile.addVertex(4 * this.mapWidth + 5);
        movingTile.addVertex(6 * this.mapWidth + 5);
        movingTile.addVertex(4 * this.mapWidth + 5);
        movingTile.addVertex(4 * this.mapWidth + 1);
        movingTile.addVertex(5 * this.mapWidth + 1);
        movingTile.addVertex(4 * this.mapWidth + 1);
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
         for (var a = 0; a < this.items.length; a++) {
            this.items[a].reset();
        }
        
        this.fadeTiles[6 * this.mapWidth + 6].reset();
        this.fadeTiles[6 * this.mapWidth + 7].reset();
        this.fadeTiles[6 * this.mapWidth + 8].reset();
        this.fadeTiles[6 * this.mapWidth + 9].reset();
        this.fadeTiles[7 * this.mapWidth + 9].reset();
        this.fadeTiles[8 * this.mapWidth + 9].reset();
        this.fadeTiles[8 * this.mapWidth + 8].reset();
        this.fadeTiles[8 * this.mapWidth + 7].reset();      
        this.fadeTiles[8 * this.mapWidth + 6].reset();
        this.fadeTiles[8 * this.mapWidth + 5].reset();
        this.fadeTiles[8 * this.mapWidth + 4].reset();
        this.fadeTiles[8 * this.mapWidth + 3].reset();
        this.fadeTiles[8 * this.mapWidth + 2].reset();
        this.fadeTiles[8 * this.mapWidth + 1].reset();
        this.fadeTiles[9 * this.mapWidth + 1].reset();
        this.fadeTiles[10 * this.mapWidth + 1].reset();   
        this.fadeTiles[10 * this.mapWidth + 2].reset();
        this.fadeTiles[10 * this.mapWidth + 3].reset();
        this.fadeTiles[10 * this.mapWidth + 4].reset();
        this.fadeTiles[10 * this.mapWidth + 5].reset();
        this.fadeTiles[10 * this.mapWidth + 6].reset();
        this.fadeTiles[10 * this.mapWidth + 7].reset();
        this.fadeTiles[10 * this.mapWidth + 8].reset();
        this.fadeTiles[10 * this.mapWidth + 9].reset();
        
        this.fadeTiles[10 * this.mapWidth + 11].reset();
        
        this.fadeTiles[1 * this.mapWidth + 12].reset();
        this.fadeTiles[1 * this.mapWidth + 14].reset();
        this.fadeTiles[1 * this.mapWidth + 16].reset();
        this.fadeTiles[1 * this.mapWidth + 18].reset();
        
        this.fadeTiles[3 * this.mapWidth + 12].reset();
        this.fadeTiles[3 * this.mapWidth + 14].reset();
        this.fadeTiles[3 * this.mapWidth + 16].reset();
        this.fadeTiles[3 * this.mapWidth + 18].reset();
        
        this.fadeTiles[4 * this.mapWidth + 12].reset();
        this.fadeTiles[4 * this.mapWidth + 14].reset();
        this.fadeTiles[4 * this.mapWidth + 16].reset();
        this.fadeTiles[4 * this.mapWidth + 18].reset();
        
        this.fadeTiles[6 * this.mapWidth + 12].reset();
        this.fadeTiles[6 * this.mapWidth + 14].reset();
        this.fadeTiles[6 * this.mapWidth + 16].reset();
        this.fadeTiles[6 * this.mapWidth + 18].reset();
        
        this.fadeTiles[7 * this.mapWidth + 12].reset();
        this.fadeTiles[7 * this.mapWidth + 14].reset();
        this.fadeTiles[7 * this.mapWidth + 16].reset();
        this.fadeTiles[7 * this.mapWidth + 18].reset();
        
        this.fadeTiles[9 * this.mapWidth + 13].reset();
        this.fadeTiles[9 * this.mapWidth + 15].reset();
        this.fadeTiles[9 * this.mapWidth + 17].reset();
        this.fadeTiles[9 * this.mapWidth + 19].reset();
        
        this.fadeTiles[10 * this.mapWidth + 13].reset();
        this.fadeTiles[10 * this.mapWidth + 15].reset();
        this.fadeTiles[10 * this.mapWidth + 17].reset();
        this.fadeTiles[10 * this.mapWidth + 19].reset();
        
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

