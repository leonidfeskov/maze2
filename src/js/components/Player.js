import Unit from './Unit';


export default class Player extends Unit {
	constructor(x, y) {
		super(x, y);
		let classes = this.node.classList;
		classes.add('unit_player');

		this.isMoveProcess = false;
	}
}