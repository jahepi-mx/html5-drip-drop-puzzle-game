class MainScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        var config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.playBtn = {x: config.mapWidth / 2, y: config.mapHeight - 50, width: config.mapWidth * 0.3, height: config.mapHeight * 0.2, text: "play game", alpha: 1, font: "35px joystix"};

        var topText = 30;
        this.texts = [
            {x: config.mapWidth / 2, y: topText, text: "how to play", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 0},
            {x: config.mapWidth / 2, y: topText + 30, text: "Grab the ice cube with the mouse click,", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 60, text: "there are torchs with a labeled number,", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 90, text: "put out the fire from the torchs using", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 120, text: "the ice drops, it has to be in order", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 150, text: "(from torch 1 to n), avoid the ice touching", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 180, text: "any walls or enemies to pass", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
            {x: config.mapWidth / 2, y: topText + 210, text: "to the next level.", alpha: 1, font: "35px joystix", r: 255, g: 0, b: 100},
        ];
    }
    
    update(deltatime) {
        if (this.cursor.isPressed && this.cursor.x >= this.playBtn.x - this.playBtn.width / 2 && this.cursor.x <= this.playBtn.x + this.playBtn.width / 2 
                && this.cursor.y >= this.playBtn.y - this.playBtn.height / 2 && this.cursor.y <= this.playBtn.y + this.playBtn.height / 2) {
            this.onChangeSceneCallback("game");
        }
    } 
    
    render(context) {
        
        for (var a = 0; a < this.texts.length; a++) {
            context.font = this.texts[a].font;
            context.fillStyle = "rgba(" + this.texts[a].r + ", " + this.texts[a].g +", " + this.texts[a].b + ", " + this.texts[a].alpha; + ")";
            context.textAlign = "center";
            context.fillText(this.texts[a].text, this.texts[a].x, this.texts[a].y);  
        }
        
        if (this.cursor.x >= this.playBtn.x - this.playBtn.width / 2 && this.cursor.x <= this.playBtn.x + this.playBtn.width / 2 
                && this.cursor.y >= this.playBtn.y - this.playBtn.height / 2 && this.cursor.y <= this.playBtn.y + this.playBtn.height / 2) {          
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 0, 0, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x , this.playBtn.y);          
        } else  {
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 0, 255, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x, this.playBtn.y);
        }
    }
};


