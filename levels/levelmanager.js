let levelManagerInstance = null;

class LevelManager {
    
    constructor() {
        this.index = 0;
        this.levels = [new Level1(), new Level2(), new Level3(), new Level4(), new Level5(), new Level6(), new Level7(), new Level8()];
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
    
    length() {
        return this.levels.length;
    }
    
    reset() {
        this.index = 0;
    }
}

