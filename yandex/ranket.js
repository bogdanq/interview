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
