/**
 * __proto__ {
 * есть у любого обьекта, свойство указывает напрототип класса (функции-конструктора),
 * емпляром которых явдяется обьект. proto - это не зависимые обьекты, у роазных по "типу" обьектов - они разные.
 * Например
 * const a = {}
 * const b = {}
 * const f = 12
 *
 * b.__proto__ === a.__proto__ (указывают на prototype new Object())
 * f.__proto__ === a.__proto__(указывают на prototype  new Number())
 *
 * нужен, что бы брать методы у прототипа выше по цепочке, если нет метода в целевом обьекте,
 * интерпритатор пойдет выше - по ссылке __proto__ в prototype родителя.
 * }
 */

/**
 * Prototype - независимый обьект, сам по себе, с определенным набором свойств и методов
 * Есть только у Function и class (new Function, new String...)
 * Исключение - у стрелочной функции нет прототипа
 */
console.log({}.prototype === {}.__proto__); // false, у обьекта нет прототипа

function Foo1() {}
console.log(Foo1.prototype === Foo1.__proto__); // false,  __proto__ - указывает на new Function, а прототип Foo1 - самостоятельный обьект

function Foo2() {}
function Foo3() {}
console.log(Foo2.__proto__ === Foo3.__proto__); // true, указывают на прототип new Function
console.log(Foo2.prototype === Foo3.prototype); // false, прототипы самостоятельные обьекты

const Component = () => null;
console.log(Component.prototype === Object.prototype); // false, у стрелочной функции нет прототипа

const age = 12;
console.log(age.prototype === Number.prototype); // false, прототип - самостоятельный обьект
console.log(age.__proto__ === Number.prototype); // true __proto__ - указывает на ролитель new Number

class Class1 {}
console.log(Class1.__proto__ === Function.prototype); // true, __proto__ указывает на прототип родителя new Function

function Foo4() {}
// console.log(Foo4.__proto__ === ?); - Function.prototype

const c = 12;
// console.log(c.__proto__ === ?); - Number.prototype

const promise = new Promise(() => ({}));
console.log(promise.prototype === Function.prototype); // false, прототип - самостоятельный обьект
console.log(promise.__proto__ === Function.prototype); // false, __proto__ - укажет на родителя, new Promise

const arr = [];
console.log(promise.prototype === Object.prototype); // false, прототип - самостоятельный обьект
console.log(promise.__proto__ === Array.prototype); // false, __proto__ - укажет на родителя, new Promise

// Пример добавления метода в прототип функции-конструктора
function Example() {
  this.name = 12;
}

Example.prototype.say = function() {
  console.log(this.name);
};

const e1 = new Example().say(); // 12
const e2 = new Example().say(); // 12

// Пример поведения прототипов у классов
class Example2 {
  constructor() {
    this.name = 12;
  }
}

const e3 = new Example2();

/**
 * false, прото ссылается на прототип конструктора, но ссылка с
 * прото на прото - равна обьекту, потому что прототип конструктора - это обьект
 */
console.log(e3.__proto__.__proto__ === Function.prototype);

/**
 * true, потому что, простотип - это обьект, просто обьекта указывает на Object.prototype
 */
console.log(e3.__proto__.__proto__ === Object.prototype);

/**
 *  true, потому что, просто указывает на функцию-конструктор
 */
console.log(e3.__proto__ === Example2.prototype);

/**
 * true,
 * через конктруктор можно взять прототип конутркутора родителя
 */
console.log(e3.__proto__.constructor.__proto__ === Function.prototype);

/**
 * null,
 * потому что второй __proto__ - ссылается на прототип new Object, а у прототипа нет __proto__
 */
console.log(e3.__proto__.__proto__.__proto__); // null
