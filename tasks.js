function dscount(str, s1, s2) {
  const exp = new RegExp(s1 + s2, "g");
  let count = 0;

  str.replace(exp, () => count++);

  return count;
}

function checkStr(str, extendsOpen = [], extendsClose = []) {
  const open = ["{", "(", "[", "<", ...extendsOpen];
  const close = ["}", ")", "]", ">", ...extendsClose];
  const stack = [];
  const chars = str.split("");
  let openIndex = 0;
  let closeIndex = 0;

  for (let i = 0; i < chars.length; i++) {
    openIndex = open.indexOf(chars[i]);

    if (openIndex !== -1) {
      stack.push(openIndex);
    }

    closeIndex = close.indexOf(chars[i]);

    if (closeIndex !== -1) {
      openIndex = stack.pop();

      if (openIndex !== closeIndex) {
        return 1;
      }
    }
  }

  if (stack.length !== 0) {
    return 1;
  }

  return 0;
}

function factorial(num) {
  return num !== 1 ? num * factorial(num - 1) : 1;
}

function factorialWithArray(num) {
  const stack = [];

  for (let i = 1; i <= num; i++) {
    stack.push(i);
  }

  return stack.reduce((acc, n) => acc * n, 1);
}

function palindrome(str) {
  if (
    str
      .toLowerCase()
      .split("")
      .reverse()
      .join("") === str
  ) {
    return true;
  }

  return false;
}

function fizzbuzz(num) {
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0) {
      console.log("fizz");
    } else if (i % 5 === 0) {
      console.log("buzz");
    } else if (i % 3 === 0 && i % 5 === 0) {
      console.log("fizzbuzz");
    } else {
      console.log(i);
    }
  }
}

function sort(str) {
  return str
    .toLowerCase()
    .split("")
    .map(function(letter) {
      return letter.trim();
    })
    .sort()
    .join("");
}

function helper(s1, s2) {
  const str1 = sort(s1);
  const str2 = sort(s2);

  return [str1, str2];
}

function anagramm(s1, s2) {
  const [str1, str2] = helper(s1, s2);

  return str1 === str2;
}

export {
  anagramm,
  dscount,
  checkStr,
  factorial,
  factorialWithArray,
  fizzbuzz,
  palindrome
};
