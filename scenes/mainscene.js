class MainScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.assets = Assets.getInstance();
        this.atlas = Atlas.getInstance();
        this.blinkTime = 0.1;
        this.blinkTimeCount = 0;
        this.playBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 50, width: this.config.mapWidth * 0.3, height: this.config.mapHeight * 0.2, text: "play game", alpha: 1, font: "35px joystix"};

        var topText = 80;
        this.texts = [
            {x: this.config.mapWidth / 2, y: topText, text: "Labyrinth Challenge", alpha: 1, font: "65px joystix", r: 0, g: 0, b: 0},
            {x: this.config.mapWidth / 2, y: topText + 60, text: "how to play", alpha: 1, font: "55px joystix", r: 216, g: 255, b: 0},
            {x: this.config.mapWidth / 2, y: topText + 110, text: "Grab the ice cube with", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 145, text: "the mouse, there are torchs", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 180, text: "with a labeled number, put out", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 215, text: "the fire from the torchs", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 250, text: "using the ice drops, it has", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 285, text: "to be in order (from torch 1 to n),", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 320, text: "avoid the ice touching any", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 355, text: "walls or enemies to pass", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
            {x: this.config.mapWidth / 2, y: topText + 390, text: "to the next level.", alpha: 1, font: "40px joystix", r: 255, g: 255, b: 255},
        ];
    }
    
    update(deltatime) {
        this.blinkTimeCount += deltatime;
        if (this.cursor.isPressed && this.cursor.x >= this.playBtn.x - this.playBtn.width / 2 && this.cursor.x <= this.playBtn.x + this.playBtn.width / 2 
                && this.cursor.y >= this.playBtn.y - this.playBtn.height / 2 && this.cursor.y <= this.playBtn.y + this.playBtn.height / 2) {
            this.onChangeSceneCallback("game");
        }
    } 
    
    render(context) {
        
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["main1"].x, this.atlas.sprites["main1"].y, this.atlas.sprites["main1"].width, this.atlas.sprites["main1"].height, this.config.mapWidth / 2 - this.config.mapHeight / 2, this.config.mapHeight / 2 - this.config.mapHeight / 2, this.config.mapHeight, this.config.mapHeight);
        
        for (var a = 0; a < this.texts.length; a++) {
            context.font = this.texts[a].font;
            context.fillStyle = "rgba(" + this.texts[a].r + ", " + this.texts[a].g +", " + this.texts[a].b + ", " + this.texts[a].alpha; + ")";
            context.textAlign = "center";
            context.fillText(this.texts[a].text, this.texts[a].x, this.texts[a].y);  
        }
        
        if (this.blinkTimeCount < this.blinkTime) {
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 0, 0, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x , this.playBtn.y); 
        } else {
            if (this.blinkTimeCount > this.blinkTime * 2) {
                this.blinkTimeCount = 0;
            }
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 255, 255, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x, this.playBtn.y);
        }
    }
};


