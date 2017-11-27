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
        this.playBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 270, width: 100, height: 40, text: "play game", alpha: 1, font: "35px joystix"};
        this.leaderboardBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 220, width: 150, height: 40, text: "leaderboard", alpha: 1, font: "35px joystix"};
        this.soundBtn = {x: this.config.mapWidth - 80, y:  10, width: 32, height: 32};
        this.soundCount = 0;
        this.soundCountLimit = 1;
        this.catchClickEvent = false;
        this.music = null;
        if (this.config.sound) {
            this.music = this.assets.playAudio(this.assets.main, true, 0.2);
        }
       
        this.map = [14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,
             14,14,14,14,14,14,14,14,14,14,15,14,14,14,14,14,14,14,15,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
             14,14,15,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,15,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,15,14,14,14,14,
             14,14,15,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,15,14,15,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
             14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
             14,14,14,15,14,14,14,15,14,14,14,14,14,14,14,14,14,14,14,14,14,
             14,14,14,14,14,14,14,14,14,14,14,14,14,15,14,14,14,14,14,15,14];

        this.tiles = [];
        var width = 21;
        var height = 12;
        var tileWidth = this.config.mapWidth / 21;
        var tileHeight = this.config.mapHeight / 12;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (this.map[y * width + x] >= 6 && this.map[y * width + x] <= 45) {
                     this.tiles[y * width + x] = new Tile(x, y, tileWidth, tileHeight, this.map[y * width + x], false, "tiles" + this.map[y * width + x], "bg1");
                 } else {
                     this.tiles[y * width + x] = new Tile(x, y, tileWidth, tileHeight, this.map[y * width + x], true, "bg" + this.map[y * width + x], null);
                 }
            }
        }
        this.checkpoints = [];
        this.checkpoints.push(new Checkpoint(7, 9, tileWidth, tileHeight, 1));
        this.checkpoints.push(new Checkpoint(9, 9, tileWidth, tileHeight, 2));
        this.checkpoints.push(new Checkpoint(11, 9, tileWidth, tileHeight, 3));
        this.checkpoints.push(new Checkpoint(13, 9, tileWidth, tileHeight, 4));
    }
    
    update(deltatime) {
        
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].update(deltatime);
        }
        
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
        for (var a = 0; a < this.tiles.length; a++) {
            this.tiles[a].render(context);
        }
        
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].render(context);
        }
        
        context.font = "65px joystix";
        context.fillStyle = "rgba(255, 255, 255, 255)";
        context.textAlign = "center";
        context.fillText("labyrinth", this.config.mapWidth / 2, 200);  
        
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


