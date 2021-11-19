import Queue from '../../data_structures/Queue.js';
import { getPath, isValid, getNeighborIncrements } from './shared.js';

export const bfs = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);

  const queue = new Queue();
  const visitedOrder = [];
  const visited = new Set();

  queue.enqueue(start);
  visited.add(`${start.y}_${start.x}`);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (current.x === end.x && current.y === end.y) {
      let path = getPath(current);
      return [visitedOrder, path];
    }

    visitedOrder.push(current);

    for (let increments of neighbors) {
      const neighbor = {
        x: current.x + increments.x,
        y: current.y + increments.y,
      };
      if (isValid(neighbor.x, neighbor.y, grid, visited)) {
        neighbor.prev = current;
        queue.enqueue(neighbor);
        visited.add(`${neighbor.y}_${neighbor.x}`);
      }
    }
  }
  return [visitedOrder, []];
};
