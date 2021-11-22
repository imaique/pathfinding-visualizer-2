import Stack from '../../data_structures/Stack.js';
import { getPath, isValid, getNeighborIncrements } from '../shared.js';

export const dfs = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(false);

  const stack = new Stack();
  const visitedOrder = [];
  const visited = new Set();

  stack.push(start);
  visited.add(`${start.y}_${start.x}`);

  while (!stack.isEmpty()) {
    const current = stack.pop();
    if (current.x === end.x && current.y === end.y) {
      let path = getPath(current);
      return [visitedOrder, path];
    }
    visitedOrder.push(current);
    visited.add(`${current.y}_${current.x}`);

    for (let increments of neighbors) {
      const neighbor = {
        x: current.x + increments.x,
        y: current.y + increments.y,
      };
      if (isValid(neighbor.x, neighbor.y, grid, visited)) {
        neighbor.prev = current;
        stack.push(neighbor);
      }
    }
  }
  return [visitedOrder, []];
};
