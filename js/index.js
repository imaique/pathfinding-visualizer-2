import Board from './classes/Board.js';
import { astar } from './algorithms/astar.js';
import { greedy } from './algorithms/greedy.js';
import { djikstra } from './algorithms/dijkstra.js';
import { bfs } from './algorithms/bfs.js';
import { dfs } from './algorithms/dfs.js';

const algorithms = [
  { name: 'A* Algorithm', algorithm: astar },
  { name: "Dijkstra's algorithm", algorithm: djikstra },
  { name: 'Greedy Best-First Search', algorithm: greedy },
  { name: 'Breadth First Search', algorithm: bfs },
  { name: 'Depth First Search', algorithm: dfs },
];
const boardContainer = document.getElementById('container');
document.getElementById('visualize').addEventListener('click', visualize);

const board = new Board(60, 60, boardContainer);
let currentAlgorithm = algorithms[0];

const pathfindingChoicesElement = document.createElement('div');
for (let algorithm of algorithms) {
  const pathfindingAlgorithmElement = document.createElement('div');
  pathfindingAlgorithmElement.innerHTML = algorithm.name;
  pathfindingAlgorithmElement.className =
    'path-choice' + (algorithm === currentAlgorithm ? ' selected' : '');
  pathfindingAlgorithmElement.addEventListener('click', () => {
    pathfindingAlgorithmElement.className = 'path-choice selected';
  });
  pathfindingChoicesElement.appendChild(pathfindingAlgorithmElement);
}

function visualize() {
  const start = { y: board.startNode.y, x: board.startNode.x };
  const end = { y: board.endNode.y, x: board.endNode.x };
  console.log(start);
  console.log(end);
  console.log(board.grid);
  const [visitedOrder, takenPath] = currentAlgorithm.algorithm(
    start,
    end,
    board.grid,
    false
  );
  board.visualize(visitedOrder, takenPath);
}
