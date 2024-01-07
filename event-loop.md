## event loop (событийный цикл)

JS был спроектирован как однопоточный язык программирования. Это значит, что он может выполнять только одну операцию одновременно. Тем не менее у JavaScript есть такой механизм как Event Loop, который как раз и позволяет выполнять "асинхронные" операции.

Макрозадачами являются все асинхронные операции, такие как XmlHTTPRequest, setTimeout и так далее.

В микрозадачи попадают в основном только две категории: then у промисов, а также Intersection Observer.

В задачи отрисовки попадают задачи связанные с отрисовкой и обновлением контента страницы.

Задача `event loop` - следить за стеком (`stack`) и очередью колбеков (`callback queue`) и когда стек пустой, а в очереди что то есть, брать из очереди задачу и перемещать в стек.

- `heap`- объекты собраны в кучу, которая есть ни что иное, как название для наименее структурированной части памяти
- `callback queue`- задачи хранятся и достаются в порядке FIFO - (первый зашел - первый вышел). Эта очередь делится на Micro (Promise.resolve, async/await, mutation observer) и Macro (setTimeout, interval, events...) tasks
- `stack` - структура LIFO (последний зашел - первый вышел), хранит в себе текущие кадры стека, пока не пустой - блокирует рендер
- `Micro tasks` - выполняются сразу все, каждая таска может создать новую задачу, все равно, все будет выполнятся исполняются после каждого колбека
- `Macro tasks` - выполняет сразу (если стек пустой) после микро, после рендера (выполняет по одной, между ними - рендер)
- Api браузера - содержит в себе методы, которые выполняются в разных потоках, их много (таймеры, геолокация, запросы к апи)

      => выбрать свободную `macro` таску (из очереди) => выполнить => втиснет рендер => выбрать microtask (выполнить все, блок потока) => рендер

## Пример 1

В примере ниже если вызвать тестами клики или выполнить клик по кнопке - будут два результата

```js
const container = document.querySelector("#grayContainerOne");
const button = document.querySelector("#buttonOne");

button.addEventListener("click", (e) => {
  Promise.resolve().then(() => console.log("micro"));

  console.log("button click");
});

container.addEventListener("click", () => {
  console.log("container click");
});
```

### Клик по кнопке

1. Клик по `button`
2. Promise.resolve() - попадет в очередь `micro tasks`
3. console.log("button click");
4. Пустой стек = выполнить все `micro tasks`
5. console.log("micro")
6. Событие дойдет до container, колбек addEventListener - в стек
7. console.log("container click")

В итоге: button click => micro => container click

### Клик по кнопке из тестов

      button.click();

1. button.click() в стек
2. Клик по `button`, addEventListener - колбек в стек
3. Promise.resolve() - попадет в очередь `micro tasks`
4. console.log("button click");
5. Клик по container, потому что стек не пустой, в нем еще выполняется `button.click`
6. addEventListener - колбек в стек
7. console.log("container click");
8. Завершение button.click
9. Пустой stack => выполнить микро задачи

В итоге: button click => container click => micro

## Пример 2

```js
Promise.resolve().then(() => {
  console.log("micro promise 1");
  setTimeout(() => console.log("macro promise 1"), 1000);
  return Promise.resolve().then(() => {
    console.log("micro promise 2");
    return Promise.resolve().then(() => {
      console.log("micro promise 3");
    });
  });
});

console.log("sync");

setTimeout(() => {
  Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      console.log("micro promise 2 with macro");
    });
    console.log("micro promise 1 with macro");
  });
  console.log("macro");
}, 500);

const arr = Array.from({ length: 10000000 }).map((i) => i ** 20000000);
console.log("finish sync", arr.length);
```

В данном примере `map` - остановит весь рендер, это можно исправить, сделав асинхронным колбеки.

|                           stack                            |  micro   |   macro   |                              descriptions                               |
| :--------------------------------------------------------: | :------: | :-------: | :---------------------------------------------------------------------: |
|                 Promise.resolve().then(cb)                 | then(cb) |           |                                                                         |
|                    console.log("sync")                     | then(cb) |           |                                                                         |
|                                                            | then(cb) |           |                               пустой стек                               |
|                       setTimeout(cb)                       | then(cb) |           |                                в веб апи                                |
|                                                            | then(cb) |    cb     |                             колбек таймера                              |
|          Array.from({ length: 10000000 }).map(cb)          | then(cb) |    cb     |             блокирует рендер, пока не выполнит все колбеки              |
|                                                            | then(cb) |    cb     |                               пустой стек                               |
|           console.log("finish sync", arr.length)           | then(cb) |    cb     |                                                                         |
|                                                            | then(cb) |    cb     |       пустой стек (нет синхронных операций, выполнить микро таск)       |
|                          then(cb)                          |          |    cb     |                   then(cb) - первая задача из очереди                   |
|         then(cb) => console.log("micro promise 1")         |          |    cb     |                                                                         |
|                          then(cb)                          |          |    cb     |                                                                         |
|                 then(cb) => setTimeout(cb)                 |          | cb => cb2 |                            таймер в веб апи                             |
|                          then(cb)                          |          | cb => cb2 |                                                                         |
|             then(cb) => Promise.resolve().then             |          | cb => cb2 |                       микро задачу выполнит сразу                       |
|      then(cb) => then(console.log("micro promise 2"))      |          | cb => cb2 |                                                                         |
|    then(cb) => then() => Promise.resolve().then(() => {    |          | cb => cb2 |                       микро задачу выполнит сразу                       |
| then(cb) => then() => then(console.log("micro promise 3")) |          | cb => cb2 |                       микро задачу выполнит сразу                       |
|                     then(cb) => then()                     |          | cb => cb2 |                                                                         |
|                                                            |          |    сb     |     стек освободился, взять макро задачу (cb2 - ее задержка меньше)     |
|               Promise.resolve().then(() => {               | then(cb) |    сb     |                            промис в очередь                             |
|                   console.log("macro");                    | then(cb) |    сb     |                                                                         |
|                                                            | then(cb) |    сb     |                   стек пустой - выполнить микро таск                    |
|         then(cb) => Promise.resolve().then(() => {         | then(cb) |    сb     |             задачу в очередь, но выполнит сразу в этом тике             |
|   then(cb) => console.log("micro promise 1 with macro")    | then(cb) |    сb     |             задачу в очередь, но выполнит сразу в этом тике             |
|                                                            | then(cb) |    сb     |              стек пуст, выполнить в этом тике микро задачи              |
|   then(cb) => console.log("micro promise 2 with macro")    |          |    сb     |                                                                         |
|                          then(cb)                          |          |    сb     |                                                                         |
|                                                            |          |    сb     | стек пуст, выполнить в этом тике микро задачи (их нет), выполнить макро |
|                            cb()                            |          |           |                                                                         |
|           cb() => console.log("macro promise 1")           |          |           |                                                                         |
|                            cb()                            |          |           |                                                                         |
|                                                            |          |           |                          Выполнение завершено                           |

Итого: sync => finish sync => micro promise 1 => micro promise 2 => micro promise 3 => macro => micro promise 1 with macro => micro promise 2 with macro => macro promise 1

## Пример 3

```js
const createPromise = (i, name) =>
  Promise.resolve().then(() => console.log(`micro task - ${i}: ${name}`));

const createPromiseMacro = (i, name) => {
  console.log(`macro task - ${i}`, name);
  createMicroTasks(2, name);
};

const createMicroTasks = (count, name) => {
  for (let i = 1; i <= count; i++) {
    createPromise(i, name);
  }
  console.log("sync in createMicroTasks function", name);
};

const createMacroTask = (count, name) => {
  for (let i = 1; i <= count; i++) {
    setTimeout(() => createPromiseMacro(i, name), 0);
  }
  console.log("sync in createMacroTask function", name);
};

// вызов

console.log("sync 1");

createMacroTask(2, "first macro");

createMicroTasks(2, "first micro");

createMicroTasks(2, "second micro");

createMacroTask(2, "second macro");
```

![event-loop1-result](https://github.com/bogdanq/js-lessons/raw/master/assets/event-loop1.png)
