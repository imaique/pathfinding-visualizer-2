import NodeStates from '../enums/NodeStates.js';

class Node {
  constructor(board, element, y, x) {
    this.y = y;
    this.x = x;
    this.weight = 1;
    this.board = board;
    this.nodeState = NodeStates.unvisited;
    this.element = element;
    this.element.addEventListener('mouseover', () =>
      this.board.mouseOverNode(this)
    );
    this.element.addEventListener('mousedown', (event) =>
      this.board.mouseDownNode(this, event)
    );
    this.element.className = `node ${this.nodeState}`;
  }

  setNodeState(state) {
    if (state === NodeStates.start) this.board.startNode = this;
    else if (state === NodeStates.end) this.board.endNode = this;
    this.nodeState = state;
    this.element.className = `node ${this.nodeState}`;
  }
}

export default Node;
