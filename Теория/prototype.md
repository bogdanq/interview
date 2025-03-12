## Прототипы обьекта, прототипное наследование (proto, prototype)

Прототипы - это связь обьектов, если обьект не находит свойство, метод у себя, он идет по прототипу выше и пытается найти свойство в нем, так до того конктруктора, с помощью которого обьект был создан (new String, Object...).

## proto

Это свойство есть у любого обьекта, оно указывает на прототип класса (функцию-конструктор), с помощью которого был создан. У разных по "типу" екземпляров класса - эти свойства разные. Это свойствло нужно, что бы найти свойство по цепочке выше, в родителе (prototype). Является геттером/сеттером для свойства [[Prototype]].

```js
const a = {};
const b = {};
const f = 12;

// true (оба указывают на prototype new Object())
b.__proto__ === a.__proto__;

//false (f - указываует на prototype new Number())
f.__proto__ === a.__proto__;
```

## prototype

Это независимый обьект, сам по себе, с определенным набором свойств и методов. Это свойство есть только у Function declaration и class (new String). У `стрелочной функции` нет свойства `prototype`.

```js
const arrow = () => null;

function declaration() {}

class Class {}

// undefined (у стрелочной нет свойства)
console.log(arrow.prototype);

// declaration prototype
console.log(declaration.prototype);

// Class prototype
console.log(Class.prototype);
```

## Наследование

В js - обьекты это динамические "контейнеры", наполненные свойствами, каждый обьект имеет ссылку на своего родителя `__propto__`. При попытке обращения к свойству - оно ищется вначале в самом обьекте, потом в прототипе обьекта и так далее, пока не достигнут конец цепочки. НАследование в js работает так же - наследуемое свойство добавляется в обьект ввиде его свойства, оно ведет себя точно так же как и любое другое свойство, даже "затенение свойств".

### Object.create

Метод создает новый обьект с указанным обьектом и передает его в `__proto__` новго обьекта.

```js
const source = {
  age: 12,
  foo: function () {
    console.log(this.age);
  },
};

// создал новый обьект
const target = Object.create(source);
console.log(target.__proto__ === source);

source.foo(); // 12
// создание свойства в новом обьекте
target.age = "new age";
// в данном обьекте появилось новое свойство
target.foo(); // new age
```

### Создание обьектов с помощью конструктора

В JavaScript "конструктор" — это "просто" функция, вызываемая с оператором new.

```js
// class - синтаксический сахар, использует тоже прототипное наследование
class Example {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  move() {
    this.x += 1;
    this.y += 1;
  }
}

// обьект example имеет собственые свойства x, y
// метод move - в прототипе конструктора
// example.__proto__ === Example.prototype
const example = new Example();

// вариант с функцией

function Example() {
  this.x = 0;
  this.y = 0;
}

Example.prototype = {
  move() {
    this.x += 1;
    this.y += 1;
    console.log(this);
  },
};

// обьект example имеет собственые свойства x, y
// метод move - в прототипе конструктора
// example.__proto__ === Example.prototype
const example = new Example();
```

## Примеры

```js
// false, у обьекта нет свойства prototype
console.log({}.prototype === {}.__proto__);

function Foo1() {}
// false
// __proto__ указывает на prototype new Function, а prototype Foo1 - самостоятельный обьект
console.log(Foo1.prototype === Foo1.__proto__);

function Foo2() {}
function Foo3() {}
// true
// указывают на прототип new Function
console.log(Foo2.__proto__ === Foo3.__proto__);
// false
// прототипы самостоятельные обьекты
console.log(Foo2.prototype === Foo3.prototype);

const Component = () => null;
// false
// у стрелочной функции нет прототипа
console.log(Component.prototype === Object.prototype);

const age = 12;
// false
// прототип - самостоятельный обьект
console.log(age.prototype === Number.prototype);
// true
// __proto__ - указывает на prototype Number
console.log(age.__proto__ === Number.prototype);

class Class1 {}
// true
// __proto__ указывает на prototype Function
console.log(Class1.__proto__ === Function.prototype);

function Foo4() {}
// true
// __proto__ указывает на prototype Function
console.log(Foo4.__proto__ === Function.prototype);

const c = 12;
// true
// __proto__ указывает на prototype Number
console.log(c.__proto__ === Number.prototype);

const promise = new Promise(() => ({}));
// false
// прототип - самостоятельный обьект
console.log(promise.prototype === Function.prototype);
// false
// __proto__ - укажет на родительский прототип, Promise.prototype
console.log(promise.__proto__ === Function.prototype);

const arr = [];
// false
// прототип - самостоятельный обьект
console.log(promise.prototype === Object.prototype);
// false
// __proto__ - укажет на родительский прототип, Promise.prototype
console.log(promise.__proto__ === Array.prototype);

function Example() {
  this.name = 12;
}

Example.prototype.say = function () {
  console.log(this.name);
};

const e1 = new Example().say(); // 12
const e2 = new Example().say(); // 12

class Example2 {
  constructor() {
    this.name = 12;
  }
}

const e3 = new Example2();
// false
// e3.__proto__ - укажет на Example2.prototype
// Example2.prototype - это обьект, у которого свойство __proto__ - укажет на Object.prototype
console.log(e3.__proto__.__proto__ === Function.prototype);
// true
console.log(e3.__proto__.__proto__ === Object.prototype);
// true
console.log(e3.__proto__ === Example2.prototype);
// true
// e3.__proto__ - укажет на Example2.prototype
// Example2.prototype - имеет constructor, он указывает на класс Example2
// constructor.__proto__ - указывает на прототип родителя Function.prototype
console.log(e3.__proto__.constructor.__proto__ === Function.prototype);
// null
// e3.__proto__ - укажет на Example2.prototype
// Example2.prototype - это обьект, у которого свойство __proto__ - укажет на Object.prototype
// у Object.prototype - нет свойства __proto__
console.log(e3.__proto__.__proto__.__proto__);
```
