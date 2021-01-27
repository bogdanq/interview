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
}
// regions();
