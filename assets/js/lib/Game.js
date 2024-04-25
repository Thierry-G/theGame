import Engine from "./Engine.js";


export default class Game {
    constructor() {
        this.gameCanvas = document.getElementById('gameCanvas');
        this.ctx = this.gameCanvas.getContext('2d');
        this.controlButton = document.getElementById('controlButton');
        this.levelDisplay = document.getElementById('levelDisplay');

        this.gameCanvas.width = window.innerWidth;
        this.gameCanvas.height = window.innerHeight;


        this.gameMode = 'default';
        this.squareCount = 4;
        this.rowCount = 4;
        this.squareSize = 48;
        this.horizontalSpeed = 1;
        this.verticalSpeed = 1;

        this.horizontalSpacing = (this.gameCanvas.width - this.squareCount * this.squareSize) / (this.squareCount - 1);
        this.verticalSpacing = this.horizontalSpacing;

        this.horizontalPosition = 0;
        this.verticalPosition = 0;

        this.animationId = null;

        this.gameLevel = 1;
        this.replayCount = 0;

        this.colors = Array(this.squareCount * this.rowCount).fill('#0000FF');

        this.totalSquares = 0;
        this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
        this.randomNumbers = Array(this.squareCount * this.rowCount).fill(null);

        this.controlButton.addEventListener('click', this.controlButtonClick.bind(this));
        this.gameCanvas.addEventListener('click', this.gameCanvasClick.bind(this));

        const gameModeSelect = document.getElementById('gameModeSelect');
        gameModeSelect.addEventListener('change', (event) => {
            this.gameMode = event.target.value;
        });

        this.engine = new Engine();
        this.animationFrameId = null;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.controlButton.addEventListener('click', this.controlButtonClick.bind(this));
        this.gameCanvas.addEventListener('click', this.gameCanvasClick.bind(this));

        const gameModeSelect = document.getElementById('gameModeSelect');
        gameModeSelect.addEventListener('change', (event) => {
            this.gameMode = event.target.value;
        });

        window.addEventListener('resize', () => {
            this.gameCanvas.width = screen.width;
            this.gameCanvas.height = screen.height;
            this.engine.updateScreenSize();
        });
    }

    // ... Reste des méthodes JavaScript ...
    controlButtonClick() {
       "Play" === this.controlButton.innerText ? this.startGame() : this.stopGame()
    }

    gameCanvasClick(event) {
        // ... Logique de gestion du clic sur le canvas ...
    }

    startGame() {
        this.controlButton.innerText = 'Play';
        this.levelDisplay.style.visibility = 'visible';
        this.levelDisplay.innerText = `Level ${this.gameLevel}`;

        // ... Autre logique de démarrage du jeu ...
        console.log(this.engine.updateSquareDirections());
        /*
        this.animationFrameId = requestAnimationFrame(() => {
            this.update();

        });
        */
    }

    startAnimation() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    stopGame() {
        this.controlButton.innerText = 'Play';
        this.levelDisplay.style.visibility = 'hidden';

        // ... Autre logique d'arrêt du jeu ...
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        //this.stopAnimation();
    }

    drawSquare(square) {
        this.ctx.fillStyle = square.color;
        this.ctx.fillRect(square.x, square.y, this.squareSize, this.squareSize);
    }



    update() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        // Update the squares
        this.engine.updateSquares();

        // Draw the squares
        //this.drawGrid();

        for (let square of this.engine.squares) {
            this.drawSquare(square);
        }

        // Schedule the next update
        this.animationFrameId = requestAnimationFrame(this.update.bind(this));

    }


    drawGrid() {
        for (let i = 0; i < this.squareCount; i++) {
            for (let j = 0; j < this.rowCount; j++) {
                let x = i * (this.squareSize + this.horizontalSpacing);
                let y = j * (this.squareSize + this.verticalSpacing);
                this.drawSquare(x, y, this.colors[i + j * this.squareCount]);
            }
        }
    }

    animate() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        // Appeler la méthode d'animation appropriée
        if (this.gameMode === 'default') {
            this.animateDefaultMode();
        }

        // Dessiner la nouvelle frame
        this.drawGrid();

        // Demander la prochaine frame
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }


    animateDefaultMode() {
        this.engine.updateSquares();

        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        for (let i = 0; i < this.engine.squares.length; i++) {
            const square = this.engine.squares[i];
            this.drawSquare(square.x, square.y, square.color);
        }
        // Utilisez les valeurs et méthodes de this.engine pour mettre à jour l'état du jeu
        for (let i = 0; i < this.engine.squareCount * this.engine.rowCount; i++) {
            let x = i % this.engine.squareCount;
            let y = Math.floor(i / this.engine.squareCount);

            x += this.engine.squareDirections[i].x * this.horizontalSpeed;
            y += this.engine.squareDirections[i].y * this.verticalSpeed;

            if (x < 0 || x > this.gameCanvas.width - this.squareSize) {
                this.engine.squareDirections[i].x *= -1;
            }

            if (y < 0 || y > this.gameCanvas.height - this.squareSize) {
                this.engine.squareDirections[i].y *= -1;
            }

            this.drawSquare(x, y, this.engine.colors[i]);
        }
        requestAnimationFrame(() => this.animateDefaultMode());
    }
    // ... Autres méthodes ...

    moveSquare(i, direction) {
        // Implement the logic for moving squares
    }

    generateRandomNumbers() {
        for (let i = 0; i < this.squareCount * this.rowCount; i++) {
            this.randomNumbers[i] = Math.floor(Math.random() * this.squareCount * this.rowCount);
        }
    }

    generateSquareNumbers() {
        for (let i = 0; i < this.squareCount * this.rowCount; i++) {
            this.squareNumbers[i] = i;
        }
    }

    checkWin() {
        for (let i = 0; i < this.squareCount * this.rowCount; i++) {
            if (this.squareNumbers[i] !== this.randomNumbers[i]) {
                return false;
            }
        }
        return true;
    }


    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    levelUp() {
        this.gameLevel++;
        this.levelDisplay.innerText = `Level ${this.gameLevel}`;
        this.squareCount++;
        this.rowCount++;
        this.squareSize -= 4;
        this.horizontalSpeed++;
        this.verticalSpeed++;
        this.horizontalSpacing = (this.gameCanvas.width - this.squareCount * this.squareSize) / (this.squareCount - 1);
        this.verticalSpacing = this.horizontalSpacing;
        this.colors = Array(this.squareCount * this.rowCount).fill('#0000FF');
        this.squareNumbers = Array(this.squareCount * this.rowCount).fill(null);
        this.randomNumbers = Array(this.squareCount * this.rowCount).fill(null);
        this.generateSquareNumbers();
        this.shuffleArray(this.squareNumbers);
    }

    swapSquares(i, j) {
        let temp = this.squareNumbers[i];
        this.squareNumbers[i] = this.squareNumbers[j];
        this.squareNumbers[j] = temp;
    }

    moveSquare(i, direction) {
        // ... Logique de déplacement des carrés ...
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationId);
    }

    animate() {
        // Mettre à jour l'état du jeu ici

        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        // Dessiner la nouvelle frame
        this.drawGrid();

        // Demander la prochaine frame
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = function () {
    new Game();
}