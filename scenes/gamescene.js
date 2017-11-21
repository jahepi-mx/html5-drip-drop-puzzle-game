class GameScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.ice = new Ice(0, 0, 30, 30, 0);
        if (LevelManager.created()) {
            LevelManager.getInstance().reset();
        }
        this.levelManager = LevelManager.getInstance();
        this.currLevel = this.levelManager.next();
        this.currLevel.init(this.ice);
        this.hand = new Hand(0, 0, 32, 32);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.drops = this.currLevel.drops;
        this.time = 0;
        this.fpsLabel = {x: this.config.mapWidth - 20, y: 30, text: "", alpha: 1, font: "40px joystix", color: "#7cfc00"};
        this.soundBtn = {x: this.config.mapWidth - 80, y:  10, width: 32, height: 32};
        this.timeLabel = {x: 20, y: 30, text: "", alpha: 1, font: "40px joystix", color: "#ffffff"};
        this.music = null;
        this.soundCount = 0;
        this.soundCountLimit = 1;
        this.completePopup = new Popup(this.onCloseCompletePopup.bind(this));
        this.finishPopup = new FinishPopup(this.onCloseFinishPopup.bind(this));
        if (this.config.sound) {
            this.music = this.assets.playAudio(this.assets.game, true, 0.2);
        }
    }
    
    onCloseCompletePopup() {
        this.currLevel.dispose();
        this.currLevel = this.levelManager.next();
        this.currLevel.init(this.ice);
        this.drops = this.currLevel.drops;
    }
    
    onCloseFinishPopup() {
        this.currLevel.dispose();
        if (this.music !== null && this.config.sound) {
            this.music.stop();
        }
        this.onChangeSceneCallback("leaderboard");
    }
    
    update(deltatime) {
        
        this.fpsLabel.text = Math.floor(1 / deltatime);
        
        for (var a = 0; a < this.drops.length; a++) {
            if (this.drops[a].isDisposable) {
                this.drops[a] = null;
                this.drops.splice(a, 1);
            } else {
                this.drops[a].update(deltatime);
                
                for (var b = 0; b < this.currLevel.checkpoints.length; b++) {
                    if (!this.currLevel.checkpoints[b].collided 
                            && this.currLevel.checkpoints[b].collide(this.drops[a])) {                   
                        if (this.currLevel.reachCheckpoint(this.currLevel.checkpoints[b])) {
                            this.currLevel.checkpoints[b].collided = true;
                            this.currLevel.checkpoints[b].explosiveDrop = true;
                        }
                    }
                }
            }
        }
        
        for (var a = 0; a < this.currLevel.checkpoints.length; a++) {
            this.currLevel.checkpoints[a].update(deltatime);
        }
        
        this.soundCount += deltatime;       
        if (this.cursor.isPressed && this.cursor.x >= this.soundBtn.x && this.cursor.x <= this.soundBtn.x + this.soundBtn.width
                && this.cursor.y >= this.soundBtn.y && this.cursor.y <= this.soundBtn.y + this.soundBtn.height) {
            if (this.soundCount >= this.soundCountLimit) {
                if (this.config.sound) {
                    this.config.sound = false;
                    this.music.stop();
                } else {
                    this.config.sound = true;
                    this.music = this.assets.playAudio(this.assets.game, true, 0.2);
                }
                this.soundCount = 0;
            }
        }
        
        if (this.currLevel.isFinish) {
            if (this.levelManager.isFinish()) {
                this.finishPopup.update(deltatime);
                this.finishPopup.time = this.time;
            } else {
                this.completePopup.update(deltatime);
            } 
            return;
        }
        
        this.time += deltatime;
        
        this.ice.update(deltatime);
            
        if (this.ice.isDisposable) {
            this.currLevel.reset();
            //this.drops = this.currLevel.drops;
        }

        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].update(deltatime);
            if (!this.ice.isDead && !this.currLevel.enemies[a].isDead && this.currLevel.enemies[a].collide(this.ice) && !this.ice.godMode) {
                this.ice.die();
            } else if (!this.ice.isDead && !this.currLevel.enemies[a].isDead && this.currLevel.enemies[a].collide(this.ice) && this.ice.godMode) {
                this.currLevel.enemies[a].die();
            }
        }
        
        for (let tile of this.currLevel.fadeTiles) {
            if (tile !== undefined) {
                tile.update(deltatime);
            }
        }
        
        var time = Math.floor(this.time);
        var seconds = Math.floor(time % 60);
        var minutes = Math.floor(time / 60);
        var hours = Math.floor(minutes / 60);
        var minutesRemain = Math.floor(minutes % 60);     
        this.timeLabel.text = "time: " + (hours < 10 ? "0" + hours : hours) + ":" + (minutesRemain < 10 ? "0" + minutesRemain : minutesRemain) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
    
    render(context) {
        
        for (var a = 0; a < this.currLevel.tiles.length; a++) {
            if (this.currLevel.tiles[a] !== null) {
                this.currLevel.tiles[a].render(context);
            }
        }
        
        for (var a = 0; a < this.currLevel.checkpoints.length; a++) {
            this.currLevel.checkpoints[a].render(context);
        }

        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].render(context);
        }

        this.ice.render(context);
        
        for (var a = 0; a < this.drops.length; a++) {
            this.drops[a].render(context);
        }
        
        if (this.currLevel.isFinish) { 
            if (this.levelManager.isFinish()) {
                this.finishPopup.render(context);
            } else {
                this.completePopup.render(context);
            }      
        }
        
        context.font = this.fpsLabel.font;
        context.fillStyle = this.fpsLabel.color;
        context.textAlign = "center";
        context.fillText(this.fpsLabel.text, this.fpsLabel.x , this.fpsLabel.y); 
        
        context.font = this.timeLabel.font;
        context.fillStyle = this.timeLabel.color;
        context.textAlign = "left";
        context.fillText(this.timeLabel.text, this.timeLabel.x , this.timeLabel.y);
        
        if (this.config.sound) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundon"].x, this.atlas.sprites["soundon"].y, this.atlas.sprites["soundon"].width, this.atlas.sprites["soundon"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        } else {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["soundoff"].x, this.atlas.sprites["soundoff"].y, this.atlas.sprites["soundoff"].width, this.atlas.sprites["soundoff"].height, this.soundBtn.x, this.soundBtn.y, this.soundBtn.width, this.soundBtn.height);
        }
        
        this.hand.render(context);
    }
}
