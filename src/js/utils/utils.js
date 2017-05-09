export function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rndCoords(width, height) {
	return {
		x: rnd(0, width - 1),
		y: rnd(0, height - 1)
	};
}

export function getOpppositeDirection(direction) {
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
}

const checkImage = texture =>
	new Promise(resolve => {
		texture.onload = () => resolve();
	});

export const loadImages = (...textures) => Promise.all(textures.map(checkImage));