let levelManagerInstance = null;

class LevelManager {
    
    constructor() {
        this.index = 0;
        //this.levels = [new Level2()];
        this.levels = [new Level2(), new Level1()];
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
        //this.levels = [new Level2()];
        this.levels = [new Level2(), new Level1()];
    }
}

