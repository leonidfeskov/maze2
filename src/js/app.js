import { SIZE_CELL, CELLS_ON_SCREEN } from './constants/constants';
import Game from './components/Game';


// размеры юнитов зависят от ширины/высоты экрана,
// чтобы не задавать размеры каждому юниту отделльно, просто добавляем общее CSS-правило
let styles = document.createElement('style');
styles.innerHTML = `.unit, .item {width: ${SIZE_CELL}px; height: ${SIZE_CELL}px;}`
document.body.appendChild(styles);


// размеры видимой области карты также зависят от ширины/высоты экрана
const mapSize = SIZE_CELL * CELLS_ON_SCREEN;
let mazeOverflowNode = document.querySelector('.js-maze-overflow');
mazeOverflowNode.style.width = mapSize + 'px';
mazeOverflowNode.style.height = mapSize + 'px';


// создаем игру
let game = new Game({
	monsters: 0
});

// пауза
window.addEventListener('blur', function() {
	game.pause = true;
});
window.addEventListener('focus', function() {
    game.pause = false;
});
