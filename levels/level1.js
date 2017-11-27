class Level1 extends Level {
    constructor() { 
        super(21, 12);
        this.helpPopup = new HelpPopup(null, "help", "help1");
    }
    
    init(ice) {
        
        this.ice = ice;
        
        this.map = [
            13,13,13,14,13,13,13,14,13,13,13,13,12,14,13,13,13,13,13,13,13,
            13,13,13,14,13,12,13,14,13,12,13,13,13,14,13,13,14,13,13,13,13,
            13,13,13,14,14,14,14,14,13,13,13,13,13,14,13,13,14,13,13,13,13,
            12,13,13,13,12,13,13,18,18,18,14,18,18,18,14,14,15,13,12,13,13,
            13,13,13,13,13,13,21,2,2,2,34,2,2,2,20,13,13,13,13,13,13,
            13,13,15,14,14,14,21,2,2,2,43,2,2,2,20,14,14,15,14,13,13,
            13,13,14,13,13,13,21,2,2,2,2,2,2,2,20,13,13,12,14,14,14,
            14,14,14,13,13,13,21,2,2,2,45,2,2,2,20,14,14,13,13,13,13,
            13,13,12,13,13,13,13,19,19,19,14,19,19,19,12,13,14,13,13,13,13,
            13,13,13,13,13,13,13,14,13,12,13,13,13,14,13,13,14,14,13,13,13,
            14,14,14,14,15,14,14,14,13,13,13,13,13,14,13,13,13,14,12,13,13,
            13,13,13,13,13,13,13,14,13,13,13,12,13,14,13,13,13,14,13,13,13
        ];
        
        this.ice.reset();
        this.ice.setXY(7 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 5 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
        
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
        this.checkpoints.push(new Checkpoint(8, 6, 50, 50, 1));
        this.checkpoints.push(new Checkpoint(9, 5, 50, 50, 2));
        this.checkpoints.push(new Checkpoint(12, 6, 50, 50, 3));
        this.checkpoints.push(new Checkpoint(13, 5, 50, 50, 4));
    }
    
    reset() {
        this.ice.reset();
        this.ice.setXY(7 * this.tileWidth + this.tileWidth / 2 - this.ice.w / 2, 5 * this.tileHeight + this.tileHeight / 2 -  this.ice.h / 2);
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