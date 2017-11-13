class GameScene extends Scene {
    
    constructor(onChangeSceneCallback) {
        super(onChangeSceneCallback);
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.ice = new Ice(0, 0, 30, 30, 0);
        this.levelManager = new LevelManager();
        this.currLevel = this.levelManager.next();
        this.currLevel.init(this.ice);
        this.drops = [];
        this.nextBtn = {x: this.config.mapWidth / 2, y: this.config.mapHeight - 50, width: this.config.mapWidth * 0.3, height: this.config.mapHeight * 0.1, text: "Next Level", alpha: 1, font: "35px joystix"};
        this.fpsLabel = {x: this.config.mapWidth - 20, y: 30, text: "", alpha: 1, font: "40px joystix", color: "#7cfc00"};
    }
    
    update(deltatime) {
        
        this.fpsLabel.text = Math.floor(1 / deltatime);
        
        if (this.currLevel.isFinish) {
            if (this.cursor.isPressed && this.cursor.x >= this.nextBtn.x - this.nextBtn.width / 2 && this.cursor.x <= this.nextBtn.x + this.nextBtn.width / 2 
                && this.cursor.y >= this.nextBtn.y - this.nextBtn.height / 2 && this.cursor.y <= this.nextBtn.y + this.nextBtn.height / 2) {
                this.currLevel = this.levelManager.next();
                this.currLevel.init(this.ice);
                this.drops = [];
            }
            return;
        }
        
        this.ice.update(deltatime);
            
        if (this.ice.collided) {
            this.currLevel.reset();
        }

        if (this.ice.drop) {
            var drop = new Drop(this.ice.left() + Math.random() * this.ice.w, this.ice.top(), 5, 5, 10, this.currLevel.tiles);
            this.drops.push(drop);
            this.ice.drop = false;
        }

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
                        }
                    }
                }
            }
        }
        
        for (var a = 0; a < this.currLevel.checkpoints.length; a++) {
            this.currLevel.checkpoints[a].update(deltatime);
        }
        
        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].update(deltatime);
        }
        
        for (let tile of this.currLevel.fadeTiles) {
            if (tile !== undefined) {
                tile.update(deltatime);
            }
        }
    }
    
    render(context) {
        
        for (var a = 0; a < this.currLevel.tiles.length; a++) {
            if (this.currLevel.tiles[a] !== null) {
                this.currLevel.tiles[a].render(context);
            }
        }

        for (var a = 0; a < this.drops.length; a++) {
            this.drops[a].render(context);
        }

        for (var a = 0; a < this.currLevel.checkpoints.length; a++) {
            this.currLevel.checkpoints[a].render(context);
        }

        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].render(context);
        }

        this.ice.render(context);
        
        if (this.currLevel.isFinish) {
            
            if (this.levelManager.isFinish()) {
                context.textAlign = "center";
                context.font = "50px joystix";
                context.strokeStyle = '#af550b';
                context.lineWidth = 30;
                context.strokeText("You made it through the end!", this.config.mapWidth / 2, this.config.mapHeight / 2);
                context.fillStyle = '#e3af48';
                context.fillText("You made it through the end!", this.config.mapWidth / 2, this.config.mapHeight / 2);
            } else {
                
                context.textAlign = "center";
                context.font = "50px joystix";
                context.strokeStyle = '#af550b';
                context.lineWidth = 30;
                context.strokeText("completed", this.config.mapWidth / 2, this.config.mapHeight / 2);
                context.fillStyle = '#e3af48';
                context.fillText("completed", this.config.mapWidth / 2, this.config.mapHeight / 2);
                
                if (this.cursor.x >= this.nextBtn.x - this.nextBtn.width / 2 && this.cursor.x <= this.nextBtn.x + this.nextBtn.width / 2 
                    && this.cursor.y >= this.nextBtn.y - this.nextBtn.height / 2 && this.cursor.y <= this.nextBtn.y + this.nextBtn.height / 2) {          
                    context.font = this.nextBtn.font;
                    context.fillStyle = "rgba(255, 0, 0, " + this.nextBtn.alpha + ")";
                    context.textAlign = "center";
                    context.fillText(this.nextBtn.text, this.nextBtn.x , this.nextBtn.y);          
                } else  {
                    context.font = this.nextBtn.font;
                    context.fillStyle = "rgba(255, 0, 255, " + this.nextBtn.alpha + ")";
                    context.textAlign = "center";
                    context.fillText(this.nextBtn.text, this.nextBtn.x, this.nextBtn.y);
                }              
            }
        }
        
        context.font = this.fpsLabel.font;
        context.fillStyle = this.fpsLabel.color;
        context.textAlign = "center";
        context.fillText(this.fpsLabel.text, this.fpsLabel.x , this.fpsLabel.y); 
    }
}
