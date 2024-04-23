import Game from './lib/Game.js';

window.onload = function () {
    const game = new Game();
    console.log(game);
    game.startGame();
}