import NodeStates from '../enums/NodeStates.js';

class MazeAlgorithmSelect {
  constructor(algorithms, board, groupClass, choiceClass) {
    this.board = board;

    this.map = new WeakMap();

    const mazeChoicesElement = document.createElement('div');
    mazeChoicesElement.className = groupClass;

    /*
    const noMazeAlgorithmElement = document.createElement('div');
    noMazeAlgorithmElement.textContent = 'None';
    noMazeAlgorithmElement.classList = choiceClass + ' selected';
    mazeChoicesElement.appendChild(noMazeAlgorithmElement);
    */

    for (let algorithm of algorithms) {
      const mazeAlgorithmElement = document.createElement('button');
      this.map.set(mazeAlgorithmElement, algorithm.function);
      mazeAlgorithmElement.textContent = algorithm.name;
      mazeAlgorithmElement.classList = choiceClass;
      if (algorithm.function === null) {
        this.currentSelectedElement = mazeAlgorithmElement;
        mazeAlgorithmElement.classList.add('selected');
      }
      mazeAlgorithmElement.addEventListener(
        'click',
        this.select.bind(this, mazeAlgorithmElement)
      );
      mazeChoicesElement.appendChild(mazeAlgorithmElement);
    }
    this.DOMElement = mazeChoicesElement;
  }

  select(mazeElement) {
    if (this.board.isAnimating) return;

    this.currentSelectedElement.classList.remove('selected');
    mazeElement.classList.add('selected');

    this.currentSelectedElement = mazeElement;

    const algorithm = this.map.get(mazeElement);
    if (algorithm !== null && !this.board.isAnimating)
      this.generateMaze(algorithm);
  }

  generateMaze(algorithm) {
    const board = this.board;
    const start = { y: board.startNode.y, x: board.startNode.x };
    const end = { y: board.endNode.y, x: board.endNode.x };
    board.setBoardToState(NodeStates.wall);
    const visitedOrder = algorithm(start, end, board.grid);
    board.visualizeList(visitedOrder, NodeStates.unvisited);
  }
}

export default MazeAlgorithmSelect;
