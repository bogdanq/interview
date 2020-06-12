/** ========*/
function dscount(str, s1, s2) {
  const exp = new RegExp(s1 + s2, "g");
  let count = 0;

  str.replace(exp, () => count++);

  return count;
}
/** ========*/

/** ========*/
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
/** ========*/

/** ========*/
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
/** ========*/

/** ========*/
function palindrome(str) {
  if (str.toLowerCase().split("").reverse().join("") === str) {
    return true;
  }

  return false;
}
/** ========*/

/** ========*/
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
/** ========*/

/** ========*/
function sort(str) {
  return str
    .toLowerCase()
    .split("")
    .map(function (letter) {
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
/** ========*/

/** ========*/
function findVolwels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const filtredString = str.split("").filter((char) => !vowels.includes(char));

  return str.length - filtredString.length;
}
/** ========*/

/** ========*/
function fibonacci(num) {
  if (num < 2) {
    return num;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
}
/** ========*/

/** ========*/
const drowTriangleRow = (count, symbol = "#") => {
  let string = "";

  for (let i = 0; i < count; i++) {
    string += symbol;
  }

  return string;
};

function drowTriangle(max = 8) {
  let count = 1;

  while (count <= max) {
    const string = drowTriangleRow(count, "#");
    console.log(string);
    count++;
  }
}
/** ========*/

/** ========*/
const drowBoardRow = (symbol = "#", direction) => {
  let string = "";

  for (let i = 0; i < 4; i++) {
    string += direction ? `${symbol} ` : ` ${symbol}`;
  }

  return string;
};

function drowChessBoard() {
  let direction = true;

  if (direction) {
    let count = 1;

    while (count <= 8) {
      const string = drowBoardRow("#", direction);
      console.log(string);
      direction = !direction;
      count++;
    }
  }
}
/** ========*/

/** ========*/
function min(...nums) {
  console.log(Math.min(...nums));
}

function isEven(num) {
  return num % 2 === 0;
}
/** ========*/

/** ========*/
function range(start, end, step = 1) {
  if (!start || !end) {
    return [];
  }

  const min = Math.min(start, end);
  const max = Math.max(start, end);
  let count = min;
  const result = [min];

  for (let i = 1; i < max; i++) {
    const updateCount = count + Math.abs(step);

    if (updateCount <= max) {
      count = updateCount;
      result.push(count);
    }
  }

  return start === max ? result.reverse() : result;
}
/** ========*/

/** ========*/
function reverse(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.unshift(arr[i]);
  }

  return result;
}
/** ========*/

/** ========*/
function arrayToList(arr) {
  if (arr.length > 1) {
    return { value: arr.shift(), rest: arrayToList(arr) };
  }

  return { value: arr.shift(), rest: null };
}

function listToArray(list, result = []) {
  if (list.rest) {
    result.push(list.value);
    return listToArray(list.rest, result);
  }

  result.push(list.value);

  return result;
}

function prepend(value, rest) {
  if (rest) {
    return { value, rest };
  }

  return { value, rest: null };
}

function nth(list, index) {
  const result = listToArray(list);
  return result[index] ?? null;
}
/** ========*/

/** ========*/
function convolution(arrays) {
  return arrays.reduce((acc, array) => [...acc, ...array], []);
}
/** ========*/

/** ========*/
function every(array, predicate) {
  let isValid = true;
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

function some(array, predicate) {
  let isValid = false;
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      isValid = true;
    }
  }

  return isValid;
}
/** ========*/

/** ========*/
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sum({ x, y }) {
    return {
      x: this.x + x,
      y: this.y + y,
    };
  }

  minus({ x, y }) {
    return {
      x: this.x - x,
      y: this.y - y,
    };
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
/** ========*/

/** ========*/

function primitiveMultiply(a, b) {
  if (Math.random() < 0.1) {
    return a * b;
  }

  throw new Error("Opps");
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    return reliableMultiply(a, b);
  }
}
/** ========*/

export {
  anagramm,
  dscount,
  checkStr,
  factorial,
  factorialWithArray,
  fizzbuzz,
  palindrome,
  findVolwels,
  fibonacci,
  drowTriangle,
  drowChessBoard,
  min,
  isEven,
  range,
  reverse,
  arrayToList,
  prepend,
  nth,
  listToArray,
  convolution,
  every,
  some,
  Vector,
  reliableMultiply,
};

function commitPlacement(finishedWork: Fiber): void {
  if (!supportsMutation) {
    return;
  }

  // Recursively insert all host nodes into the parent.
  const parentFiber = getHostParentFiber(finishedWork);

  // Note: these two variables *must* always be updated together.
  let parent;
  let isContainer;

  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentFiber.stateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
    case HostPortal:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = true;
      break;
    default:
      invariant(
        false,
        "Invalid host parent fiber. This error is likely caused by a bug " +
          "in React. Please file an issue."
      );
  }
  if (parentFiber.effectTag & ContentReset) {
    // Reset the text content of the parent before doing any insertions
    resetTextContent(parent);
    // Clear ContentReset from the effect tag
    parentFiber.effectTag &= ~ContentReset;
  }

  const before = getHostSibling(finishedWork);
  // We only have the top Fiber that was inserted but we need recurse down its
  // children to find all the terminal nodes.
  let node: Fiber = finishedWork;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, node.stateNode, before);
        } else {
          insertBefore(parent, node.stateNode, before);
        }
      } else {
        if (isContainer) {
          appendChildToContainer(parent, node.stateNode);
        } else {
          appendChild(parent, node.stateNode);
        }
      }
    } else if (node.tag === HostPortal) {
      // If the insertion itself is a portal, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === finishedWork) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
