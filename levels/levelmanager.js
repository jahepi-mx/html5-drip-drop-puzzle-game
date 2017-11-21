let levelManagerInstance = null;

class LevelManager {
    
    constructor() {
        this.index = 0;
        //this.levels = [new Level2()];
        this.levels = [new Level1(), new Level2()];
    }
    
    static getInstance() {
        if (levelManagerInstance === null) {
            levelManagerInstance = new LevelManager();
        }
        return levelManagerInstance;
    }
    
    current() {
        return this.levels[this.index - 1];
    }
    
    next() {
        return this.levels[this.index++];
    }
    
    isFinish() {
        return this.index === this.levels.length;
    }
    
}

