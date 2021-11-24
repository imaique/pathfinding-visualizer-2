import Board from './classes/Board.js';
import { astar } from './algorithms/pathfinding/astar.js';
import { greedy } from './algorithms/pathfinding/greedy.js';
import { djikstra } from './algorithms/pathfinding/dijkstra.js';
import { bfs } from './algorithms/pathfinding/bfs.js';
import { dfs } from './algorithms/pathfinding/dfs.js';
import PathAlgorithmSelect from './classes/PathAlgorithmSelect.js';
import { randomDFS } from './algorithms/maze-generating/randomDFS.js';
import NodeStates from './enums/NodeStates.js';
import randomKruskal from './algorithms/maze-generating/randomKruskal.js';
import MazeAlgorithmSelect from './classes/MazeAlgorithmSelect.js';
import { randomPrim } from './algorithms/maze-generating/randomPrim.js';

const algorithms = [
  { name: 'A* Algorithm', function: astar },
  { name: "Dijkstra's Algorithm", function: djikstra },
  { name: 'Greedy Best-First Search', function: greedy },
  { name: 'Breadth-First Search', function: bfs },
  { name: 'Depth-First Search', function: dfs },
];

const mazeAlgorithms = [
  { name: 'None', function: null },
  { name: 'Randomized Depth-First Search', function: randomDFS },
  { name: "Randomized Kruskal's Algorithm", function: randomKruskal },
  { name: "Randomized Prim's Algorithm", function: randomPrim },
];
const selectGroupClass = 'algo-choices';
const selectChoiceClass = 'algo-choice';

document.getElementById('visualize').addEventListener('click', visualize);

const board = new Board(69, 27);
const boardContainer = document.getElementById('container');
boardContainer.appendChild(board.DOMElement);

const pathChoices = new PathAlgorithmSelect(
  algorithms,
  selectGroupClass,
  selectChoiceClass
);
const pathfindingSelectElement = document.getElementById('path-select');
pathfindingSelectElement.appendChild(pathChoices.DOMElement);

const mazeChoices = new MazeAlgorithmSelect(
  mazeAlgorithms,
  board,
  selectGroupClass,
  selectChoiceClass
);

const mazeSelectElement = document.getElementById('maze-select');
mazeSelectElement.appendChild(mazeChoices.DOMElement);

function generate() {
  const start = { y: board.startNode.y, x: board.startNode.x };
  const end = { y: board.endNode.y, x: board.endNode.x };
  board.setBoardToState(NodeStates.wall);
  const visitedOrder = randomKruskal(start, board.grid);
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
