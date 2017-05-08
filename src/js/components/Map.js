import { CELLS_BY_X, CELLS_BY_Y, SIZE_CELL, CELL_WALL, CELL_EXIT, COLOR_WALL, COLOR_EXIT } from '../constants/constants';


export default class Map {
	constructor(data) {
		this.data = data;
		this.width = CELLS_BY_X * SIZE_CELL;
		this.height = CELLS_BY_Y * SIZE_CELL;

		let canvas = document.querySelector('.js-maze-map');
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		this.textureWall = document.createElement('img');
		this.textureWall.src = 'i/wall.png';

		this.textureExit = document.createElement('img');
		this.textureExit.src = 'i/exit.png';

		this.textureWall.onload = function() {
			this.draw();
		}.bind(this);
	}

	drawCell(x, y, texture) {
		this.ctx.drawImage(texture, x * SIZE_CELL, y * SIZE_CELL, SIZE_CELL, SIZE_CELL);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (let y = 0; y < CELLS_BY_Y; y++) {
			for (let x = 0; x < CELLS_BY_X; x++) {
				let cell = this.data[y][x];

				if (cell === CELL_WALL) {
					this.drawCell(x, y, this.textureWall);
				}

				if (cell === CELL_EXIT) {
					this.exit = {
						x: x,
						y: y
					};
					this.drawCell(x, y, this.textureExit);
				}
			}
		}
	}

	isEmptyCell(x, y) {
		if (
			x >= 0 && x < CELLS_BY_X && y >= 0 && y < CELLS_BY_Y &&
			this.data[y][x] !== CELL_WALL
		) {
			return true;
		}
		return false;
	}
}