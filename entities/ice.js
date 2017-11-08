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

        var x = Math.floor(Math.round(this.x / Tile.getWidth()));
        var y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
        for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
            for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                if (tmpX >= 0 && tmpX < Level.getWidth() && tmpY >= 0 && tmpY < Level.getHeight()) {
                    var tile = this.tiles[tmpY * Level.getWidth() + tmpX];
                    if (tile !== null && tile.collide(this)) {
                        this.x = this.oldX;
                        this.collided = true;
                        cursor.isPressed = false;
                        break;
                    }
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

        x = Math.floor(Math.round(this.x / Tile.getWidth()));
        y = Math.floor(Math.round(this.y / Tile.getHeight()));
        
        for (var tmpX = x - 2; tmpX <= x + 2; tmpX++) {
            for (var tmpY = y - 2; tmpY <= y + 2; tmpY++) {
                if (tmpX >= 0 && tmpX < Level.getWidth() && tmpY >= 0 && tmpY < Level.getHeight()) {
                    var tile = this.tiles[tmpY * Level.getWidth() + tmpX];
                    if (tile !== null && tile.collide(this)) {
                        this.y = this.oldY;
                        this.collided = true;
                        cursor.isPressed = false;
                        break;
                    }
                }
            }
        }
    }
};