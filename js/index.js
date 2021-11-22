import Board from './classes/Board.js';
import { astar } from './algorithms/pathfinding/astar.js';
import { greedy } from './algorithms/pathfinding/greedy.js';
import { djikstra } from './algorithms/pathfinding/dijkstra.js';
import { bfs } from './algorithms/pathfinding/bfs.js';
import { dfs } from './algorithms/pathfinding/dfs.js';
import PathAlgorithmSelect from './classes/PathAlgorithmSelect.js';
import { randomDFS } from './algorithms/maze-generating/randomDFS.js';
import NodeStates from './enums/NodeStates.js';

const algorithms = [
  { name: 'A* Algorithm', function: astar },
  { name: "Dijkstra's algorithm", function: djikstra },
  { name: 'Greedy Best-First Search', function: greedy },
  { name: 'Breadth-First Search', function: bfs },
  { name: 'Depth-First Search', function: dfs },
];

document.getElementById('visualize').addEventListener('click', visualize);
document.getElementById('maze').addEventListener('click', generate);

const board = new Board(61, 27);
const boardContainer = document.getElementById('container');
boardContainer.appendChild(board.DOMElement);

const pathChoices = new PathAlgorithmSelect(algorithms);
const pathfindingSelectElement = document.getElementById('path-select');
pathfindingSelectElement.appendChild(pathChoices.DOMElement);

const mazeChoices = new MazeAlgorithmSelect();

function generate() {
  const start = { y: board.startNode.y, x: board.startNode.x };
  const end = { y: board.endNode.y, x: board.endNode.x };
  board.setBoardToWalls();
  const visitedOrder = randomDFS(start, end, board.grid);
  board.visualizeList(visitedOrder, NodeStates.unvisited);
}

function visualize() {
  const start = { y: board.startNode.y, x: board.startNode.x };
  const end = { y: board.endNode.y, x: board.endNode.x };
  const pathfindingAlgorithm = pathChoices.currentSelection;
  const [visitedOrder, takenPath] = pathfindingAlgorithm(
    start,
    end,
    board.grid,
    false
  );
  board.visualize(visitedOrder, takenPath);
}
