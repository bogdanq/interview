const tasks = {
  countStudents, //easy,
  maxHeap, //med
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
