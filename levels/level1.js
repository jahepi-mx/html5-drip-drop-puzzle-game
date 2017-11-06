class Level1 extends Level {
    constructor(box) {
        super(10, 7, box);
        this.map = [
            1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,1,
            1,1,1,1,0,1,1,1,1,1,
            1,1,1,1,0,1,1,1,1,1,
            1,0,0,0,0,0,1,1,1,1,
            1,1,1,1,1,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1
        ];
        
        this.box.x = 4 * this.box.w;
        this.box.y = 2 * this.box.h;
                
        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                if (this.map[y * this.mapWidth + x] === 1) {
                    this.tiles[y * this.mapWidth + x] = new Tile(x, y, 50, 50);
                } else {
                    this.tiles[y * this.mapWidth + x] = null;
                }
            }
        }
        this.checkpoints.push(new Checkpoint(2, 2, 30, 30, 1, "#fe00ab"));
        this.checkpoints.push(new Checkpoint(13, 2, 30, 30, 2, "#aa8877"));
        this.checkpoints.push(new Checkpoint(13, 8.7, 30, 30, 3, "#66efbb"));
    }
    
    reset() {
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].reset();
        }

        this.box.x = 4 * this.box.w;
        this.box.y = 2 * this.box.h;
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

