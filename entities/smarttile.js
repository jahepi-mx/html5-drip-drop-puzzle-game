class SmartTile extends Entity {
    
    constructor(x, y, w, h, ice, tiles) {
        super(x, y, w, h);
        this.ice = ice;
        this.tiles = tiles;
        this.moves = [[1,0], [0,1], [-1,0], [0,-1]];
        this.visited = [];
        this.parents = [];
        this.path = [];
        this.time = 0;
        this.changeTime = 0;
        this.currentVertex = y * Level.getWidth() + x;
        this.pathfinding();
        
        if (this.path.length > 0) {
            var vertex = this.path.pop();
            this.currentVertex = vertex;
            var x = Math.floor(vertex % Level.getWidth());
            var y = Math.floor(vertex / Level.getWidth());
            this.toX = Tile.getWidth() * x;
            this.toY = Tile.getHeight() * y;  
        }   
    }
    
    update(deltatime) {
        
        this.time += deltatime;
        if (this.time >= 2) {
            this.time = 0;
            this.pathfinding();
            if (this.path.length > 0) {
                var vertex = this.path.pop();
                this.currentVertex = vertex;
                var x = Math.floor(vertex % Level.getWidth());
                var y = Math.floor(vertex / Level.getWidth());
                this.toX = Tile.getWidth() * x;
                this.toY = Tile.getHeight() * y;
            }
        }
        
        var diffX = Math.abs(this.x - this.toX);
        var diffY = Math.abs(this.y - this.toY);
        if (diffX <= 2 && diffY <= 2) {
            if (this.path.length > 0) {
                var vertex = this.path.pop();
                this.currentVertex = vertex;
                var x = Math.floor(vertex % Level.getWidth());
                var y = Math.floor(vertex / Level.getWidth());
                this.toX = Tile.getWidth() * x;
                this.toY = Tile.getHeight() * y;
            }
        }
        
        //this.x += (this.toX - this.x) * deltatime;
        //this.y += (this.toY - this.y) * deltatime;
        
        diffX = this.x - this.toX;
        diffY = this.y - this.toY;
        var speed = 50;
        if (diffX >= 2) {
            this.x -= speed * deltatime;
        }
        if (diffX <= -2) {
            this.x += speed * deltatime;
        }
        if (diffY >= 2) {
            this.y -= speed * deltatime;
        }
        if (diffY <= -2) {
            this.y += speed * deltatime;
        }      
    }
    
    pathfinding() {
        
        this.path = [];
        this.visited = [];
        this.parents = [];
        
        var pq = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
        var width = Level.getWidth();
        var height = Level.getHeight();
        var x = Math.floor(this.currentVertex % Level.getWidth());
        var y = Math.floor(this.currentVertex / Level.getWidth());
        this.visited[y * width + x] = 1;
        var toX = Math.floor(this.ice.x / Tile.getWidth());
        var toY = Math.floor(this.ice.y / Tile.getHeight());
        var dist = Math.abs(toX - x) + Math.abs(toY - y);
        pq.add(y * width + x, dist);
        outer: while (!pq.isEmpty()) {
            var vertex = pq.remove().object;
            for (var a = 0; a < this.moves.length; a++) {
                x = Math.floor(vertex % width) + this.moves[a][0];
                y = Math.floor(vertex / width) + this.moves[a][1];
                if (x >= 0 && x < width && y >= 0 && y < height 
                        && this.visited[y * width + x] === undefined 
                        && this.tiles[y * width + x].walkable) {
                    this.visited[y * width + x] = 1;
                    dist = Math.abs(toX - x) + Math.abs(toY - y);
                    pq.add(y * width + x, dist);
                    this.parents[y * width + x] = vertex;
                    if (x === toX && y === toY) {
                        this.buildPath(y * width + x);
                        break outer;
                    }
                }
            }
        }
    }
    
    buildPath(parent) {
        this.path.push(parent);
        if (this.parents[parent] !== undefined) {
            this.buildPath(this.parents[parent]);
        }
    }
    
    render(context) {
        var atlas = Atlas.getInstance();
        var assets = Assets.getInstance();
        context.drawImage(assets.spritesAtlas, atlas.sprites["wall"].x, atlas.sprites["wall"].y, atlas.sprites["wall"].width, atlas.sprites["wall"].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};

