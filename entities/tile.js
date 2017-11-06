class Tile extends Entity {
    render(context) {
        context.fillStyle = "#000000";
        context.fillRect(this.x, this.y, this.w, this.h);
    }
};


