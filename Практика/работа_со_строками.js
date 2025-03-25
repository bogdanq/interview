const tasks = {
  rle, // easy
  lengthOfLongestSubstring, // medium [скользящее окно]
  longestPalindrome, // medium
  isPalindrome, // easy
  romanToInt, // easy
  longestCommonPrefix, // easy
  strStr, // easy [скользящее окно]
  reverseVowels, // easy два указателя
  canConstruct, // easy хеш мап
  firstUniqChar, // easy хеш мап
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
сложный поиск самого длинного палиндрома в строке
*/
const longestPalindrome = function (s = "") {
  let left = 0;
  let right = 0;
  let maxLen = 0;

  while (right < s.length) {
    const isP = s.slice(left, right + 1);
    if (!isPalindrome(isP)) {
    }

    right++;
  }
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
