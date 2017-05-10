import generateMaze from '../utils/generateMaze';
import { rnd, rndCoords, getOpppositeDirection } from '../utils/utils';
import { CELLS_BY_X, CELLS_BY_Y, CELL_EMPTY,
    MONSTER_SPEED, PLAYER_SPEED } from '../constants/constants';
import Map from './Map';
import Unit from './Unit';
import Player from './Player';


export default class Game {
	constructor(options) {
	    this.pause = false;

        let initPlayerX = 1;
        let initPlayerY = 1;
		// генерируем и рисуем карту
        this.map = new Map(generateMaze(CELLS_BY_X, CELLS_BY_Y));

        // инитим игрока
		this.player = new Player(initPlayerX, initPlayerY);
        this.initPlayerControl();

		// расставляем монстров в случайные свободные клетки и запускаем их движение
        this.monsters = [];
        for (let i = 0; i < options.monsters; i++) {
            do {
                let randomCoords = rndCoords(CELLS_BY_X, CELLS_BY_Y);
                var x = randomCoords.x;
                var y =  randomCoords.y;
            } while(
                // Делаем безопастное пространство для игрока 5x5 клеток в начале игры
            	(Math.abs(x - initPlayerX) < 5 && Math.abs(y - initPlayerY) < 5) ||
            	this.map.data[y][x] !== CELL_EMPTY
			);
            this.monsters.push(new Unit(x, y));
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
            }, PLAYER_SPEED);
        }

        const checkAndMoveLeft = () => {
            if (this.map.isEmptyCell(this.player.x - 1, this.player.y)) {
                this.player.redrawDirection('Left');
                this.player.moveLeft();
            }
        }

        const checkAndMoveUp = () => {
            if (this.map.isEmptyCell(this.player.x, this.player.y - 1)) {
                this.player.redrawDirection('Up');
                this.player.moveUp();
            }
        }

        const checkAndMoveRight = () => {
            if (this.map.isEmptyCell(this.player.x + 1, this.player.y)) {
                this.player.redrawDirection('Right');
                this.player.moveRight();
            }
        }

        const checkAndMoveDown = () => {
            if (this.map.isEmptyCell(this.player.x, this.player.y + 1)) {
                this.player.redrawDirection('Down');
                this.player.moveDown();
            }
        }

        // Управление с клавиатуры
        document.addEventListener('keydown', function(event) {
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

            // показываем другую часть карты, если игрок вышел за границы текущей
            this.map.updatePosition(this.player.x, this.player.y);

            this.checkWin();
            this.checkLoss();
        }.bind(this));

        // Управление с помощью контролов на странице
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            let controls = document.querySelector('.js-controls');
            let controlLeft = controls.querySelector('.js-control-left');
            let controlRight = controls.querySelector('.js-control-right');
            let controlUp = controls.querySelector('.js-control-up');
            let controlDown = controls.querySelector('.js-control-down');

            controlLeft.addEventListener('touchstart', function() {
                checkAndMoveLeft();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlRight.addEventListener('touchstart', function() {
                checkAndMoveRight();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlUp.addEventListener('touchstart', function() {
                checkAndMoveUp();
                this.map.updatePosition(this.player.x, this.player.y);
                this.checkWin();
                this.checkLoss();
            }.bind(this));

            controlDown.addEventListener('touchstart', function() {
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
                    let prevDirectionIndex = freeSiblingCells.indexOf(getOpppositeDirection(monster.direction));
                    freeSiblingCells.splice(prevDirectionIndex, 1);
                    monster.direction = freeSiblingCells[rnd(0, freeSiblingCells.length - 1)];
                } else {
                    if (!monster.direction || !isEmptySiblingCell(monster, this.map)) {
                        // выбираем случайное возможное направление
                        monster.direction = freeSiblingCells[rnd(0, freeSiblingCells.length - 1)];
                    }
                }

                monster['move' + monster.direction]();
                monster.redrawDirection(monster.direction);
            });

            this.checkLoss();
        }, MONSTER_SPEED);
    }
}


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
