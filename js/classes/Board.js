import NodeStates from '../enums/NodeStates.js';
import Node from './Node.js';

class Board {
  constructor(width, height) {
    this.draggedState = null;
    this.revertPreviousNode = null;
    this.isAnimating = false;
    this.previouslyVisitedNodes = null;
    window.addEventListener('mouseup', () => {
      this.draggedState = null;
      this.revertPreviousNode = null;
    });
    const [grid, tableDOM] = this.initializeGrid(width, height);
    this.grid = grid;
    this.DOMElement = tableDOM;
  }

  async visualize(visitedOrder, takenPath) {
    if (this.isAnimating) return;
    if (this.previouslyVisitedNodes !== null) this.cleanUpVisitedNodes();
    this.isAnimating = true;
    this.previouslyVisitedNodes = visitedOrder;

    await this.visualizeList(visitedOrder, NodeStates.visited);
    await this.visualizeList(takenPath, NodeStates.path);

    this.isAnimating = false;
  }

  visualizeList(visitedOrder, state) {
    return new Promise((resolve) => {
      let index = 0;
      if (visitedOrder.length == 0) {
        resolve();
        return;
      }
      const interval = setInterval(async () => {
        const x = visitedOrder[index].x;
        const y = visitedOrder[index].y;
        const node = this.grid[y][x];
        index++;
        if (
          node.nodeState !== NodeStates.start &&
          node.nodeState !== NodeStates.end
        ) {
          node.setNodeState(state);
        }
        if (index === visitedOrder.length) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  }

  setBoardToWalls() {
    for (let row of this.grid) {
      for (let node of row) {
        if (
          node.nodeState !== NodeStates.wall &&
          node.nodeState !== NodeStates.start &&
          node.nodeState !== NodeStates.end
        )
          node.setNodeState(NodeStates.wall);
      }
    }
  }

  cleanUpVisitedNodes() {
    for (let node of this.previouslyVisitedNodes) {
      const x = node.x;
      const y = node.y;
      const nodeState = this.grid[y][x].nodeState;
      if (nodeState === NodeStates.path || nodeState === NodeStates.visited)
        this.grid[y][x].setNodeState(NodeStates.unvisited);
    }
  }

  mouseDownNode(node, event) {
    const which = event.button;
    event.preventDefault();
    if (which === 0) {
      this.draggedState = node.nodeState;
      if (
        node.nodeState === NodeStates.path ||
        node.nodeState === NodeStates.visited ||
        node.nodeState === NodeStates.unvisited
      ) {
        this.draggedState = NodeStates.wall;
        node.setNodeState(NodeStates.wall);
      } else {
        this.setAsPrevious(node, NodeStates.unvisited);
      }
    } else if (which === 2) {
      this.draggedState = NodeStates.unvisited;
      if (node.nodeState === NodeStates.wall) {
        node.setNodeState(NodeStates.unvisited);
      }
    }
  }

  mouseOverNode(node) {
    if (
      this.draggedState === null ||
      node.nodeState === NodeStates.start ||
      node.nodeState === NodeStates.end
    )
      return;

    if (
      this.draggedState === NodeStates.unvisited &&
      (node.nodeState === NodeStates.path ||
        node.nodeState === NodeStates.visited)
    )
      return;

    if (
      this.draggedState !== NodeStates.wall &&
      this.revertPreviousNode !== null
    ) {
      this.revertPreviousNode();
      this.setAsPrevious(node);
    }
    node.setNodeState(this.draggedState);
  }

  setAsPrevious(node, state = node.nodeState) {
    this.revertPreviousNode = node.setNodeState.bind(node, state);
  }

  initializeGrid(width, height) {
    let grid = new Array(height);
    const tableDOM = document.createElement('table');
    const tbodyElement = document.createElement('tbody');
    for (let i = 0; i < height; i++) {
      let row = new Array(width);
      let rowElement = document.createElement('tr');
      for (let j = 0; j < width; j++) {
        const element = document.createElement('td');
        row[j] = new Node(this, element, i, j);
        rowElement.appendChild(element);
      }
      grid[i] = row;
      tbodyElement.appendChild(rowElement);
    }
    tableDOM.addEventListener('contextmenu', (e) => e.preventDefault());
    tableDOM.appendChild(tbodyElement);

    const middleRow = ~~(height / 2);
    const startCol = ~~(width / 4);
    const endCol = width - ~~(width / 4);
    grid[middleRow][startCol].setNodeState(NodeStates.start);
    grid[middleRow][endCol].setNodeState(NodeStates.end);

    return [grid, tableDOM];
  }
}

export default Board;
