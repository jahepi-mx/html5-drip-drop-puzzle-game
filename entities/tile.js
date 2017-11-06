class Tile extends Entity {
    render(context) {
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        context.drawImage(assets.spritesAtlas, atlas.sprites["wall"].x, atlas.sprites["wall"].y, atlas.sprites["wall"].width, atlas.sprites["wall"].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};


