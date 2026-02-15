const tasks = {
  countStudents, //easy,
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
