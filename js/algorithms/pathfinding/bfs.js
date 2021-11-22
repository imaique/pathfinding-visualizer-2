import Queue from '../../data_structures/Queue.js';
import {
  getPath,
  isValid,
  getNeighborIncrements,
  getCurrentNeighbor,
  getKey,
  isSameCoordinates,
} from '../shared.js';

export const bfs = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);

  const queue = new Queue();
  const visitedOrder = [];
  const visited = new Set();

  queue.enqueue(start);
  visited.add(getKey(start));

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (isSameCoordinates(current, end)) {
      let path = getPath(current);
      return [visitedOrder, path];
    }

    visitedOrder.push(current);

    for (let increments of neighbors) {
      const neighbor = getCurrentNeighbor(increments, current);
      if (isValid(neighbor.x, neighbor.y, grid, visited)) {
        neighbor.prev = current;
        queue.enqueue(neighbor);
        visited.add(getKey(neighbor));
      }
    }
  }
  return [visitedOrder, []];
};
