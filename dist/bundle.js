/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// размеры лабиринта должны быть нечетными
const CELLS_BY_X = 33;
/* harmony export (immutable) */ __webpack_exports__["c"] = CELLS_BY_X;

const CELLS_BY_Y = 33;
/* harmony export (immutable) */ __webpack_exports__["d"] = CELLS_BY_Y;

const CELLS_ON_SCREEN = 11;
/* harmony export (immutable) */ __webpack_exports__["b"] = CELLS_ON_SCREEN;


let width = window.innerWidth;
let height = window.innerHeight;
let size = Math.min(width, height);
const SIZE_CELL = Math.floor(size / CELLS_ON_SCREEN);
/* harmony export (immutable) */ __webpack_exports__["a"] = SIZE_CELL;


const CELL_EMPTY = 0;
/* harmony export (immutable) */ __webpack_exports__["f"] = CELL_EMPTY;

const CELL_WALL = 1;
/* harmony export (immutable) */ __webpack_exports__["h"] = CELL_WALL;

const CELL_EXIT = 2;
/* harmony export (immutable) */ __webpack_exports__["i"] = CELL_EXIT;


const COLOR_EMPTY = '#fff';
/* unused harmony export COLOR_EMPTY */

const COLOR_WALL = '#000';
/* unused harmony export COLOR_WALL */

const COLOR_EXIT = '#0ff';
/* unused harmony export COLOR_EXIT */


const MONSTERS_COUNT = Math.round(CELLS_BY_X * CELLS_BY_Y / 49);
/* harmony export (immutable) */ __webpack_exports__["e"] = MONSTERS_COUNT;

const SPEED = 500;
/* harmony export (immutable) */ __webpack_exports__["g"] = SPEED;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);


class Unit {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.direction;

		this.node = document.createElement('div');
		this.node.className = 'unit';

		this.redrawPosition();
		this.draw();
	}

	move(x, y) {
		this.x = x;
		this.y = y;
		this.redrawPosition();
	}

	moveLeft() {
		this.x--;
		this.redrawPosition();
	}

	moveRight() {
		this.x++;
		this.redrawPosition();
	}

	moveUp() {
		this.y--;
		this.redrawPosition();
	}

	moveDown() {
		this.y++;
		this.redrawPosition();
	}

	draw() {
		let mazeNode = document.querySelector('.js-maze');
		mazeNode.appendChild(this.node);
	}

	redrawPosition() {
		this.node.style.left = this.x * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
		this.node.style.top = this.y * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
	}

	redrawDirection(direction) {
		let classes = this.node.classList;
		classes.remove('left', 'up', 'right', 'down');
		classes.add(direction.toLowerCase());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Unit;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = rnd;
/* harmony export (immutable) */ __webpack_exports__["a"] = rndCoords;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOpppositeDirection;
function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rndCoords(width, height) {
	return {
		x: rnd(0, width - 1),
		y: rnd(0, height - 1)
	};
}

function getOpppositeDirection(direction) {
	if (direction === 'Left') {
		return 'Right';
	}
	if (direction === 'Right') {
		return 'Left';
	}
	if (direction === 'Up') {
		return 'Down';
	}
	if (direction === 'Down') {
		return 'Up';
	}
}

const checkImage = texture => new Promise(resolve => {
	texture.onload = () => resolve();
});

const loadImages = (...textures) => Promise.all(textures.map(checkImage));
/* harmony export (immutable) */ __webpack_exports__["d"] = loadImages;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(2);



// загрузка текстур
const textureNames = ['wall', 'exit'];
const textures = textureNames.map(function (name) {
	const img = new Image();
	img.src = `i/${name}.png`;
	return img;
});

class Map {
	constructor(data) {
		this.data = data;
		this.width = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */];
		this.height = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */];

		this.maze = document.querySelector('.js-maze');

		let canvas = document.querySelector('.js-maze-map');
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		var self = this;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["d" /* loadImages */])(...textures).then(function (e) {
			self.draw();
		});
	}

	drawCell(x, y, texture) {
		var heightWall = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] / 5;
		this.ctx.drawImage(texture, x * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] - heightWall, y * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] - heightWall, __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + heightWall, __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + heightWall);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */]; y++) {
			for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */]; x++) {
				let cell = this.data[y][x];

				if (cell === __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) {
					this.drawCell(x, y, textures[0]);
				}

				if (cell === __WEBPACK_IMPORTED_MODULE_0__constants_constants__["i" /* CELL_EXIT */]) {
					this.exit = {
						x: x,
						y: y
					};
					this.drawCell(x, y, textures[1]);
				}
			}
		}
	}

	isEmptyCell(x, y) {
		if (x >= 0 && x < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] && y >= 0 && y < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] && this.data[y][x] !== __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) {
			return true;
		}
		return false;
	}

	updatePosition(x, y) {
		let areasByY = Math.floor(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] / __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]) - 1;
		let areaX = Math.floor(x / __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]);
		let areaY = Math.floor(y / __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]);

		this.maze.style.left = -(areaX * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]) + 'px';
		this.maze.style.bottom = -((areasByY - areaY) * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]) + 'px';
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Unit__ = __webpack_require__(1);


class Player extends __WEBPACK_IMPORTED_MODULE_0__Unit__["a" /* default */] {
	constructor(x, y) {
		super(x, y);
		let classes = this.node.classList;
		classes.add('unit_player');

		this.isMoveProcess = false;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generateMaze;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);


var isInScope = function (map, coord) {
    return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
};

function generateMaze(width, height) {
    // уменьшаем размер на 2 клетки, потому что потом добавим стены вокруг лабиринта
    width = width - 2;
    height = height - 2;

    var currentPosition = [0, 0];
    var map = [];
    var walls = [];

    for (var y = 0; y < height; y++) {
        map[y] = [];
        for (var x = 0; x < width; x++) {
            map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */];
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["f" /* CELL_EMPTY */];
        if (addBlockWalls && isInScope(map, [y + 1, x]) && map[y + 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y - 1, x]) && map[y - 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x + 1]) && map[y][x + 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x - 1]) && map[y][x - 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y, x - 1, [y, x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)];
        var host = randomWall[2];
        var opposite = [host[0] + (randomWall[0] - host[0]) * 2, host[1] + (randomWall[1] - host[1]) * 2];
        if (isInScope(map, opposite)) {
            if (map[opposite[0]][opposite[1]] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["f" /* CELL_EMPTY */]) {
                walls.splice(walls.indexOf(randomWall), 1);
            } else {
                drawWay(randomWall[0], randomWall[1], false);
                drawWay(opposite[0], opposite[1], true);
            }
        } else {
            walls.splice(walls.indexOf(randomWall), 1);
        }
    }

    // добавдяем стены вокруг всего лабиринта
    var horizontalBorder = [];
    for (var x = 0; x < width + 2; x++) {
        horizontalBorder.push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
    }
    for (var y = 0; y < height; y++) {
        map[y].push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
        map[y].unshift(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
    }

    map.push(horizontalBorder);
    map.unshift(horizontalBorder);

    map[1][width + 1] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["i" /* CELL_EXIT */];

    return map;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Map__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Unit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Player__ = __webpack_require__(4);







// станавливаем размеры юнитов для CSS
let styles = document.createElement('style');
styles.innerHTML = `.unit {width: ${__WEBPACK_IMPORTED_MODULE_2__constants_constants__["a" /* SIZE_CELL */]}px; height: ${__WEBPACK_IMPORTED_MODULE_2__constants_constants__["a" /* SIZE_CELL */]}px;}`;
document.body.appendChild(styles);

let mazeOverflow = document.querySelector('.js-maze-overflow');
const size = __WEBPACK_IMPORTED_MODULE_2__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_2__constants_constants__["b" /* CELLS_ON_SCREEN */];
mazeOverflow.style.width = size + 'px';
mazeOverflow.style.height = size + 'px';

let pause = false;
let map = new __WEBPACK_IMPORTED_MODULE_3__components_Map__["a" /* default */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]));
const initPlayerX = 1;
const initPlayerY = __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */] - 2;
let player = new __WEBPACK_IMPORTED_MODULE_5__components_Player__["a" /* default */](initPlayerX, initPlayerY);
let monsters = [];

// расставляем монстров в случайные свободные клетки
for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_constants__["e" /* MONSTERS_COUNT */]; i++) {
	do {
		var randomCoords = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["a" /* rndCoords */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]);
		var x = randomCoords.x;
		var y = randomCoords.y;
		// вначале игры монстры не могут респавниться около игрока
	} while (Math.abs(initPlayerX - x) < 5 && Math.abs(initPlayerY - y) < 5 || map.data[y][x] !== __WEBPACK_IMPORTED_MODULE_2__constants_constants__["f" /* CELL_EMPTY */]);

	monsters.push(new __WEBPACK_IMPORTED_MODULE_4__components_Unit__["a" /* default */](x, y));
}

function checkWin() {
	if (player.x === map.exit.x && player.y === map.exit.y) {
		alert('Win!');
		clearInterval(monstersInterval);
		window.location.reload();
	}
}

function checkLoss() {
	monsters.forEach(function (monster) {
		if (monster.x === player.x && monster.y === player.y) {
			alert('Loss!');
			clearInterval(monstersInterval);
			window.location.reload();
		}
	});
}

// Управление игроком
document.addEventListener('keydown', function (event) {
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

	monsters.forEach(function (monster) {
		let freeSiblingCells = getFreeSiblingCells(monster.x, monster.y);

		// на перекрестке монстр может исзменить направление
		if (freeSiblingCells.length > 2) {
			// но не может повернуть назад
			let prevDirectionIndex = freeSiblingCells.indexOf(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["b" /* getOpppositeDirection */])(monster.direction));
			freeSiblingCells.splice(prevDirectionIndex, 1);
			monster.direction = freeSiblingCells[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* rnd */])(0, freeSiblingCells.length - 1)];
		} else {
			if (!monster.direction || !isEmptySiblingCell(monster)) {
				// выбираем случаейное возможное направление
				monster.direction = freeSiblingCells[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* rnd */])(0, freeSiblingCells.length - 1)];
			}
		}

		monster['move' + monster.direction]();
		monster.redrawDirection(monster.direction);
	});

	checkLoss();
}, __WEBPACK_IMPORTED_MODULE_2__constants_constants__["g" /* SPEED */]);

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
window.addEventListener('blur', function () {
	pause = true;
});

window.addEventListener('focus', function () {
	pause = false;
});

/***/ })
/******/ ]);