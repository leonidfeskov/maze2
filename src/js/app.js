import generateMaze from './utils/generateMaze';
import { rnd, rndCoords, getOpppositeDirection } from './utils/utils';
import { CELLS_BY_X, CELLS_BY_Y, CELL_EMPTY, MONSTERS_COUNT, SPEED } from './constants/constants';
import Map from './components/Map';
import Unit from './components/Unit';
import Player from './components/Player';


let map = new Map(generateMaze(CELLS_BY_X, CELLS_BY_Y));
const initPlayerX = 0;
const initPlayerY = CELLS_BY_Y - 1;
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
				player.moveLeft();
			}
			break;
		case 38:
			if (map.isEmptyCell(player.x, player.y - 1)) {
				player.moveUp();
			}
			break;
		case 39:
			if (map.isEmptyCell(player.x + 1, player.y)) {
				player.moveRight();
			}
			break;
		case 40:
			if (map.isEmptyCell(player.x, player.y + 1)) {
				player.moveDown();
			}
			break;
		default:
			break;
	}

	checkLoss();
	checkWin();
});

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

// Перемещение монстров
let monstersInterval = setInterval(() => {
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
	});

	checkLoss();
}, SPEED);