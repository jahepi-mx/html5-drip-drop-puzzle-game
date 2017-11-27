class LeaderBoardScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.assets = Assets.getInstance();
        this.atlas = Atlas.getInstance();
        this.hand = new Hand(0, 0, 32, 32);
        this.isLoading = true;
        this.errorLoading = false;
        this.leaderBoardData = [];
        this.soundCount = 0;
        this.soundCountLimit = 1;
        this.catchEventClick = false;
        this.backBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 120, width: 100, height: 50, text: "Back", alpha: 1};
        this.soundBtn = {x: this.config.mapWidth - 80, y:  10, width: 32, height: 32};
        this.music = null;
        if (this.config.sound) {
            this.music = this.assets.playAudio(this.assets.main, true, 0.2);
        }
        
        this.map = [14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,
            14,14,14,14,14,14,14,14,14,14,15,14,14,14,14,14,14,14,15,14,14,
            14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
            14,14,15,14,14,1,1,1,1,1,1,1,1,1,1,1,14,14,14,14,14,
            14,14,14,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,15,14,14,
            14,14,14,14,14,1,1,1,1,1,1,1,1,1,1,1,15,14,14,14,14,
            14,14,15,14,14,14,1,1,1,1,1,1,1,1,1,14,14,14,14,14,14,
            14,14,14,14,14,1,1,1,1,1,1,1,1,1,1,1,15,14,15,14,14,
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
        this.checkpoints.push(new Checkpoint(5, 3, tileWidth, tileHeight, 1));
        this.checkpoints.push(new Checkpoint(5, 5, tileWidth, tileHeight, 2));
        this.checkpoints.push(new Checkpoint(5, 7, tileWidth, tileHeight, 3));
        this.checkpoints.push(new Checkpoint(15, 3, tileWidth, tileHeight, 4));
        this.checkpoints.push(new Checkpoint(15, 5, tileWidth, tileHeight, 5));
        this.checkpoints.push(new Checkpoint(15, 7, tileWidth, tileHeight, 6));
        
        this.loadJSON();
    }
    
    update(deltatime) {
        
        for (var a = 0; a < this.checkpoints.length; a++) {
            this.checkpoints[a].update(deltatime);
        }
        
        this.soundCount += deltatime;
        if (this.soundCount >= this.soundCountLimit) {
            this.catchEventClick = true;
        }
        if (this.catchEventClick && this.cursor.isPressed && this.cursor.x >= this.backBtn.x - this.backBtn.width / 2 && this.cursor.x <= this.backBtn.x + this.backBtn.width / 2 
            && this.cursor.y >= this.backBtn.y - this.backBtn.height / 2  && this.cursor.y <= this.backBtn.y + this.backBtn.height / 2) { 
            if (this.music !== null && this.config.sound) {
                this.music.stop();
            }
            this.onChangeSceneCallback("main");    
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
        
        context.font = "30px joystix";
        context.fillStyle = "white";
        context.textAlign = "center";

        if (this.isLoading) {
            context.fillText("loading leaderboard data...", this.config.mapWidth / 2, this.config.mapHeight / 2);
        } else {
            if (this.errorLoading) {
                context.fillText("could not retrieve leaderboard data.", this.config.mapWidth / 2, this.config.mapHeight / 2);
            } else {
                if (this.leaderBoardData.length > 0) {

                    context.font = "40px joystix";
                    context.fillText("top 10", this.config.mapWidth / 2, 130);
                    var yStart = 170;
                    for (var i = 0; i < this.leaderBoardData.length; i++) {
                        context.font = "30px joystix";
                        context.fillStyle = 'red';
                        context.textAlign = "left";
                        context.fillText(this.leaderBoardData[i].name, 400, yStart);

                        var time = this.leaderBoardData[i].time;
                        var hours = Math.floor(time / 3600);
                        time %= 3600;
                        var minutes = Math.floor(time / 60);
                        var seconds = Math.floor(time % 60);
                        context.fillStyle = 'white';
                        context.fillText((hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds), this.config.mapWidth - 470, yStart);
                        yStart += 30;
                    }                
                } else {
                    context.fillText("no data found.", this.config.mapWidth / 2, this.config.mapHeight / 2);
                }
            }
        }
        
        if (this.cursor.x >= this.backBtn.x - this.backBtn.width / 2 && this.cursor.x <= this.backBtn.x + this.backBtn.width / 2 
            && this.cursor.y >= this.backBtn.y - this.backBtn.height / 2  && this.cursor.y <= this.backBtn.y + this.backBtn.height / 2) {          
            context.font = "35px joystix";
            context.fillStyle = 'white';
            context.textAlign = "center";
            context.fillText(this.backBtn.text, this.backBtn.x, this.backBtn.y);
        } else  {
            context.font = "35px joystix";
            context.fillStyle = '#ffa500';
            context.textAlign = "center";
            context.fillText(this.backBtn.text, this.backBtn.x, this.backBtn.y);
        } 
        
        if (this.config.sound) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundon"].x, this.atlas.sprites["soundon"].y, this.atlas.sprites["soundon"].width, this.atlas.sprites["soundon"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        } else {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundoff"].x, this.atlas.sprites["soundoff"].y, this.atlas.sprites["soundoff"].width, this.atlas.sprites["soundoff"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        }
        
        this.hand.render(context);
    }
    
    loadJSON() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function() {
            self.isLoading = false;
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var object = JSON.parse(xhr.responseText);
                    self.leaderBoardData = object.times; 
                } else {
                    self.errorLoading = true;
                }
            }
        };
        xhr.open("GET", this.config.url + "/labyrinth/php/get.php", true);
        xhr.send();
    }
}


