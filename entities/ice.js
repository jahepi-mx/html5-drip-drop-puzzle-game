class Ice extends Entity {
            
    constructor(x, y, w, h, speed) {
        super(x, y, w, h);
        this.oldX = 0;
        this.oldY = 0;
        this.speedX = speed;
        this.speedY = speed;
        this.drop = false;
        this.tiles = [];
        this.collided = false;
        this.dropTime = Math.random() * 2;
        this.dropTimeCount = 0;
    }

    render(context) {
        context.fillStyle = "#ff0000";
        context.fillRect(this.x, this.y, this.w, this.h);
    }
    
    update(deltatime) {
        
        this.dropTimeCount += deltatime;
        if (this.dropTimeCount > this.dropTime) {
            this.dropTime = Math.random() * 2;
            this.dropTimeCount = 0;
            this.drop = true;
        }
        
        var cursor = Cursor.getInstance();
        
        this.collided = false;
        
        if (cursor.isPressed) {
            this.speedX = cursor.x - this.left() - this.w / 2;
        } else {
            this.speedX = 0;
        }

        this.oldX = this.x;
        this.x += this.speedX;

        for (var a = 0; a < this.tiles.length; a++) {
            if (this.tiles[a] !== null) {
                if (this.collide(this.tiles[a])) {
                    this.x = this.oldX;
                    this.collided = true;
                    cursor.isPressed = false;
                    break;
                }
            }
        }

        if (cursor.isPressed) {
            this.speedY = cursor.y - this.top() - this.h / 2;
        } else {
            this.speedY = 0;
        }

        this.oldY = this.y;
        this.y += this.speedY;

        for (var a = 0; a < this.tiles.length; a++) {
            if (this.tiles[a] !== null) {
                if (this.collide(this.tiles[a])) {
                    this.y = this.oldY;
                    this.collided = true;
                    cursor.isPressed = false;
                    break;
                }
            }
        }
    }
};