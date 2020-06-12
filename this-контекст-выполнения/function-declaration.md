# this (контекст исполнения) - в function devlaration (обьявлениe функции)

В большинстве случаев `this` определяется там, где была вызвана функция. Значение `this` не может быть установлено путем присваивания во время исполнения кода, но может иметь разный `контекст` при выполнении. (Исключения `global`, `eval`). Ссылка создается в момент вызова функции, она хранится в обьекте функции (условно):

```js
ExecutionContext  = {
  ThisBinding = <this value>,
  LexicalEnvironment = { ... },
  VariableEnvironment = { ... },
}
```

JS имеет 3 вида контекста:

    - Глобальный (контекст, используемый по умолчанию `Window`)
    - Контекст выполнения функции (создается каждый раз, как вызывается функция)
    - Контекст выполнения функции `eval`

## Краткие выдержки:

    - `this` - указывает на текущий `контекст вызова функции`, он определяется в момент вызова функции.
    - Не важно, где была обьявлена функция и что с ней было сделано, `this` все равно определеяется при каждом вызове функции, а не 1 раз.
    - Что бы определить, какой `this` будет в момент вызова, нужно знать текущий `call-site` (место в коде, где вызывается функция).

## Описание:

Не смотря на то, что контекст создается в момент вызова функции, его можно переопределить.

    - call - вызов ф-и с переданным this и аргументами `foo.call({}, ...args)`;
    - apply - вызов ф-и с переданным this и аргументами (массив аргументов) `foo.apply({}, [args])`;
    - bind - вернет новую ф-ю, с переднным this и аргументами `foo.bind({}, ...args)`;

## Виды связываний:

1. `Default binding` (связывание по умолчанию) - правило работает всегда, когда другие правила не подходят (как исключение). В этом случае `this` всегда указывает на глобальный обьект `window` (исключая режим "use sctrict") относится ко всем функциям, вызванным обычным способом `foo()`, не зависимо от того, где она была создана.

```js
function defaultBinding() {
  console.log(this.a);
}

var a = 12;

// this - ссылается на window, у него есть a, кроме const, let
defaultBinding(); // 12
```

2. `Implicit binding` (скрытое связывание) - работает правило тогда, когда функция имеет при вызове "связанный с ней обьект" (проще - важен самый правый обьект в цепочке).

```js
function implicingBinding() {
  console.log(this.age);
}

const user = {
  age: 22,
  name: "John",
  implicingBinding,
  user2: {
    age: 35,
    implicingBinding,
  },
};

implicingBinding(); // undefined
user.implicingBinding(); // 22
user.user2.implicingBinding(); // 35
```

3. `Explicit binding` (явное связывание, call, apply, bind) - метод выполняется при явнов переопределении контекста.

```js
function explicingBinding(name) {
  console.log(this.age, name);
}

const example = {
  age: 1,
};

explicingBinding.call(example, "name"); // 1, name
explicingBinding.apply(example, ["name"]); // 1, name
explicingBinding.bind(example, "name")(); // 1, name
```

4. `Hard binding` - жесткое привязывание контекста, например для вызова таймера.

```js
function hardBinding() {
  console.log(this.age);
}

const example = {
  age: 10,
};

function getAge() {
  hardBinding.call(example);
}

getAge(); // 10
getAge.call(window); // 10 (переопределил)
getAge.apply(window); // 10 (переопределил)
setTimeout(getAge, 500); // 10
```

    В примере выше - `getAge` при вызове всегда имеет новый контекст `window`, но доступ к обьекту `example` - остался, потому что не важно, где функция создавалась, важно КАК она вызывалась. `hardBinding.call(example)` - не зависимо от контекста исполнения родительской функции, у вызываемой функции всегда будет `this` ссылаться на переданный обьект `example`, потому что связан с помощью `Explisit binding`.

5. `New binding` - происходит при вызове функции-конструктора. Данный вид связывания не может быть использован вместе с `Explicit binding`. Контекст исполнения в таком вызове ссылается на обьект, который вернет функция-конструктор.

```js
var a = "global";

function newFoo(a) {
  this.a = a;
}

const objNew = {
  newFoo,
};

const b = new objNew.newFoo(5); // newFoo { a: 5 }
```

## Приоритет связывания:

- `Default binding` - самый низкий
- `Explicity binding` (call, aooly, bind) - выше чем `Implicit binding`
- `New binding` - выше чем IB
- `Expliciti binding` и `new binding` - не могут быть вместе

```js
class Example {
  constructor(age) {
    this.age = age;
  }
}

const target = {
  age: "Impliciti binding",
  fn: Example,
};

const target2 = {
  age: "Expliciti binding",
  fn: Example,
};

new target.fn(25); // 25 - хотя есть скрытое связывание, но 25 - потому что new binding сильнее
const f = target.fn.bind(target2, 1);
new f(); // 1 - явное связывание - не прошло

/*----------------*/
function someConstructor(a) {
  this.a = a;
}

const obj = {
  someConstructor,
};

obj.someConstructor(1);
obj.a; // 1 - скрытое связывание this - ссылается на целевой обьект obj и создаст в нем переменную
```
