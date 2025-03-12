## React hooks

У хуков есть правила использования (внутри React использует массив и индекс хука, при обновлении и создании компонента, вызывает все хуки):

- не вызывать хуки внутри циклов
- вызывать только из функций React
- не вызывать по условию

### useState

Функция - возвращает состояние и функцию, для его обновления. `initialState` - вычисляется один раз при мануте компонента.
`setState` обновляет состояние, принимает новое значение или колбек, содержащий предыдущее состояние. Внутри этот хук использует `useReducer` и просто передает ему обработчик, это означает, что состояние является состояние редюсера, а обработчик - диспетчер действий.

      React гарантирует, что setState - остается не изменным
      при последующих обновлениях

```js
const [state, setState] = useState(initialState);
```

React соединит вызовы синхронных `setState`, в примере за да вызова - будет одно обновление компонента, при вызове `foo`, первый вызов `setState` ссылается на состояние 0, выполняется он не сразу, но после него вызывается второй раз, второй вызов тоже ссылается на текущее состояние, после обновления `state` будет равен 10.
в примере `foo1` - такая же ситуация.

```js
function App() {
  const [state, setState] = useState(0);

  const foo = () => {
    setState(10);
    setState(100);
  };

  const foo1 = () => {
    setState(state + 10);
    setState(state + 100);
  };

  return <button onClick={foo}>setState</button>;
}
```

В этом примере React не может соединить обновления вызовов, потому что они асинхронные. Будет 3 обновления компонента. `setTimeout` - попадет в очередь, за нем второй, после этого выполнится `setState(10)` и произойдет обновление компонента. Первый setTimeout - попадет в стек и выполнит свой колбек `setState((prev) => prev + 10)`, где `prev` - ссылается всегда на текущее состояние, в итоге будет 20. После этого сразу вызов второго колбека - `20 + 100`.

```js
function App() {
  const [state, setState] = useState(0);

  const foo = () => {
    setTimeout(() => {
      setState((prev) => prev + 10);
    }, 1000);

    setTimeout(() => {
      setState((prev) => prev + 100);
    }, 1000);

    setState(10);
  };

  return <button onClick={foo}>setState</button>;
}
```

## Effect hooks

- Создаются на `render` фазе, но вызываются во время `commit` фазы, после отрисовки елемента в дом (асинхронно)
- Вызываются в порядке определения

Стадии выполнения еффектов:

- commitBeforeMutationLifecycles [getSnapshotBeforeUpdate](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberCommitWork.js#L215)
- обновление, удаление ref - ссылок [commitAttachRef](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberCommitWork.js#L215)
- commitAllLifeCycles [commitLifeCycles](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberCommitWork.js#L351)
- Вызов пассивных еффектов `passive effects` [commitPassiveEffectDurations](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberScheduler.js#L779)

Эффекты хранятся в свойстве Fiber - `updateQueue` [pushEffect](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L477). Теги [ReactHookEffectTags](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactHookEffectTags.js)

```tsx
type Effect = {
  tag: HookEffectTag;
  create: () => (() => void) | void;
  destroy: (() => void) | void;
  deps: Array<mixed> | null;
  next: Effect;
};
```

      `tag` - двоичный номер, определяет поведение еффекта
      `create` - колбек, вызываемвый после фиксации рендера
      `destroy` - колбек, возвращаемый из create, запущен перед фиксацией
      `inputs` - значения, определяющте, должен ли быть уничтожен еффект
      `next` - ссылка на следуюищий еффек тв функции

```js
if (
  (tag & HookPassive) !== NoHookEffect &&
  (tag & HookHasEffect) !== NoHookEffect
) {
  enqueuePendingPassiveHookEffectUnmount(finishedWork, effect);
  enqueuePendingPassiveHookEffectMount(finishedWork, effect);
}
```

## dispatcher

[ReactFiberDispatcher](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberDispatcher.js#L24)
Это общий обьект, который содержит функции подключения. Очищается или выделяется на основе фазы рендеринга и гарантирует, что хуки выполняются только в компоненте.
При старте React присваивает хуки в currentDispatcher, при анмаунте компонента - после завершения работы, удаляет все.

### Очередь хуков

- Начальное состояние создается при маунте компонента
- Его состояние не может быть обновлено на лету
- React запомнит состояние хука при обновлениях
- React предоставит состояние в зависимости от порядка вызова
- React знает, к какой Fiber ноде относится хук

[ReactPartialRendererHooks](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-dom/src/server/ReactPartialRendererHooks.js#L59)
[updateFunctionComponent](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberBeginWork.js#L397)

```js
{
  memoizedState: 'foo',
  next: {
    memoizedState: 'bar',
    next: {
      memoizedState: 'bar',
      next: null
    }
  }
}
```

Перед каждым вызовом Компонента - вызывается [prepareHooks](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberBeginWork.js#L409). Где текущая Fiber нода и ее первый узел - будут храниться в глобальных переменных. После выполнения работы, вызввается [finishHooks](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L148)

```js
// Имплементация редюсера
function reducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
```
