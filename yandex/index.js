// @TODOЫ
function getPrimes(n) {
  const primes = { 1: false };
  const primesArray = Array.from({ length: n }, (_, k) => k + 1);

  for (let i = 2; i <= n; i++) {
    for (let j = 2; j <= i; j++) {
      if (j !== i && i % j === 0) {
        primes[i] = false;
      }
    }
  }

  return primesArray.filter((item) => primes[item] === undefined);
}

// console.log(getPrimes(10)); // 2 3 5 7

// @TODO
function check(str) {
  const stack = [];
  let isCheck = true;

  const brackets = { "{": "}", "[": "]", "(": ")", "<": ">" };

  for (let i = 0; i < str.length; i++) {
    if (!isCheck) {
      break;
    }

    const char = str[i];

    if (brackets[char]) {
      stack.unshift(char);
    } else {
      const bracket = stack.shift();

      if (char !== brackets[bracket]) {
        isCheck = false;
      }
    }
  }

  return stack.length ? false : isCheck;
}

// console.log(check("{()}[]")); //true
// console.log(check("{(})[]")); //false
// console.log(check("{[}]")); // false

// @TODO
function regions() {
  const model = {};

  model.data = [
    {
      id: 0,
      name: "Все регионы",
    },
    {
      id: 67,
      name: "Алтайский край",
      chld: [
        {
          id: 32,
          name: "Алейск",
          chld: [
            {
              id: 320,
              name: "Алейск2",
            },
            {
              id: 890,
              name: "Барнаул2",
            },
          ],
        },
        {
          id: 89,
          name: "Барнаул",
        },
      ],
    },
  ];

  model.getNameById = function (id) {
    const stack = [...this.data];

    while (stack.length) {
      const cities = stack.shift();

      if (cities.id === id) {
        return cities.name;
      }

      if (cities.chld) {
        stack.unshift(...cities.chld);
      }
    }
  };

  console.log(model.getNameById(0) === "Все регионы"); // true
  console.log(model.getNameById(32) === "Алейск"); // true
  console.log(model.getNameById(89) === "Барнаул"); // true
  console.log(model.getNameById(890) === "Барнаул2"); // true
}

// @TODO Нужно написать функцию которая выполняет другие функции последовательно и асинхронно передавая результат
const sleep = (ms) => new Promise((rs) => setTimeout(rs, ms));

function chain(fnList, input, timeout) {
  fnList.reduce((acc, fn) => {
    return acc.then(async (data) => {
      await sleep(timeout);

      return fn(data);
    });
  }, Promise.resolve(input));
}

// chain(
//   [
//     function (prev) {
//       console.log(prev);
//       return prev + 1;
//     },
//     function (prev) {
//       console.log(prev);
//     },
//   ],
//   9,
//   2000
// );

function getAnagrams(...words) {
  const anagrams = {};

  words.forEach((word) => {
    const sorted = word.split("").sort().join("");

    if (!anagrams[sorted]) {
      anagrams[sorted] = [];
    }

    anagrams[sorted].push(word);
  });

  return Object.values(anagrams);
}

// @TODO getAnagrams("нос", "сон", "снедь", "днесь"); // [[нос, сон], [снедь, днесь]]

function sum(x) {
  return function result(y) {
    if (!y) {
      return x;
    }

    return sum(x + y);
  };
}

function sumWithManyArgs(...x) {
  function getSum(args) {
    return args.reduce((acc, item) => acc + item);
  }

  return function result(...y) {
    if (!y.length) {
      return getSum(x);
    }

    return sumWithManyArgs(getSum([...x, ...y]));
  };
}

// @TODO Реализовать функции five, add, one, seven, subtract, two, чтобы работало:

function checkType(arg, value) {
  return typeof arg === "function" ? arg(value) : value;
}

function five(n) {
  return checkType(n, 5);
}

function one(n) {
  return checkType(n, 1);
}

function seven(n) {
  return checkType(n, 7);
}

function two(n) {
  return checkType(n, 2);
}

function subtract(n) {
  return (x) => x - n;
}

function add(n) {
  return (x) => x + n;
}
// console.log(five(add(one()))); // 6
// console.log(seven(subtract(two()))); // 5
// console.log(seven(subtract(two(add(one()))))); // 4

const t1 = {
  value: 4,
  next: [
    {
      value: 3,
      next: null,
    },
    {
      value: 3,
      next: [
        {
          value: 3,
          next: [
            {
              value: 3,
              next: null,
            },
            {
              value: 3,
              next: [
                {
                  value: 3,
                  next: null,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function getValuesSum(tree) {
  const stack = [tree];
  let values = 0;

  while (stack.length) {
    const sibling = stack.shift();

    values = values + sibling.value;

    if (sibling.next) {
      stack.unshift(...sibling.next);
    }
  }

  return values;
}

// console.log(getValuesSum(t1)); // 22

/*
Написать реализацию функции flow, создающую функцию, которая прогонит переданные в неё данные через все функции,
переданные в сам flow.

Пример использования:

const add = x => y => y + x
const multiple = x => y => y * x

flow(
  add(2),
  multiple(3),
)(4);

Должно вывести 18 // ((4+2)*3)

Аналог multiple(3)(add(2)(4))
*/

function flow(...args) {
  return function (a) {
    return args.reduce((acc, foo) => foo(acc), a);
  };
}

const add2 = (x) => (y) => y + x;
const multiple2 = (x) => (y) => y * x;

// console.log(flow(add2(2), multiple2(3))(4));

// @TODO Есть два сортированных массива с числами.
// Нужно написать функцию, которая возвращает новый массив,
// содержащий элементы, которые встречаются в обоих массивах.
function findEqualElements2(arr1, arr2) {
  const [source, target] =
    arr1.length >= arr2.length ? [arr2, arr1] : [arr1, arr2];

  return source.filter((num) => {
    const hasInSource = target.includes(num);

    if (hasInSource) {
      const index = target.indexOf(2);

      target.splice(index, 1);
    }

    return hasInSource;
  });
}

function findEqualElements(arr1, arr2) {
  const map = arr1.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;

    return acc;
  }, {});

  return arr2.reduce((acc, item) => {
    if (map[item]) {
      map[item] -= 1;
      acc.push(item);
    }

    return acc;
  }, []);
}

// console.log(findEqualElements([1, 2, 3], [2])); // => [2]
// console.log(findEqualElements([2], [1, 2, 3])); // => [2]
// console.log(findEqualElements([1, 2, 2, 3], [2, 2, 2, 2])); // => [2, 2]

// @TODO Дана строка (возможно, пустая), состоящая из букв A-Z:
// AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
// Нужно написать функцию RLE, которая на выходе даст строку вида:
// A4B3C2XYZD4E3F3A6B28
// И сгенерирует ошибку, если на вход пришла невалидная строка.
// Пояснения:
// Если символ встречается 1 раз, он остается без изменений;

function rle(str) {
  const arr = str.split("");
  let result = "";
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    const currentChar = arr[i];
    const nextChar = arr[i + 1];

    count++;

    if (currentChar !== nextChar) {
      result = result + `${currentChar}${count > 1 ? count : ""}`;
      count = 0;
    }
  }

  return result;
}

// console.log(rle("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"));

/**
 * @TODO
 * ограничить хеш длинной в 6 символов
 * если буква заглавная - умножить ее на 2
 * если длина меньше чем 6 - добавить 0
 * H - 8 * 2
 * a - 1
 * s - 19
 * h - 8
 *
 * 9 + 1 + 19 + 8 = 44
 *
 * 440000
 */

function getHash(str) {
  let result = 0;
  const MAX_NUM = 999999;

  const abc = Array.from({ length: 26 }, (_, i) => {
    return (i + 10).toString(36);
  });

  const hash = str.replace(/\s/g, "").split("");

  hash.forEach((char) => {
    const isUpperCase = char.toUpperCase() === char;

    const index = abc.indexOf(char.toLowerCase()) + 1;

    if (isUpperCase) {
      result += index * 2;
    } else {
      result += index;
    }
  });

  return result > MAX_NUM
    ? result.toString().substr(0, 6)
    : result.toString().padEnd(6, "0");
}

console.log(getHash("Hash"));
