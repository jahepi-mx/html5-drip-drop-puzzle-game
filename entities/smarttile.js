class SmartTile extends Entity {
    
    constructor(x, y, w, h, ice, tiles) {
        super(x, y, w, h);
        this.ice = ice;
        this.tiles = tiles;
        this.moves = [[1,0], [0,1], [-1,0], [0,-1]];
        this.visited = [];
        this.visibleTiles = new Set();
        this.parents = [];
        this.path = [];
        this.time = 0;
        this.changeTime = 0;
        this.currentVertex = y * Level.getWidth() + x;
        this.animation = new Animation(4, 5);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        
        this.pq = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
        
        this.pathfinding(false);
        
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
        
        this.animation.update(deltatime);
        
        this.time += deltatime;
        if (this.time >= 2) {
            this.time = 0;
            this.pathfinding(false);
            if (this.path.length > 0) {
                var vertex = this.path.pop();
                this.currentVertex = vertex;
                var x = Math.floor(vertex % Level.getWidth());
                var y = Math.floor(vertex / Level.getWidth());
                this.toX = Tile.getWidth() * x;
                this.toY = Tile.getHeight() * y;
            } else {
                // Random destination;
                this.pathfinding(true);
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
    
    pathfinding(rand) {
        
        this.path = [];
        this.visited = [];
        this.parents = [];
        
        this.pq.clear();
        
        var width = Level.getWidth();
        var height = Level.getHeight();
        var x = Math.floor(this.currentVertex % Level.getWidth());
        var y = Math.floor(this.currentVertex / Level.getWidth());
        this.visited[y * width + x] = 1;
        var toX = Math.floor(this.ice.x / Tile.getWidth());
        var toY = Math.floor(this.ice.y / Tile.getHeight());
        
        if (rand && this.visibleTiles.size > 0) {
            var randIndex = Math.floor(Math.random() * (this.visibleTiles.size - 1));
            var currIndex = 0;
            this.visibleTiles.forEach((vertex) => {
                if (currIndex++ === randIndex) {
                    toX = Math.floor(vertex % width);
                    toY = Math.floor(vertex / width);
                }
            });
        }
        
        var dist = Math.abs(toX - x) + Math.abs(toY - y);
        this.pq.add(y * width + x, dist);
        outer: while (!this.pq.isEmpty()) {
            var vertex = this.pq.remove().object;
            for (var a = 0; a < this.moves.length; a++) {
                x = Math.floor(vertex % width) + this.moves[a][0];
                y = Math.floor(vertex / width) + this.moves[a][1];
                if (x >= 0 && x < width && y >= 0 && y < height 
                        && this.visited[y * width + x] === undefined 
                        && this.tiles[y * width + x].walkable) {
                    this.visited[y * width + x] = 1;
                    if (!this.visibleTiles.has(y * width + x)) {
                        this.visibleTiles.add(y * width + x);
                    }
                    dist = Math.abs(toX - x) + Math.abs(toY - y);
                    this.pq.add(y * width + x, dist);
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
        var frame = "saw" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
    }
};

