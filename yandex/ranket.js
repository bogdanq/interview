// Узнать есть ли подстрока в строке, минимум с 1 буквой
function twoStrings(s1, s2) {
  let result = "NO";

  for (let i = 0; i < s1.length; i++) {
    if (s2.includes(s1[i])) {
      result = "YES";
      break;
    }
  }

  return result;
}

// console.log(twoStrings("hello", "world")); // YES

/**
 * @TODO
 * Поиск анаграммы в подслове
 * abba
 *
 * [a, a] [b, b] [ab, ba] [abb, bba]

  Нам нужно найти все подстроки данной строки - создать для этого метод.
  Нам нужно иметь возможность проверять, являются ли две строки анаграммами - создайте для этого метод.
  Нам нужно посчитать все анаграмматические пары в данной строке - создайте для этого метод.
  Скомбинируйте все сверху и верните результат - создайте для этого методику.
 */

function getSubAnagram(s) {
  const substr = {};
  const array = s.split("");

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j <= array.length; j++) {
      const slice = array.slice(i, j).sort();
      const ln = slice.length;

      if (!substr[ln]) {
        substr[ln] = [];
      }

      substr[ln].push(slice.join(""));
    }
  }

  return Object.values(substr);
}

function getAnagram(subs) {
  let count = 0;

  while (subs.length > 0) {
    const char = subs.shift();

    for (let i = 0; i < subs.length; i++) {
      if (subs[i] === char) {
        count += 1;
      }
    }
  }

  return count;
}

function sherlockAndAnagrams(s) {
  const stack = getSubAnagram(s);
  let count = 0;

  while (stack.length > 0) {
    const substrings = stack.shift();

    count += getAnagram(substrings);
  }

  return count;
}

// console.log(sherlockAndAnagrams("abba")); // 4
// console.log(sherlockAndAnagrams("kkkk"));// 10

/**
 * @TODO
 *
 * найти все доступные тройки
 * сделать граф - составить его соседей и посчитать кол-во соседей у ребенка - это и будут тройки
 */

function createGraph(arr, r) {
  const graph = {};

  for (let i = 0; i < arr.length; i += 1) {
    const ratio = arr[i] * r;

    const siblings = [];

    for (let v = i + 1; v < arr.length; v += 1) {
      if (arr[v] === ratio) {
        siblings.push(v);
      }
    }

    graph[i] = siblings;
  }

  return graph;
}

function countTriplets(graph) {
  let tripletCounter = 0;

  for (let vertex in graph) {
    const siblings = graph[vertex];

    for (let i = 0; i < siblings.length; i++) {
      if (siblings) {
        tripletCounter += graph[siblings[i]].length;
      }
    }
  }

  return tripletCounter;
}

// console.log(countTriplets(createGraph([1, 1, 1, 1, 1], 1)));

/**
 * @TODO
 * выполнить сортировку - четные числа оставить на месте
 * нечетные сортировать по возрстанию
 *
 * Можно надампать массив четных чисел [number, index]
 * и массив нечетных чисел [number] - после всего цикла - отсортировать его
 *
 * вторым циклом пройтись по четным числам и взять их индекс
 * заменив при этом в исходном массиве число по индексу, а старое число подвинуть вперед
 */
function sotrOddNumbers(arr) {
  const result = [];
  const evenNumbers = [];

  for (let i = 0; i < arr.length; i++) {
    const isEvenNumber = arr[i] % 2 === 0;

    if (isEvenNumber) {
      evenNumbers.push([arr[i], i]);
    } else {
      result.push(arr[i]);
    }
  }

  result.sort((a, b) => a - b);

  for (let j = 0; j < evenNumbers.length; j++) {
    const [number, index] = evenNumbers[j];

    result[index + 1] = result[index];
    result[index] = number;
  }

  return result;
}

// console.log(sotrOddNumbers([5, 2, 4, 2, 3])); // 3/2/4/2/5
// console.log(sotrOddNumbers([5, 2, 2, 3])); // 3/2/2/5
// console.log(sotrOddNumbers([5, 2, 2, 30, 12, 12, 15])); // 5 2 2 30 12 12 15

/**
 * @TODO
 * Найти общее время когда были онлайн 2 юзера
 * user 1 [4, 8]
 * user 2 [2, 6]
 *
 *
 * ответ [4, 6]
 *
 * Итерируемся по любому массиву и проверяем КАЖДЫЙ отрезок второго массива
 * В задаче главное отсеч правильно условие при не пересекающихся интервалах
 * Если L1 >= L2 || R1 <= R2 = пропустить итерацию и так до конца
 * Если условие непрошло - ЗНАЧИТ, что у нас есть интервал, что бы получить пересечение нужно
 * взять максимальное значение max(L1, L2) и min(R1, R2) это и будет искомый интервал
 *
 * продолжить итерацию
 */
function getTotalTime(user1, user2) {
  const totalTime = [];

  for (let i = 0; i < user1.length; i++) {
    const interval1 = user1[i];

    for (let j = 0; j < user2.length; j++) {
      const interval2 = user2[j];

      if (interval1[0] >= interval2[1] || interval1[1] <= interval2[0]) {
        continue;
      }

      totalTime.push([
        Math.max(interval1[0], interval2[0]),
        Math.min(interval1[1], interval2[1]),
      ]);
    }
  }

  return totalTime;
}

// console.log(getTotalTime([[4, 8]], [[2, 6]])); // 4-6
