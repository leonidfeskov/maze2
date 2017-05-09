import { CELLS_BY_X, CELLS_BY_Y, CELLS_ON_SCREEN, SIZE_CELL, CELL_WALL, CELL_EXIT, COLOR_WALL, COLOR_EXIT } from '../constants/constants';
import { loadImages } from '../utils/utils';


// загрузка текстур
const textureNames = ['wall', 'exit'];
const textures = textureNames.map(function(name) {
	const img = new Image();
	img.src = `i/${name}.png`;
	return img;
});


export default class Map {
	constructor(data) {
		this.data = data;
		this.width = CELLS_BY_X * SIZE_CELL;
		this.height = CELLS_BY_Y * SIZE_CELL;

		this.maze = document.querySelector('.js-maze');

		let canvas = document.querySelector('.js-maze-map');
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		var self = this;
		loadImages(...textures).then(function(e) {
			self.draw();
		});
	}

	drawCell(x, y, texture) {
		var heightWall = SIZE_CELL / 5;
		this.ctx.drawImage(texture, x * SIZE_CELL - heightWall, y * SIZE_CELL - heightWall, SIZE_CELL + heightWall, SIZE_CELL + heightWall);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		for (let y = 0; y < CELLS_BY_Y; y++) {
			for (let x = 0; x < CELLS_BY_X; x++) {
				let cell = this.data[y][x];

				if (cell === CELL_WALL) {
					this.drawCell(x, y, textures[0]);
				}

				if (cell === CELL_EXIT) {
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
		if (
			x >= 0 && x < CELLS_BY_X && y >= 0 && y < CELLS_BY_Y &&
			this.data[y][x] !== CELL_WALL
		) {
			return true;
		}
		return false;
	}

	updatePosition(x, y) {
		let areasByY = Math.floor(CELLS_BY_Y / CELLS_ON_SCREEN) - 1;
		let areaX = Math.floor(x / CELLS_ON_SCREEN);
		let areaY = Math.floor(y / CELLS_ON_SCREEN);


		this.maze.style.left = -(areaX * SIZE_CELL * CELLS_ON_SCREEN) + 'px';
		this.maze.style.bottom = -((areasByY - areaY) * SIZE_CELL * CELLS_ON_SCREEN) + 'px';
	}
}