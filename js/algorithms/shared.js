import NodeStates from '../enums/NodeStates.js';
// if visited is undefined, then you do not check if the current coordinates are in it.
export const isValid = (x, y, grid, visited, state = NodeStates.wall) => {
  return (
    x >= 0 &&
    x < grid[0].length &&
    y >= 0 &&
    y < grid.length &&
    (visited === undefined || !visited.has(`${y}_${x}`)) &&
    grid[y][x].nodeState !== state
  );
};

export const getNeighborIncrements = (isDiagonalNeighbors) => {
  let neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // if diagonal neighbors are not allowed and the current is diagonal, skip
      if (!isDiagonalNeighbors && i !== 0 && j !== 0) continue;

      // you can't be your own neighbor
      if (i === 0 && j === 0) continue;

      neighbors.push({ x: j, y: i });
    }
  }
  if (isDiagonalNeighbors)
    neighbors.sort((a, b) => {
      if ((a.x === 0 || a.y === 0) && (b.x === 0 || b.y === 0)) {
        return 0;
      }
      if (a.x === 0 || a.y === 0) return -1;
      if (b.x === 0 || b.y === 0) return 1;
    });
  return neighbors;
};

export const getPath = (lastNode) => {
  let path = [];
  while ('prev' in lastNode) {
    path.push({ x: lastNode.x, y: lastNode.y });
    lastNode = lastNode.prev;
  }
  return path.reverse();
};

export const isDiagonal = (node1, node2) => {
  return node1.x !== node2.x && node1.y !== node2.y;
};

export const shuffle = (array) => {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export const isSameCoordinates = (node1, node2) => {
  return node1.x === node2.x && node1.y === node2.y;
};

export const getKey = (node) => {
  return `${node.y}_${node.x}`;
};

export const getCurrentNeighbor = (increments, current) => {
  return {
    x: current.x + increments.x,
    y: current.y + increments.y,
  };
};

export const getMazeNeighbor = (increments, current) => {
  return {
    x: current.x + increments.x * 2,
    y: current.y + increments.y * 2,
    wall: { x: current.x + increments.x, y: current.y + increments.y },
  };
};

export const nodeIsOuterBoard = (node, heigth, width) => {
  return (
    node.x === 0 ||
    node.y === 0 ||
    node.y === heigth - 1 ||
    node.x === width - 1
  );
};
