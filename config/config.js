let configInstance = null;

class Config {
            
    constructor() {
        this.mapWidth = 500;
        this.mapHeight = 350;
        this.debug = false;
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    }
};