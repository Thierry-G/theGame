import Game from './lib/Game.js';

const game = new Game();
const header = document.getElementById('header');

window.onload = function () {

    game.mode = 'start';

    switch (game.mode) {
        case 'start':
            intro();
            break;
        case 'play':
            play();
            break;
    }

    
};

function intro() {
    header.style.backgroundColor = 'rgb(18, 108, 227)';
    game.level = 1;

    console.log('intro');
    console.log(game.matrix);
}
function play() {
    header.style.backgroundColor = '#f5f5f5';
    console.log()
    console.log('play');
}