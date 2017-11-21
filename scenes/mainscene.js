class MainScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.assets = Assets.getInstance();
        this.atlas = Atlas.getInstance();
        this.hand = new Hand(0, 0, 32, 32);
        this.blinkTime = 0.1;
        this.blinkTimeCount = 0;
        this.blink = 0;
        this.playBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 70, width: 100, height: 40, text: "play game", alpha: 1, font: "35px joystix"};
        this.leaderboardBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 30, width: 150, height: 40, text: "leaderboard", alpha: 1, font: "35px joystix"};
        this.soundBtn = {x: this.config.mapWidth - 80, y:  10, width: 32, height: 32};
        this.soundCount = 0;
        this.soundCountLimit = 1;
        this.catchClickEvent = false;
        this.music = null;
        if (this.config.sound) {
            this.music = this.assets.playAudio(this.assets.main, true, 0.2);
        }
        
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
        
        if (this.catchEventClick && this.cursor.isPressed && this.cursor.x >= this.leaderboardBtn.x - this.leaderboardBtn.width / 2 && this.cursor.x <= this.leaderboardBtn.x + this.leaderboardBtn.width / 2 
            && this.cursor.y >= this.leaderboardBtn.y - this.leaderboardBtn.height / 2 && this.cursor.y <= this.leaderboardBtn.y + this.leaderboardBtn.height / 2) {                     
            if (this.music !== null && this.config.sound) {
                this.music.stop();
            }
            this.onChangeSceneCallback("leaderboard");
        }
        
        this.blinkTimeCount += deltatime;
        if (this.catchEventClick && this.cursor.isPressed && this.cursor.x >= this.playBtn.x - this.playBtn.width / 2 && this.cursor.x <= this.playBtn.x + this.playBtn.width / 2 
                && this.cursor.y >= this.playBtn.y - this.playBtn.height / 2 && this.cursor.y <= this.playBtn.y + this.playBtn.height / 2) {
            if (this.music !== null&& this.config.sound) {
                this.music.stop();
            }
            this.onChangeSceneCallback("game");
        }
        this.soundCount += deltatime;
        if (this.soundCount >= this.soundCountLimit) {
            this.catchEventClick = true;
        }
        if (this.cursor.isPressed && this.cursor.x >= this.soundBtn.x && this.cursor.x <= this.soundBtn.x + this.soundBtn.width
                && this.cursor.y >= this.soundBtn.y && this.cursor.y <= this.soundBtn.y + this.soundBtn.height) {
            if (this.soundCount >= this.soundCountLimit) {
                if (this.config.sound) {
                    this.config.sound = false;
                    this.music.stop();
                } else {
                    this.config.sound = true;
                    this.music = this.assets.playAudio(this.assets.main, true, 0.2);
                }
                this.soundCount = 0;
            }
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
        
        if (this.blinkTimeCount >= this.blinkTime) {
            this.blink ^= 1;
            this.blinkTimeCount = 0;    
        }
        
        if (this.blink === 1) {
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 0, 0, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x , this.playBtn.y);
        } else {
            context.font = this.playBtn.font;
            context.fillStyle = "rgba(255, 255, 255, " + this.playBtn.alpha + ")";
            context.textAlign = "center";
            context.fillText(this.playBtn.text, this.playBtn.x, this.playBtn.y);
        }
        
        if (this.cursor.x >= this.leaderboardBtn.x - this.leaderboardBtn.width / 2 && this.cursor.x <= this.leaderboardBtn.x + this.leaderboardBtn.width / 2 
            && this.cursor.y >= this.leaderboardBtn.y - this.leaderboardBtn.height / 2 && this.cursor.y <= this.leaderboardBtn.y + this.leaderboardBtn.height / 2) {          
            context.font = this.leaderboardBtn.font;
            context.fillStyle = 'white';
            context.textAlign = "center";
            context.fillText(this.leaderboardBtn.text, this.leaderboardBtn.x, this.leaderboardBtn.y);
        } else  {
            context.font = this.leaderboardBtn.font;
            context.fillStyle = 'orange';
            context.textAlign = "center";
            context.fillText(this.leaderboardBtn.text, this.leaderboardBtn.x, this.leaderboardBtn.y);
        } 
        
        if (this.config.sound) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundon"].x, this.atlas.sprites["soundon"].y, this.atlas.sprites["soundon"].width, this.atlas.sprites["soundon"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        } else {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundoff"].x, this.atlas.sprites["soundoff"].y, this.atlas.sprites["soundoff"].width, this.atlas.sprites["soundoff"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        }
        
        this.hand.render(context);
    }
};


