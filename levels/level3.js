class Level3 extends Level {
    constructor() { 
        super(21, 12);
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,
            14,14,14,14,14,17,17,17,17,17,17,17,17,17,17,17,17,17,17,14,14,
            14,14,17,17,17,16,18,18,18,18,18,18,18,18,18,18,18,18,16,17,14,
            14,14,17,14,14,21,3,3,3,5,5,5,5,5,5,5,5,5,20,17,14,
            14,14,17,14,14,21,3,45,3,5,5,5,5,5,5,5,3,5,20,17,14,
            14,17,16,18,18,29,3,34,3,27,19,19,19,19,19,19,19,19,14,17,14,
            14,17,21,3,3,3,3,34,3,33,18,18,18,18,18,18,18,18,14,17,14,
            14,17,16,19,19,19,19,21,3,5,5,5,5,5,5,5,5,5,20,17,14,
            14,14,17,14,14,14,14,21,3,5,5,5,5,5,5,5,3,5,20,17,14,
            14,14,17,14,14,14,14,16,19,19,19,19,19,19,19,19,19,19,16,17,14,
            14,14,17,17,17,17,17,17,14,14,14,14,14,14,14,14,14,14,14,14,14,
            14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14
        ];
        
        this.ice.reset();
        this.ice.setXY(3 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 6 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
               
        this.fadeTiles[4 * this.mapWidth + 9] = new FadeTile(9, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 10] = new FadeTile(10, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 11] = new FadeTile(11, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 12] = new FadeTile(12, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 13] = new FadeTile(13, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 14] = new FadeTile(14, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 15] = new FadeTile(15, 4, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        
        this.fadeTiles[3 * this.mapWidth + 9] = new FadeTile(9, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 10] = new FadeTile(10, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 11] = new FadeTile(11, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 12] = new FadeTile(12, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 13] = new FadeTile(13, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 14] = new FadeTile(14, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 15] = new FadeTile(15, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[3 * this.mapWidth + 16] = new FadeTile(16, 3, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        
        this.fadeTiles[3 * this.mapWidth + 17] = new FadeTile(17, 3, this.tileWidth, this.tileHeight, 0, 0, 1, "bg3");
        this.fadeTiles[4 * this.mapWidth + 17] = new FadeTile(17, 4, this.tileWidth, this.tileHeight, 0, 0, 1, "bg3");
        
        this.fadeTiles[7 * this.mapWidth + 9] = new FadeTile(9, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[8 * this.mapWidth + 10] = new FadeTile(10, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[7 * this.mapWidth + 11] = new FadeTile(11, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[8 * this.mapWidth + 12] = new FadeTile(12, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[7 * this.mapWidth + 13] = new FadeTile(13, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[8 * this.mapWidth + 14] = new FadeTile(14, 8, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");
        this.fadeTiles[7 * this.mapWidth + 15] = new FadeTile(15, 7, this.tileWidth, this.tileHeight, 1, 1, 1, "bg3");

        this.fadeTiles[8 * this.mapWidth + 9] = new FadeTile(9, 8, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[7 * this.mapWidth + 10] = new FadeTile(10, 7, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[8 * this.mapWidth + 11] = new FadeTile(11, 8, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[7 * this.mapWidth + 12] = new FadeTile(12, 7, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[8 * this.mapWidth + 13] = new FadeTile(13, 8, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[7 * this.mapWidth + 14] = new FadeTile(14, 7, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[8 * this.mapWidth + 15] = new FadeTile(15, 8, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        this.fadeTiles[7 * this.mapWidth + 16] = new FadeTile(16, 7, this.tileWidth, this.tileHeight, 1, 1, 0, "bg3");
        
        this.fadeTiles[7 * this.mapWidth + 17] = new FadeTile(17, 7, this.tileWidth, this.tileHeight, 0, 0, 1, "bg3");
        this.fadeTiles[8 * this.mapWidth + 17] = new FadeTile(17, 8, this.tileWidth, this.tileHeight, 0, 0, 1, "bg3");
        
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] >= 6 && this.map[y * this.mapWidth + x] <= 45) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], false, "tiles" + this.map[y * this.mapWidth + x], "bg3");
                } else if (this.map[y * this.mapWidth + x] === 5) {
                    this.tiles[y * this.mapWidth + x] = this.fadeTiles[y * this.mapWidth + x];
                } else {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, this.tileWidth, this.tileHeight, this.map[y * this.mapWidth + x], true, "bg" + this.map[y * this.mapWidth + x], null);
                }
            }
        }
        
        this.ice.tiles = this.tiles;
        this.ice.drops = this.drops;
        this.checkpoints.push(new Checkpoint(16, 4, 50, 50, 1));
        this.checkpoints.push(new Checkpoint(16, 8, 50, 50, 2));
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(3 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 6 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }
        for (var a = 0; a < this.enemies.length; a++) {
            this.enemies[a].reset();
        }
         for (var a = 0; a < this.items.length; a++) {
            this.items[a].reset();
        }
        
        this.fadeTiles[4 * this.mapWidth + 9].reset();
        this.fadeTiles[4 * this.mapWidth + 10].reset();
        this.fadeTiles[4 * this.mapWidth + 11].reset();
        this.fadeTiles[4 * this.mapWidth + 12].reset();
        this.fadeTiles[4 * this.mapWidth + 13].reset();
        this.fadeTiles[4 * this.mapWidth + 14].reset();
        this.fadeTiles[4 * this.mapWidth + 15].reset();
        
        this.fadeTiles[3 * this.mapWidth + 9].reset();
        this.fadeTiles[3 * this.mapWidth + 10].reset();
        this.fadeTiles[3 * this.mapWidth + 11].reset();
        this.fadeTiles[3 * this.mapWidth + 12].reset();
        this.fadeTiles[3 * this.mapWidth + 13].reset();
        this.fadeTiles[3 * this.mapWidth + 14].reset();
        this.fadeTiles[3 * this.mapWidth + 15].reset();
        this.fadeTiles[3 * this.mapWidth + 16].reset();
        
        this.fadeTiles[3 * this.mapWidth + 17].reset();
        this.fadeTiles[4 * this.mapWidth + 17].reset();
        
        this.fadeTiles[7 * this.mapWidth + 9].reset();
        this.fadeTiles[8 * this.mapWidth + 10].reset();
        this.fadeTiles[7 * this.mapWidth + 11].reset();
        this.fadeTiles[8 * this.mapWidth + 12].reset();
        this.fadeTiles[7 * this.mapWidth + 13].reset();
        this.fadeTiles[8 * this.mapWidth + 14].reset();
        this.fadeTiles[7 * this.mapWidth + 15].reset();

        this.fadeTiles[8 * this.mapWidth + 9].reset();
        this.fadeTiles[7 * this.mapWidth + 10].reset();
        this.fadeTiles[8 * this.mapWidth + 11].reset();
        this.fadeTiles[7 * this.mapWidth + 12].reset();
        this.fadeTiles[8 * this.mapWidth + 13].reset();
        this.fadeTiles[7 * this.mapWidth + 14].reset();
        this.fadeTiles[8 * this.mapWidth + 15].reset();
        this.fadeTiles[7 * this.mapWidth + 16].reset();
        
        this.fadeTiles[7 * this.mapWidth + 17].reset();
        this.fadeTiles[8 * this.mapWidth + 17].reset();

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

