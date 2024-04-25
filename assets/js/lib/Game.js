/**
         * Represents the game logic and rendering.
         */
export default class Game {
    /**
     * Initializes the game.
     */
    constructor() {
        // Get the game canvas and its 2D rendering context
        this.gameCanvas = document.getElementById('gameCanvas');
        this.ctx = this.gameCanvas.getContext('2d');

        // Set the canvas size to match the window size
        this.gameCanvas.width = window.innerWidth;
        this.gameCanvas.height = window.innerHeight;

        // Set initial game settings
        this.squareCount = 4;
        this.rowCount = 4;
        this.squareSize = this.gameCanvas.width / (this.squareCount * 2);
        this.horizontalSpacing = this.gameCanvas.width / (this.squareCount + 1);
        this.verticalSpacing = this.gameCanvas.height / (this.rowCount + 1);
        this.horizontalPosition = this.horizontalSpacing;
        this.verticalPosition = this.verticalSpacing;
        this.animationId = null;
        this.controlButton = document.getElementById('controlButton');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.gameLevel = 1;
        this.replayCount = 0;
        this.colors = Array(this.squareCount * this.rowCount).fill('#0000FF');
        this.totalSquares = 0;
        this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
        //this.randomNumbers = Array(this.squareCount * this.rowCount).fill(this.generatePairs(this.gameLevel)).flat();
        //console.log(this.randomNumbers)
        this.matrix = new Array(this.rowCount);
        for (let i = 0; i < this.rowCount; i++) {
            this.matrix[i] = new Array(this.squareCount).fill(this.generatePairs();



        }

        // Add event listeners
        this.controlButton.addEventListener('click', () => this.controlButtonClick());
        this.gameCanvas.addEventListener('click', (event) => this.canvasClick(event));
    }
    /**
        * The horizontal speed of the squares.
        * @type {number}
        */
    /**
     * Generates pairs of random numbers for the game.
     * @returns  An array of random numbers.
     */
    generate() {
        let  = [];
        for (let i = 0; i < this.gameLevel; i++) {
            let number;
            do {
                number = Math.floor(Math.random() * 44) - 22;
            } while (number === 0);
            this.matrix[i] = number;
        }
    }

    /**
     * Shuffles the elements of an array randomly.
     * @param {any[]} array - The array to be shuffled.
     * @returns {any[]} The shuffled array.
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Draws the squares on the game canvas.
     */
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
                    randomNumber: this.randomNumbers[i].number
                };
            }
        }
    }

    /**
     * Updates the game state and renders the game.
     */
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

    /**
     * Handles the click event on the control button.
     */
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

    /**
     * Handles the click event on the game canvas.
     * @param {MouseEvent} event - The click event.
     */
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