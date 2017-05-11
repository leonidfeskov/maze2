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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// размеры лабиринта должны быть нечетными
const CELLS_BY_X = 11;
/* harmony export (immutable) */ __webpack_exports__["c"] = CELLS_BY_X;

const CELLS_BY_Y = 11;
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
/* harmony export (immutable) */ __webpack_exports__["j"] = CELL_WALL;

const CELL_EXIT = 2;
/* harmony export (immutable) */ __webpack_exports__["k"] = CELL_EXIT;


const MONSTER_SPEED = 500;
/* harmony export (immutable) */ __webpack_exports__["i"] = MONSTER_SPEED;

const PLAYER_SPEED = 100;
/* harmony export (immutable) */ __webpack_exports__["h"] = PLAYER_SPEED;


const ITEM_KEY = 'key';
/* harmony export (immutable) */ __webpack_exports__["g"] = ITEM_KEY;


const KEYS_COUNT = 5;
/* harmony export (immutable) */ __webpack_exports__["e"] = KEYS_COUNT;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Unit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Player__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Item__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Inventory__ = __webpack_require__(9);









class Game {
    constructor(options) {
        this.pause = false;

        let initPlayerX = 1;
        let initPlayerY = 1;
        // генерируем и рисуем карту
        this.map = new __WEBPACK_IMPORTED_MODULE_3__Map__["a" /* default */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_generateMaze__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]));

        // раскладываем ключи по карте
        this.items = [];
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_constants__["e" /* KEYS_COUNT */]; i++) {
            do {
                let randomCoords = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["a" /* rndCoords */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]);
                var x = randomCoords.x;
                var y = randomCoords.y;
            } while (this.map.data[y][x] !== __WEBPACK_IMPORTED_MODULE_2__constants_constants__["f" /* CELL_EMPTY */]);
            this.items.push(new __WEBPACK_IMPORTED_MODULE_6__Item__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__constants_constants__["g" /* ITEM_KEY */], x, y));
        }

        // инитим игрока
        this.player = new __WEBPACK_IMPORTED_MODULE_5__Player__["a" /* default */](initPlayerX, initPlayerY);
        this.initPlayerControl();

        // инитим инвентарь, в который игрок будет класть предметы
        this.inventory = new __WEBPACK_IMPORTED_MODULE_7__Inventory__["a" /* default */]();

        // расставляем монстров в случайные свободные клетки и запускаем их движение
        this.monsters = [];
        for (let i = 0; i < options.monsters; i++) {
            do {
                let randomCoords = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_utils__["a" /* rndCoords */])(__WEBPACK_IMPORTED_MODULE_2__constants_constants__["c" /* CELLS_BY_X */], __WEBPACK_IMPORTED_MODULE_2__constants_constants__["d" /* CELLS_BY_Y */]);
                var x = randomCoords.x;
                var y = randomCoords.y;
            } while (
            // Делаем безопастное пространство для игрока 5x5 клеток в начале игры
            Math.abs(x - initPlayerX) < 5 && Math.abs(y - initPlayerY) < 5 || this.map.data[y][x] !== __WEBPACK_IMPORTED_MODULE_2__constants_constants__["f" /* CELL_EMPTY */]);
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
        // очередное перемещение игрока возможно только через PLAYER_SPEED ms
        const processMoving = () => {
            this.player.isMoveProcess = true;
            window.setTimeout(() => {
                this.player.isMoveProcess = false;
            }, __WEBPACK_IMPORTED_MODULE_2__constants_constants__["h" /* PLAYER_SPEED */]);
        };

        const checkAndMoveLeft = () => {
            if (this.map.isEmptyCell(this.player.x - 1, this.player.y)) {
                this.player.redrawDirection('Left');
                this.player.moveLeft();
            }
        };

        const checkAndMoveUp = () => {
            if (this.map.isEmptyCell(this.player.x, this.player.y - 1)) {
                this.player.redrawDirection('Up');
                this.player.moveUp();
            }
        };

        const checkAndMoveRight = () => {
            if (this.map.isEmptyCell(this.player.x + 1, this.player.y)) {
                this.player.redrawDirection('Right');
                this.player.moveRight();
            }
        };

        const checkAndMoveDown = () => {
            if (this.map.isEmptyCell(this.player.x, this.player.y + 1)) {
                this.player.redrawDirection('Down');
                this.player.moveDown();
            }
        };

        const takeItem = () => {
            this.items.forEach(item => {
                if (this.player.x === item.x && this.player.y === item.y) {
                    this.inventory.addItem(item);
                    item.node.remove();
                }
            });
        };

        // Управление с клавиатуры
        document.addEventListener('keydown', function (event) {
            if (event.keyCode < 37 || event.keyCode > 40 || this.player.isMoveProcess) {
                return false;
            }

            processMoving();

            switch (event.keyCode) {
                case 37:
                    checkAndMoveLeft();
                    break;
                case 38:
                    checkAndMoveUp();
                    break;
                case 39:
                    checkAndMoveRight();
                    break;
                case 40:
                    checkAndMoveDown();
                    break;
                default:
                    break;
            }

            takeItem();

            // показываем другую часть карты, если игрок вышел за границы текущей
            this.map.updatePosition(this.player.x, this.player.y);

            this.checkWin();
            this.checkLoss();
        }.bind(this));

        // Управление с помощью контролов на странице
        if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
            let controls = document.querySelector('.js-controls');
            let controlLeft = controls.querySelector('.js-control-left');
            let controlRight = controls.querySelector('.js-control-right');
            let controlUp = controls.querySelector('.js-control-up');
            let controlDown = controls.querySelector('.js-control-down');

            controlLeft.addEventListener('touchstart', function (event) {
                event.preventDefault();
                checkAndMoveLeft();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlRight.addEventListener('touchstart', function (event) {
                event.preventDefault();
                checkAndMoveRight();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlUp.addEventListener('touchstart', function (event) {
                event.preventDefault();
                checkAndMoveUp();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlDown.addEventListener('touchstart', function (event) {
                event.preventDefault();
                checkAndMoveDown();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controls.style.display = 'block';
        }
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
        }, __WEBPACK_IMPORTED_MODULE_2__constants_constants__["i" /* MONSTER_SPEED */]);
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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Game__ = __webpack_require__(3);



// размеры юнитов зависят от ширины/высоты экрана,
// чтобы не задавать размеры каждому юниту отделльно, просто добавляем общее CSS-правило
let styles = document.createElement('style');
styles.innerHTML = `.unit, .item {width: ${__WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]}px; height: ${__WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]}px;}`;
document.body.appendChild(styles);

// размеры видимой области карты также зависят от ширины/высоты экрана
const mapSize = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */];
let mazeOverflowNode = document.querySelector('.js-maze-overflow');
mazeOverflowNode.style.width = mapSize + 'px';
mazeOverflowNode.style.height = mapSize + 'px';

// создаем игру
let game = new __WEBPACK_IMPORTED_MODULE_1__components_Game__["a" /* default */]({
	monsters: 0
});

// пауза
window.addEventListener('blur', function () {
	game.pause = true;
});
window.addEventListener('focus', function () {
	game.pause = false;
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);


class Item {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;

        this.draw();
    }

    draw() {
        this.node = document.createElement('div');
        this.node.className = `item item_${this.type}`;
        this.node.style.left = this.x * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
        this.node.style.top = this.y * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
        document.querySelector('.js-maze').appendChild(this.node);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Item;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_utils__ = __webpack_require__(2);



// загрузка текстур
const textureNames = ['cell-wall', 'cell-exit'];
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

				switch (cell) {
					case __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]:
						this.drawCell(x, y, textures[0]);
						break;
					case __WEBPACK_IMPORTED_MODULE_0__constants_constants__["k" /* CELL_EXIT */]:
						this.exit = {
							x: x,
							y: y
						};
						this.drawCell(x, y, textures[1]);
						break;
				}
			}
		}
	}

	isEmptyCell(x, y) {
		return x >= 0 && x < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] && y >= 0 && y < __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] && this.data[y][x] !== __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */];
	}

	updatePosition(x, y) {
		const average = Math.floor(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["b" /* CELLS_ON_SCREEN */] / 2);

		if (x > average - 1 && __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] - x > average) {
			this.maze.style.left = -((x - average) * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]) + 'px';
		}
		if (y > average - 1 && __WEBPACK_IMPORTED_MODULE_0__constants_constants__["d" /* CELLS_BY_Y */] - y > average) {
			this.maze.style.top = -((y - average) * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */]) + 'px';
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;


/***/ }),
/* 7 */
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
/* 8 */
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
            map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */];
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["f" /* CELL_EMPTY */];
        if (addBlockWalls && isInScope(map, [y + 1, x]) && map[y + 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y - 1, x]) && map[y - 1][x] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x + 1]) && map[y][x + 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && isInScope(map, [y, x - 1]) && map[y][x - 1] == __WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]) walls.push([y, x - 1, [y, x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        let randomWall = walls[Math.floor(Math.random() * walls.length)];
        let host = randomWall[2];
        let opposite = [host[0] + (randomWall[0] - host[0]) * 2, host[1] + (randomWall[1] - host[1]) * 2];
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
    let horizontalBorder = [];
    for (let x = 0; x < width + 2; x++) {
        horizontalBorder.push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]);
    }
    for (let y = 0; y < height; y++) {
        map[y].push(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]);
        map[y].unshift(__WEBPACK_IMPORTED_MODULE_0__constants_constants__["j" /* CELL_WALL */]);
    }

    map.push(horizontalBorder);
    map.unshift(horizontalBorder);

    const length = map.length;
    map[length - 2][length - 1] = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["k" /* CELL_EXIT */];

    return map;
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_constants__ = __webpack_require__(0);


class Inventory {
    constructor() {
        this.items = {};
        this.node = document.querySelector('.js-inventory');
        this.draw();
    }

    addItem(item) {
        const type = item.type;
        if (!this.items[type]) {
            this.items[type] = [];
        }
        this.items[type].push(item);
        this.redraw();
    }

    draw() {
        this.node.style.width = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["c" /* CELLS_BY_X */] * __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
        this.node.style.height = __WEBPACK_IMPORTED_MODULE_0__constants_constants__["a" /* SIZE_CELL */] + 'px';
    }

    redraw() {
        let html = '';
        for (let type in this.items) {
            let count = this.items[type].length;
            html += `<div class="inventory__item"><span class="inventory__item-count">${count}</span></div>`;
        }
        this.node.innerHTML = html;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Inventory;


/***/ })
/******/ ]);