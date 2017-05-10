import { CELLS_BY_X, CELLS_BY_Y, CELLS_ON_SCREEN, SIZE_CELL, CELL_WALL, CELL_EXIT } from '../constants/constants';
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

		loadImages(...textures).then(() => {
			this.draw();
		});
	}

	drawCell(x, y, texture) {
		let heightWall = SIZE_CELL / 5;
		this.ctx.drawImage(texture, x * SIZE_CELL - heightWall, y * SIZE_CELL - heightWall, SIZE_CELL + heightWall, SIZE_CELL + heightWall);
	}

	draw() {
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
		return (
			x >= 0 && x < CELLS_BY_X && y >= 0 && y < CELLS_BY_Y &&
			this.data[y][x] !== CELL_WALL
		);
	}

	updatePosition(x, y) {
		const average = Math.floor(CELLS_ON_SCREEN / 2);

		if (x > (average - 1) && (CELLS_BY_X - x) > average) {
			this.maze.style.left = -((x - average) * SIZE_CELL) + 'px';
		}
		if (y > (average - 1) && (CELLS_BY_Y - y) > average) {
			this.maze.style.top = -((y - average) * SIZE_CELL) + 'px';
		}
	}
}
