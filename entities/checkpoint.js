class Checkpoint extends Entity {
            
    constructor(x, y, w, h, id, color) {
        super(x, y, w, h);
        this.id = id;
        this.color = color;
        this.collided = false;
    }

    render(context) {

        if (this.collided) {
            context.fillStyle = "#ff0000";
            context.fillRect(this.x, this.y, this.w, this.h);
        } else {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.w, this.h);
        }
        
        context.font = "50px joystix";
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.fillText(this.id, this.x + 20, this.y + 25);
    }
    
    reset() {
        this.collided = false;
    }
};
