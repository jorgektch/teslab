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
        return /[a-zA-Z0-9]/.test(char);
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
            case '∨': //or
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
    reverseString(str) {
      let x = "";
      for (let i = str.length-1; i >= 0; i--) {
        x += str.charAt(i);
      }
      return x;
    }
    /**
     * 
     * @param {string} infix Infix expression
     * @returns Prefix expression
     */
    infixToPrefixBoolean(infix) {
        const stack = new Stack();
        let prefix = "";
        const infixR = this.reverseString(infix);
        for (let i = 0; i < infixR.length; i++) {
            const char = infixR.charAt(i);
            if (this.isLetterOrDigit(char)) {
                prefix += char;
            } else if (char === ')') {
                stack.insert(char);
            } else if (char === '(') {
                while (!stack.isEmpty() && stack.peek() != ')') {
                    prefix += stack.pop();
                }
                stack.pop();
            } else {
              if(!stack.isEmpty()){
                if(this.getPrecedenceBoolean(char) >= this.getPrecedenceBoolean(stack.peek())){
                    stack.insert(char);
                }else{
                    prefix += stack.pop();
                    stack.insert(char);                
                }  
                
              }else{
                  stack.insert(char);
              }
            }
        }
        while (!stack.isEmpty()) {
            prefix += stack.pop();
        }
        return this.reverseString(prefix);
    }
    infixToPostfix(infix) {
      const stack = new Stack();
      let postfix = "";
  
      for (let i = 0; i < infix.length; i++) {s
          const char = infix.charAt(i);
  
          if (this.isLetterOrDigit(char)) {
              postfix += char;
          } else if (char === '(') {
              stack.insert(char);
          } else if (char === ')') {
              while (!stack.isEmpty() && stack.peek() !== '(') {
                  postfix += stack.pop();
              }
              stack.pop(); 
          } else {
              while (!stack.isEmpty() && this.getPrecedenceBoolean(char) <= this.getPrecedenceBoolean(stack.peek())) {
                  postfix += stack.pop();
              }
              stack.insert(char);
          }
      }
      while (!stack.isEmpty()) {
          postfix += stack.pop();
      }
  
      return postfix;
  }
}

const x = new ExpressionEvaluator();
console.log(x.infixToPostfix('A∨B∧(C∧D∨¬E)'))