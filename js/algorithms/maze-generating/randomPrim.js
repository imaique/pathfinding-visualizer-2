import { getKey, getNeighborIncrements, isValidWall } from '../shared.js';
import RandomQueue from '../../data_structures/RandomQueue.js';

export const randomPrim = (start, end, grid) => {
  const neighbors = getNeighborIncrements(false);
  const queue = new RandomQueue();
  for (let neighbor of neighbors) {
    queue.enqueue({
      x: start.x + neighbor.x,
      y: start.y + neighbor.y,
      horizontal: neighbor.x !== 0,
    });
  }

  const visited = new Set();
  visited.add(getKey(start));

  const visitedOrder = [];

  while (!queue.isEmpty()) {
    const wall = queue.dequeue();
    const first = wall.horizontal
      ? { x: wall.x - 1, y: wall.y }
      : { x: wall.x, y: wall.y - 1 };
    const second = wall.horizontal
      ? { x: wall.x + 1, y: wall.y }
      : { x: wall.x, y: wall.y + 1 };

    if (isValidWall(first, grid) && isValidWall(second, grid)) {
      const firstIsVisited = visited.has(getKey(first));
      const secondIsVisited = visited.has(getKey(second));

      //XOR
      if (
        (firstIsVisited && !secondIsVisited) ||
        (!firstIsVisited && secondIsVisited)
      ) {
        const nodeToVisit = firstIsVisited ? second : first;
        visited.add(getKey(nodeToVisit));
        visitedOrder.push(wall);
        visitedOrder.push(nodeToVisit);

        for (let neighbor of neighbors) {
          queue.enqueue({
            x: nodeToVisit.x + neighbor.x,
            y: nodeToVisit.y + neighbor.y,
            horizontal: neighbor.x !== 0,
          });
        }
      }
    }
  }
  return visitedOrder;
};
