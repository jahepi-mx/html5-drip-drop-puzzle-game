class Level8 extends Level {
    constructor() { 
        super(21, 12);
        this.helpPopup = new HelpPopup(null, "help");
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            12,18,14,18,14,14,18,18,18,18,18,18,18,14,15,14,14,14,14,14,12,
            21,1,42,1,20,21,1,1,1,1,1,1,1,20,14,14,14,14,14,15,14,
            21,1,5,1,32,29,1,40,36,19,19,38,1,32,14,14,14,18,18,18,14,
            21,5,9,5,1,1,1,1,1,20,21,1,1,1,20,15,21,5,5,5,20,
            21,1,5,1,7,7,1,40,36,18,29,1,1,1,32,18,29,5,5,5,20,
            21,5,9,5,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,5,20,
            21,1,5,1,7,7,1,40,36,19,30,1,1,1,26,19,30,5,5,5,20,
            21,5,9,5,1,1,1,1,1,20,21,1,1,1,20,14,21,5,5,5,20,
            21,1,5,1,26,30,1,40,36,18,18,38,1,26,14,15,14,14,14,14,14,
            21,5,9,5,20,21,1,1,1,1,1,1,1,20,15,14,15,14,15,14,14,
            21,1,5,1,20,15,19,19,19,19,19,19,19,14,14,14,14,14,14,14,14,
            12,19,19,19,14,14,15,14,14,15,14,14,14,15,14,14,14,14,14,14,12
        ];
        
        this.ice.reset();
        this.ice.setXY(1 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 1 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);

        this.fadeTiles[3 * this.mapWidth + 1] = new FadeTile(1, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[3 * this.mapWidth + 3] = new FadeTile(3, 3, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[4 * this.mapWidth + 2] = new FadeTile(2, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[6 * this.mapWidth + 2] = new FadeTile(2, 6, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[7 * this.mapWidth + 1] = new FadeTile(1, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[7 * this.mapWidth + 3] = new FadeTile(3, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[8 * this.mapWidth + 2] = new FadeTile(2, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        this.fadeTiles[10 * this.mapWidth + 2] = new FadeTile(2, 10, this.tileWidth, this.tileHeight, 1, 1, 1, "bg1");
        
        this.fadeTiles[2 * this.mapWidth + 2] = new FadeTile(2, 2, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[4 * this.mapWidth + 2] = new FadeTile(2, 4, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[5 * this.mapWidth + 1] = new FadeTile(1, 5, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[5 * this.mapWidth + 3] = new FadeTile(3, 5, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[6 * this.mapWidth + 2] = new FadeTile(2, 6, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[8 * this.mapWidth + 2] = new FadeTile(2, 8, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[9 * this.mapWidth + 1] = new FadeTile(1, 9, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        this.fadeTiles[9 * this.mapWidth + 3] = new FadeTile(3, 9, this.tileWidth, this.tileHeight, 1, 1, 0, "bg1");
        
        this.fadeTiles[3 * this.mapWidth + 17] = new FadeTile(17, 3, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[3 * this.mapWidth + 18] = new FadeTile(18, 3, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[3 * this.mapWidth + 19] = new FadeTile(19, 3, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[4 * this.mapWidth + 17] = new FadeTile(17, 4, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[4 * this.mapWidth + 18] = new FadeTile(18, 4, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[4 * this.mapWidth + 19] = new FadeTile(19, 4, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[5 * this.mapWidth + 17] = new FadeTile(17, 5, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[5 * this.mapWidth + 19] = new FadeTile(19, 5, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[6 * this.mapWidth + 17] = new FadeTile(17, 6, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[6 * this.mapWidth + 18] = new FadeTile(18, 6, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[6 * this.mapWidth + 19] = new FadeTile(19, 6, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[7 * this.mapWidth + 17] = new FadeTile(17, 7, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[7 * this.mapWidth + 18] = new FadeTile(18, 7, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        this.fadeTiles[7 * this.mapWidth + 19] = new FadeTile(19, 7, this.tileWidth, this.tileHeight, 0, 0, 1, "bg1");
        
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
        this.checkpoints.push(new Checkpoint(1, 4, 50, 50, 1, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(3, 6, 50, 50, 2, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(1, 8, 50, 50, 3, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(3, 10, 50, 50, 4, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(12, 5, 50, 50, 5, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(18, 5, 50, 50, 6, "#fe00ab"));
        
        var smartTile = new SmartTile(12, 4, this.tileWidth, this.tileHeight, this.ice, 100);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(9, 9, this.tileWidth, this.tileHeight, this.ice, 120);
        this.enemies.push(smartTile);
        
        smartTile = new SmartTile(9, 1, this.tileWidth, this.tileHeight, this.ice, 80);
        this.enemies.push(smartTile);
        
        this.items.push(new Item(1, 2, this.tileWidth, this.tileHeight));
        this.items.push(new Item(15, 5, this.tileWidth, this.tileHeight));

        var movingTile = new MovingTile(6, 1, this.tileWidth, this.tileHeight, 5);
        movingTile.addVertex(9 * this.mapWidth + 6);
        this.enemies.push(movingTile);
        
        movingTile = new MovingTile(12, 9, this.tileWidth, this.tileHeight, 5);
        movingTile.addVertex(1 * this.mapWidth + 12);
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
        
        this.fadeTiles[3 * this.mapWidth + 1].reset();
        this.fadeTiles[3 * this.mapWidth + 3].reset();
        this.fadeTiles[4 * this.mapWidth + 2].reset();
        this.fadeTiles[6 * this.mapWidth + 2].reset();
        this.fadeTiles[7 * this.mapWidth + 1].reset();
        this.fadeTiles[7 * this.mapWidth + 3].reset();
        this.fadeTiles[8 * this.mapWidth + 2].reset();
        this.fadeTiles[10 * this.mapWidth + 2].reset();
        
        this.fadeTiles[2 * this.mapWidth + 2].reset();
        this.fadeTiles[4 * this.mapWidth + 2].reset();
        this.fadeTiles[5 * this.mapWidth + 1].reset();
        this.fadeTiles[5 * this.mapWidth + 3].reset();
        this.fadeTiles[6 * this.mapWidth + 2].reset();
        this.fadeTiles[8 * this.mapWidth + 2].reset();
        this.fadeTiles[9 * this.mapWidth + 1].reset();
        this.fadeTiles[9 * this.mapWidth + 3].reset();
        
        this.fadeTiles[3 * this.mapWidth + 17].reset();
        this.fadeTiles[3 * this.mapWidth + 18].reset();
        this.fadeTiles[3 * this.mapWidth + 19].reset();
        this.fadeTiles[4 * this.mapWidth + 17].reset();
        this.fadeTiles[4 * this.mapWidth + 18].reset();
        this.fadeTiles[4 * this.mapWidth + 19].reset();
        this.fadeTiles[5 * this.mapWidth + 17].reset();
        this.fadeTiles[5 * this.mapWidth + 19].reset();
        this.fadeTiles[6 * this.mapWidth + 17].reset();
        this.fadeTiles[6 * this.mapWidth + 18].reset();
        this.fadeTiles[6 * this.mapWidth + 19].reset();
        this.fadeTiles[7 * this.mapWidth + 17].reset();
        this.fadeTiles[7 * this.mapWidth + 18].reset();
        this.fadeTiles[7 * this.mapWidth + 19].reset();
        
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

