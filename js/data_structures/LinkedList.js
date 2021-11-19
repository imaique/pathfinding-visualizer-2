class LinkedList {
  constructor() {
    this.head = new Node();
    this.tail = this.head;
  }
  add(input) {
    const newNode = new Node(input);
    this.tail.next = newNode;
    this.tail = newNode;
  }
  removeFirst() {
    if (this.tail !== this.head) {
      const removed = this.head.next;
      this.head.next = this.head.next.next;
      if (this.head.next === null) this.tail = this.head;
      return removed;
    }
    return null;
  }
  isEmpty() {
    return this.tail === this.head;
  }
}
class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
  }
}

export default LinkedList;
