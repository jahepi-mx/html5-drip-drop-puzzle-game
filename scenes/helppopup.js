class HelpPopup extends Popup {
    constructor(closeCallback, backgroundImage, image) {
        super(closeCallback, backgroundImage);
        this.image = image;
    }
    
    render(context) {
        super.render(context);
        if (this.image !== null) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.image].x, this.atlas.sprites[this.image].y, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height, 255, 170, this.atlas.sprites[this.image].width, this.atlas.sprites[this.image].height);
        }
    }
}

