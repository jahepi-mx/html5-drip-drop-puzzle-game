class FinishPopup extends Popup {
    constructor(closeCallback) {
        super(closeCallback);
        
        var y = this.config.mapHeight / 2 - this.height / 2;
        y += 165;
        var letterWidth = 60;
        var nLetters = 5;
        var marginLeft = 60;
        var left = this.width - (letterWidth *  nLetters) - (marginLeft * 2);
        var spaceBetween = left / (nLetters - 1);
        
        this.letters = [];
        this.isSaving = false;
        this.time = 0;
        this.timeLabel = {x: this.config.mapWidth / 2, y: this.config.mapHeight / 2 - 13, text: "", alpha: 1, font: "30px joystix", color: "#ffffff"};
        var startX = this.config.mapWidth / 2 - this.width / 2 + marginLeft;
        for (var a = 0; a < nLetters; a++) {
            var letter = new Button(letterWidth, letterWidth * 1.3, startX, y);
            this.letters.push(letter);
            startX += letterWidth + spaceBetween;
        }
    }
    
    update(deltatime) {
        
        if (!this.isSaving && this.cursor.isPressed && this.cursor.x >= this.config.mapWidth / 2 - 100 && this.cursor.x <= this.config.mapWidth / 2 + 100 
            && this.cursor.y >= this.config.mapHeight / 2 + 120 && this.cursor.y <= this.config.mapHeight / 2 + 160) {          
            this.saveTime();
        }
        
        for (var a = 0; a < this.letters.length; a++) {
            this.letters[a].update(deltatime);
        }
    }
    
    render(context) {
        if (this.cursor.x >= this.config.mapWidth / 2 - 100 && this.cursor.x <= this.config.mapWidth / 2 + 100 
            && this.cursor.y >= this.config.mapHeight / 2 + 120 && this.cursor.y <= this.config.mapHeight / 2 + 160) {          
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["finishon"].x, this.atlas.sprites["finishon"].y, this.atlas.sprites["finishon"].width, this.atlas.sprites["finishon"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        } else  {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["finishoff"].x, this.atlas.sprites["finishoff"].y, this.atlas.sprites["finishoff"].width, this.atlas.sprites["finishoff"].height, this.config.mapWidth / 2 - this.width / 2, this.config.mapHeight / 2 - this.height / 2, this.width, this.height);
        }
        
        for (var a = 0; a < this.letters.length; a++) {
            this.letters[a].render(context);
        }
        
        var time = Math.floor(this.time);
        var seconds = Math.floor(time % 60);
        var minutes = Math.floor(time / 60);
        var hours = Math.floor(minutes / 60);
        var minutesRemain = Math.floor(minutes % 60);     
        this.timeLabel.text = "final time: " + (hours < 10 ? "0" + hours : hours) + ":" + (minutesRemain < 10 ? "0" + minutesRemain : minutesRemain) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        context.font = this.timeLabel.font;
        context.fillStyle = this.timeLabel.color;
        context.textAlign = "center";
        context.fillText(this.timeLabel.text, this.timeLabel.x , this.timeLabel.y);
        
    }
    
    saveTime() {
        if (this.isSaving) {
            return;
        }
        this.isSaving = true;
        var nickname = "";
        for (var a = 0; a < this.letters.length; a++) {
            nickname += this.letters[a].getLetter();
        }
        console.log(nickname);
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    self.onClose();
                } else {
                    self.isSaving = false;
                }
            }
        };
        xhr.open("POST", "http://games.jahepi.net/labyrinth/php/save.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("time=" + this.time + "&name=" + nickname);
    }
}

class Button {
    
    constructor(width, height, x, y) {
        this.cursor = Cursor.getInstance();
        this.letters = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.letterIndex = 0;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.changeCount = 0;
        this.changeCountLimit = 0.2;
        this.blinkCount = 0;
        this.blinkCountLimit = 0.1;
        this.blink = 0;
    }
    
    update(deltatime) {
        this.changeCount += deltatime;
        this.blinkCount += deltatime;
        if (this.cursor.isPressed && this.cursor.x >= this.x && this.cursor.x <= this.x + this.width 
            && this.cursor.y >= this.y && this.cursor.y <= this.y + this.height) {          
           if (this.changeCount > this.changeCountLimit) {
               this.letterIndex++;
               this.letterIndex %= this.letters.length;
               this.changeCount = 0;
           }
        }
        
        if (this.blinkCount >= this.blinkCountLimit) {
            this.blinkCount = 0;
            this.blink ^= 1;
        }
    }
    
    render(context) {
        
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, this.width, this.height);
        
        var size = this.height;
        context.font = size + "px joystix";
        context.fillStyle = this.blink === 1 ? "white" : "red";
        context.textAlign = "center";
        context.fillText(this.getLetter(), this.x + size / 2, this.y + size / 1.5);
    }
    
    getLetter() {
        return this.letters[this.letterIndex];
    }
}

