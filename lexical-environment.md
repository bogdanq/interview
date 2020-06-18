## LexicalEnvironment

Это термин, который используется для определения связей между идентификаторами и отдельными переменными и функциями, на основе лексической вложенности ES-кода.

- Environment Record - "обьект", который содержит все обьявления в текущей области видимости
- outer - ссылка на внешний обьект, если его нет - null (ссылается туда, где была ОБЬЯВЛЕННА ф-я, не важно, как вызвана)

Перед началом работы код анализируется и разбивается на токены (лексемы), далее происходит анализ полученного AST - на его основе происходит заполнение Scope. Проанализировав код - компилятор создаст глобальную область видимости, далее скомпилирует в байт код, под движок v8.
В глобальный Scope попадут только function declaration и переменный обьявленные через var. Оставшиеся переменные будут помечены как `uninitialized` из-за "мертвой зоны".

      Где бы не вызывалась ф-я, ее область видимости будет ссылатся на ту, в которой она была создана.
      Окружение автоматичемки уничтожается сборщиком мусора, когда на него никто не ссылается из вне (замыкнаие)

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
