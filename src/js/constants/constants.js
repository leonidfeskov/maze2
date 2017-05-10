// размеры лабиринта должны быть нечетными
export const CELLS_BY_X = 55;
export const CELLS_BY_Y = 55;
export const CELLS_ON_SCREEN = 11;

let width = window.innerWidth;
let height = window.innerHeight;
let size = Math.min(width, height);
export const SIZE_CELL = Math.floor(size / CELLS_ON_SCREEN);

export const CELL_EMPTY = 0;
export const CELL_WALL = 1;
export const CELL_EXIT = 2;

export const MONSTER_SPEED = 500;
export const PLAYER_SPEED = 100;
