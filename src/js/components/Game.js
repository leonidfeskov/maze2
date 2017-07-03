import generateMaze from '../utils/generateMaze';
import { rnd, rndCoords, getOpppositeDirection } from '../utils/utils';
import { CELL_EMPTY, MONSTER_SPEED, PLAYER_SPEED, KEYS_COUNT, ITEM_KEY} from '../constants/constants';
import { showPopupLoss, showPopupWin, showPopupKeys } from './Popup';
import Map from './Map';
import Unit from './Unit';
import Player from './Player';
import Item from './Item';
import Inventory from './Inventory';


export default class Game {
    constructor(options) {
        this.pause = false;
        this.gameOver = false;

        let initPlayerX = 1;
        let initPlayerY = 1;
        // генерируем и рисуем карту
        this.map = new Map(generateMaze(options.sizeX, options.sizeY));

        // раскладываем ключи по карте
        this.items = [];
        for (let i = 0; i < KEYS_COUNT; i++) {
            do {
                let randomCoords = rndCoords(options.sizeX, options.sizeY);
                var x = randomCoords.x;
                var y =  randomCoords.y;
            } while(this.map.data[y][x] !== CELL_EMPTY);
            this.items.push(new Item(ITEM_KEY, x, y));
        }

        // инитим игрока
        this.player = new Player(initPlayerX, initPlayerY);
        this.initPlayerControl();

        // инитим инвентарь, в который игрок будет класть предметы
        this.inventory = new Inventory();

        // расставляем монстров в случайные свободные клетки и запускаем их движение
        this.monsters = [];
        for (let i = 0; i < options.monsters; i++) {
            do {
                let randomCoords = rndCoords(options.sizeX, options.sizeY);
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
            this.pause = true;
            let key = this.inventory.items.key;
            if (!key || key.length < KEYS_COUNT) {
                document.querySelector('.js-keys-count').innerHTML = KEYS_COUNT - key.length;
                showPopupKeys();
            } else {
                this.gameOver = true;
                showPopupWin();
            }
        }
    }

    checkLoss() {
        // Игрок и монстр оказались на одной клетке
        this.monsters.forEach(monster => {
            if (monster.x === this.player.x && monster.y === this.player.y) {
                this.pause = true;
                this.gameOver = true;
                showPopupLoss();
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
            this.items.forEach((item) => {
                if (this.player.x === item.x && this.player.y === item.y) {
                    item.moveToInventory();
                    this.inventory.addItem(item);
                }
            });
        };

        const callbacksAfterMove = () => {
            takeItem();
            // показываем другую часть карты, если игрок вышел за границы текущей
            this.map.updatePosition(this.player.x, this.player.y);
            this.checkWin();
            this.checkLoss();
        };

        // Управление с клавиатуры
        document.addEventListener('keydown', function(event) {
            if (this.gameOver) {
                return false;
            }

            if (event.keyCode < 37 || event.keyCode > 40 || this.player.isMoveProcess) {
                return false;
            }

            this.pause = false;

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

            callbacksAfterMove();
        }.bind(this));

        // Управление с помощью контролов на странице
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            let controls = document.querySelector('.js-controls');
            let controlLeft = controls.querySelector('.js-control-left');
            let controlRight = controls.querySelector('.js-control-right');
            let controlUp = controls.querySelector('.js-control-up');
            let controlDown = controls.querySelector('.js-control-down');

            controlLeft.addEventListener('touchstart', function(event) {
                this.pause = false;
                if (this.gameOver) {
                    return false;
                }
                event.preventDefault();
                checkAndMoveLeft();
                callbacksAfterMove();
            }.bind(this));

            controlRight.addEventListener('touchstart', function(event) {
                this.pause = false;
                if (this.gameOver) {
                    return false;
                }
                event.preventDefault();
                checkAndMoveRight();
                callbacksAfterMove();
            }.bind(this));

            controlUp.addEventListener('touchstart', function(event) {
                this.pause = false;
                if (this.gameOver) {
                    return false;
                }
                event.preventDefault();
                checkAndMoveUp();
                callbacksAfterMove();
            }.bind(this));

            controlDown.addEventListener('touchstart', function(event) {
                this.pause = false;
                if (this.gameOver) {
                    return false;
                }
                event.preventDefault();
                checkAndMoveDown();
                callbacksAfterMove();
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
