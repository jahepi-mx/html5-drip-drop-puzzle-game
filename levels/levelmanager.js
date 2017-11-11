class LevelManager {
    
    constructor() {
        this.index = 0;
        this.levels = [new Level2(), new Level1()];
    }
    
    next() {
        return this.levels[this.index++];
    }
    
    isFinish() {
        return this.index === this.levels.length;
    }
    
}

