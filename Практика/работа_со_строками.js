const tasks = {
  rle,
  lengthOfLongestSubstring,
  longestPalindrome,
  isPalindrome,
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
      const prevLeft = map.get(s[right]);

      for (let i = left; i < prevLeft; i++) {
        map.delete(s[i]);
      }

      left = prevLeft + 1;
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

const longestPalindrome = function (s) {};
