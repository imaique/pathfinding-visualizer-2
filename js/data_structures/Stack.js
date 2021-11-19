export default class Stack {
  constructor() {
    this.array = [];
    this.index = 0;
  }
  push(value) {
    this.array[this.index++] = value;
  }

  pop() {
    return this.array[--this.index];
  }

  isEmpty() {
    return this.index === 0;
  }
}
