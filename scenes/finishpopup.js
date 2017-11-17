class FinishPopup extends Popup {
    constructor(closeCallback) {
        super(closeCallback);
    }
    
    update(deltatime) {
        super.update(deltatime);
    }
    
    render(context) {
        if (this.cursor.x >= this.config.mapWidth / 2 - this.width / 2 && this.cursor.x <= this.config.mapWidth / 2 + this.width / 2 
            && this.cursor.y >= this.config.mapHeight / 2 - this.height / 2 && this.cursor.y <= this.config.mapHeight / 2 + this.height / 2) {          
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["finishon"].x, this.atlas.sprites["finishon"].y, this.atlas.sprites["finishon"].width, this.atlas.sprites["finishon"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } else  {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["finishoff"].x, this.atlas.sprites["finishoff"].y, this.atlas.sprites["finishoff"].width, this.atlas.sprites["finishoff"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } 
    }
}


