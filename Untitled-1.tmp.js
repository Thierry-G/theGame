<!DOCTYPE html>
<html lang="en">
<head>
    <title>The Game</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="levelDisplay"
        style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); font-size: 20px; visibility: hidden;">
        Level 1</div>
    <button id="controlButton"
        style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%);">Play</button>
    <canvas id="gameCanvas" style="background-color: #FFFFFF; border-radius: 5%; padding: 10px;"></canvas>
    <script>
        class Game {
            constructor() {
                this.gameCanvas = document.getElementById('gameCanvas');
                this.ctx = this.gameCanvas.getContext('2d');
                this.gameCanvas.width = window.innerWidth;
                this.gameCanvas.height = window.innerHeight;
                this.squareCount = 4;
                this.rowCount = 4;
                this.squareSize = this.gameCanvas.width / (this.squareCount * 2);
                this.horizontalSpacing = this.squareSize / 2;
                this.verticalSpacing = this.horizontalSpacing;
                this.horizontalPosition = 0;
                this.verticalPosition = 0;
                this.animationId = null;
                this.controlButton = document.getElementById('controlButton');
                this.levelDisplay = document.getElementById('levelDisplay');
                this.gameLevel = 1;
                this.replayCount = 0;
                this.colors = Array(this.squareCount * this.rowCount).fill('#0000FF');
                this.totalSquares = 0;
                this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
                this.randomNumbers = Array(this.squareCount * this.rowCount).fill(null);
                this.matrix = new Array(this.rowCount);
                for (let i = 0; i < this.rowCount; i++) {
                    this.matrix[i] = new Array(this.squareCount).fill(null);
                }
                this.controlButton.addEventListener('click', () => this.controlButtonClick());
                this.gameCanvas.addEventListener('click', (event) => this.canvasClick(event));
            }

            generatePairs(level) {
                let pairs = [];
                for (let i = 0; i < level; i++) {
                    let number;
                    do {
                        number = Math.floor(Math.random() * 44) - 22;
                    } while (number === 0 || pairs.includes(number));
                    pairs.push(number, number);
                }
                return pairs;
            }

            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            
            drawSquares() {
                this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
                for (let i = 0; i < this.squareCount * this.rowCount; i++) {
                    let row = Math.floor(i / this.squareCount);
                    let column = i % this.squareCount;
                    let squareX = this.horizontalPosition + column * (this.squareSize + this.horizontalSpacing);
                    let squareY = this.verticalPosition + row * (this.squareSize + this.verticalSpacing);
                    if (squareY > 0 && squareY < this.gameCanvas.height - this.squareSize) {
                        this.ctx.fillStyle = this.colors[i];
                        this.ctx.fillRect(squareX, squareY, this.squareSize, this.squareSize);
                        if (this.squareNumbers[i] === null) {
                            this.totalSquares += 1;
                            this.squareNumbers[i] = this.totalSquares;
                        }
                        this.ctx.fillStyle = '#FFFFFF';
                        this.ctx.textAlign = 'center';
                        this.ctx.textBaseline = 'middle';
                        this.ctx.fillText(this.squareNumbers[i] + ' (' + this.randomNumbers[i] + ')', squareX + this.squareSize / 2, squareY + this.squareSize / 2);
                        this.matrix[row][column] = {
                            x: squareX,
                            y: squareY,
                            color: this.colors[i],
                            number: this.squareNumbers[i],
                            randomNumber: this.randomNumbers[i]
                        };
                    }
                }
            }
            updateGame() {
                this.drawSquares();
                this.verticalPosition += this.verticalSpeed;
                if (this.verticalPosition > this.gameCanvas.height - this.verticalSpacing - this.rowCount * (this.squareSize + this.verticalSpacing)) {
                    this.verticalPosition = 0;
                    this.horizontalPosition += this.horizontalSpeed;
                    this.verticalPosition += this.verticalSpeed;
                }
                if (this.horizontalPosition > this.gameCanvas.width) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                    this.controlButton.innerText = 'Replay';
                } else {
                    this.animationId = requestAnimationFrame(() => this.updateGame());
                }
            }
    
            controlButtonClick() {
                if (this.controlButton.innerText === 'Play' || this.controlButton.innerText === 'Replay') {
                    if (this.animationId) {
                        cancelAnimationFrame(this.animationId);
                        this.animationId = null;
                    }
                    this.horizontalPosition = 0;
                    this.verticalPosition = 0;
                    this.totalSquares = 0;
                    this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
                    this.randomNumbers = Array(this.squareCount * this.rowCount).fill(null);
                    this.replayCount += 1;
                    if (this.replayCount % 3 === 0) {
                        this.verticalSpeed += 0.5;
                        this.horizontalShift += 10; 
                    }
                    this.horizontalSpeed = 1;
                    this.verticalSpeed = 1;
                    this.gameLevel += 1;
                    this.levelDisplay.innerText = 'Level ' + this.gameLevel;
                    this.levelDisplay.style.visibility = 'visible';
                    this.randomNumbers = this.generatePairs(this.gameLevel);
                    this.shuffleArray(this.randomNumbers);
                    this.animationId = requestAnimationFrame(() => this.updateGame());
                    this.controlButton.innerText = 'Pause';
                } else if (this.controlButton.innerText === 'Pause') {
                    cancelAnimationFrame(this.animationId);
                    this.controlButton.innerText = 'Resume';
                } else if (this.controlButton.innerText === 'Resume') {
                    this.animationId = requestAnimationFrame(() => this.updateGame());
                    this.controlButton.innerText = 'Pause';
                }
            }

            canvasClick(event) {
                let x = event.clientX - this.gameCanvas.getBoundingClientRect().left;
                let y = event.clientY - this.gameCanvas.getBoundingClientRect().top;
                for (let i = 0; i < this.squareCount * this.rowCount; i++) {
                    let row = Math.floor(i / this.squareCount);
                    let column = i % this.squareCount;
                    let squareX = this.horizontalPosition + column * (this.squareSize + this.horizontalSpacing);
                    let squareY = this.verticalPosition + row * (this.squareSize + this.verticalSpacing);
                    if (x > squareX && x < squareX + this.squareSize && y > squareY && y < squareY + this.squareSize) {
                        this.colors[i] = '#FFFFFF';
                        this.ctx.fillStyle = '#0000FF';
                        this.ctx.textAlign = 'center';
                        this.ctx.textBaseline = 'middle';
                        this.ctx.fillText(this.squareNumbers[i] + ' (' + this.randomNumbers[i] + ')', squareX + this.squareSize / 2, squareY + this.squareSize / 2);
                    }
                }
            }
        }

        window.onload = function () {
           let game = new Game();
           console.log(game.matrix)
           console.log(game.rowCount)
            
        };
    </script>
</body>

</html>