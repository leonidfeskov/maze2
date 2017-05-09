import generateMaze from './utils/generateMaze';
import { rnd, rndCoords, getOpppositeDirection } from './utils/utils';
import { CELLS_BY_X, CELLS_BY_Y, SIZE_CELL, CELLS_ON_SCREEN, CELL_EMPTY, MONSTERS_COUNT, SPEED } from './constants/constants';
import Map from './components/Map';
import Unit from './components/Unit';
import Player from './components/Player';


// станавливаем размеры юнитов для CSS
let styles = document.createElement('style');
styles.innerHTML = `.unit {width: ${SIZE_CELL}px; height: ${SIZE_CELL}px;}`;
document.body.appendChild(styles);

let mazeOverflow = document.querySelector('.js-maze-overflow');
const size = SIZE_CELL * CELLS_ON_SCREEN;
mazeOverflow.style.width = size + 'px';
mazeOverflow.style.height = size + 'px';

let pause = false;
let map = new Map(generateMaze(CELLS_BY_X, CELLS_BY_Y));
const initPlayerX = 1;
const initPlayerY = CELLS_BY_Y - 2;
let player = new Player(initPlayerX, initPlayerY);
let monsters = [];

// расставляем монстров в случайные свободные клетки
for (let i = 0; i < MONSTERS_COUNT; i++) {
	do {
		var randomCoords = rndCoords(CELLS_BY_X, CELLS_BY_Y);
		var x = randomCoords.x;
		var y =  randomCoords.y;
		// вначале игры монстры не могут респавниться около игрока
	} while(
		(Math.abs(initPlayerX - x) < 5 && Math.abs(initPlayerY - y) < 5) ||
		map.data[y][x] !== CELL_EMPTY
	);

	monsters.push(new Unit(x, y));
}

function checkWin() {
	if (player.x === map.exit.x && player.y === map.exit.y) {
		alert('Win!');
		clearInterval(monstersInterval);
		window.location.reload();
	}
}

function checkLoss() {
	monsters.forEach(function(monster) {
		if (monster.x === player.x && monster.y === player.y) {
			alert('Loss!');
			clearInterval(monstersInterval);
			window.location.reload();
		}
	});
}

// Управление игроком
document.addEventListener('keydown', function(event) {
	if (event.keyCode < 37 || event.keyCode > 40 || player.isMoveProcess) {
		return false;
	}

	player.isMoveProcess = true;
	window.setTimeout(() => {
		player.isMoveProcess = false;
	}, 100);

	switch (event.keyCode) {
		case 37:
			if (map.isEmptyCell(player.x - 1, player.y)) {
				player.redrawDirection('Left');
				player.moveLeft();
			}
			break;
		case 38:
			if (map.isEmptyCell(player.x, player.y - 1)) {
				player.redrawDirection('Up');
				player.moveUp();
			}
			break;
		case 39:
			if (map.isEmptyCell(player.x + 1, player.y)) {
				player.redrawDirection('Right');
				player.moveRight();
			}
			break;
		case 40:
			if (map.isEmptyCell(player.x, player.y + 1)) {
				player.redrawDirection('Down');
				player.moveDown();
			}
			break;
		default:
			break;
	}

	// показываем другую часть карты, если игрок вышел за границы текущей
	map.updatePosition(player.x, player.y);

	checkLoss();
	checkWin();
});

// Перемещение монстров
let monstersInterval = setInterval(() => {
	if (pause) {
		return;
	}

	monsters.forEach(function(monster) {
		let freeSiblingCells = getFreeSiblingCells(monster.x, monster.y);

		// на перекрестке монстр может исзменить направление
		if (freeSiblingCells.length > 2) {
			// но не может повернуть назад
			let prevDirectionIndex = freeSiblingCells.indexOf(getOpppositeDirection(monster.direction));
			freeSiblingCells.splice(prevDirectionIndex, 1);
			monster.direction = freeSiblingCells[rnd(0, freeSiblingCells.length - 1)];
		} else {
			if (!monster.direction || !isEmptySiblingCell(monster)) {
				// выбираем случаейное возможное направление
				monster.direction = freeSiblingCells[rnd(0, freeSiblingCells.length - 1)];
			}
		}

		monster['move' + monster.direction]();
		monster.redrawDirection(monster.direction);
	});

	checkLoss();
}, SPEED);

function getFreeSiblingCells(x, y) {
	let freeSiblingCells = [];
	if (map.isEmptyCell(x - 1, y)) {
		freeSiblingCells.push('Left');
	}
	if (map.isEmptyCell(x + 1, y)) {
		freeSiblingCells.push('Right');
	}
	if (map.isEmptyCell(x, y - 1)) {
		freeSiblingCells.push('Up');
	}
	if (map.isEmptyCell(x, y + 1)) {
		freeSiblingCells.push('Down');
	}
	return freeSiblingCells;
}

function isEmptySiblingCell(unit) {
	let siblingCell = {
		x: unit.x,
		y: unit.y
	};
	switch (unit.direction) {
		case 'Left':
			siblingCell.x--;
			break;
		case 'Right':
			siblingCell.x++;
			break;
		case 'Up':
			siblingCell.y--;
			break;
		case 'Down':
			siblingCell.y++;
			break;
	}
	return map.isEmptyCell(siblingCell.x, siblingCell.y);
}

// пауза
window.addEventListener('blur', function() {
	pause = true;
});

window.addEventListener('focus', function() {
	pause = false;
});