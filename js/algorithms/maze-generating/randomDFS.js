import Stack from '../../data_structures/Stack.js';
import NodeStates from '../../enums/NodeStates.js';
import { getNeighborIncrements, isValid, shuffle } from '../shared.js';

export const randomDFS = (start, end, grid) => {
  const neighbors = getNeighborIncrements(false);
  const stack = new Stack();
  const visited = new Set();
  const visitedOrder = [];

  stack.push(start);

  while (!stack.isEmpty()) {
    const current = stack.pop();
    if (visited.has(`${current.y}_${current.x}`)) continue;
    visited.add(`${current.y}_${current.x}`);
    if (current.wall !== undefined) visitedOrder.push(current.wall);
    visitedOrder.push(current);
    let possibilities = [];
    for (let increments of neighbors) {
      const neighbor = {
        x: current.x + increments.x * 2,
        y: current.y + increments.y * 2,
        wall: { x: current.x + increments.x, y: current.y + increments.y },
      };
      if (isValid(neighbor.x, neighbor.y, grid, visited, NodeStates.unvisited))
        possibilities.push(neighbor);
    }
    possibilities = shuffle(possibilities);
    for (let neighbor of possibilities) {
      stack.push(neighbor);
    }
  }

  return visitedOrder;
};
