class Entity {
            
    constructor(x, y, w, h) {
        this.x = x * w;
        this.y = y * h;
        this.w = w;
        this.h = h;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.w;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }

    render(context) {}

    update(deltatime) {}

    collide(entity) {
        var width = entity.w / 2 + this.w / 2;
        var height = entity.h / 2 + this.h / 2;
        var distanceX = Math.abs((this.left() + this.w / 2) - (entity.left() + entity.w / 2));
        var distanceY = Math.abs((this.top() + this.h / 2) - (entity.top() + entity.h / 2));
        return distanceX < width && distanceY < height;
    }
};

