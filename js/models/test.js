class Node {

  //------------------------- Constructor ------------------------

  constructor(element) {
      this._element = element;
      this._next = null;
      this._prev = null;
      this._left = null;
      this._right = null;
      this._middle = null;
  }

  //------------------------- Get & Set ----------------------------

  getElement() {
    return this._element;
  }

  setElement(element) {
    this._element = element;
  }

  getNext() {
    return this._next;
  }

  setNext(node) {
    this._next = node;
  }

  getPrev() {
    return this._prev;
  }

  setPrev(node) {
    this._prev = node;
  }

  getLeft() {
    return this._left;
  }

  setLeft(node) {
    this._left = node;
  }

  getRight() {
    return this._right;
  }

  setRight(node) {
    this._right = node;
  }
  
  getMiddle(){
      return this._middle;
  }

  setMiddle(){
      return this._middle;
  }


}


class Stack {
  constructor() {
    this.size = 0;
    this.last = null;
  }

  insert(element) {
    const newNode = new Node(element);
    newNode.setPrev(this.last);
    this.last = newNode;
    this.size++;
  }

  pop() {
    if (this.size !== 0) {
      const num = this.last.getElement();
      this.last = this.last.getPrev();
      this.size--;
      return num;
    }
    return -1;
  }

  peek() {
    return this.size === 0 ? -1 : this.last.getElement();
  }

  length() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
}



class ExpressionEvaluator {
    /**
     * Evaluates if a character is letter or digit
     * @param {string} char character
     * @returns true if is letter or digit
     */
    isLetterOrDigit(char) {
        return /\w/.test(char);
    }
    /**
     * Receives a boolean operator, it can be ¬(NOT), ∧(AND), ∨(OR), etc. The function returns the precedence value for prefix or postfix expression evaluation
     * @param {string} operator boolean operator
     * @returns Precedence value 
     */
    getPrecedenceBoolean(operator) {
        switch (operator) {
            case '¬': //not
                return 3;
            case '∧': //and
            case 'V': //or
                return 2;
            case '↑': //nand
            case '↓': //nor
            case '⊕': //xor
            case '⊙': //xnor
            case '→': //implica
                return 1;
            default:
                return 0;
        }
    }
    /**
     * 
     * @param {string} infix Infix expression
     * @returns Prefix expression
     */
    infixToPrefixBoolean(infix) {
        const stack = new Stack();
        let prefix = "";
        for (let i = infix.length-1; i >= 0; i--) {
            const char = infix.charAt(i);
            if (this.isLetterOrDigit(char)) {
                prefix = char + prefix;
            } else if (char === ')') {
                stack.insert(char);
            } else if (char === '(') {
                while (!stack.isEmpty() && stack.peek() != ')') {
                    prefix = stack.pop() + prefix;
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() && this.getPrecedenceBoolean(stack.peek()) >= this.getPrecedenceBoolean(char)) {
                    prefix = stack.pop() + prefix;
                }
                stack.insert(char)
            }
        }
        while (!stack.isEmpty()) {
            prefix = stack.pop() + prefix;
        }
        return prefix;
    }
}

const x = new ExpressionEvaluator();
console.log(x.infixToPrefixBoolean('AVB∧(C∧DV¬E)'))