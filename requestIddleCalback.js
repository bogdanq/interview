function getColor(color) {
  return [
    `color: ${color};`,
    "border-bottom: 1px solid #000;",
    "padding: 3px 10px;"
  ].join("");
}

function logger(str, color = "#000") {
  console.log("%c%s", getColor(color), str);
}

var task = [
  () => console.log("task with iddle 1"),
  () => console.log("task with iddle 2"),
  () => console.log("task with iddle 3")
];

function backgroundTask(deadline, tasks, name) {
  Promise.resolve().then(() => logger("micro task in backgroundTask", "blue")); // промис внутри requestIdleCallback - выполняется немедленно, даже, если времени не осталось
  setTimeout(() => logger(`macro task in backgroundTask ${name}`, "green"), 0); // макро задача выполняется в самом конце, как обычно

  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    tasks.shift()();
  }

  if (tasks.length > 0) {
    requestIdleCallback(backgroundTask);
  }
}

requestIdleCallback(deadline => {
  logger("requestIdleCallback begin", "#673ab7");
  backgroundTask(deadline, [...task], "first");
});

requestIdleCallback(deadline => {
  logger("requestIdleCallback2 begin", "#673ab7");
  backgroundTask(deadline, [...task], "second");
});

const block = document.querySelector(".block");
const num = Math.floor(Math.random() * 5);
const arr = Array.from({ length: 20000 });
let count = 0;

function asyncForEach(arr, cb) {
  arr.forEach((i, index) => {
    setTimeout(() => cb(index), 0);
  });
}

function syncForEach(arr, cb) {
  arr.forEach((i, index) => {
    cb(index);
  });
}

logger("sync start");

Promise.resolve().then(() => logger("micro task 1", "blue"));
setTimeout(() => logger("macro task 1", "green"), 0);

const cb = index => {
  if (index === arr.length - 1) {
    logger(`asyncForEach end (macro tasks) - ${count}`, "red");

    if (count < 2) {
      count++;
      asyncForEach(arr, cb);
    }
  }

  const result = index ** num;
  block.innerHTML = result;
};

asyncForEach(arr, cb);

logger("sync end");
