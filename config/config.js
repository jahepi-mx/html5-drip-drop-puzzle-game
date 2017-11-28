let configInstance = null;

class Config {
            
    constructor() {
        this.mapWidth = 1000;
        this.mapHeight = 600;
        this.sound = true;
        this.musicVolume = 0.4;
        this.soundEffectVolume = 0.6;
        this.debug = false;
        this.url = "http://games.jahepi.net";
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    }
};