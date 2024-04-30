import Board from "./Board.js";
export default class Game {
    constructor() {
        this.animationId = null;

        this.gameCanvas = document.getElementById('gameCanvas');
        this.ctx = this.gameCanvas.getContext('2d');

        this.gameCanvas.width = window.innerWidth;
        this.gameCanvas.height = window.innerHeight;

        this.squareCount = 4;
        this.rowCount = 4;

        //this.squareSize = this.gameCanvas.width / (this.squareCount * 2);
        //this.horizontalSpacing = this.gameCanvas.width / (this.squareCount + 1);
        //this.squareSize = Math.min(this.gameCanvas.width, this.gameCanvas.height) / this.squareCount;
        this.squareSize = 96;
        this.horizontalSpacing = this.squareSize / 4;

        this.verticalSpacing = this.gameCanvas.height / (this.rowCount + 1);
        this.horizontalPosition = this.horizontalSpacing;
        this.verticalPosition = this.verticalSpacing;

        this.controlButton = document.getElementById('controlButton');
        this.levelDisplay = document.getElementById('levelDisplay');

        this.replayCount = 0;
        this.totalSquares = 0;
        this.colors = Array(this.squareCount * this.rowCount).fill('#0000FF');
        this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);

        this.board = new Board(this.rowCount, this.squareCount);
        console.log(this.board);
        this.init();
        //console.log(this.round.countPairs() +' pairs found in the matrix');
        //console.log(this.round.countPairsInRow());

        //this.matrix = new Engine(this.rowCount, this.squareCount);
        // this.matrix = new Array(this.rowCount);
        // console.log(this.matrix)
        // for (let i = 0; i < this.rowCount; i++) {
        //     console.log(`i: ${i}`)
        //     this.matrix[i] = new Array(this.squareCount).fill(this.generateRandomNums());
        // }

        //this.controlButton.addEventListener('click', () => this.controlButtonClick());
        //this.gameCanvas.addEventListener('click', (event) => this.canvasClick(event));
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
                // this.ctx.fillText(this.squareNumbers[i] + ' (' + this.randomNumbers[i] + ')', squareX + this.squareSize / 2, squareY + this.squareSize / 2);
                /*
                this.matrix[row][column] = {
                    x: squareX,
                    y: squareY,
                    color: this.colors[i],
                    number: this.squareNumbers[i],
                    randomNumber: this.randomNumbers[i].numbers
                };
                */
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

    play() {
        document.body.classList.remove('intro');
        this.controlButton.innerText = 'Pause';
        this.animationId = requestAnimationFrame(() => this.updateGame(this.animationId));
    }
    pause() {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.controlButton.innerText = 'Play';
    }

    init() {
        document.body.classList.add('intro');
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.horizontalPosition = 0;
        this.verticalPosition = 0;
        this.totalSquares = 0;
        this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
        this.replayCount += 1;
        this.horizontalSpeed = 1;
        this.verticalSpeed = 1;
        this.gameLevel = 1;
        this.levelDisplay.innerText = 'Level ' + this.gameLevel;
        this.levelDisplay.style.visibility = 'visible';

        //this.animationId = requestAnimationFrame(() => this.updateGame());
        this.controlButton.addEventListener('click', () => this.controlButtonClick());
    }

    
    
    controlButtonClick() {
        console.log(this.controlButton.innerText)
        if (this.controlButton.innerText === 'Play' || this.controlButton.innerText === 'Replay') {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            this.horizontalPosition = 0;
            this.verticalPosition = 0;
            this.totalSquares = 0;
            this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
            // this.randomNumbers = Array(this.squareCount * this.rowCount).fill(null);
            this.replayCount += 1;
            // if (this.replayCount % 3 === 0) {
            //     this.verticalSpeed += 0.5;
            //     this.horizontalShift += 10;
            // }
            this.horizontalSpeed = 1;
            this.verticalSpeed = 1;
            this.gameLevel += 1;
            this.levelDisplay.innerText = 'Level ' + this.gameLevel;
            this.levelDisplay.style.visibility = 'visible';
            // this.randomNumbers = this.generatePairs(this.gameLevel);
            // this.shuffleArray(this.randomNumbers);

           this.play();
           this.controlButton.innerText = 'Play';
    
        } else if (this.controlButton.innerText === 'Pause') {
            this.pause();
            return;
        } else if (this.controlButton.innerText === 'Resume') {
            this.animationId = requestAnimationFrame(() => this.updateGame());
            this.init();
            return;
            this.controlButton.innerText = 'Play';
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
            console.log(squareX, squareY, this.squareSize, this.squareSize);
            if (x > squareX && x < squareX + this.squareSize && y > squareY && y < squareY + this.squareSize) {
                this.colors[i] = '#FFFFFF';
                this.ctx.fillStyle = '#0000FF';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                // this.ctx.fillText(this.squareNumbers[i] + ' (' + this.randomNumbers[i] + ')', squareX + this.squareSize / 2, squareY + this.squareSize / 2);
            }
        }
    }
}
