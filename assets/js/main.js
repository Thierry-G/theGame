import Game from './lib/Game.js';

window.onload = function () {
    const game = new Game();
    console.log(game);
    document.body.width = game.gameCanvas.width;
    document.body.height = game.gameCanvas.height;
    game.startGame();
}