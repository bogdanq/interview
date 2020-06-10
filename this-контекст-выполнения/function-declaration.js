/**
 * this - укахывает на текущий контекст вызова функции,
 * он определяется в момент вызова функции. Не важно, где была обьявленна
 * функция и что с ней было сделано. (контекст выполнения)
 *
 * this - определеяется при каждом вызове функции, а не 1 раз
 *
 * что бы определить, какой this в момент вызова, нужно знать
 * текущий call-site
 *
 * call-site - место в коде, где вызывается функция
 * (в этом месте всегда вычисляется this)
 */

/**
 * call - вызов ф-и с переданным this и аргументами
 * apply - вызов ф-и с переданным this и аргументами (массив аргументов)
 * bind - вернет новую ф-ю, с переднным this и аргументами
 */

// Виды связываний

/**
 * Default binding (связывание по умолчанию) - правило работает всегда, когда другие правила не подходят.
 * в этом случае this всегда указывает на глобальный обьект window (исключая режим "use sctrict")
 *
 * относится ко всем функциям, вызванным обычным способом foo(), не зависимо от области видимости
 */

function defaultFoo() {
  console.log(this.a);
}

var a = 12;

defaultFoo(); // 12

// this - ссылается на window, у него есть a, кроме const, let

/**
 * implicit binding (скрытое связывание) - работает правило тогда, когда ф-я имеет при вызове "связанный" с ней обьект
 * (проще - важен самый правый обьект в цепочке)
 */

function implicingFoo() {
  console.log(this.age);
}

const obj = {
  age: 0,
  implicingFoo,
  obj2: {
    age: 1,
    implicingFoo
  }
};

obj.implicingFoo(); // 0
obj.obj2.implicingFoo(); // 1

/**
 * explicit binding (явное связывание, call, apply, bind) - метод выполняется при явнов переопределении контекста
 */

function explicingFoo(name) {
  console.log(this.age, name);
}

const obj1 = {
  age: 1
};

explicingFoo.call(obj1, "name");

/**
 * hard binding - жесткое привязывание контекста, например для вызова таймера
 */

function hardFoo() {
  console.log(this.age);
}

const obj2 = {
  age: 10
};

const f = function() {
  hardFoo.call(obj2);
};

f(); // 10
f.call(window); // 10
setTimeout(f, 500); // 10

/**new binding - происходит при вызове функции-конструктора */

function newFoo(a) {
  this.a = a;
}

const objNew = {
  newFoo
};

const objNew2 = {};

objNew.newFoo(2); // скрытое связывание
console.log(objNew.a); // 2
objNew.newFoo.call(objNew2, 3); // явное связывание
console.log(objNew2.a); // 3

const b = new objNew.newFoo(5); // new binding
console.log(objNew.a); //2
console.log(b.a); //5
/**
 * Приоритет
 *
 * DB - самый низкий
 * EB (call, aooly, bind) - выше чем IB (obj.foo)
 * bew binding - выше чем IB
 * EB и new binding - не могут быть вместе
 */
