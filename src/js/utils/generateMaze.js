import { CELL_EMPTY, CELL_WALL, CELL_EXIT } from '../constants/constants';


var isInScope = function(map, coord) {
    return coord[0] >= 0 && coord[0] < map.length && coord[1] >= 0 && coord[1] < map[0].length;
};

export default function generateMaze(width, height) {
    // размеры лабиринта должны быть нечетными
    height = height % 2 == 0 ? height+1 : height;
    width = width % 2 == 0 ? width + 1 : width;
    var currentPosition = [0, 0];

    var map = [];
    var walls = [];

    for (var y = 0; y < height; y++) {
        map[y] = [];
        for (var x = 0; x < width; x++) {
            map[y][x] = CELL_WALL;
        }
    }

    function drawWay(y, x, addBlockWalls) {
        map[y][x] = CELL_EMPTY;
        if (addBlockWalls && isInScope(map, [y+1, x]) && (map[y+1][x] == CELL_WALL)) walls.push([y+1,  x , [y,x]]);
        if (addBlockWalls && isInScope(map, [y-1, x]) && (map[y-1][x] == CELL_WALL)) walls.push([y-1,  x , [y,x]]);
        if (addBlockWalls && isInScope(map, [y, x+1]) && (map[y][x+1] == CELL_WALL)) walls.push([ y , x+1, [y,x]]);
        if (addBlockWalls && isInScope(map, [y, x-1]) && (map[y][x-1] == CELL_WALL)) walls.push([ y , x-1, [y,x]]);
    }

    drawWay(currentPosition[0], currentPosition[1], true);

    while(walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)];
        var host = randomWall[2];
        var opposite = [(host[0] + (randomWall[0]-host[0])*2), (host[1] + (randomWall[1]-host[1])*2)];
        if (isInScope(map, opposite)) {
            if (map[opposite[0]][opposite[1]] == CELL_EMPTY) {
                walls.splice(walls.indexOf(randomWall), 1);
            } else {
                drawWay(randomWall[0], randomWall[1], false);
                drawWay(opposite[0], opposite[1], true);
            }
        } else {
            walls.splice(walls.indexOf(randomWall), 1);
        }
    }

    map[0][width - 1] = CELL_EXIT;

    return map;
};



