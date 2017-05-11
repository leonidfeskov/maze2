import { SIZE_CELL, CELLS_ON_SCREEN } from '../constants/constants';


export default class Inventory {
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
        item.x = null;
        item.y = null;
        this.items[type].push(item);
        this.redraw();
    }

    draw() {
        this.node.style.width = (CELLS_ON_SCREEN * SIZE_CELL) + 'px';
        this.node.style.height = SIZE_CELL + 'px';
    }

    redraw() {
        let html = '';
        for (let type in this.items) {
            let count = this.items[type].length;
            html += `<div class="inventory__item inventory__item_${type}">
                <span class="inventory__item-count">${count}</span>
            </div>`;
        }
        this.node.innerHTML = html;
    }
}
