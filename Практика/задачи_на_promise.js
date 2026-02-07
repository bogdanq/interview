const tasks = {
  queryWithLimit,
  PromiseAll,
  PromiseChain,
  PromiseAllSettled,
  PromiseAny,
  PromiseRace,
  PromiseWithAbort,

  // https://leetcode.com/problems/promise-time-limit/
  timeLimit, // medium
};

const sleep = (timeout, hasError, controller) => {
  return new Promise((rs, rj) => {
    const timer = setTimeout(() => {
      if (hasError) {
        rj(timeout);
      } else {
        rs(timeout);
      }
    }, timeout);

    const listener = () => {
      clearInterval(timer);
      rj("aborted");
      controller.signal.removeEventListener("abort", listener);
    };

    controller.signal.addEventListener("abort", listener);
  });
};

function queryWithLimit(urls, limit = 2) {
  const q = [...urls];
  const results = [];

  const process = async () => {
    while (q.length) {
      const url = q.shift();
      if (url === undefined) break;

      await sleep(Math.floor(Math.random() * 20));
      results.push(url);
    }
  };

  return Promise.all(Array.from({ length: limit }, process)).then(
    () => results,
  );
}
// queryWithLimit([1, 2, 3, 4, 5, 6, 7, 8, 9]).then(console.log);

function PromiseAll(promises) {
  return new Promise((rs, rj) => {
    const result = [];
    let count = 0;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          result[idx] = res;
          count++;

          if (count === promises.length) {
            rs(result);
          }
        })
        .catch(rj);
    });
  });
}
// PromiseAll([sleep(30), sleep(100, true), sleep(320)])
//   .then(console.log)
//   .catch(console.log);

function PromiseChain(promises) {
  return promises.reduce((rs, cb) => {
    return rs
      .then(async (param) => {
        const res = await cb(param);
        console.log("res", res);
        return res;
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, Promise.resolve());
}
// PromiseChain([
//   () => sleep(1000),
//   () => sleep(100, true),
//   () => sleep(320),
// ]).then(console.log);

function PromiseAllSettled(promises) {
  return new Promise((rs, rj) => {
    const result = [];
    let count = 0;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          result[idx] = { value: res, status: "fulfilled" };
        })
        .catch((err) => {
          result[idx] = { value: err, status: "rejected" };
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            rs(result);
          }
        });
    });
  });
}
// PromiseAllSettled([sleep(30), sleep(100), sleep(320)])
//   .then(console.log)
//   .catch(console.log);

function PromiseAny(promises) {
  return new Promise((rs, rj) => {
    const result = [];
    let count = 0;
    let resolved = false;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          if (!resolved) {
            resolved = true;
            rs(res);
          }
        })
        .catch((err) => {
          result[idx] = err;
          count++;

          if (count === promises.length) {
            rj(result);
          }
        });
    });
  });
}
// PromiseAny([sleep(300), sleep(100), sleep(320)])
//   .then(console.log)
//   .catch(console.log);

function PromiseRace(promises) {
  return new Promise((rs, rj) => {
    let resolved = false;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          if (!resolved) {
            resolved = true;
            rs(res);
          }
        })
        .catch((err) => {
          if (!resolved) {
            resolved = true;
            rj(err);
          }
        });
    });
  });
}
// PromiseRace([sleep(300), sleep(100), sleep(3)])
//   .then(console.log)
//   .catch(console.log);

function PromiseWithAbort(promise, ms) {
  return new Promise((rs, rj) => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, ms);

    return promise(controller)
      .then((res) => {
        clearInterval(timer);
        rs(res);
      })
      .catch(rj);
  });
}
// PromiseWithAbort((controller) => sleep(500, false, controller), 1)
//   .then(console.log)
//   .catch(console.log);

function timeLimit(fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject({ rejected: "Time Limit Exceeded", time: t });
      }, t);

      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => clearInterval(timer));
    });
  };
}
// timeLimit(async () => {
//   throw "Error";
// }, 1000)()
//   .then(console.log)
//   .catch(console.log);
