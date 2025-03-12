## this в стрелочной функции (function expression / лямбда-функция)

В стрелочных функциях, this привязан к окружению, в котором была создана функция. В глобальной области видимости this будет указывать на глобальный объект.

- стрелочная ф-я - не имеет своего контекста
- `call`, `bind`, `apply` - не заменяют контекст стрелочной функции
- ф-я берет контекст от родительской области видимости (при обьявлении), не завиисмо от места вызова
- стрелочную функцию нельзя использовать в роли функции-конструктора
- стрелочная функция не имеет `arguments` (наследуют его как и this)

```js
var age = "global";

const source = {
  age: "binding age",
};

const arrow = () => console.log(arguments); // arguments is not defined

const arrowFunction = () => console.log(this.age);

// функция берет контекст от родителя в месте создания и его нельзя переопределить
arrowFunction(); // global
arrowFunction.call(source); // global
arrowFunction.apply(source); // global
arrowFunction.bind(source)(); // global

function declarationFoo() {
  const arrowFunction = () => console.log(this.age);
  arrowFunction();

  return arrowFunction;
}

// контекст вызова переопределили и его получила стрелочная функция
const f = declarationFoo.call(source); // binding age

f(); // binding age

new arrowFunction(); // arrowFunction is not a constructor

// Самый распространенный пример с таймером

function withTimeout() {
  // стрелочная функция взяла контекст от места создания у родительской функции withTimeout
  setTimeout(() => {
    console.log(this.age, arguments); // binding age
  }, 500);

  // внутри setTimeout - переопределит не явно контекст функции, что бы исправить, нужно вызывать с bind или стрелочуню функцию
  setTimeout(function () {
    console.log(this.age); // global
  }, 400);

  // переопределил контекст
  setTimeout(
    function () {
      console.log(this.age); // binding age
    }.bind(source),
    300
  );
}

withTimeout.call(source);
```
