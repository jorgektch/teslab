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