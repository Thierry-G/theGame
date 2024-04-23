import GameMechanics from './Engine.js';

class GameEngine {
    constructor() {
        this.squares = [];
        this.squareDirections = [];
        this.squareColors = [];
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    updateScreenSize() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }
    updateSquareDirections() {
        for (let i = 0; i < this.squares.length; i++) {
            let square = this.squares[i];
            let direction = this.squareDirections[i];
            square.x += direction.dx;
            square.y += direction.dy;
            if (square.x < 0 || square.x > this.screenWidth) {
                direction.dx = -direction.dx;
            }
            if (square.y < 0 || square.y > this.screenHeight) {
                direction.dy = -direction.dy;
            }
        }
    }

    addSquare(x, y, dx, dy, color) {
        this.squares.push({ x, y });
        this.squareDirections.push({ dx, dy });
        this.squareColors.push(color);
    }

    updateSquares() {
        this.updateSquareDirections();
    }
}