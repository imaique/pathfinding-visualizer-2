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

export const astar = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);
  const queue = new PriorityQueue();
  const visitedOrder = [];
  const inVisitedOrder = new Set();
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
    const currentKey = getKey(current);
    if (!inVisitedOrder.has(currentKey)) {
      visitedOrder.push(current);
      inVisitedOrder.add(currentKey);
    }

    for (let increments of neighbors) {
      const neighbor = getCurrentNeighbor(increments, current);
      if (isValid(neighbor.x, neighbor.y, grid)) {
        neighbor.prev = current;

        neighbor.cost =
          current.cost +
          grid[neighbor.y][neighbor.x].weight *
            (isDiagonal(current, neighbor) ? Math.SQRT2 : 1);
        const x = Math.abs(neighbor.x - end.x);
        const y = Math.abs(neighbor.y - end.y);

        const key = getKey(neighbor);
        if (!visited.has(key) || visited.get(key) > neighbor.cost) {
          const distanceFromEnd = Math.sqrt(x * x + y * y);
          /*
            const distanceFromEnd = isDiagonalNeighbors
            ? Math.sqrt(x * x + y * y)
            : x + y;
          */
          queue.push(neighbor, neighbor.cost + distanceFromEnd);
          visited.set(key, neighbor.cost);
        }
      }
    }
  }
  return [visitedOrder, []];
};
