// /ОБЕРТКИ добавлены для быстрок=го запуска в браузере ****/
// ЗАДАЧИ НА ВСТУПИТЕЛЬНЫЕ КУРСЫ ТИНЬКОФФ 2023
/*
Вывести число - количество интересных отрезков

первая строка дни отпуска
вторая строка что он делал на каждый день
третья строка необходимое количество различных активностей

1) 3
  2 1 3
  2
Ответ 3

2) 4
  1 2 3 4
  1
Ответ 10
*/


const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const lines = []

const getIntrestedDaysCount = () => {
  const holidaysDuration = +lines[0]
  let inerestedCounter = 0

  const activityNumbers = lines[1].split(' ')
  const needActivityCounter = +lines[2]

  for (let i = 1; i <= holidaysDuration; i++) {
    for (let j = 1; j <= holidaysDuration; j++) {
      if (i <= j) {
        const map = new Set()

        for (let days = i; days <= j; days++) {
          map.add(activityNumbers[days - 1])
        }

        if (map.size >= needActivityCounter) {
          inerestedCounter += 1
        }
      }
    }
  }

  return inerestedCounter
}

rl.on('line', function (line) {
  lines.push(line)
})

rl.on('close', () => {
  const result = getIntrestedDaysCount()

  console.log(result)
  process.exit(0)
})

/*
Дано множество из n целых чисел. Поступают запросы — 
2X - добавить x, 
3X - удалить x,
1X - увеличить все элементы множества на x 
0X - проверить, лежит ли x в множестве.

следовательно первая цифра запроса - его команда

Ответьте на все вопросы последнего типа.

перавя строка -  изначальное количество элементов в множестве.
вторая строка - n чисел — сами элементы множества. Гарантируется, что все элементы различны и не превосходят по модулю ﻿
третья строка <= n - содержит число запросов

2
2 7
1 5
0 2
0 7
0 5
1 2
0 4
0 9
0 7
2 10
0 8 
0 9 
0 10
3 9
0 4
0 9
0 10
Ответ => YES YES NO YES YES NO NO YES YES YES NO YES
*/


const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const lines = []

const updateMultiplicities = () => {
  let multiplicities = lines[1].split(' ')
  const requests = lines.slice(3).map((it) => it.split(' '))

  for (let i = 0; i < requests.length; i++) {
    switch (requests[i][0]) {
      case '0': {
        if (multiplicities.includes(requests[i][1])) {
          console.log('Yes')
        } else {
          console.log('No')
        }
        break
      }

      case '1': {
        multiplicities = multiplicities.map((it) =>
          String(+it + +requests[i][1]),
        )
        break
      }

      case '2': {
        if (!multiplicities.includes(requests[i][1])) {
          multiplicities.push(requests[i][1])
        }
        break
      }

      case '3': {
        multiplicities = multiplicities.filter(
          (it) => String(it) !== String(requests[i][1]),
        )
        break
      }

      default: {
        break
      }
    }
  }
}

rl.on('line', function (line) {
  lines.push(line)
})

rl.on('close', () => {
  updateMultiplicities()

  process.exit(0)
})


/*
Узнать можно ли свайпами передвинуть одну из букв что бы вышло два одинаковых слова
? перепишу условие
*/

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const lines = []

const swiper = () => {
  let result = 'NO'

  const length = +lines[0]
  const testString = lines[1]

  let swipeCounter = 0
  let index = 0

  if (+length % 2 === 0) {
    while (swipeCounter <= 1 || index < length / 2) {
      if (testString[index] !== testString[index + length / 2]) {
        swipeCounter += 1
      }

      index += 1
    }

    if (swipeCounter === 2) {
      result = 'YES'
    }
  }

  return result
}

rl.on('line', function (line) {
  lines.push(line)
})

rl.on('close', () => {
  const result = swiper()

  console.log(result)
  process.exit(0)
})


/*
Узнать явлеятся ли пара числом и строкой в любом порядке

А М - NO
1 1 - NO
N 5 - YES
5 N - YES
*/

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const lines = []

const getPairs = () => {
  let result = 'NO'

  const str = lines[0]

  if (str.length === 2) {
    let nums = 0

    for (let i = 0; i < 2; i++) {
      if (Number.isNaN(+str[i])) {
        nums += 1
      }
    }

    if (nums === 1) {
      result = 'YES'
    }
  }

  return result
}

rl.on('line', function (line) {
  lines.push(line)
})


rl.on('close', () => {
  const result = getPairs()

  console.log(result)
  process.exit(0)
})

/*
Гена работает гендиректором одной очень известной компании. Он придерживается классических взглядов 
в управлении сотрудниками, поэтому в его компании почти у каждого сотрудника ровно один 
непосредственный начальник. Единственным работником без начальника является он сам. Таким образом, 
если изобразить сотрудников на схеме и провести ребра между сотрудниками и их непосредственными 
начальниками, получится структура дерева, в корне которого находится Гена. 
Все сотрудники занумерованы, а Гена имеет номер ﻿

ДАННЫЕ

7
1  2
1 3
2 4
2 5
3 6
3 7
0 0 1 0 0 1 1

первая строка количество сотрудников
остальные строки - связть подчиненный - босс
последняя строка их решения


Если конфликтов больше 1, не возможно решить одним увольнением - вывести NO
В остальном вывести YES и сотрудника самого низкого (максимальный номер)

ответ YES 3

у 3 конфликт с 1 - потому что 1 думает 0, а 3 - думает 1 - наше совпадение
*/

const getKicked = (opinions, emploees) => {
  let kicked = null;

const tree = emploees.reduce((acc, [parent, child]) => {
  acc[parent] = [
    ...(acc[parent] || []),
    { worker: child, opinions: opinions[child - 1], parent },
  ];

  return acc;
}, {});

Object.values(tree).forEach((childs) => {
  childs.forEach((child) => {
    const opinionsParent = opinions[child.parent - 1];
    const opinionsChild = child.opinions;

    if (opinionsParent !== opinionsChild) {
      kicked = [...(kicked || []), child.worker];
    }
  });
});

const getResult = () => {
  if (!kicked) {
    console.log("YES", opinions.length);
    return;
  }

  if (kicked.length === a.length) {
    console.log("NO");
    return;
  }

  if (kicked.length || kicked.length !== a.length) {
    console.log("YES", Math.max(...kicked));
    return;
  }
};

getResult()
}