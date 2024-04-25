class Animation {
    constructor(gameCanvas, controlButton, levelDisplay) {
        this.gameCanvas = gameCanvas;
        this.ctx = this.gameCanvas.getContext('2d');
        this.controlButton = controlButton;
        this.levelDisplay = levelDisplay;
        // ... rest of your variables here ...

        this.controlButton.addEventListener('click', this.controlButtonClick.bind(this));
        this.gameCanvas.addEventListener('click', this.gameCanvasClick.bind(this));
    }

    drawSquares() {
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        for (let i = 0; i < this.squareCount * this.rowCount; i++) {
            let row = Math.floor(i / this.squareCount);
            let column = i % this.squareCount;
            let squareX = this.horizontalPosition + column * (this.squareSize + this.horizontalSpacing);
            let squareY = this.verticalPosition + row * (this.squareSize + this.verticalSpacing);

            if (squareX > 0 && squareX < this.gameCanvas.width - this.squareSize) {
                let square = new Square(this.ctx, squareX, squareY, this.squareSize, this.colors[i], this.squareNumbers[i], this.randomNumbers[i]);
                square.draw();
            }
        }
    }
    gameCanvasClick(event) {
        let x = event.clientX - this.gameCanvas.getBoundingClientRect().left;
        let y = event.clientY - this.gameCanvas.getBoundingClientRect().top;

        for (let i = 0; i < this.squareCount * this.rowCount; i++) {
            let row = Math.floor(i / this.squareCount);
            let column = i % this.squareCount;
            let squareX = this.horizontalPosition + column * (this.squareSize + this.horizontalSpacing);
            let squareY = this.verticalPosition + row * (this.squareSize + this.verticalSpacing);

            let square = new Square(this.ctx, squareX, squareY, this.squareSize, this.colors[i], this.squareNumbers[i], this.randomNumbers[i]);

            if (square.isClicked(x, y)) {
                this.colors[i] = '#FFFFFF';
                square.draw();
            }
        }
    }
    // ... rest of your methods here ...

    controlButtonClick() {
        // logic for controlButton click event
    }




    // ... rest of your methods here ...
}

document.addEventListener('DOMContentLoaded', (event) => {
    const gameCanvas = document.getElementById('gameCanvas');
    const controlButton = document.getElementById('controlButton');
    const levelDisplay = document.getElementById('levelDisplay');

    new Animation(gameCanvas, controlButton, levelDisplay);
});