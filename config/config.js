let configInstance = null;

class Config {
            
    constructor() {
        this.mapWidth = 1000;
        this.mapHeight = 750;
        this.debug = false;
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    }
};