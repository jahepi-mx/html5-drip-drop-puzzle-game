let levelManagerInstance = null;

class LevelManager {
    
    constructor() {
        this.index = 0;
        this.levels = [new Level1(), new Level2(), new Level3(), new Level4(), new Level5()];
    }
    
    static created() {
        return levelManagerInstance !== null;
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
    
    reset() {
        this.index = 0;
    }
}

