import { SIZE_CELL } from '../constants/constants';


export default class Unit {
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
		this.node.style.left = (this.x * SIZE_CELL) + 'px';
		this.node.style.top = (this.y * SIZE_CELL) + 'px';
	}

	redrawDirection(direction) {
		let classes = this.node.classList;
		classes.remove('left', 'up', 'right', 'down');
		classes.add(direction.toLowerCase());
	}
}