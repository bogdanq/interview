const tasks = {
  // Жадный алгоритм
  atm, // easy
  coinChange, // easy
  canPlaceFlowers,
};

/**
@TODO
  Жадный алгоритм позволяет забирать максимально большие значения и ожидать, что это верное решение, идеально
  подходит для банкомата и монет с рюкзаком
  Начальные данные в задаачх можно сортировать от большего к меньшему и путем перебора исходных данных
  получать искомую величину (складывать монеты-купюры)
  в задачах без ограничений искомая величина всегда найдется и будет уменьшена до 0
  в задаче на банкомат - может не хватить банка и необходимо вводить дополнительные провнерки
*/
const atm = (bank, amount) => {
  const notes = Object.keys(bank).sort((a, b) => b - a);
  const result = {};

  for (const note of notes) {
    while (bank[note] > 0 && +note <= amount) {
      amount -= note;
      result[note] = (result[note] || 0) + 1;
      bank[note] -= 1;
    }
  }

  return amount > 0 ? -1 : result;
};
atm({ 100: 10, 1000: 2, 5000: 2, 2000: 2, 500: 3 }, 9600); // === {100: 1, 500: 1, 2000: 2, 5000: 1}

const coinChange = (coins, amount) => {
  coins.sort((a, b) => b - a);
  let coinsCount = 0;

  for (const coin of coins) {
    if (coin <= amount) {
      const count = Math.floor(amount / coin);
      amount = amount % coin;
      coinsCount += count;
    }
  }

  return coinsCount;
};
coinChange([10, 5, 20, 1, 15, 25], 60); // 3

/**
@TODO
  Жадный алгоритм не всегда про сортировку, это пример подхода, когда мы всегда что то делаем,
  например в задаче мы считаем что всегда сажаем цветок и смотрим условие
  маленькими шагами делаем действие и считаем, что это приведет к верному решению
*/
const canPlaceFlowers = function (flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (
      flowerbed[i] + (flowerbed[i - 1] || 0) + (flowerbed[i + 1] || 0) ===
      0
    ) {
      if (n === 0) return true;
      flowerbed[i] = 1;
      n--;
    }
  }

  return n <= 0;
};

canPlaceFlowers([0, 0, 1, 0, 0], 1);
