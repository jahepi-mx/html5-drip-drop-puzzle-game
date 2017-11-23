class SmartTile extends Entity {
    
    constructor(x, y, w, h, ice, speed) {
        super(x, y, w, h);
        this.ice = ice;
        this.origX = this.x;
        this.origY = this.y;
        this.toX = this.x;
        this.toY = this.y;
        this.level = LevelManager.getInstance().current();
        this.tiles = this.level.tiles;
        this.moves = [[1,0], [0,1], [-1,0], [0,-1]];
        this.visited = [];
        this.visibleTiles = new Map();
        this.parents = [];
        this.path = [];
        this.time = 0;
        this.changeTime = 0;
        this.currentVertex = y * this.level.getWidth() + x;
        this.animation = new Animation(13, 1);
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.speed = speed;
        this.isDead = false;
        this.explosiveDrop = false;
        this.drops = this.level.drops;
        
        this.pq = new PriorityQueue(function (a, b) {
            return a.priority > b.priority;
        });
        
        this.dfs(x, y);
        this.pathfinding(false);
        
        if (this.path.length > 0) {
            var vertex = this.path.pop();
            this.currentVertex = vertex;
            var x = Math.floor(vertex % this.level.getWidth());
            var y = Math.floor(vertex / this.level.getWidth());
            this.toX = Tile.getWidth() * x;
            this.toY = Tile.getHeight() * y;  
        }   
    }
    
    update(deltatime) {
        
        if (this.explosiveDrop) {
            this.assets.playAudio(this.assets.torch, false, 0.5);
            for (var b = 0; b < 10; b++) {
                var dropSize = Math.ceil(Math.random() * 3 + 5);
                var drop = new Drop(this.left() + this.w / 2 - dropSize / 2, this.top() + this.h / 2 - dropSize / 2 , dropSize, dropSize, Math.ceil(Math.random() * 10 + 35), "#ff8100");
                drop.collided = true;
                drop.speedX = Math.ceil(Math.random() * 5 + 10)  * (Math.random() < 0.5 ? 1 : -1);
                drop.speedY = -drop.speedY;
                this.drops.push(drop);
            }
            this.explosiveDrop = false;                     
        }
        
        if (this.isDead) return;
        
        this.animation.update(deltatime);
        
        this.time += deltatime;
        if (this.time >= 2) {
            this.time = 0;
            this.pathfinding(false);
            if (this.path.length > 0) {
                var vertex = this.path.pop();
                this.currentVertex = vertex;
                var x = Math.floor(vertex % this.level.getWidth());
                var y = Math.floor(vertex / this.level.getWidth());
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
                var x = Math.floor(vertex % this.level.getWidth());
                var y = Math.floor(vertex / this.level.getWidth());
                this.toX = Tile.getWidth() * x;
                this.toY = Tile.getHeight() * y;
            }
        }
        
        var divisor = 8;
        var newSpeed = this.speed / divisor;
        //console.log(newSpeed * deltatime);
        
        for (var a = 0; a < divisor; a++) {
            
            diffX = this.x - this.toX;
            diffY = this.y - this.toY;
        
            if (diffX >= 1) {
                this.x -= newSpeed * deltatime;
            }
            if (diffX <= -1) {
                this.x += newSpeed * deltatime;
            }
            if (diffY >= 1) {
                this.y -= newSpeed * deltatime;
            }
            if (diffY <= -1) {
                this.y += newSpeed * deltatime;
            } 
        }
    }
    
    pathfinding(rand) {
        
        this.path = [];
        this.visited = [];
        this.parents = [];
        
        this.pq.clear();
        
        var width = this.level.getWidth();
        var height = this.level.getHeight();
        var x = Math.floor(this.currentVertex % width);
        var y = Math.floor(this.currentVertex / width);
        this.visited[y * width + x] = 1;
        var toX = Math.floor(this.ice.x / Tile.getWidth());
        var toY = Math.floor(this.ice.y / Tile.getHeight());
        if (rand && this.visibleTiles.size > 0) {
            var randIndex = Math.floor(Math.random() * (this.visibleTiles.size - 1));
            var currIndex = 0;
            for (var [vertex, active] of this.visibleTiles) {
                if (currIndex++ === randIndex) {
                    toX = Math.floor(vertex % width);
                    toY = Math.floor(vertex / width);
                    break;
                }
            }
        } else if (this.ice.godMode) {
            // Behaviour to escape from ice when is on god mode.
            var maxVertex = 0;
            var maxDist = 0;
            for (var [vertex, active] of this.visibleTiles) {
                var tmpToX = Math.floor(vertex % width);
                var tmpToY = Math.floor(vertex / width); 
                var dist = Math.abs(tmpToX - this.ice.x) + Math.abs(tmpToY - this.ice.y);
                if (dist >= maxDist) {
                    dist = maxDist;
                    maxVertex = vertex;
                }
            }
            toX = Math.floor(maxVertex % width);
            toY = Math.floor(maxVertex / width);
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
    
    dfs(x, y) {
        this.visibleTiles.set(y * this.level.getWidth() + x, 1);
        for (var a = 0; a < this.moves.length; a++) {
            var newX = x + this.moves[a][0];
            var newY = y + this.moves[a][1];
            if (newX >= 0 && newX < this.level.getWidth() && newY >= 0 && newY < this.level.getHeight()) {
                if (!this.visibleTiles.has(newY * this.level.getWidth() + newX) && this.tiles[newY * this.level.getWidth() + newX].walkable) {
                    this.dfs(newX, newY);
                }
            }
        }
    }
    
    render(context) {
        if (this.isDead) return;
        var frame = "saw" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x, this.y, this.w + 1, this.h + 1);
    }
    
    reset() {
        this.isDead = false;
        this.explosiveDrop = false;
        this.x = this.origX;
        this.y = this.origY;
        this.toX = this.x;
        this.toY = this.y;
        var x = Math.floor(this.x / this.w);
        var y = Math.floor(this.y / this.h);
        this.currentVertex = y * this.level.getWidth() + x;
        this.time = 0;
        this.changeTime = 0;
        this.pathfinding(false);    
        if (this.path.length > 0) {
            var vertex = this.path.pop();
            this.currentVertex = vertex;
            x = Math.floor(vertex % this.level.getWidth());
            y = Math.floor(vertex / this.level.getWidth());
            this.toX = Tile.getWidth() * x;
            this.toY = Tile.getHeight() * y;  
        }
    }
    
    die() {
        this.isDead = true;
        this.explosiveDrop = true;
    }
};

