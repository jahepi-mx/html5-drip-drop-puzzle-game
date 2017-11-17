class GameScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.ice = new Ice(0, 0, 30, 30, 0);
        this.levelManager = new LevelManager();
        this.currLevel = this.levelManager.next();
        this.currLevel.init(this.ice);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.drops = [];
        this.time = 0;
        this.fpsLabel = {x: this.config.mapWidth - 20, y: 30, text: "", alpha: 1, font: "40px joystix", color: "#7cfc00"};
        this.timeLabel = {x: 20, y: 30, text: "", alpha: 1, font: "40px joystix", color: "#ffffff"};
        this.music = this.assets.playAudio(this.assets.game, true, 0.2);
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
            if (this.currLevel.checkpoints[a].explosiveDrop) {
                var checkpoint = this.currLevel.checkpoints[a];
                for (var b = 0; b < 10; b++) {
                    var dropSize = Math.ceil(Math.random() * 3 + 5);
                    var drop = new Drop(checkpoint.left() + checkpoint.w / 2 - dropSize / 2, checkpoint.top() + checkpoint.h / 2 - dropSize / 2 , dropSize, dropSize, Math.ceil(Math.random() * 10 + 35), "#ff8100", this.currLevel.tiles);
                    drop.collided = true;
                    drop.speedX = Math.ceil(Math.random() * 5 + 10)  * (Math.random() < 0.5 ? 1 : -1);
                    drop.speedY = -drop.speedY;
                    this.drops.push(drop);
                }
                this.currLevel.checkpoints[a].explosiveDrop = false;                     
            }
        }
        
        if (this.currLevel.isFinish) {
            var width = 400 * 1.5;
            var height = 223 * 1.5;
            if (this.cursor.isPressed && this.cursor.x >= this.config.mapWidth / 2 - width / 2 && this.cursor.x <= this.config.mapWidth / 2 + width / 2
                && this.cursor.y >= this.config.mapHeight / 2 - height / 2 && this.cursor.y <= this.config.mapHeight / 2 + height / 2) {
                this.currLevel = this.levelManager.next();
                this.currLevel.init(this.ice);
                this.drops = [];
            }
            return;
        }
        
        this.time += deltatime;
        
        this.ice.update(deltatime);
            
        if (this.ice.isDisposable) {
            this.currLevel.reset();
            this.drops = [];
        }

        if (this.ice.drop) {
            var drop = new Drop(this.ice.left() + Math.random() * this.ice.w - 5 / 2, this.ice.top(), 5, 5, 10, "#a6d3fd", this.currLevel.tiles);
            this.drops.push(drop);
            this.ice.drop = false;
        }
        
        if (this.ice.explosiveDrop) {
            for (var a = 0; a < 10; a++) {
                var dropSize = Math.ceil(Math.random() * 3 + 5);
                var drop = new Drop(this.ice.left() + this.ice.w / 2 - dropSize / 2, this.ice.top() + this.ice.h / 2 - dropSize / 2 , dropSize, dropSize, Math.ceil(Math.random() * 10 + 5), "#a6d3fd", this.currLevel.tiles);
                drop.collided = true;
                drop.speedY = -drop.speedY;
                this.drops.push(drop);
            }
            this.ice.explosiveDrop = false;
        }
        
        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].update(deltatime);
            if (!this.ice.isDead && this.currLevel.enemies[a].collide(this.ice)) {
                this.ice.die();
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
            
            var width = 400 * 1.5;
            var height = 223 * 1.5;
            var image = "complete";    
            if (this.levelManager.isFinish()) {
                image = "finish";
            }
            if (this.cursor.x >= this.config.mapWidth / 2 - width / 2 && this.cursor.x <= this.config.mapWidth / 2 + width / 2 
                && this.cursor.y >= this.config.mapHeight / 2 - height / 2 && this.cursor.y <= this.config.mapHeight / 2 + height / 2) {          
                image = image + "on";
                context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.config.mapWidth / 2 - width / 2, this.config.mapHeight / 2 - height / 2, width, height);
            } else  {
                image = image + "off";
                context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[image].x, this.atlas.sprites[image].y, this.atlas.sprites[image].width, this.atlas.sprites[image].height, this.config.mapWidth / 2 - width / 2, this.config.mapHeight / 2 - height / 2, width, height);
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
  
    }
}
