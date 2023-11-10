
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
    getPrecedence(operator) {
        switch (operator) {
            case '¬': //not
                return 3;
            case '∧': case '*':
            case '∨': case '+':
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
    infixToPrefix(infix) {
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
                if(this.getPrecedence(char) >= this.getPrecedence(stack.peek())){
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

    /**
     * xddddd
     * @param {string} infix infix expression
     * @returns posfix expression
     */
    infixToPostfix(infix) {
        const stack = new Stack();
        let postfix = "";
    
        for (let i = 0; i < infix.length; i++) {
            const char = infix.charAt(i);
    
            if (this.isLetterOrDigit(char)) {
                postfix += char;
            } else if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (!stack.isEmpty() && stack.peek() !== '(') {
                    postfix += stack.pop();
                }
                stack.pop();
            } else {
                while (!stack.isEmpty() && this.getPrecedence(char) <= this.getPrecedence(stack.peek())) {
                    postfix += stack.pop();
                }
                stack.push(char);
            }
        }
    
        while (!stack.isEmpty()) {
            postfix += stack.pop();
        }
        return postfix;
        
    }

    getOperands(expression) {
        const operands = [];
        for (let i = 0; i < expression.length; i++) {
            if (!operands.includes(expression.charAt(i)) && !this.isOperator(expression.charAt(i))) {
                operands.push(expression.charAt(i));
            }
        }
        return operands;
    }

    operate(operator, operand1, operand2){
        switch (operator) {
            case '∧': case '*': return operand1&&operand2;
            case '∨': case '+': return operand1||operand2;
            case '↑': return !(operand1&&operand2);
            case '↓': return !(operand1||operand2);
            case '⊕': (operand1 && !operand2) || (operand2 && !operand1);
            case '⊙': return !((operand1 && !operand2) || (operand2 && !operand1));
            case '→': return (!operand1 || operand2);
            default: false;
        }
    }
    isOperator(char) {
        return '∧∨↑↓⊕⊙→¬()'.includes(char);
    }
    boolean(x) {
        return x==1 || x===true;
    }
    evaluatePrefix(prefix) {
        const stack = new Stack();
        for (let i = prefix.length - 1; i >= 0; i--) {
            const char = prefix[i];
            
            if ('∧∨↑↓⊕⊙→'.includes(char)) {
                const operand1 = stack.pop();
                const operand2 = stack.pop();
                const result = this.operate(char, this.boolean(operand1), this.boolean(operand2));
                stack.insert(result);
            } else if (char === '¬') {
                stack.insert(!this.boolean(stack.pop()));
            } else {
                stack.insert(char)
            }
        }
        return stack.pop();
    }
    showBooleanTable(expression) {
        const prefix = this.infixToPrefix(expression);
        const operands = this.getOperands(expression);
        const matrix = this.getCombinationsBoolean(operands.length);

        for (let i = 0; i < matrix.length; i++) {
            let ex = prefix;
            for (let j = 0; j < operands.length; j++) {
                ex = this.replaceAllString(ex, operands[j], matrix[i][j]);
            }
            matrix[i].push(this.evaluatePrefix(ex) ? 1 : 0);
        }

        return matrix;
    }
    replaceAllString(str, a, b) {
        let x = ""
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) == a) {
                x += b;
            } else {
                x += str.charAt(i);
            }
        }
        return x;
    }
    /**
     * Given a number of variables (n), the function returns the logical table of n variables
     * @param {Number} n number of variables
     * @returns logical table
     */
    getCombinationsBoolean(n) {
        const matrix = new Array(Math.pow(2, n));
        let num = parseInt(Math.pow(2,n)/2);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(n);
        }
        for (let i = 0; i < n; i++) {
            let cont = 0;
            let x = 0
            for (let j = 0; j < Math.pow(2, n); j++) {
                if (cont<num) {
                    matrix[j][i] = x;
                    cont++;
                }
                if (cont === num) {
                    cont = 0;
                    x = x==0 ? 1 : 0;
                }
            }      
           num = parseInt(num/2);     
        }
        return matrix;
    }
}
const x = new ExpressionEvaluator();
/**
 * case '∧': case '*': return operand1&&operand2;
case '∨': case '+': return operand1||operand2;
case '↑': return !(operand1&&operand2);
case '↓': return !(operand1||operand2);
case '⊕': (operand1 && !operand2) || (operand2 && !operand1);
case '⊙': return !((operand1 && !operand2) || (operand2 && !operand1));
case '→': return (!operand1 || operand2);
 */
console.log(x.infixToPrefix('(a↑b)∨b'));
console.log(x.showBooleanTable('(a↑b)∨b'));