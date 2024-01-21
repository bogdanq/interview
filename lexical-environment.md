## Lexical environment (лексическая область видимости)

Это термин, который используется для определения связей между идентификаторами и отдельными переменными и функциями, на основе лексической вложенности ES-кода.
Область видимости любой переменной определяется местом расположения ее внутри кода, вложенные блоки имеют доступ в внешним областям видимости. Этот обьект хранит в себе помимо всех обьявлений переменных и ссылки на внешнее окружение еще и другую информацию, например значение `this`.

- Environment Record - "обьект", который содержит все обьявления в текущей области видимости
- outer - ссылка на внешний обьект, если его нет - null (ссылается туда, где была ОБЬЯВЛЕННА ф-я, не важно, как вызвана)
- Все переменные, обьявленные в коде - являются свойствами обьекта `LexicalEnvironment`
- Каждый вызов функции создает новую область видимости

Перед началом работы код анализируется и разбивается на токены (лексемы), далее происходит анализ полученного AST - на его основе происходит заполнение Scope. Проанализировав код - компилятор создаст глобальную область видимости, далее скомпилирует в байт код, под движок v8.
В глобальный Scope попадут только function declaration и переменный обьявленные через var. Оставшиеся переменные будут помечены как `uninitialized` из-за "мертвой зоны".

      Где бы не вызывалась ф-я, ее область видимости будет ссылатся на ту, в которой она была создана.
      Окружение автоматичемки уничтожается сборщиком мусора, когда на него никто не ссылается из вне (замыкнаие)

## Scope (область видимости)

Указывает на то, где доступны переменные, переменные созданные снаруже функций, блоков (if, while, catch, for) - попадают в global scope и доступны везде.
Проще говоря - это ссылка `[[ Scope ]]`, которая ссылается на `Lexical environment` - в котором была создана.

```js
const a = 12;

function foo() {
  // не важно где и как вызвана функция = ссылка на область видимости определеятся расположением в коде
  return a;
}

function foo2() {
  const a = 15;
  return foo();
}

foo2(); // 12
```

## Closures (замыкания)

Замыкание — это комбинация функции и лексического окружения, в котором эта функция была определена. Другими словами, замыкание даёт вам доступ к Scope (en-US) внешней функции из внутренней функции. В JavaScript замыкания создаются каждый раз при создании функции, во время её создания.

```js
// true
const foo = () => {
  const n = 1;
  return (x) => x + n;
};

foo()(1); // 2
```

## Hoisting (поднятие переменных)

при анализе кода все переменные попадают в шлобальное лексическое окружение. js сначала обьявляет, а уже потом инициализирует переменные.

- const, let - попадают со значением `uninitialized` (ограничиваются блочной видимостью, if, for, while, catch), приведет к `Reference error`
- var - попадает со значением `undefined` (ограничивается областью видимости и блоком catch в try) `приведет к undefined`, в `strict mode` к ошибке
- function declaration - попадают раньше всех, полностью со своим телом (ограничивается областью видимости и блоком catch в try)

```js
var a = 100;
function foo() {}

// цикл поднятия
/**
  declaration foo
  var a
  a = 100
  var a = 100
*/

{
  var a = 1; // доступно
  const b = 2;
  let c = 3;
  function f() {} // доступно
}

if (true) {
  var a = 1; // доступно
  const b = 2;
  let c = 3;
  function f() {} // доступно
}

for (let i = 0; i < 2; i++) {
  var a = 1; // доступно
  const b = 2;
  let c = 3;
  function f() {} // доступно
}

try {
} catch (e) {
  var a = 1;
  const b = 2;
  let c = 3;
  function f() {}
}

let i = true;
while (i) {
  var a = 1; // доступно
  const b = 2;
  let c = 3;
  function f() {} // доступно
  i = false;
}

function foo() {
  var a = 1;
  const b = 2;
  let c = 3;
  function f() {}
}

foo();
```

## Начало работы

```js
const massage = "some string"; // 1
var value = 12; // 2

// 3 (functionDeclaration)
function functionDeclaration() {
  const value = 10; // 1

  // 2 (functionExpression)
  const functionExpression = () => {
    console.log(value);
  };

  console.log(massage);

  return functionExpression;
}

const foo = functionDeclaration(); // 4
foo(); // "some string", 10 // шаг 5
```

### Создание глобальной области видимости на основе анализа кода

```js
/**
  Если переменная обьявленна через const, let, она все равно попадет в область видимости, но со значением uninitialized
  functionDeclaration - подымаются раньше всех со всем своим телом
  var - подымаются, но со значением undefined
  LE - lexical environment
*/
GlobalLExicalEnvironment = {
  EnvironmentRecord: {
    massage: < uninitialized >
    value: undefined
    functionDeclaration: < function >
    foo: < uninitialized >
  }
  outer: null
}
```

      Когда происходит вызов ф-и - создается локальная лексическая область (конкретно для данной ф-и).
      Она следует тем же правилам, что и глобальная, вложенных областей видимости может быть не ограниченное кол-во.

### Шаги выполнения кода и имзенение лексической области

```js
GlobalLExicalEnvironment = {
  EnvironmentRecord: {
    massage: "some string" // 1
    value: 12 // 2
    functionDeclaration: // < function > 3
    foo: functionDeclarationResult // 4
  }
  outer: null
}
```

      на шаге 4 - происходит создание локальной области видимости для functionDeclaration

```js
GlobalLExicalEnvironment = {
  outer: null
  .........

  functionDeclarationLE = {
  EnvironmentRecord = {
    value: < uninitialized >
    unctionExpression: < uninitialized >
  }
  outer = < GlobalLExicalEnvironment >
  }
}
```

      Далее интерпритатор начинает по строке выполнять кол, тем самым изменяя текущую или другую области видимости

```js
GlobalLExicalEnvironment = {
  outer: null
  .........

  functionDeclarationLE = {
  EnvironmentRecord = {
    value: 10 // 1
    functionExpression: < function >
  }
  outer = < GlobalLExicalEnvironment >
  }
}
```

      шаг 5 - выполнение ф-и (опять создается лексическая обалсть видимости для функции (foo)) функция будет иметь ссылку на область,
      в которой была обьявленна (functionDeclaration)

```js
lobalLExicalEnvironment = {
  outer: null
  .........

  functionDeclarationLE = {
    outer: GlobalLExicalEnvironment
    ...
  }

  fooLE = {
    EnvironmentRecord = {}
    outer: < functionDeclaration >
  }
}
```
