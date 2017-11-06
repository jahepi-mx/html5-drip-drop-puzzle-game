class Checkpoint extends Entity {
            
    constructor(x, y, w, h, id, color, tileSize) {
        super(x, y, w, h);
        
        this.x = x * tileSize + tileSize / 2 - this.w / 2;
        this.y = y * tileSize + tileSize / 2 -  this.h / 2;
        
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
