const tasks = {
  rle, // easy
  lengthOfLongestSubstring, // medium [скользящее окно]
  isPalindrome, // easy
  romanToInt, // easy
  longestCommonPrefix, // easy
  strStr, // easy [скользящее окно]
  reverseVowels, // easy два указателя
  canConstruct, // easy хеш мап
  firstUniqChar, // easy хеш мап
  sumString, // easy twoe pointer
  longestPalindrome, // medium
  reverseStr, // easy
  checkRecord, // easy
  reverseWords, // easy
  validPalindrome, // easy twoe pointer
  mostCommonWord, // easy
  shortestToChar, // easy
  largeGroupPositions, //  [скользящее окно]
  removePalindromeSub, // easy two pointer
  stringMatching, // easy
  reformat, // easy, two pointer
  maxPower, // [скользящее окно]
  destCity, // map set
};

/**
@TODO
  Дана строка (возможно, пустая), состоящая из букв A-Z:
  AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
  Нужно написать функцию RLE, которая на выходе даст строку вида:
  A4B3C2XYZD4E3F3A6B28

  Задачу можно решить циклом и сохранять текущуй символ или сделать цикл и смотреть i+1 символ
  Сложность O(n)
*/
function rle(str) {
  let result = "";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const nextChar = str[i + 1];

    count++;

    if (char !== nextChar) {
      result += `${char}${count > 1 ? count : ""}`;
      count = 0;
    }
  }

  return result;
}
// rle("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB") === 'A4B3C2XYZD4E3F3A6B28'

/**
@TODO
Скользящее динамическое окно
нужно хранить индекса left и right, а так же максимальную сумму внутри окна
формула суммы max = right - left + 1 || max
как только нашли повтор - необходимо удалить уже записанные буквы (можно в цикле от left до leftPrev)
left - индекс + 1 (что бы окно попало на следующую от нее бувкв) буквы которая повторялась или 0
leftPrev - индекс буквы которую сохранили и ее же словили в повторе
*/
const lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let left = 0;
  let right = 0;
  let maxLength = 0;

  while (right < s.length) {
    if (map.has(s[right])) {
      const sameLetterIndex = map.get(s[right]);

      for (let i = left; i < sameLetterIndex; i++) {
        map.delete(s[i]);
      }

      left = sameLetterIndex + 1;
    }

    maxLength = Math.max(maxLength, right - left + 1);
    map.set(s[right], right);
    right++;
  }

  return maxLength;
};
// lengthOfLongestSubstring("appart") === 4

/**
@TODO
  Простой палиндром, сделан через два указателя
  левый идет слева-направо, а правый справа-налево и необходимо сравнить каждый символ с каждым
  если есть хотя бы одно неравенство - выйти из цикла
*/
const isPalindrome = (s) => {
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

/**
@TODO
  Сложность в исключениях IV - 4
  нужно строку проходить справа налево и тогда можно словить исключение
  если текущее значение менше прошлого - исключение
*/
const romanToInt = function (s = "") {
  let res = 0;
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let prev = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (roman[s[i]] < prev) {
      res = res - roman[s[i]];
    } else {
      res = res + roman[s[i]];
    }

    prev = roman[s[i]];
  }

  return res;
};

/**
@TODO
  квадратичное решение, сравнивем каждую букву с каждым словом
  в более быстрой вариации можно отсортировать входной массив (по умолчанию) и сравнить первый с последним
*/
const longestCommonPrefix = function (strs = []) {
  const firstStr = strs.shift() || "";
  let prefixLength = 1;
  let prevValidPreffix = "";

  if (!strs.length) {
    return firstStr;
  }

  while (prefixLength <= firstStr.length) {
    const prefix = firstStr.slice(0, prefixLength);
    const isValidPrefixes = strs.every((str) => str.startsWith(prefix));

    if (isValidPrefixes) {
      prefixLength++;
      prevValidPreffix = prefix;
    } else {
      break;
    }
  }

  return prevValidPreffix;
};
// longestCommonPrefix(["flower", "flow", "flight"]) === "fl";

/**
@TODO
  Классическая задача на скользящее окно фиксированной длины
  просто проходим окном каждый отрезок строки и возвращаем левы  индекс первого входа
*/
const strStr = function (haystack = "", needle = "") {
  let right = needle.length;
  let left = 0;
  let index = -1;

  while (right <= haystack.length) {
    const char = haystack.slice(left, right);

    if (char !== needle) {
      left++;
    } else {
      return left;
    }

    right++;
  }

  return index;
};
// strStr("sadbutsad", "sad") === 0;

/**
@TODO
  Классическая задача на два укащателя, нужно составить правильно условия их смещения
*/
const reverseVowels = function (s) {
  s = s.split("");
  const vowels = { a: "a", e: "e", i: "i", o: "o", u: "u" };
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (!vowels[s[left]]) {
      left++;
      continue;
    }

    if (!vowels[s[right]]) {
      right--;
      continue;
    }

    let prev = s[left];
    s[left] = s[right];
    s[right] = prev;
    right--;
    left++;
  }

  return s.join("");
};
// reverseVowels("leetcodezx");

const canConstruct = function (ransomNote, magazine) {
  if (ransomNote.length > magazine.length) {
    return false;
  }

  const map = new Map();

  for (let i = 0; i < magazine.length; i++) {
    map.set(magazine[i], (map.get(magazine[i]) || 0) + 1);
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (!map.get(ransomNote[i])) {
      return false;
    }

    map.set(ransomNote[i], map.get(ransomNote[i]) - 1);
  }

  return true;
};
// canConstruct("aa", "aab") true

const firstUniqChar = function (s) {
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};
// firstUniqChar("112334"); => 2
/**
@TODO
  суть задачи в двух указателях, но указатели идут не на встречу друг другу, а паралельно проходят каждый свою строку
  в любом цикле можно указать условие, указатель пройден, если достиг 0 или длины строки
  в задаче есть момент с [count], его можно добавить в условие цикла или добавить к ответу в конце, он переносит дсяток, единовременно
  не возможно переносить более десятка, потому что 9+9=18 максимум
  этот десяток - добавляется к сумме следующего count и если число больше 9 - десяток в конце добавится в начало
*/
const sumString = function (n1, n2) {
  const result = [];
  let i = n1.length - 1;
  let j = n2.length - 1;
  let count = 0;

  while (i >= 0 || j >= 0) {
    count += Number(n1[i] || 0) + Number(n2[j] || 0);
    result.unshift(count % 10);
    count = Math.floor(count / 10);
    i--;
    j--;
  }

  // или вынести в условие пока count > 0
  return [count || "", ...result].join("");
};
// sumString("2", "99") === "101"

/**
@TODO
  Сложная задача на поиск длинного палиндрома, решается практически в лоб, за исключением оптимизированного палиндрома
  и условия над вызовом isPalindrome

  задачу можно решать с помощью прохода и поиска палиндрома от центра слова (более быстрый способ)
 */
var longestPalindrome = function (s) {
  if (s.length === 0) {
    return "";
  }

  /**
    isPalindrome отличается от классического прохода по строке, потому что тут передан массиво [start, end]
 */
  const isPalindrome = function (s, [i, j]) {
    let left = i;
    let right = j;

    while (left < right) {
      if (s[left] != s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };

  const result = [0, 0];

  for (let i = 0; i < s.length; i++) {
    let left = i + 1;

    while (left <= s.length) {
      const substr = [i, left];

      if (result[1] - result[0] <= substr[1] - substr[0]) {
        if (isPalindrome(s, substr)) {
          result[0] = substr[0];
          result[1] = substr[1];
        }
      }

      left++;
    }
  }

  return s.slice(result[0], result[1] + 1);
};

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
// reverseStr("123456789", 2);

const checkRecord = function (s) {
  let totalA = 0;
  let totalL = 0;

  let left = 0;

  while (left < s.length && totalA < 2 && totalL < 3) {
    const day = s[left];

    if (day === "L") {
      totalL++;
    }

    if (day === "A") {
      totalA++;
    }

    if (day !== "L") {
      totalL = 0;
    }

    left++;
  }

  return totalA < 2 && totalL < 3;
};
// checkRecord("LALL");

const reverseWords = function (s = "") {
  s = s.split(" ");
  const result = [];

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

  for (i = 0; i < s.length; i++) {
    result.push(reverse(s[i]));
  }

  return result.join(" ");
};
// reverseWords("Mr Ding") === "rM gniD";

/**
@TODO
  вариация палиндрома, есть решение в лоб, можно удалять каждую букву и смотреть является и новое слово палиндромом
  более быстрый способ - два указателя, если буквы не равны нужно посмотреть два новых под слова и если они не являются палиндромами
  то вернуть false
*/
const validPalindrome = function (s) {
  let left = 0,
    right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s.slice(left, right)) ||
        isPalindrome(s.slice(left + 1, right + 1))
      );
    }

    left++;
    right--;
  }

  return true;
};
// validPalindrome("abca")// true - удалили с

/**
@TODO
  в задаче подход на правильном создании мапы + регулярка
*/
const mostCommonWord = function (paragraph = "", banned) {
  paragraph = paragraph.toLowerCase().match(/[a-z]+/gi);
  banned = new Set(banned);

  let maxLengthStringCount = 0;
  let maxLengthString = "";

  const map = new Map();

  for (const word of paragraph) {
    if (!banned.has(word)) {
      map.set(word, (map.get(word) || 0) + 1);
    }
  }

  for (const [word, count] of map) {
    if (maxLengthStringCount < count) {
      maxLengthStringCount = count;
      maxLengthString = word;
    }
  }

  return maxLengthString;
};
mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", [
  "hit",
]); //ball

const shortestToChar = function (s, c) {
  const shortests = [];
  const indexes = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      indexes.push(i);
    }
  }

  for (let i = 0; i < s.length; i++) {
    let path = Infinity;

    for (let j = 0; j < indexes.length; j++) {
      path = Math.min(path, Math.abs(indexes[j] - i));
    }

    shortests.push(path);
  }

  return shortests;
};
shortestToChar("loveleetcode", "e");

const toGoatLatin = function (sentence) {
  sentence = sentence.split(" ");
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let result = "";

  for (let i = 0; i < sentence.length; i++) {
    if (!vowels.has(sentence[i][0])) {
      sentence[i] = sentence[i].slice(1) + sentence[i][0];
    }

    sentence[i] += "ma" + "a".repeat(i + 1);
    result += " " + sentence[i];
  }

  return result.trim();
};
toGoatLatin("I speak Goat Latin");

const largeGroupPositions = function (s) {
  const result = [];

  let right = 1;
  let left = 0;

  while (right < s.length || left < s.length) {
    if (s[right] !== s[left]) {
      if (right - left >= 3) {
        result.push([left, right - 1]);
      }

      left = right;
    }

    right++;
  }

  return result;
};
largeGroupPositions("abbxxxxzzy"); // [[3,6]]

/**
@TODO
  в задаче только два типа символов, поэтому есть макстмум 2 шага, минииум 1
  если символы с противоположных сторон не равны - значит тут 2 шага
  если полное слово палиндром, то 1 шаг
*/
const removePalindromeSub = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return 2;
    }

    left++;
    right--;
  }

  return 1;
};
// removePalindromeSub("ababa");

/**
@TODO
  в задаче важно условие, ВАЖНО найти слово, которое является частью другого слова
  хотя бы ОДИН раз
*/
const stringMatching = function (words) {
  const result = [];

  for (const word of words) {
    for (const nextWord of words) {
      if (word !== nextWord && nextWord.includes(word)) {
        result.push(word);
        break;
      }
    }
  }

  return result;
};
stringMatching(["mass", "as", "hero", "superhero"]); // ["as","hero"]

/**
@TODO
  В задаче нужно посчитать кол-во цивр и букв
  еслти букв больше - новая строка начинаетсч с буквы, если цифр больше или длины равны - новое слово начинаетс с цифры
  двумя курсорами можем забирть буквы в нужном порядке из переменных, в которые запомнили строку или цифру
*/
const reformat = function (s) {
  let int = "";
  let letter = "";
  let result = "";

  for (char of s) {
    if (char.charCodeAt() >= 97) {
      letter += char;
    } else {
      int += char;
    }
  }

  if (Math.abs(letter.length - int.length) > 1) return s;

  let left = 0;
  let right = 0;

  while (left < letter.length || right < int.length) {
    if (letter.length === int.length || letter.length < int.length) {
      result += int[right] || "";
      result += letter[left] || "";
    }

    if (letter.length > int.length) {
      result += letter[left] || "";
      result += int[right] || "";
    }

    right++;
    left++;
  }

  return result;
};
// reformat("a0b1c2");  0a1b2c

const destCity = function (paths) {
  const startCity = new Set();

  for (const [city] of paths) {
    startCity.add(city);
  }

  for (const [_, city] of paths) {
    if (!startCity.has(city)) return city;
  }
};
// destCity([
//   ["London", "New York"],
//   ["New York", "Lima"],
//   ["Lima", "Sao Paulo"],
// ]); // Sao Paulo

const maxPower = function (s) {
  let maxCount = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    if (s[right] !== s[left]) {
      left = right;
    }

    maxCount = Math.max(right - left + 1, maxCount);
    right++;
  }

  return maxCount;
};
maxPower("zzeeeee"); // 2

const makeGood = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.length) {
      if (
        Math.abs(s[i].charCodeAt() - stack[stack.length - 1].charCodeAt()) ===
        32
      ) {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join("");
};
makeGood("abBAcC"); // ''
