import Board from './classes/Board.js';
import { astar } from './algorithms/astar.js';
import { greedy } from './algorithms/greedy.js';
import { djikstra } from './algorithms/dijkstra.js';
import { bfs } from './algorithms/bfs.js';
import { dfs } from './algorithms/dfs.js';
import PathAlgorithmSelect from './classes/PathAlgorithmSelect.js';

const algorithms = [
  { name: 'A* Algorithm', function: astar },
  { name: "Dijkstra's algorithm", function: djikstra },
  { name: 'Greedy Best-First Search', function: greedy },
  { name: 'Breadth First Search', function: bfs },
  { name: 'Depth First Search', function: dfs },
];
const boardContainer = document.getElementById('container');
document.getElementById('visualize').addEventListener('click', visualize);

const board = new Board(60, 60, boardContainer);
const pathfindingSelectElement = document.getElementById('pathfinding-select');
const pathChoices = new PathAlgorithmSelect(algorithms);
pathfindingSelectElement.appendChild(pathChoices.DOMElement);

function visualize() {
  const start = { y: board.startNode.y, x: board.startNode.x };
  const end = { y: board.endNode.y, x: board.endNode.x };
  const pathfindingAlgorithm = pathChoices.currentSelection;
  console.log(start);
  console.log(end);
  console.log(board.grid);
  const [visitedOrder, takenPath] = pathfindingAlgorithm(
    start,
    end,
    board.grid,
    true
  );
  board.visualize(visitedOrder, takenPath);
}
