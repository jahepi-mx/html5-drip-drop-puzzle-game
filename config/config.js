let configInstance = null;

class Config {
            
    constructor() {
        var width = 1000;
        var height = 600;
        var ratio = width / height;
        this.mapWidth = window.screen.availHeight * ratio;
        this.mapHeight = window.screen.availHeight;
        this.sound = true;
        this.musicVolume = 0.4;
        this.soundEffectVolume = 0.6;
        this.debug = false;
        this.showFps = false;
        this.url = "https://games.jahepi.net";
    }
    
    static getInstance() {
        if (configInstance === null) {
            configInstance = new Config();
        }
        return configInstance;
    }
};