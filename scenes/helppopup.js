class HelpPopup extends Popup {
    constructor(closeCallback, backgroundImage, image) {
        super(closeCallback, backgroundImage);
        this.image = image;
    }
    
    render(context) {
        super.render(context);
        if (this.image !== null) {
            var ratio = this.atlas.sprites[this.image].width / this.atlas.sprites[this.image].height;
            var width = this.config.mapWidth * 0.2 * ratio;
            var height = this.config.mapWidth * 0.2;
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, this.config.mapWidth / 2 - width / 2, this.config.mapHeight / 2  - height / 2 - this.config.getHeightByResolution(30), width, height);
        }
    }
}

