import Stack from '../../data_structures/Stack.js';
import {
  getPath,
  isValid,
  getNeighborIncrements,
  getCurrentNeighbor,
  getKey,
  isSameCoordinates,
} from '../shared.js';

export const dfs = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(false);

  const stack = new Stack();
  const visitedOrder = [];
  const visited = new Set();

  stack.push(start);
  visited.add(getKey(start));

  while (!stack.isEmpty()) {
    const current = stack.pop();
    if (isSameCoordinates(current, end)) {
      let path = getPath(current);
      return [visitedOrder, path];
    }

    visitedOrder.push(current);
    visited.add(getKey(current));

    for (let increments of neighbors) {
      const neighbor = getCurrentNeighbor(increments, current);
      if (isValid(neighbor.x, neighbor.y, grid, visited)) {
        neighbor.prev = current;
        stack.push(neighbor);
      }
    }
  }
  return [visitedOrder, []];
};
