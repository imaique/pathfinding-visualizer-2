import LinkedList from './LinkedList.js';

class Queue {
  constructor() {
    this.list = new LinkedList();
  }
  enqueue(value) {
    this.list.add(value);
  }
  dequeue() {
    return this.list.removeFirst().value;
  }
  isEmpty() {
    return this.list.isEmpty();
  }
}

export default Queue;
