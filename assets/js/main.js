import Game from './lib/Game.js';

const game = new Game();
console.log(game);

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
    game.level = 1;

    console.log('intro');
    console.log(game.matrix);
   
}
function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

//addNewStyle('td.EvenRow a {display:inline !important;}')


function play() {   
   console.log(header.style.height + 'px');
    header.style.height = game.gameCanvas.height/6 + 'px';
    header.remove('shrink')
    console.log()
    console.log('play');
}