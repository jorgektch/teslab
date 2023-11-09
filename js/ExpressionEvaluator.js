import Stack from "./models/stack";

export default class ExpressionEvaluator {
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

    /**
     * 
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
                stack.pop(); // Pop de '('
            } else {
                // Operador encontrado
                while (!stack.isEmpty() && this.getPrecedenceBoolean(char) <= this.getPrecedenceBoolean(stack.peek())) {
                    postfix += stack.pop();
                }
                stack.push(char);
            }
        }
    
        // Desapilar cualquier operador restante
        while (!stack.isEmpty()) {
            postfix += stack.pop();
        }
    
        return postfix;
    }
    
}