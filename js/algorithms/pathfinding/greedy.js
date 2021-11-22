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

export const greedy = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);
  const queue = new PriorityQueue();
  const visitedOrder = [];
  const visited = new Set();
  start.cost = 0;
  queue.push(start, 0);
  visited.add(getKey(start));

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

        const x = Math.abs(neighbor.x - end.x);
        const y = Math.abs(neighbor.y - end.y);

        const distanceFromEnd = Math.sqrt(x * x + y * y);
        const key = getKey(neighbor);

        queue.push(neighbor, distanceFromEnd);
        visited.add(key);
      }
    }
  }
  return [visitedOrder, []];
};
