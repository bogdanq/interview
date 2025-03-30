const tasks = {
  twoSum, // easy
  removeDuplicates, // easy
  removeElement, // easy
  binarySearch, // easy
  isAnagram, // easy
  reverseString, // easy
  findWords, // easy
  reverseStr, // easy
};

/**
@TODO
  простой поиск суммы двух чисел, можно решить перебором и сравнить каждый елемент
  массива с каждым, пока не будет получено искомое число

  и второй способ - можно сохранять каждое число в обьект и при вычислении смотреть, есть ли diff
  сохарненным - !смысл в том, что одно из чисел в массиве автоматически является разницей вычитания между
 [ target - nums[n] ] === nums[n - 1], а мы сохраняем каждый елемент массива!
*/
const twoSum = function (nums = [], target = 0) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if (typeof map[diff] !== "undefined") {
      return [map[diff], i];
    }

    map[nums[i]] = i;
  }
};
// twoSum([2, 11, 15, 7], 9) === [2, 3];

/**
@TODO
  простой поиск проход по массиву и сложность заключается с проведении перестановки
  необходимо переставлять не i<=>i+1
  а нужно перезаписать nums[left] на число без повтора, и некст число оставить без изменения
  что бы оно попало верно под условия неравенства i!==i+1

  left - переменная, которая записывает кол-во перезаписей (в итоге это длина уникального массива)
*/
const removeDuplicates = function (nums = []) {
  let left = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1]) {
      left++;
      nums[left] = nums[i + 1];
    }
  }

  return left + 1;
};
// removeDuplicates([1, 1, 2, 3, 4, 4]); = 1,2,3,4 (4)

/**
@TODO
  задача простая, если понять суть перестановки, тут перестановка не нужна, нужна перезапись исходного числа
  если индекс не совпал, двигаем указатель, и тогда на следущем несовпадении указатель окадется на старом несовпадении
  и мы сможем записать число без совпадения на место предыдущего индекса
*/
const removeElement = function (nums = [], val) {
  let left = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[left] = nums[i];
      left++;
    }
  }

  return left;
};
// removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);

/**
@TODO
  без рекурсии можно сделать left\right индексы и искать середину от их суммы
  середина будет центиральной частью массива

  что бы двигать поиск на нужною половину мы должны увеличивать left на прошлую середину + 1или уменьшеть right на прошлую середины - 1
  если середина массива меньше, чем таргет, значит таргет находится правее и нужно сдвигать поиск направо путем увеличения left
  если середина массива больше, чем таргет, значит таргет находится левее и нужно сдвигать поиск налево путем уменьшения right
*/
const binarySearch = function (nums = [], target = 0) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.ceil((left + right) / 2);

    if (nums[half] === target) {
      return half;
    } else if (nums[half] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
// binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9);

var plusOne = function (digits = []) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] = digits[i] + 1;

      return digits;
    } else {
      digits[i] = 0;

      if (i === 0) {
        return [1, ...digits];
      }
    }
  }
};
// plusOne([9, 9]);

/**
@TODO
https://codesandbox.io/p/sandbox/algotitms-list-f25sqy
*/
const mergePart = (a, b) => {
  const result = [];

  while (a.length && b.length) {
    if (a[0] < b[0]) {
      result.push(a.shift());
    } else {
      result.push(b.shift());
    }
  }

  return [...result, ...a, ...b];
};

const mergeSort = (arr) => {
  const mid = Math.floor(arr.length / 2);

  if (arr.length < 2) {
    return arr;
  }

  return mergePart(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
};

const isAnagram = function (s = "", t = "") {
  if (s.length !== t.length) {
    return false;
  }

  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }

  for (let j = 0; j < t.length; j++) {
    if (!map.get(t[j])) {
      return false;
    }

    map.set(t[j], map.get(t[j]) - 1);
  }

  return true;
};
// isAnagram("aacc", "ccac");

/**
@TODO
  посто перестановка с единовременным походом слева и справа
*/
const reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < Math.floor(s.length / 2)) {
    let prev = s[left];
    s[left] = s[right];
    s[right] = prev;

    left++;
    right--;
  }

  return s;
};
// reverseString(["h", "e", "l", "l", "o"]);

/**
@TODO
  постой перебор + мап, более быстрый способ фильтр через регулярки
*/
const findWords = function (words) {
  const result = [];

  const map = new Map();

  const data = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  data.forEach((ws, index) => {
    ws.forEach((w) => {
      map.set(w, index + 1);
    });
  });

  for (let word of words) {
    let isValidRow = true;
    let left = 0;

    while (left < word.length - 1) {
      if (
        map.get(word[left].toLowerCase()) !==
        map.get(word[left + 1].toLowerCase())
      ) {
        isValidRow = false;
        break;
      }

      left++;
    }

    if (isValidRow) {
      result.push(word);
    }
  }

  return result;
};
findWords(["Hello", "Alaska", "Dad", "Peace"]); // [Alaska, Dad]

/**
@TODO
  вариация задачи на реверс, за исключением того, что нужно переворачивать конкретные отрезки
*/
const reverseStr = function (s = "", k) {
  let result = "";
  const reverse = function (s) {
    s = s.split("");
    let left = 0;
    let right = s.length - 1;

    while (left < s.length / 2) {
      [s[left], s[right]] = [s[right], s[left]];

      left++;
      right--;
    }

    return s.join("");
  };

  for (let j = 0, i = 0; i < s.length; i += k, j++) {
    if (j % 2 === 0) {
      result += reverse(s.substring(i, i + k));
    } else {
      result += s.substring(i, i + k);
    }
  }

  return result;
};
reverseStr("123456789", 2);
