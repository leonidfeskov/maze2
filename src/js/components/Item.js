import { SIZE_CELL } from '../constants/constants';


export default class Item {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;

        this.draw();
    }

    draw() {
        this.node = document.createElement('div');
        this.node.className = `item item_${this.type}`;
        this.node.style.left = (this.x * SIZE_CELL) + 'px';
        this.node.style.top = (this.y * SIZE_CELL) + 'px';
        document.querySelector('.js-maze').appendChild(this.node);
    }

    moveToInventory() {
        this.node.style.left = 0;
        this.node.style.top = 0;
        setTimeout(() => {
            this.node.remove();
        }, 500);
    }
}
