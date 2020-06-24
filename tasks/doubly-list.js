/**
 * Состоит из набора последовательно связанных данных. Каждый узел содержит два поля
 * previous - предыдущее значение
 * next - слудующее значение
 */

class Node {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(cb) {
    return cb ? cb(this.value) : `${this.value}`;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    // создать новую ноду и присвоить ей в next - текущий head
    // поместить в начало списка
    const newNode = new Node(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    // вставка в конец списка
    const newNode = new Node(value, this.head, this.tail);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {}
}

const d = new DoublyLinkedList();
d.append("prepend 1")
  .append("append 1")
  .append("append 2")
  .prepend("prepend 2");
console.log("head", d.head);
console.log("tail", d.tail);
