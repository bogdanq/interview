/**
 * Задача event loop - следить за стеком и очередью колбеков
 * В task queue - задачи хранятся и достаются в порядке FIFO - (первый зашел - первый вышел)
 *
 * stack - структура LIFO (последний зашел - первый вышел), хранит в себе текущие кадры стека
 *
 * рендер - выполняется только если в стеке нет ничего (выполняется между макро задачами)
 *
 * Micro tasks - выполняются сразу все, каждая таска может создать новую задачу, все равно, все будет выполнятся
 *  исполняются после каждого колбека, в конце каждой задачи
 *
 * Macro tasks - выполняет сразу (если стек пустой) после микро, после рендера (выполняет по одной, между ними - рендер)
 *
 * Эта очередь делится на Micro (Promise.resolve, async/await, mutation observer) и Macro (setTimeout, interval, events...) tasks,
 *
 *
 * => выбрать свободную таску (из очереди) => выполнить => выбрать microtask (все) => рендер
 */
const container = document.querySelector("#grayContainerOne");
const button = document.querySelector("#buttonOne");

button.addEventListener("click", e => {
  Promise.resolve().then(() => console.log("RO"));

  console.log("FUS");
});

container.addEventListener("click", () => {
  console.log("DAH!");
});

// button.click(); - вызвать тестами

// Пример 2

/**
micro = [
  console.log("micro promise 1"),
  console.log("micro promise 2")
  console.log("micro promise 3")

  console.log("micro promise 1 with macro")
  console.log("micro promise 2 with macro")
]

macro = [
  -
  setTimeout(console.log("macro promise 1"), 1000)
  -
  -
  setTimeout(console.log("macro");, 500)
]

stack = [
  console.log("sync");
]

==> begin <==
console.log("sync");
console.log("finish sync");

console.log("micro promise 1"),
console.log("micro promise 2")
console.log("micro promise 3")

console.log("micro promise 1 with macro")
console.log("micro promise 2 with macro")

console.log("macro promise 1")
 */

Promise.resolve().then(() => {
  console.log("micro promise 1"); // => micro
  setTimeout(() => console.log("macro promise 1"), 1000); // => macro 1000
  return Promise.resolve().then(() => {
    // => micro
    console.log("micro promise 2");
    return Promise.resolve().then(() => {
      // => micro
      console.log("micro promise 3");
    });
  });
});

console.log("sync");

setTimeout(() => {
  // => macro 500
  Promise.resolve().then(() => {
    // => micro
    Promise.resolve().then(() => {
      // => micro
      console.log("micro promise 2 with macro");
    });
    console.log("micro promise 1 with macro");
  });
  console.log("macro");
}, 500);

const arr = Array.from({ length: 10000000 }).map(i => i ** 20000000);
console.log("finish sync", arr.length);

//  пример 3

console.log("sync 1");

const createPromise = i =>
  Promise.resolve().then(() => console.log(`micro task - ${i}`));

const createPromiseMacro = (i, name) => {
  Promise.resolve().then(() => {
    console.log(`macro task - ${i}`, name);
    createMicroTasks(2);
  });
};

const createMicroTasks = count => {
  for (let i = 1; i <= count; i++) {
    createPromise(i);
  }

  console.warn("sync in createMicroTasks function");
};

const createMacroTask = (count, name) => {
  for (let i = 1; i <= count; i++) {
    setTimeout(() => createPromiseMacro(i, name), 0);
  }

  console.error("sync in createMacroTask function");
};

createMacroTask(2, "first");

console.log("sync 2");
createMicroTasks(5);
console.log("sync 4");

createMicroTasks(2);
console.log("sync 5");

createMacroTask(3, "second");
console.log("sync end");

/**
  createMacroTask(2, "first");
  createMicroTasks(1);

  выполнение


  step 1 //////////

stack = [
    console.error("sync in createMacroTask function");
    console.warn("sync in createMicroTasks function");
]


micro = [
    console.log(`micro task - ${1}`)
]

macro = [
    createPromiseMacro(i, name), 
    createPromiseMacro(i, name)
]

step 2 //////////

stack = [
    console.warn("sync in createMicroTasks function");
]

...prev step

step 3 //////////

stack = []

...prev step


step 4 //////////

stack = []

стек пустой - выполнить все из micro

micro = [] => stack [console.log(`micro task - ${1}`)]

macro = [
    createPromiseMacro(i, name), 
    createPromiseMacro(i, name)
]

step 5 //////////

stack = []

стек пустой - выполнить все из micro

micro = []

micro - пустой - выполнить первую из macro 

=> createPromiseMacro(i, name) 
=> stack = [createMicroTasks(2)]
=> stack = []
=> micro = [console.log(`micro task - ${1}`), console.log(`micro task - ${2}`)]
=> stack = [console.log(`micro task - ${1}`)]
=> stack = []
=> stack = [console.log(`micro task - ${2}`)]
=> stack = []

macro = [
    createPromiseMacro(i, name)
]
 */
