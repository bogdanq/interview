const tasks = {
  countStudents, //easy,
  maxHeap, //med
  eatenApples, //med
  MyCircularQueue, //med
};

/**
  задача на очередь + стек
  если студент в очереди совпадает с вершиной стека - то достать стек и очередь
  если нет, то в конец очереди
  что бы не было цикла нужно посчитать все типы студентов и если типа, как на вершине стека студента нет - то выйти
  остаток оереди остаток стунеднтов без еды
 */
var countStudents = function (students, sandwiches) {
  const queue = [...students];
  const stack = [...sandwiches];
  const count = [0, 0];

  for (const student of students) {
    count[student] += 1;
  }

  while (stack.length) {
    if (!count[stack[0]]) break;

    if (queue[0] === stack[0]) {
      count[stack[0]] -= 1;

      queue.shift();
      stack.shift();
    } else {
      const st = queue.shift();
      queue.push(st);
    }
  }

  return queue.length;
};
// console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1])); // 3

var maxHeap = () => {
  const heap = [];

  const queue = (value) => {
    heap.push(value);

    let currentIndex = heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (heap[parentIndex] < value) {
      let temp = heap[parentIndex];
      heap[parentIndex] = value;
      heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  };

  const dequeue = () => {
    if (heap.length === 0) return undefined;

    const removed = heap[0];

    if (heap.length === 1) {
      heap.pop();
      return removed;
    }

    heap[0] = heap.pop();
    let currentIndex = 0;

    while (true) {
      let leftIndex = currentIndex * 2 + 1;
      let rightIndex = currentIndex * 2 + 2;
      let minIndex = currentIndex;

      if (leftIndex < heap.length && heap[leftIndex] > heap[minIndex]) {
        minIndex = leftIndex;
      }

      if (rightIndex < heap.length && heap[rightIndex] > heap[minIndex]) {
        minIndex = rightIndex;
      }

      if (minIndex === currentIndex) break;

      let temp = heap[currentIndex];
      heap[currentIndex] = heap[minIndex];
      heap[minIndex] = temp;

      currentIndex = minIndex;
    }

    return removed;
  };

  const last = () => {
    return heap[0];
  };

  const list = () => {
    return heap;
  };
  return { queue, dequeue, last, list };
};

var minHeap = () => {
  const heap = [];

  const queue = (value) => {
    heap.push(value);

    let currentIndex = heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (heap[parentIndex]?.[1] > value[1]) {
      let temp = heap[parentIndex];
      heap[parentIndex] = value;
      heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  };

  const dequeue = () => {
    if (heap.length === 0) return undefined;

    const removed = heap[0];

    if (heap.length === 1) {
      heap.pop();
      return removed;
    }

    heap[0] = heap.pop();
    let currentIndex = 0;

    while (true) {
      let leftIndex = currentIndex * 2 + 1;
      let rightIndex = currentIndex * 2 + 2;
      let minIndex = currentIndex;

      if (leftIndex < heap.length && heap[leftIndex][1] < heap[minIndex][1]) {
        minIndex = leftIndex;
      }

      if (rightIndex < heap.length && heap[rightIndex][1] < heap[minIndex][1]) {
        minIndex = rightIndex;
      }

      if (minIndex === currentIndex) break;

      let temp = heap[currentIndex];
      heap[currentIndex] = heap[minIndex];
      heap[minIndex] = temp;

      currentIndex = minIndex;
    }

    return removed;
  };

  const last = () => {
    return heap[0];
  };

  const list = () => {
    return heap;
  };
  return { queue, dequeue, last, list };
};

var eatenApples = function (apples, days) {
  const h = minHeap();
  let currentDay = 0;
  let eaten = 0;

  while (h.list().length || currentDay < apples.length) {
    if (currentDay < apples.length) {
      h.queue([apples[currentDay], currentDay + days[currentDay] - 1]);
    }

    while (h.list().length && h.last()[1] < currentDay) {
      h.dequeue();
    }

    if (h.list().length) {
      const top = h.last();

      top[0] -= 1;
      eaten++;

      if (top[0] === 0) {
        h.dequeue();
      }
    }

    currentDay++;
  }

  return eaten;
};
// console.log(eatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2])); // 7

var MyCircularQueue = function (k) {
  this.queue = new Array(k);
  this.head = 0;
  this.tail = 0;
  this.size = k;
  this.count = 0;
};

MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false;
  }

  this.queue[this.tail] = value;

  this.tail = this.tail === this.size - 1 ? 0 : this.tail + 1;
  this.count++;

  return true;
};

MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  }

  this.head = this.head === this.size - 1 ? 0 : this.head + 1;
  this.count--;
  return true;
};

MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.head];
};

MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;

  return this.queue[(this.head + this.count - 1) % this.size];
};

MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};

MyCircularQueue.prototype.isFull = function () {
  return this.count === this.size;
};
