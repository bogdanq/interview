/**
 *
 * стрелочная ф-я - не имеет своего контекста, она берет его на уровень выше, от контекста вызова
 * call. bind. apply - не заменяют контекст стрелки
 *
 * ф-я берет контекст от родительской области видимости, не завиисмо от места вызова (call-site)
 */

const foo = () => console.log(this.age);

function foo2() {
  // возьмет контекст от call-site
  setTimeout(function() {
    console.log(this.age);
  }, 500);
}

function foo3() {
  // возьмет контекст от родителя (foo3), а родитель берет контекст по месту вызова
  setTimeout(() => {
    console.log("f3", this.age);
  }, 500);
}

var age = 12;

foo();

const obj = {
  age: 0,
  foo,
  obj2: {
    ag2: 2,
    foo
  }
};

obj.foo(); // 12
obj.obj2.foo(); // 12

function example() {
  return () => console.log(this.age);
}

const bar = example.call(obj);
bar.call({ age: "new" }); // стрелочная функция взяла контекст от родительской - example (obj.age)

foo2(); // global
foo2.call(obj); // global

foo3(); // global
foo3.call(obj); // obj
