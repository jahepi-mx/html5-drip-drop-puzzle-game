class HelpPopup extends Popup {
    constructor(closeCallback, backgroundImage, image) {
        super(closeCallback, backgroundImage, image);
        this.image = image;
    }
    
    render(context) {
        super.render(context);
    }
}

