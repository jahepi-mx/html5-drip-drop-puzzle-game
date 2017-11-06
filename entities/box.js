class Box extends Entity {
            
    constructor(x, y, w, h, speed) {
        super(x, y, w, h);
        this.oldX = 0;
        this.oldY = 0;
        this.speedX = speed;
        this.speedY = speed;
    }

    render(context) {
        context.fillStyle = "#ff0000";
        context.fillRect(this.x, this.y, this.w, this.h);
    }

    updateX(deltatime) {
        this.oldX = this.x;
        //this.x += deltatime * this.speedX;
        this.x += this.speedX;
    }

    updateY(deltatime) {
        this.oldY = this.y;
        //this.y += deltatime * this.speedY;
        this.y += this.speedY;
    }
};