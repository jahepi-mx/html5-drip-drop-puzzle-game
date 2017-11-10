class GameScene extends Scene {
    constructor() {
        super();
        this.ice = new Ice(0, 0, 30, 30, 0);
        this.currLevel = new Level1(this.ice);
        this.drops = [];
    }
    
    update(deltatime) {
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
        
        for (var a = 0; a < this.currLevel.enemies.length; a++) {
            this.currLevel.enemies[a].update(deltatime);
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
    }
}
