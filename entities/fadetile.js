class FadeTile extends Tile {
    
    constructor(x, y, w, h, fadeTime, stillTime, alpha) {
        super(x, y, w, h, 2);
        this.fadeTime = fadeTime;
        this.stillTime = stillTime;
        this.stillTimeCount = 0;
        this.start = false;
        this.alpha = alpha;
        this.dir = 1;
        this.visible = this.alpha === 1;
        this.animation = new Animation(6, 1);
        this.animation.stopAtSequenceNumber(1, this.onStopDeadAnimation.bind(this));
        this.isStill = false;
        this.blinkTime = 0;
        this.blinkTimeCount = 0;
    }
    
    onStopDeadAnimation() {
        this.isStill = true;
        this.animation.reset();
        this.blinkTime = Math.ceil(Math.random() * 3);
    }
    
    update(deltatime) {
        
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
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        context.drawImage(assets.spritesAtlas, atlas.sprites["bg2"].x, atlas.sprites["bg2"].y, atlas.sprites["bg2"].width, atlas.sprites["bg2"].height, this.x, this.y, this.w + 1, this.h + 1);
        context.globalAlpha = this.alpha;
        var frame = "invisible" + (this.animation.getFrame() + 1);
        context.drawImage(assets.spritesAtlas, atlas.sprites[frame].x, atlas.sprites[frame].y, atlas.sprites[frame].width, atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
        context.globalAlpha = 1;      
    }
}


