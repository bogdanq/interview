/*
Дан список интов, повторяющихся элементов в списке нет. Нужно преобразовать это множество в строку,
сворачивая соседние по числовому ряду числа в диапазоны.
Примеры:
    [1,4,5,2,3,9,8,11,0] => "0-5,8-9,11"
    [1,4,3,2] => "1-4"
    [1,4] => "1,4"
*/
// 1 5

function reduce(arr = [1, 4, 5, 2, 3, 9, 8, 11, 0]) {
  let rs = [];
  let start = null;
  let end = null;

  arr.sort((a, b) => a - b);
  // [0,1,2,3,4,5, 8,9,11]
  for (let i = 0; i < arr.length; i++) {
    if (start === null) {
      start = arr[i];
    }

    if (arr[i] + 1 === arr[i + 1]) {
      end = arr[i + 1];
    } else {
      rs.push(start && end ? `${start}-${end}` : start);
      start = null;
      end = null;
    }
  }

  return rs.join(",");
}
