import Stack from '../../data_structures/Stack.js';
import {
  getNeighborIncrements,
  shuffle,
  getKey,
  getMazeNeighbor,
  isValidWall,
} from '../shared.js';

export const randomDFS = (start, grid) => {
  const neighbors = getNeighborIncrements(false);
  const stack = new Stack();
  const visited = new Set();
  const visitedOrder = [];

  stack.push(start);

  while (!stack.isEmpty()) {
    const current = stack.pop();

    const currentKey = getKey(current);
    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.wall !== undefined) visitedOrder.push(current.wall);
    visitedOrder.push(current);

    let possibilities = [];
    for (let increments of neighbors) {
      const neighbor = getMazeNeighbor(increments, current);
      if (isValidWall(neighbor, grid)) possibilities.push(neighbor);
    }
    possibilities = shuffle(possibilities);
    for (let neighbor of possibilities) {
      stack.push(neighbor);
    }
  }

  return visitedOrder;
};
