import Node from "./Node";

class ArrayList {

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insert(element, index) {
    if (index < 0 || index > this.size) {
      console.error("Exception: IndexOutOfBoundsException!");
      return;
    }

    const newNode = new Node(element);

    if (index === 0) {
      newNode.setNext(this.head);
      this.head = newNode;

    } else {
      let currentNode = this.head;
      let prevNode = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        prevNode = currentNode;
        currentNode = currentNode.getNext();
        currentIndex++;
      }

      prevNode.setNext(newNode);
      newNode.setNext(currentNode);
    }

    this.size++;
  }

  append(element) {
    const newNode = new Node(element);

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;

      while (currentNode.getNext()) {
        currentNode = currentNode.getNext();
      }

      currentNode.setNext(newNode);
    }

    this.size++;
  }

  prepend(element) {
    const newNode = new Node(element);
    newNode.setNext(this.head);
    this.head = newNode;
    this.size++;
  }

  removeLast() {
    if (this.size === 0) {
      return;
    }

    this.head = this.head.getNext();
    this.size--;
  }

  removeCoincidence(element) {
    while (this.getItem(element)) {
      if (this.size === 0) {
        return;
      }

      if (this.head.getElement() === element) {
        this.removeLast();
        return;
      }

      let currentNode = this.head;
      let prevNode = null;

      while (currentNode && currentNode.getElement() !== element) {
        prevNode = currentNode;
        currentNode = currentNode.getNext();
      }

      if (currentNode) {
        prevNode.setNext(currentNode.getNext());
        this.size--;
      }
    }
  }

  remove(index) {
    if (index < 0 || index >= this.size) {
      return;
    }

    if (index === 0) {
      this.removeLast();
      return;
    }

    let currentNode = this.head;
    let prevNode = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.getNext();
      currentIndex++;
    }

    prevNode.setNext(currentNode.getNext());
    this.size--;
  }

  removeFirst() {
    if (this.size === 0) {
      return;
    }

    this.head = this.head.getNext();
    this.size--;
  }

  find(element) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.getElement() === element) {
        return true;
      }
      currentNode = currentNode.getNext();
    }

    return false;
  }

  getItem(index) {
    if (index < 0 || index >= this.size) {
      console.log("Out of range");
      return -1;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      currentNode = currentNode.getNext();
      currentIndex++;
    }

    return currentNode.getElement();
  }

  isEmpty() {
    return this.size === 0;
  }

  length() {
    return this.size;
  }

  sort(reverse) {
    let current = this.head;

    while (current) {
      let next = current.getNext();

      while (next) {
        if ((reverse && current.getElement() < next.getElement()) || (!reverse && current.getElement() > next.getElement())) {
          const temp = current.getElement();
          current.setElement(next.getElement());
          next.setElement(temp);
        }

        next = next.getNext();
      }

      current = current.getNext();
    }
  }

  toString() {
    let result = [];
    let currentNode = this.head;

    while (currentNode) {
      result.push(currentNode.getElement());
      currentNode = currentNode.getNext();
    }

    return `[${result.join(' ')}]`;
  }

  indexOf(element) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.getElement() === element) {
        return index;
      }
      currentNode = currentNode.getNext();
      index++;
    }

    return -1;
  }

  head() {
    return this.head ? this.head.getElement() : -1;
  }

  tail() {
    let currentNode = this.head;

    while (currentNode && currentNode.getNext()) {
      currentNode = currentNode.getNext();
    }

    return currentNode ? currentNode.getElement() : -1;
  }

  min() {
    if (this.size === 0) {
      return 0;
    }

    let min = this.head.getElement();
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.getElement() < min) {
        min = currentNode.getElement();
      }
      currentNode = currentNode.getNext();
    }

    return min;
  }

  max() {
    if (this.size === 0) {
      return 0;
    }

    let max = this.head.getElement();
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.getElement() > max) {
        max = currentNode.getElement();
      }
      currentNode = currentNode.getNext();
    }

    return max;
  }

  insertSorted(element) {
    if (this.size === 0 || element >= this.head.getElement()) {
      this.prepend(element);
      return;
    }

    let newNode = new Node(element);
    let current = this.head;
    let prev = null;

    while (current && element < current.getElement()) {
      prev = current;
      current = current.getNext();
    }

    prev.setNext(newNode);
    newNode.setNext(current);
    this.size++;
  }
}

export default ArrayList;
