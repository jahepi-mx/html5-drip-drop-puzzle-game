let configInstance = null;

class Config {
            
    constructor() {
        this.width = 1000;
        this.height = 600;
        this.screenRatio = this.width / this.height;
        this.mapWidth = window.screen.availHeight * this.screenRatio;
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

    getWidthByResolution(w) {
        return w / this.width * this.mapWidth;
    }

    getHeightByResolution(h) {
        return h / this.height * this.mapHeight;
    }
};