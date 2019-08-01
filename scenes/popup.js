class Popup {
    
    constructor(closeCallback, backgroundImage) {
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.width = this.config.getWidthByResolution(400) * 1.5;
        this.height = this.config.getHeightByResolution(223) * 1.5;
        this.onClose = closeCallback;
        this.backgroundImage = backgroundImage;
        this.isClosed = false;
    }
    
    update(deltatime) {
        if (this.cursor.isPressed && this.cursor.x >= this.config.mapWidth / 2 - this.config.getWidthByResolution(100) && this.cursor.x <= this.config.mapWidth / 2 + this.config.getWidthByResolution(100) 
            && this.cursor.y >= this.config.mapHeight / 2 + this.config.getHeightByResolution(120) && this.cursor.y <= this.config.mapHeight / 2 + this.config.getHeightByResolution(160)) {          
            this.isClosed = true;
            if (this.onClose !== null) {
                this.onClose();
            }
        }
    }
    
    render(context) {
        if (this.cursor.x >= this.config.mapWidth / 2 - this.config.getWidthByResolution(100) && this.cursor.x <= this.config.mapWidth / 2 + this.config.getWidthByResolution(100) 
            && this.cursor.y >= this.config.mapHeight / 2 + this.config.getHeightByResolution(120) && this.cursor.y <= this.config.mapHeight / 2 + this.config.getHeightByResolution(160)) {          
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.backgroundImage + "on"].x, this.atlas.sprites[this.backgroundImage + "on"].y, this.atlas.sprites[this.backgroundImage + "on"].width, this.atlas.sprites[this.backgroundImage + "on"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } else  {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.backgroundImage + "off"].x, this.atlas.sprites[this.backgroundImage + "off"].y, this.atlas.sprites[this.backgroundImage + "off"].width, this.atlas.sprites[this.backgroundImage + "off"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } 
    }
}


