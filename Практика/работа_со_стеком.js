const tasks = {
  removeDuplicateLetters, //med,
};

/**
  задача на монотонный стек, важно следить, что буква не в стеке и посчитать их кол-во
  а удалять из стека можно еслт вершина стека еще есть в мапе + вершина стека > char
  при этом ничего не обрабатывать если искомая буква уже есть в стеке, потому что стек гарантирует
  что n<n+1
 */
var removeDuplicateLetters = function (s) {
  const mstack = [];
  const map = new Map();
  const inResult = new Set();

  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of s) {
    map.set(char, map.get(char) - 1);
    if (inResult.has(char)) continue;

    while (
      mstack.length &&
      mstack[mstack.length - 1] > char &&
      map.get(mstack[mstack.length - 1]) > 0
    ) {
      const remoded = mstack.pop();
      inResult.delete(remoded);
    }

    mstack.push(char);
    inResult.add(char);
  }

  return mstack.join("");
};
// console.log(removeDuplicateLetters("cbacdcbc") === "acdb");
