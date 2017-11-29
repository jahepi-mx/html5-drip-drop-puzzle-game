class Level9 extends Level {
    constructor() { 
        super(21, 12);
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            17,18,18,18,18,14,18,14,18,18,18,18,18,14,18,18,18,18,18,18,17,
            21,3,5,5,5,42,3,34,3,3,3,8,3,34,3,3,5,5,5,3,20,
            21,3,5,8,5,3,3,42,3,10,3,3,3,42,3,44,5,7,5,3,20,
            14,38,5,5,5,44,3,5,3,3,3,8,3,5,3,42,5,5,5,40,14,
            21,3,5,5,5,42,3,44,3,8,3,3,3,44,3,3,5,5,5,3,20,
            21,3,5,7,5,3,3,34,3,3,3,10,3,34,3,44,5,10,5,3,20,
            14,38,5,5,5,44,3,20,36,36,36,36,36,21,3,42,5,5,5,40,14,
            21,3,5,5,5,42,3,34,3,8,3,3,3,34,3,3,5,5,5,3,20,
            21,3,5,9,5,3,3,42,3,3,3,9,3,34,3,44,5,8,5,3,20,
            14,30,5,5,5,44,3,5,3,9,3,3,3,5,3,34,5,5,5,26,14,
            14,14,19,19,19,21,3,44,3,3,3,8,3,44,3,20,19,19,19,14,14,
            17,14,14,14,14,14,19,14,19,19,19,19,19,15,19,14,14,14,14,14,17
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        this.fadeTiles[1 * this.mapWidth + 2] = new FadeTile(2, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[1 * this.mapWidth + 3] = new FadeTile(3, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[1 * this.mapWidth + 4] = new FadeTile(4, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[2 * this.mapWidth + 4] = new FadeTile(4, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[3 * this.mapWidth + 4] = new FadeTile(4, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[3 * this.mapWidth + 3] = new FadeTile(3, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[3 * this.mapWidth + 2] = new FadeTile(2, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[2 * this.mapWidth + 2] = new FadeTile(2, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[4 * this.mapWidth + 2] = new FadeTile(2, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[4 * this.mapWidth + 3] = new FadeTile(3, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[4 * this.mapWidth + 4] = new FadeTile(4, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[5 * this.mapWidth + 4] = new FadeTile(4, 5, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[6 * this.mapWidth + 4] = new FadeTile(4, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[6 * this.mapWidth + 3] = new FadeTile(3, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[6 * this.mapWidth + 2] = new FadeTile(2, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[5 * this.mapWidth + 2] = new FadeTile(2, 5, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[7 * this.mapWidth + 2] = new FadeTile(2, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[7 * this.mapWidth + 3] = new FadeTile(3, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[7 * this.mapWidth + 4] = new FadeTile(4, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[8 * this.mapWidth + 4] = new FadeTile(4, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[9 * this.mapWidth + 4] = new FadeTile(4, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[9 * this.mapWidth + 3] = new FadeTile(3, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[9 * this.mapWidth + 2] = new FadeTile(2, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[8 * this.mapWidth + 2] = new FadeTile(2, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        
        this.fadeTiles[1 * this.mapWidth + 16] = new FadeTile(16, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[1 * this.mapWidth + 17] = new FadeTile(17, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[1 * this.mapWidth + 18] = new FadeTile(18, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[2 * this.mapWidth + 18] = new FadeTile(18, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[3 * this.mapWidth + 18] = new FadeTile(18, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[3 * this.mapWidth + 17] = new FadeTile(17, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[3 * this.mapWidth + 16] = new FadeTile(16, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[2 * this.mapWidth + 16] = new FadeTile(16, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[1 * this.mapWidth + 16] = new FadeTile(16, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[1 * this.mapWidth + 17] = new FadeTile(17, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[1 * this.mapWidth + 18] = new FadeTile(18, 1, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[2 * this.mapWidth + 18] = new FadeTile(18, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[3 * this.mapWidth + 18] = new FadeTile(18, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[3 * this.mapWidth + 17] = new FadeTile(17, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[3 * this.mapWidth + 16] = new FadeTile(16, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[2 * this.mapWidth + 16] = new FadeTile(16, 2, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[4 * this.mapWidth + 16] = new FadeTile(16, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[4 * this.mapWidth + 17] = new FadeTile(17, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[4 * this.mapWidth + 18] = new FadeTile(18, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[5 * this.mapWidth + 18] = new FadeTile(18, 5, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[6 * this.mapWidth + 18] = new FadeTile(18, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[6 * this.mapWidth + 17] = new FadeTile(17, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[6 * this.mapWidth + 16] = new FadeTile(16, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[5 * this.mapWidth + 16] = new FadeTile(16, 5, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[7 * this.mapWidth + 16] = new FadeTile(16, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1);
        this.fadeTiles[7 * this.mapWidth + 17] = new FadeTile(17, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.2);
        this.fadeTiles[7 * this.mapWidth + 18] = new FadeTile(18, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.4);
        this.fadeTiles[8 * this.mapWidth + 18] = new FadeTile(18, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.6);
        this.fadeTiles[9 * this.mapWidth + 18] = new FadeTile(18, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 1.8);
        this.fadeTiles[9 * this.mapWidth + 17] = new FadeTile(17, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2);
        this.fadeTiles[9 * this.mapWidth + 16] = new FadeTile(16, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.2);
        this.fadeTiles[8 * this.mapWidth + 16] = new FadeTile(16, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 2.4);
        
        this.fadeTiles[3 * this.mapWidth + 7] = new FadeTile(7, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 0);
        this.fadeTiles[9 * this.mapWidth + 7] = new FadeTile(7, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 0);
        this.fadeTiles[3 * this.mapWidth + 13] = new FadeTile(13, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 0);
        this.fadeTiles[9 * this.mapWidth + 13] = new FadeTile(13, 9, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3", 0);
        
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
        this.checkpoints.push(new Checkpoint(1, 4, 50, 50, 1));
        this.checkpoints.push(new Checkpoint(1, 7, 50, 50, 2));
        this.checkpoints.push(new Checkpoint(6, 2, 50, 50, 3));
        this.checkpoints.push(new Checkpoint(6, 5, 50, 50, 4));
        this.checkpoints.push(new Checkpoint(6, 8, 50, 50, 5));
        this.checkpoints.push(new Checkpoint(10, 3, 50, 50, 6));
        this.checkpoints.push(new Checkpoint(10, 8, 50, 50, 7));
        this.checkpoints.push(new Checkpoint(14, 1, 50, 50, 8));
        this.checkpoints.push(new Checkpoint(14, 4, 50, 50, 9));
        this.checkpoints.push(new Checkpoint(14, 7, 50, 50, 10));
        this.checkpoints.push(new Checkpoint(19, 2, 50, 50, 11));
        this.checkpoints.push(new Checkpoint(19, 5, 50, 50, 12));
        this.checkpoints.push(new Checkpoint(19, 8, 50, 50, 13));

        
        var smartTile = new SmartTile(12, 1, this.tileWidth, this.tileHeight, this.ice, 180, 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(12, 5, this.tileWidth, this.tileHeight, this.ice, 140, 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(12, 7, this.tileWidth, this.tileHeight, this.ice, 180, 0.5);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(12, 10, this.tileWidth, this.tileHeight, this.ice, 140, 0.5);
        this.enemies.push(smartTile);
        
        this.items.push(new Item(6, 1, this.tileWidth, this.tileHeight));
        this.items.push(new Item(14, 10, this.tileWidth, this.tileHeight));

        var movingTile = new MovingTile(6, 1, this.tileWidth, this.tileHeight, 5);
        movingTile.addVertex(10 * this.mapWidth + 6);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(14, 10, this.tileWidth, this.tileHeight, 5);
        movingTile.addVertex(1 * this.mapWidth + 14);
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
        
        this.fadeTiles[1 * this.mapWidth + 2].reset();
        this.fadeTiles[1 * this.mapWidth + 3].reset();
        this.fadeTiles[1 * this.mapWidth + 4].reset();
        this.fadeTiles[2 * this.mapWidth + 4].reset();
        this.fadeTiles[3 * this.mapWidth + 4].reset();
        this.fadeTiles[3 * this.mapWidth + 3].reset();
        this.fadeTiles[3 * this.mapWidth + 2].reset();
        this.fadeTiles[2 * this.mapWidth + 2].reset();
        
        this.fadeTiles[4 * this.mapWidth + 2].reset();
        this.fadeTiles[4 * this.mapWidth + 3].reset();
        this.fadeTiles[4 * this.mapWidth + 4].reset();
        this.fadeTiles[5 * this.mapWidth + 4].reset();
        this.fadeTiles[6 * this.mapWidth + 4].reset();
        this.fadeTiles[6 * this.mapWidth + 3].reset();
        this.fadeTiles[6 * this.mapWidth + 2].reset();
        this.fadeTiles[5 * this.mapWidth + 2].reset();
        
        this.fadeTiles[7 * this.mapWidth + 2].reset();
        this.fadeTiles[7 * this.mapWidth + 3].reset();
        this.fadeTiles[7 * this.mapWidth + 4].reset();
        this.fadeTiles[8 * this.mapWidth + 4].reset();
        this.fadeTiles[9 * this.mapWidth + 4].reset();
        this.fadeTiles[9 * this.mapWidth + 3].reset();
        this.fadeTiles[9 * this.mapWidth + 2].reset();
        this.fadeTiles[8 * this.mapWidth + 2].reset();
        
        this.fadeTiles[1 * this.mapWidth + 16].reset();
        this.fadeTiles[1 * this.mapWidth + 17].reset();
        this.fadeTiles[1 * this.mapWidth + 18].reset();
        this.fadeTiles[2 * this.mapWidth + 18].reset();
        this.fadeTiles[3 * this.mapWidth + 18].reset();
        this.fadeTiles[3 * this.mapWidth + 17].reset();
        this.fadeTiles[3 * this.mapWidth + 16].reset();
        this.fadeTiles[2 * this.mapWidth + 16].reset();
        
        this.fadeTiles[1 * this.mapWidth + 16].reset();
        this.fadeTiles[1 * this.mapWidth + 17].reset();
        this.fadeTiles[1 * this.mapWidth + 18].reset();
        this.fadeTiles[2 * this.mapWidth + 18].reset();
        this.fadeTiles[3 * this.mapWidth + 18].reset();
        this.fadeTiles[3 * this.mapWidth + 17].reset();
        this.fadeTiles[3 * this.mapWidth + 16].reset();
        this.fadeTiles[2 * this.mapWidth + 16].reset();
        
        this.fadeTiles[4 * this.mapWidth + 16].reset();
        this.fadeTiles[4 * this.mapWidth + 17].reset();
        this.fadeTiles[4 * this.mapWidth + 18].reset();
        this.fadeTiles[5 * this.mapWidth + 18].reset();
        this.fadeTiles[6 * this.mapWidth + 18].reset();
        this.fadeTiles[6 * this.mapWidth + 17].reset();
        this.fadeTiles[6 * this.mapWidth + 16].reset();
        this.fadeTiles[5 * this.mapWidth + 16].reset();
        
        this.fadeTiles[7 * this.mapWidth + 16].reset();
        this.fadeTiles[7 * this.mapWidth + 17].reset();
        this.fadeTiles[7 * this.mapWidth + 18].reset();
        this.fadeTiles[8 * this.mapWidth + 18].reset();
        this.fadeTiles[9 * this.mapWidth + 18].reset();
        this.fadeTiles[9 * this.mapWidth + 17].reset();
        this.fadeTiles[9 * this.mapWidth + 16].reset();
        this.fadeTiles[8 * this.mapWidth + 16].reset();
        
        this.fadeTiles[3 * this.mapWidth + 7].reset();
        this.fadeTiles[9 * this.mapWidth + 7].reset();
        this.fadeTiles[3 * this.mapWidth + 13].reset();
        this.fadeTiles[9 * this.mapWidth + 13].reset();
        
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

