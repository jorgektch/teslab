import Node from "./Node";

class LinkedHashSet {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(value) {
        if (!this.contains(value)) {
            const newNode = new Node(value);
            newNode.setNext(this.head);
            this.head = newNode;
            this.size++;
        }
    }

    contains(value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.getData() === value) {
                return true;
            }
            currentNode = currentNode.getNext();
        }
        return false;
    }

    remove(value) {
        if (this.size === 0) {
            return;
        }

        if (this.head.getData() === value) {
            this.head = this.head.getNext();
            this.size--;
            return;
        }

        let currentNode = this.head;
        while (currentNode.getNext()) {
            if (currentNode.getNext().getData() === value) {
                currentNode.setNext(currentNode.getNext().getNext());
                this.size--;
                return;
            }
            currentNode = currentNode.getNext();
        }
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    length() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    toString() {
        let result = [];
        let currentNode = this.head;
        while (currentNode) {
            result.push(currentNode.getData());
            currentNode = currentNode.getNext();
        }
        return `[${result.join(', ')}]`;
    }

    addAll(collection) {
        collection.forEach((value) => this.add(value));
    }

    containsAll(collection) {
        return collection.every((value) => this.contains(value));
    }

    equals(otherSet) {
        if (this.size !== otherSet.length()) {
            return false;
        }

        let currentNode = this.head;
        while (currentNode) {
            if (!otherSet.contains(currentNode.getData())) {
                return false;
            }
            currentNode = currentNode.getNext();
        }

        return true;
    }

    [Symbol.iterator]() {
        let currentNode = this.head;
        return {
            next: function () {
                if (currentNode) {
                    const value = currentNode.getData();
                    currentNode = currentNode.getNext();
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }

    removeAll(collection) {
        collection.forEach((value) => this.remove(value));
    }

    retainAll(collection) {
        let currentNode = this.head;
        while (currentNode) {
            if (!collection.contains(currentNode.getData())) {
                const nextNode = currentNode.getNext();
                this.remove(currentNode.getData());
                currentNode = nextNode;
            } else {
                currentNode = currentNode.getNext();
            }
        }
    }

    toArray() {
        let result = [];
        let currentNode = this.head;
        while (currentNode) {
            result.push(currentNode.getData());
            currentNode = currentNode.getNext();
        }
        return result;
    }
}

export default LinkedHashSet