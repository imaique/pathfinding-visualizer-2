import {
  isDiagonal,
  getPath,
  isValid,
  getNeighborIncrements,
  getCurrentNeighbor,
  getKey,
  isSameCoordinates,
} from '../shared.js';
import PriorityQueue from '../../data_structures/PriorityQueue.js';

export const djikstra = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);
  const queue = new PriorityQueue();
  const visitedOrder = [];
  const visited = new Map();
  start.cost = 0;
  queue.push(start, 0);
  visited.set(getKey(start), 0);

  while (!(queue.length === 0)) {
    const current = queue.pop();
    if (isSameCoordinates(current, end)) {
      let path = getPath(current);
      return [visitedOrder, path];
    }
    visitedOrder.push(current);

    for (let increments of neighbors) {
      const neighbor = getCurrentNeighbor(increments, current);
      if (isValid(neighbor.x, neighbor.y, grid, visited)) {
        neighbor.prev = current;
        // if diagonal, increase the cost by 1 to prevent weird paths;

        neighbor.cost =
          current.cost +
          grid[neighbor.y][neighbor.x].weight *
            (isDiagonal(current, neighbor) ? Math.SQRT2 : 1);
        const key = getKey(neighbor);
        if (!visited.has(key) || visited.get(key) > neighbor.cost) {
          queue.push(neighbor, neighbor.cost);
          visited.set(key, neighbor.cost);
        }
      }
    }
  }
  return [visitedOrder, []];
};
