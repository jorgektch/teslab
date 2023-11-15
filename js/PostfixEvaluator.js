class Stack {
    constructor() {
        this.items = [];
    }

    insert(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0)
            return "Underflow";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class InfixToPrefixConverter {
    constructor() {
        this.operators = {
            '^': 3,
            '*': 2,
            '/': 2,
            '+': 1,
            '-': 1,
            '(': 0
        };
    }

    isOperator(char) {
        return '∧∨↑↓⊕⊙→¬()+-*/^'.includes(char);
    }

    getPrecedence(operator) {
        return this.operators[operator] || 0;
    }

    isLetterOrDigit(char) {
        return /^[a-zA-Z0-9]$/.test(char);
    }

    infixToPostfix(expression) {
        const stack = new Stack();
        let postfix = "";

        for (let i = 0; i < expression.length; i++) {
            const char = expression.charAt(i);

            if (this.isLetterOrDigit(char)) {
                postfix += char;

                let j = i + 1;
                while (j < expression.length && this.isLetterOrDigit(expression.charAt(j))) {
                    postfix += expression.charAt(j);
                    j++;
                }
                i = j - 1;
                postfix += " ";
            } else if (char === '(') {
                stack.insert(char);
            } else if (char === ')') {
                while (!stack.isEmpty() && stack.peek() !== '(') {
                    postfix += stack.pop() + " ";
                }
                stack.pop();
            } else if (this.isOperator(char)) {
                while (!stack.isEmpty() && this.getPrecedence(char) <= this.getPrecedence(stack.peek())) {
                    postfix += stack.pop() + " ";
                }
                stack.insert(char);
            }
        }

        while (!stack.isEmpty()) {
            postfix += stack.pop() + " ";
        }

        return postfix.trim();
    }

    evaluatePostfix(postfixExpression) {
        const stack = new Stack();
        const tokens = postfixExpression.split(" ");
    
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
    
            if (/^[a-zA-Z0-9]+$/.test(token)) {
                // Es un operando, lo apilamos
                stack.insert(parseFloat(token));
            } else if ("+-*/^".includes(token)) {
                // Es un operador, realizamos la operación correspondiente
                const operand2 = stack.pop();
                const operand1 = stack.pop();
    
                switch (token) {
                    case '+':
                        stack.insert(operand1 + operand2);
                        break;
                    case '-':
                        stack.insert(operand1 - operand2);
                        break;
                    case '*':
                        stack.insert(operand1 * operand2);
                        break;
                    case '/':
                        stack.insert(operand1 / operand2);
                        break;
                    case '^':
                        stack.insert(Math.pow(operand1, operand2));
                        break;
                }
            }
        }
        return stack.pop();
    }
}
