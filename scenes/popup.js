class Popup {
    
    constructor(closeCallback) {
        this.config = Config.getInstance();
        this.cursor = Cursor.getInstance();
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.width = 400 * 1.5;
        this.height = 223 * 1.5;
        this.onClose = closeCallback;
    }
    
    update(deltatime) {
        if (this.cursor.isPressed && this.cursor.x >= this.config.mapWidth / 2 - 100 && this.cursor.x <= this.config.mapWidth / 2 + 100 
            && this.cursor.y >= this.config.mapHeight / 2 + 120 && this.cursor.y <= this.config.mapHeight / 2 + 160) {          
            this.onClose();
        }
    }
    
    render(context) {
        if (this.cursor.x >= this.config.mapWidth / 2 - 100 && this.cursor.x <= this.config.mapWidth / 2 + 100 
            && this.cursor.y >= this.config.mapHeight / 2 + 120 && this.cursor.y <= this.config.mapHeight / 2 + 160) {          
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["completeon"].x, this.atlas.sprites["completeon"].y, this.atlas.sprites["completeon"].width, this.atlas.sprites["completeon"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } else  {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["completeoff"].x, this.atlas.sprites["completeoff"].y, this.atlas.sprites["completeoff"].width, this.atlas.sprites["completeoff"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } 
    }
}


