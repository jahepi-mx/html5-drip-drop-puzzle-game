class FadeTile extends Tile {
    
    constructor(x, y, w, h, fadeTime, stillTime, alpha) {
        super(x, y, w, h, 2);
        this.fadeTime = fadeTime;
        this.stillTime = stillTime;
        this.stillTimeCount = 0;
        this.start = false;
        this.alpha = alpha;
        this.origAlpha = alpha;
        this.dir = 1;
        this.visible = this.alpha === 1;
        this.isDead = false;
        this.animation = new Animation(6, 1);
        this.animation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
        this.isStill = false;
        this.explosiveDrop = false;
        this.blinkTime = 0;
        this.blinkTimeCount = 0;
        this.drops = LevelManager.getInstance().current().drops;
    }
    
    onStopDeadAnimation() {
        this.isStill = true;
        this.animation.reset();
        this.blinkTime = Math.ceil(Math.random() * 3);
    }
    
    update(deltatime) {
        
        if (this.explosiveDrop) {
            this.assets.playAudio(this.assets.torch, false, 0.5);
            for (var b = 0; b < 10; b++) {
                var dropSize = Math.ceil(Math.random() * 3 + 5);
                var drop = new Drop(this.left() + this.w / 2 - dropSize / 2, this.top() + this.h / 2 - dropSize / 2 , dropSize, dropSize, Math.ceil(Math.random() * 10 + 35), "#ff8100");
                drop.collided = true;
                drop.speedX = Math.ceil(Math.random() * 5 + 10)  * (Math.random() < 0.5 ? 1 : -1);
                drop.speedY = -drop.speedY;
                this.drops.push(drop);
            }
            this.explosiveDrop = false;                     
        }
        
        if (this.isDead) return;
        
        if (!this.isStill) {
            this.animation.update(deltatime);
        } else {          
            this.blinkTimeCount += deltatime;
            if (this.blinkTimeCount > this.blinkTime) {
                this.isStill = false;
                this.blinkTimeCount = 0;
            }
        }
        
        if (!this.start && this.stillTimeCount >= this.stillTime) {
            this.start = true;
            if (this.alpha >= 1) {
                this.dir = -1;
                this.visible = false;
            } else {
                this.dir = 1;
                this.visible = true;
            }
        }
        
        if (!this.start) {
            this.stillTimeCount += deltatime;
        }
        
        if (this.start) {           
            var fps = 1 / deltatime;
            var newDelta = 1 / (fps * this.fadeTime);
            this.alpha += newDelta * this.dir;
            if (this.alpha < 0) {
                this.alpha = 0;
                this.start = false;
                this.stillTimeCount = 0;
            }           
            if (this.alpha > 1) {
                this.alpha = 1;
                this.start = false;
                this.stillTimeCount = 0;
            }
        }
    }
    
    render(context) {
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["bg2"].x, this.atlas.sprites["bg2"].y, this.atlas.sprites["bg2"].width, this.atlas.sprites["bg2"].height, this.x, this.y, this.w + 1, this.h + 1);
        if (this.isDead) return;
        context.globalAlpha = this.alpha;
        var frame = "invisible" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        context.globalAlpha = 1;      
    }
    
    reset() {
        this.isDead = false;
        this.explosiveDrop = false;
        this.stillTimeCount = 0;
        this.start = false;
        this.isStill = false;
        this.blinkTime = 0;
        this.blinkTimeCount = 0;
        this.dir = 1;
        this.alpha = this.origAlpha;
        this.visible = this.alpha === 1;
    }
    
    die() {
        this.explosiveDrop = true;
        this.visible = false;
        this.isDead = true;
        this.isStill = false;
        this.blinkTime = 0;
        this.blinkTimeCount = 0;
    }
}


