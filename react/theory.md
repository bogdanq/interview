## Теория по работе React

### Host tree

`Host tree` - это императивное API вне самого React, для каждого дерева свое (DOM, IOS, PDF...). React - это уже слой поверх него. Благодаря этому React предоставляет абстрактные методы для работы с деревом, тоесть для любого хоста, подойдет один код (с некоторыми исключениями).

React делает ставку на два принципа:

- Стабильность (`Host tree` относительно стабилен, он не меняет радикально свою структуру)
- Регулярность (разбивает ui на шаблоны интерфейса, но не подходит для 3д анимаций, подходит, если на выходе есть "стабильный шаблон")

### Host instances

`Host tree` - состоит из узлов, каждый узел и есть - `host instances`. Обычно существуют методы для управления екземплярами хоста. Каждый узел имеет свое апи, у DOM (appendChild, removeChild, setAttribute) IOS(view.tintColor) и тд. Реакт скрывает это от нас, предоставляя `jsx` и свои методы, а конкретный `Host tree` - уже имеет эту реализацию у себя.

### Renderers

Render - учит React взаимодействовать с конкретным `host tree` и управлять его екземплярами (`instances`). React Dom, Native - это средства визуализации React.
Render работает в одном из двух режимов

- Мутации (`mutating`) - в этом режиме работает DOM, мы всегда его обновляем, удаляем, добавляем елементы, екземпляры полностью мутабельны.
- Постоянный (`persistent`) - этот режим нужен там, где хосты не предоставляют методы, например `appendChild`, но вместо этого клонируют родительское дерево и заменяют.

### React Elements

react element - в среде host instances (к примеру узел DOM), является самым маленьким строительным блоком. Это простой обьект js, который может описать host instances.

```js
// <button className="blue">button</button>
{
  type: 'button',
  props: { className: 'blue', children: 'button' }
}
```

React element - это то, что будет в итога на екране, они могут образовывать дерево. Елементы создаются и удаляются все время, у них нет идентичности. Они не изменны, нельзя изменить елемент, он в будущем будет создан в новом дереве реакт елементов (`react elements tree`).

```js
// <dialog>
//   <button className="blue">button1</button>
//   <button className="blue">button2</button>
// </dialog>
{
  // ....
  type: 'dialog',
  props: [
    {
      type: 'button',
      props: { className: 'blue', children: 'button1' }
    },
    {
      type: 'button',
      props: { className: 'blue', children: 'button2' }
    }
  ]
}
```

### Entry Point

Каждый `React render` имеет свою "точку входа". Это API, которое указывает React - какое дерево елементов визуализировать внутри `host instances`

```js
ReactDOM.render(
  <button className="blue">button1</button>,
  document.getElementById("root")
);
```

Когда вызывается ReactDOM.render - это говорит React, что бы он привел `domContainer` к соответствию переданному `reactElement`. React посмотрит на переданный елемент (сейчас это кнопка) и попросит средство визуализации (ReactDOM) - создать для него екземпляр хоста и задать свойства. Если у елемента есть дочерние елементы, рекурсивно будут обработаны.

```js
let domNode = document.createElement("button");
domNode.className = "blue";

domContainer.appendChild(domNode);
```

### Reconciliation

React должен сделать так, что бы `host tree` соответствовало `elements tree`. При каждом обновлении React проводит "сверку", что бы не создавать заново элементы, которые уже были созданы. Есть два способа, упрощенная версия React может уничтожить дерево и выполнить его с нуля:

```js
// DOM делает обработку очень медленно
let domContainer = document.getElementById("root");
// очистить контейнер
domContainer.innerHTML = "";

// создать новый инстанс хоста
let domNode = document.createElement("button");
domNode.className = "blue";

domContainer.appendChild(domNode);
```

React должен решить, когда обновлять host instance, когда создавать новый, что бы он соответствовал новому React element. Если `Element type` в том же месте - совпадает между рендерами, React повторно его использует.

```js
// let domNode = document.createElement("button");
// domNode.className = "blue";
// domNode.innerText = "button";

ReactDOM.render(
  <button className="blue">blue</button>,
  document.getElementById("root")
);

// domNode.className = 'red';
// button -> button
// можно обновить
ReactDOM.render(
  <button className="red">blue</button>,
  document.getElementById("container")
);

// button -> p
// создать новый
ReactDOM.render(<h1>Text</h1>, document.getElementById("container"));

// p -> p
// elemetn.innerText = "Text 2"
// Можно обновить
ReactDOM.render(<h1>Text 2</h1>, document.getElementById("container"));
```
