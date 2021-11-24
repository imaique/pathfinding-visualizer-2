class RandomQueue {
  constructor() {
    this.queue = [];
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  enqueue(input) {
    this.queue.push(input);
  }
  dequeue() {
    const queue = this.queue;
    const randomIndex = Math.floor(Math.random() * queue.length);
    if (queue.length === randomIndex - 1) return queue.pop();
    else {
      const temp = queue[randomIndex];
      queue[randomIndex] = queue[queue.length - 1];
      queue.pop();
      return temp;
    }
  }
}

export default RandomQueue;
