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
/* harmony export (immutable) */ __webpack_exports__["e"] = CELL_EMPTY;

const CELL_WALL = 1;
/* harmony export (immutable) */ __webpack_exports__["h"] = CELL_WALL;

const CELL_EXIT = 2;
/* harmony export (immutable) */ __webpack_exports__["i"] = CELL_EXIT;


const MONSTER_SPEED = 500;
/* harmony export (immutable) */ __webpack_exports__["g"] = MONSTER_SPEED;

const PLAYER_SPEED = 100;
/* harmony export (immutable) */ __webpack_exports__["f"] = PLAYER_SPEED;


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
const rnd = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = rnd;


const rndCoords = (width, height) => {
	return {
		x: rnd(0, width - 1),
		y: rnd(0, height - 1)
	};
};
/* harmony export (immutable) */ __webpack_exports__["a"] = rndCoords;


const getOpppositeDirection = direction => {
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
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getOpppositeDirection;


const checkImage = texture => {
	return new Promise(resolve => {
		texture.onload = () => resolve();
	});
};

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

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["d" /* loadImages */])(...textures).then(() => {
			this.draw();
		});
	}

	drawCell(x, y, texture) {
		let heightWall = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] / 5;
		this.ctx.drawImage(texture, x * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] - heightWall, y * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] - heightWall, __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + heightWall, __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + heightWall);
	}

	draw() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		for (let y = 0; y < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */]; y++) {
			for (let x = 0; x < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */]; x++) {
				let cell = this.data[y][x];

				if (cell === __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) {
					this.drawCell(x, y, textures[0]);
				}

				if (cell === __WEBPACK_IMPORTED_MODULE_0__constants_constants__["i" /* CELL_EXIT */]) {
					console.log(x, y);
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
		return x >= 0 && x < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] && y >= 0 && y < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] && this.data[y][x] !== __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */];
	}

	updatePosition(x, y) {
		let areaX = Math.floor(x / __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]);
		let areaY = Math.floor(y / __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]);

		this.maze.style.left = -(areaX * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]) + 'px';
		this.maze.style.top = -(areaY * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */]) + 'px';
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


const isInScope = (map, coord) => {
    return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
};

function generateMaze(width, height) {
    // уменьшаем размер на 2 клетки, потому что потом добавим стены вокруг лабиринта
    width -= 2;
    height -= 2;

    const currentPosition = [0, 0];
    let map = [];
    let walls = [];

    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */];
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["e" /* CELL_EMPTY */];
        if (addBlockWalls && isInScope(map, [y + 1, x]) && map[y + 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y - 1, x]) && map[y - 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x + 1]) && map[y][x + 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x - 1]) && map[y][x - 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]) walls.push([y, x - 1, [y, x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        let randomWall = walls[Math.floor(Math.random() * walls.length)];
        let host = randomWall[2];
        let opposite = [host[0] + (randomWall[0] - host[0]) * 2, host[1] + (randomWall[1] - host[1]) * 2];
        if (isInScope(map, opposite)) {
            if (map[opposite[0]][opposite[1]] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["e" /* CELL_EMPTY */]) {
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
    let horizontalBorder = [];
    for (let x = 0; x < width + 2; x++) {
        horizontalBorder.push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
    }
    for (let y = 0; y < height; y++) {
        map[y].push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
        map[y].unshift(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["h" /* CELL_WALL */]);
    }

    map.push(horizontalBorder);
    map.unshift(horizontalBorder);

    const length = map.length;
    map[length - 2][length - 2] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["i" /* CELL_EXIT */];

    return map;
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Game__ = __webpack_require__(7);



// размеры юнитов зависят от ширины/высоты экрана,
// чтобы не задавать размеры каждому юниту отделльно, просто добавляем общее CSS-правило
let styles = document.createElement('style');
styles.innerHTML = `.unit {width: ${__WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]}px; height: ${__WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]}px;}`;
document.body.appendChild(styles);

// размеры видимой области карты также зависят от ширины/высоты экрана
const mapSize = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */];
let mazeOverflowNode = document.querySelector('.js-maze-overflow');
mazeOverflowNode.style.width = mapSize + 'px';
mazeOverflowNode.style.height = mapSize + 'px';

// создаем игру
let game = new __WEBPACK_IMPORTED_MODULE_1__components_Game__["a" /* default */]({
	monsters: 4
});

// пауза
window.addEventListener('blur', function () {
	game.pause = true;
});
window.addEventListener('focus', function () {
	game.pause = false;
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Map__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Unit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Player__ = __webpack_require__(4);







class Game {
    constructor(options) {
        this.pause = false;

        let initPlayerX = 1;
        let initPlayerY = 1;
        // генерируем и рисуем карту
        this.map = new __WEBPACK_IMPORTED_MODULE_3__Map__["a" /* default */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]));

        // инитим игрока
        this.player = new __WEBPACK_IMPORTED_MODULE_5__Player__["a" /* default */](initPlayerX, initPlayerY);
        this.initPlayerControl();

        // расставляем монстров в случайные свободные клетки и запускаем их движение
        this.monsters = [];
        for (let i = 0; i < options.monsters; i++) {
            do {
                let randomCoords = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["a" /* rndCoords */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]);
                var x = randomCoords.x;
                var y = randomCoords.y;
            } while (
            // Делаем безопастное пространство для игрока 5x5 клеток в начале игры
            Math.abs(x - initPlayerX) < 5 && Math.abs(y - initPlayerY) < 5 || this.map.data[y][x] !== __WEBPACK_IMPORTED_MODULE_2__constants_constants__["e" /* CELL_EMPTY */]);
            this.monsters.push(new __WEBPACK_IMPORTED_MODULE_4__Unit__["a" /* default */](x, y));
        }
        this.initMonsterAI();
    }

    checkWin() {
        // Игрок нашел выход
        if (this.player.x === this.map.exit.x && this.player.y === this.map.exit.y) {
            alert('Win!');
            //clearInterval(monstersInterval);
            window.location.reload();
        }
    }

    checkLoss() {
        // Игрок и монстр оказались на одной клетке
        this.monsters.forEach(monster => {
            if (monster.x === this.player.x && monster.y === this.player.y) {
                alert('Loss!');
                //clearInterval(monstersInterval);
                window.location.reload();
            }
        });
    }

    initPlayerControl() {
        document.addEventListener('keydown', function (event) {
            if (event.keyCode < 37 || event.keyCode > 40 || this.player.isMoveProcess) {
                return false;
            }

            this.player.isMoveProcess = true;
            window.setTimeout(() => {
                this.player.isMoveProcess = false;
            }, __WEBPACK_IMPORTED_MODULE_2__constants_constants__["f" /* PLAYER_SPEED */]);

            switch (event.keyCode) {
                case 37:
                    if (this.map.isEmptyCell(this.player.x - 1, this.player.y)) {
                        this.player.redrawDirection('Left');
                        this.player.moveLeft();
                    }
                    break;
                case 38:
                    if (this.map.isEmptyCell(this.player.x, this.player.y - 1)) {
                        this.player.redrawDirection('Up');
                        this.player.moveUp();
                    }
                    break;
                case 39:
                    if (this.map.isEmptyCell(this.player.x + 1, this.player.y)) {
                        this.player.redrawDirection('Right');
                        this.player.moveRight();
                    }
                    break;
                case 40:
                    if (this.map.isEmptyCell(this.player.x, this.player.y + 1)) {
                        this.player.redrawDirection('Down');
                        this.player.moveDown();
                    }
                    break;
                default:
                    break;
            }

            // показываем другую часть карты, если игрок вышел за границы текущей
            this.map.updatePosition(this.player.x, this.player.y);

            this.checkWin();
            this.checkLoss();
        }.bind(this));
    }

    initMonsterAI() {
        setInterval(() => {
            if (this.pause) {
                return;
            }

            this.monsters.forEach(monster => {
                let freeSiblingCells = getFreeSiblingCells(monster.x, monster.y, this.map);

                // на перекрестке монстр может изменить направление
                if (freeSiblingCells.length > 2) {
                    // но не может повернуть назад
                    let prevDirectionIndex = freeSiblingCells.indexOf(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["b" /* getOpppositeDirection */])(monster.direction));
                    freeSiblingCells.splice(prevDirectionIndex, 1);
                    monster.direction = freeSiblingCells[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* rnd */])(0, freeSiblingCells.length - 1)];
                } else {
                    if (!monster.direction || !isEmptySiblingCell(monster, this.map)) {
                        // выбираем случайное возможное направление
                        monster.direction = freeSiblingCells[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["c" /* rnd */])(0, freeSiblingCells.length - 1)];
                    }
                }

                monster['move' + monster.direction]();
                monster.redrawDirection(monster.direction);
            });

            this.checkLoss();
        }, __WEBPACK_IMPORTED_MODULE_2__constants_constants__["g" /* MONSTER_SPEED */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


// TODO оптимизировать
function getFreeSiblingCells(x, y, map) {
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

// TODO оптимизировать
function isEmptySiblingCell(unit, map) {
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

/***/ })
/******/ ]);