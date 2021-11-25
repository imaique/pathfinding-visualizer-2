import {
  getKey,
  getMazeNeighbor,
  getNeighborIncrements,
  isOuterBoard,
  isSameCoordinates,
  isValid,
  isValidWall,
} from '../shared.js';

export const aldous = (start, end, grid) => {
  const neighbors = getNeighborIncrements(false);
  const unvisitedNodes = new Set();
  for (let i = 2 - (start.y % 2); i < grid.length - 1; i += 2) {
    for (let j = 2 - (start.x % 2); j < grid[i].length - 1; j += 2) {
      unvisitedNodes.add(getKey({ x: j, y: i }));
    }
  }
  unvisitedNodes.delete(getKey(start));
  if (isOuterBoard(end.x, end.y, grid)) {
    if (
      (start.y % 2 === 0 && end.y === grid.length - 1) ||
      (start.x % 2 === 0 && end.x === grid[0].length - 1)
    )
      unvisitedNodes.add(getKey(end));
  }

  let currentNode = start;

  const visitedOrder = [];

  while (unvisitedNodes.size !== 0) {
    const currentNeighbors = [];
    neighbors.forEach((increment) => {
      const currentNeighbor = getMazeNeighbor(increment, currentNode);
      if (
        isValidWall(currentNeighbor, grid) ||
        isSameCoordinates(end, currentNeighbor)
      )
        currentNeighbors.push(currentNeighbor);
    });

    const randomNeighbor =
      currentNeighbors[Math.floor(Math.random() * currentNeighbors.length)];
    const neighborKey = getKey(randomNeighbor);
    if (unvisitedNodes.has(neighborKey)) {
      visitedOrder.push(randomNeighbor.wall);
      visitedOrder.push(randomNeighbor);
      unvisitedNodes.delete(neighborKey);
    }
    currentNode = randomNeighbor;
  }

  return visitedOrder;
};
