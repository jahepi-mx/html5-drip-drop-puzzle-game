class FadeTile extends Tile {
    
    constructor(x, y, w, h, value, fadeTime, stillTime, alpha) {
        super(x, y, w, h, value);
        this.fadeTime = fadeTime;
        this.stillTime = stillTime;
        this.stillTimeCount = 0;
        this.start = false;
        this.alpha = alpha;
        this.dir = 1;
        this.visible = this.alpha === 1;
    }
    
    update(deltatime) {
        
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
        context.globalAlpha = this.alpha;
        context.drawImage(assets.spritesAtlas, atlas.sprites["wall"].x, atlas.sprites["wall"].y, atlas.sprites["wall"].width, atlas.sprites["wall"].height, this.x, this.y, this.w + 1, this.h + 1);
        context.globalAlpha = 1;
    }
}


