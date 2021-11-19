import {
  isDiagonal,
  getPath,
  isValid,
  getNeighborIncrements,
} from './shared.js';
import PriorityQueue from '../data_structures/PriorityQueue.js';

export const astar = (start, end, grid, isDiagonalNeighbors) => {
  const neighbors = getNeighborIncrements(isDiagonalNeighbors);
  const queue = new PriorityQueue();
  const visitedOrder = [];
  const visited = new Map();
  start.cost = 0;
  queue.push(start, 0);
  visited.set(`${start.y}_${start.x}`, 0);
  console.log('correct');
  while (!(queue.length === 0)) {
    const current = queue.pop();
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
        // if diagonal, increase the cost by 1 to prevent weird paths;

        neighbor.cost =
          current.cost +
          grid[neighbor.y][neighbor.x].weight *
            (isDiagonal(current, neighbor) ? Math.SQRT2 : 1);
        const x = Math.abs(neighbor.x - end.x);
        const y = Math.abs(neighbor.y - end.y);

        const distanceFromEnd = Math.sqrt(x * x + y * y);
        const key = `${neighbor.y}_${neighbor.x}`;
        if (!visited.has(key) || visited.get(key) > neighbor.cost) {
          queue.push(neighbor, neighbor.cost + distanceFromEnd);
          visited.set(key, neighbor.cost);
        }
      }
    }
  }
  return [visitedOrder, []];
};
