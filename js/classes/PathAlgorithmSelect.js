class PathAlgorithmSelect {
  constructor(algorithms) {
    this.currentSelection = algorithms[0].function;
    this.map = new WeakMap();

    const pathfindingChoicesElement = document.createElement('div');
    pathfindingChoicesElement.className = 'path-choices';

    for (let algorithm of algorithms) {
      const pathfindingAlgorithmElement = document.createElement('div');
      this.map.set(algorithm.function, pathfindingAlgorithmElement);
      pathfindingAlgorithmElement.innerHTML = algorithm.name;
      pathfindingAlgorithmElement.className =
        'path-choice' +
        (algorithm.function === this.currentSelection ? ' selected' : '');
      pathfindingAlgorithmElement.addEventListener(
        'click',
        this.select.bind(this, algorithm.function)
      );
      pathfindingChoicesElement.appendChild(pathfindingAlgorithmElement);
    }
    this.DOMElement = pathfindingChoicesElement;
  }

  select(algorithm) {
    const element = this.map.get(algorithm);
    const previousElement = this.map.get(this.currentSelection);
    this.currentSelection = algorithm;
    element.className = 'path-choice selected';
    previousElement.className = 'path-choice';
  }
}

export default PathAlgorithmSelect;
