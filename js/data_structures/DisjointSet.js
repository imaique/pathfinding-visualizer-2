class DisjointSet {
  constructor() {
    this.parent = null;
    this.weight = 1;
  }
  getAbsoluteRoot() {
    if (this.parent === null) return this;
    this.parent = this.parent.getAbsoluteRoot();
    return this.parent;
  }
  union(node) {
    if (node.weight > this.weight) {
      this.parent = node;
      node.weight++;
    } else {
      node.parent = this;
      this.weight++;
    }
  }
}

export default DisjointSet;
