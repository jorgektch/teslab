/* import Node from './Node.js'; */
class Node {
    constructor(data) {
        this._data = data;
        this._next = null;
        this._prev = null;
    }
    /**
     * @param {Node} next
     */
    set next(next) {
        this._next = next
    }
    /**
     * @return {Node}
     */
    get next() {
        return this._next;
    }
    /**
     * @param {Node} prev
     */
    set prev(prev) {
        this._prev = prev
    }
    /**
     * @return {Node}
     */
    get prev() {
        return this._prev;
    }
    /**
     * @param {any} data
     */
    set data(data) {
        this._data = data
    }
    /**
     * @return {any}
     */
    get data() {
        return this._data;
    }
}

class SimpleLinkedList {
    constructor() {
        this._head = null;
    }

    append(data) {
        const node = new Node(data);
        if (this._head === null) {
            this._head = node;
        } else {
            let aux = this._head;
            while (aux.next !== null) {
                aux = aux.next;
            }
            aux.next = node;
        }
    }

    toString() {
        let aux = this._head
        const txt = "";
        while (aux!== null) {
            txt += aux.toString() + " ";
            aux = aux.next;
        }
        return txt;
    }
}

const list = new SimpleLinkedList();
list.append(4);
list.append(7);
list.append(1);
console.log(list);
