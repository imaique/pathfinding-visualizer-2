class PathAlgorithmSelect {
  constructor(algorithms, groupClass, choiceClass) {
    this.currentSelection = algorithms[0].function;
    this.map = new WeakMap();

    const pathfindingChoicesElement = document.createElement('div');
    pathfindingChoicesElement.className = groupClass;

    for (let algorithm of algorithms) {
      const pathfindingAlgorithmElement = document.createElement('button');
      this.map.set(algorithm.function, pathfindingAlgorithmElement);
      pathfindingAlgorithmElement.textContent = algorithm.name;
      pathfindingAlgorithmElement.classList = choiceClass;
      if (algorithm.function === this.currentSelection)
        pathfindingAlgorithmElement.classList.add('selected');
      pathfindingAlgorithmElement.addEventListener(
        'click',
        this.select.bind(this, algorithm.function)
      );
      pathfindingChoicesElement.appendChild(pathfindingAlgorithmElement);
    }
    this.DOMElement = pathfindingChoicesElement;
  }

  select(algorithm) {
    if (algorithm === this.currentSelection) return;
    const element = this.map.get(algorithm);
    const previousElement = this.map.get(this.currentSelection);
    this.currentSelection = algorithm;
    element.classList.add('selected');
    previousElement.classList.remove('selected');
  }
}

export default PathAlgorithmSelect;
