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

console.log(getValuesSum(t1)); // 22
