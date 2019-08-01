class HelpPopup extends Popup {
    constructor(closeCallback, backgroundImage, image) {
        super(closeCallback, backgroundImage);
        this.image = image;
    }
    
    render(context) {
        super.render(context);
        if (this.image !== null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.config.mapWidth / 2 - this.atlas.sprites[this.image].width / 2, this.config.mapHeight / 2  - this.atlas.sprites[this.image].height / 2, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height);
        }
    }
}

