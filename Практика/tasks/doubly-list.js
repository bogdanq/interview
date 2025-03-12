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
    const newNode = new Node(value, null, this.tail);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = null;

    // обновить head
    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
      this.head.previous = null;
    }

    currentNode = this.head;

    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode;
          currentNode.next = currentNode.next.next;
          if (currentNode.next) {
            currentNode.next.previous = currentNode;
          }
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // обновить tail
    if (this.tail && this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find(value) {
    let currentNode = this.head;

    if (!currentNode) {
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

  deleteHead() {
    let deletedHead = this.head;

    if (!deletedHead) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  deleteTail() {
    let deletedTail = this.tail;
    let currentNode = this.head;

    if (!deletedTail) {
      return null;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    while (currentNode) {
      if (!currentNode.next) {
        deletedTail = currentNode;
        currentNode.previous.next = null;
        this.tail = currentNode.previous;
        break;
      }

      currentNode = currentNode.next;
    }

    return deletedTail;
  }

  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      prevNode = currentNode.previous;

      currentNode.next = prevNode;

      currentNode.previous = nextNode;

      prevNode = currentNode;

      currentNode = nextNode;
    }

    this.tail = this.head;

    this.head = prevNode;

    return this;
  }
}
