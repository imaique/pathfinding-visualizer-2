import DisjointSet from '../../data_structures/DisjointSet.js';

import { shuffle, isValidWall } from '../shared.js';

const randomKruskal = (start, grid) => {
  let walls = [];
  let sets = [];
  console.log(grid);
  for (let i = 0; i < grid.length; i++) {
    let setRow = new Array(grid[i].length);
    /* 
    put walls in the grid like this
    
    x o x o x o x o x
    x x x x x x x x x
    x o x o x o x o x

    where x is wall and o is unvisited cell
    */
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];
      if (i % 2 !== 0) {
        if (j % 2 === 0) walls.push({ x: node.x, y: node.y, horizontal: true });
        else {
          setRow[j] = new DisjointSet();
        }
      } else {
        if (j % 2 !== 0)
          walls.push({ x: node.x, y: node.y, horizontal: false });
      }
    }
    sets.push(setRow);
  }
  walls = shuffle(walls);

  let visitedOrder = [];
  walls.forEach((wall) => {
    const first = wall.horizontal
      ? { x: wall.x - 1, y: wall.y }
      : { x: wall.x, y: wall.y - 1 };
    const second = wall.horizontal
      ? { x: wall.x + 1, y: wall.y }
      : { x: wall.x, y: wall.y + 1 };

    if (isValidWall(first, grid) && isValidWall(second, grid)) {
      const firstAR = sets[first.y][first.x].getAbsoluteRoot();
      const secondAR = sets[second.y][second.x].getAbsoluteRoot();

      if (firstAR !== secondAR) {
        if (Math.random() < 0.5) {
          visitedOrder.push(first);
          visitedOrder.push({ x: wall.x, y: wall.y });
          visitedOrder.push(second);
        } else {
          visitedOrder.push(second);
          visitedOrder.push({ x: wall.x, y: wall.y });
          visitedOrder.push(first);
        }

        firstAR.union(secondAR);
      }
    }
  });
  return visitedOrder;
};

export default randomKruskal;
