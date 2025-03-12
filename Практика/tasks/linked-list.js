/**
  Односвязный список, все его елементы имеют ссылку на следующий елемент в списке
 */
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedLis {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    // вставка в начало списка
    const newNode = new Node(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    // вставка в конец списка
    const newNode = new Node(value);

    if (!this.tail && !this.head) {
      // если нет tail или head
      // значит, нужно newNode указать для всего
      this.tail = newNode;
      this.head = newNode;
      return this;
    }

    // присоелинить новый узел к концу списка
    this.tail.next = newNode;
    // обновить указатель на хвост
    this.tail = newNode;

    return this;
  }

  delete(value) {
    let lastDeletedNode = null;
    let currentNode = null;

    if (!this.head) {
      return null;
    }

    // проверить head
    while (this.head && this.head.value === value) {
      // указать последнюю удаленную ноду
      // ноду удалили, на ее место нужно поставить следующую ноду в списке
      lastDeletedNode = this.head;
      this.head = this.head.next;
    }

    currentNode = this.head;

    // проверить  тело обьекта
    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          lastDeletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // обновить tail
    if (this.tail && this.tail.value === value) {
      this.tail = currentNode;
    }

    return lastDeletedNode;
  }

  find(value) {
    // вернет первый найденный узел
    let currentNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    // Метод, который удаляет последний узел из списка и возвращает его.
    const deletedTail = this.tail;
    let currentNode = this.head;

    if (!this.tail) {
      return null;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    let deletedHead = this.head;

    if (!deletedHead) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values) {
    // вставляет все елементы по порядку
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    // вернет дерево ввиде массива
    let currentNode = this.head;
    const nodes = [];

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(cb) {
    return this.toArray()
      .map((node) => node.toString(cb))
      .toString();
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      // сохранить следующий узел
      nextNode = currentNode.next;
      // менять местами узлы, первый - будет последним с next = null
      currentNode.next = prevNode;
      // но и пердыдущего нужно поменять ссылку
      prevNode = currentNode;
      // следующий узел становится текущим
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

const linkedLis = new LinkedLis();
linkedLis.fromArray([1, 2, 3, 4, 5]).reverse();

console.log("head", linkedLis.head);
console.log("tail", linkedLis.tail);
