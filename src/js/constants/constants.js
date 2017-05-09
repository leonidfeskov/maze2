// размеры лабиринта должны быть нечетными
export const CELLS_BY_X = 33;
export const CELLS_BY_Y = 33;
export const CELLS_ON_SCREEN = 11;

let width = window.innerWidth;
let height = window.innerHeight;
let size = Math.min(width, height);
export const SIZE_CELL = Math.floor(size / CELLS_ON_SCREEN);

export const CELL_EMPTY = 0;
export const CELL_WALL = 1;
export const CELL_EXIT = 2;

export const COLOR_EMPTY = '#fff';
export const COLOR_WALL = '#000';
export const COLOR_EXIT = '#0ff';

export const MONSTERS_COUNT = Math.round(CELLS_BY_X * CELLS_BY_Y / 49);
export const SPEED = 500;
