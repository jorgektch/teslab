function simplify(expresion) {
    return expresion[0];
}

function solve(expresion) {
    return expresion[2];
}

function showBooleanTable(expression) {
    const x = this.changeOperators(expression.toUpperCase());
    const prefix = this.infixToPrefix(x);
    const operands = this.getOperands(x);
    const matrix = this.getCombinationsBoolean(operands.length);

    for (let i = 0; i < matrix.length; i++) {
        let ex = prefix;
        for (let j = 0; j < operands.length; j++) {
            ex = this.replaceAllString(ex, operands[j], matrix[i][j]);
        }
        matrix[i].push(this.evaluatePrefix(ex) ? 1 : 0);
    }

    return this.getFormatTable(matrix, operands);
}
function getPrecedence(operator) {
    switch (operator) {
        // BOOLEAN
        case '¬':  return 3; // not
        case '∧':
        case '∨':  return 2;
        case '↑': //nand
        case '↓': //nor
        case '⊕': //xor
        case '⊙': //xnor
        case '→': //implica
            return 1;
        
        // ARITMETHIC
        case '^': return 3;
        case '*': case '/':
            return 2;
        case '+': case '-':
            return 1;
        default:
            return 0;
    }
}

function evaluate(expression) {
    const ex = changeOperators(expression.toUpperCase(), ' ', '');
    const prefix = infixToPrefix(ex);
    return evaluatePrefix(prefix);
}
function isOperator(char) {
    return '∧∨↑↓⊕⊙→¬()'.includes(char);
}

function evaluatePrefix(prefix) {
    const stack = new Stack();
    for (let i = prefix.length - 1; i >= 0; i--) {
        const char = prefix[i];
        
        if ('∧∨↑↓⊕⊙→+-*/'.includes(char)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            const result = operate(char, Number(operand1), Number(operand2));
            stack.insert(result);
        } else if (char === '¬') {
            const n = stack.pop();
            stack.insert(!Number(n));
        } 
        else {
            stack.insert(char);
        }
    }
    return stack.pop();
}

function replaceAllString(inputString, search, replacement) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'g');    
    return inputString.replace(regex, replacement);
}
function isLetterOrDigit(char) {
    return /\w/.test(char);
}
function infixToPrefix(x) {
    const infix = changeOperators(x.toUpperCase());
    const stack = new Stack();
    let prefix = "";
    const infixR = reverseString(infix);
    for (let i = 0; i < infixR.length; i++) {
        const char = infixR.charAt(i);
        if (isLetterOrDigit(char)) {
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
            if(getPrecedence(char) >= getPrecedence(stack.peek())){
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
    return reverseString(prefix);
}

function infixToPostfix(expression) {
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

function getOperands(expression) {
    const operands = [];
    for (let i = 0; i < expression.length; i++) {
        if (!operands.includes(expression.charAt(i)) && !isOperator(expression.charAt(i))) {
            operands.push(expression.charAt(i));
        }
    }
    return operands;
}
function isOperator(char) {
    return '∧∨↑↓⊕⊙→¬()[]+-*/^'.includes(char);
}
function reverseString(str) {
    let x = "";
    for (let i = str.length-1; i >= 0; i--) {
      x += str.charAt(i);
    }
    return x;
}

function changeOperators(expression) {
    let x = replaceAllString(expression, 'NAND', '↑');
    x = replaceAllString(x, 'XOR', '⊕');
    x = replaceAllString(x, 'XNOR', '⊙');
    x = replaceAllString(x, 'NOR', '↓');
    x = replaceAllString(x, 'OR', '∨');
    x = replaceAllString(x, 'AND', '∧');
    x = replaceAllString(x, 'NOT', '¬');
    x = replaceAllString(x, 'IMPLIES', '→');
    x = replaceAllString(x, ' ', '');
    return x;
}

function operate(operator, operand1, operand2){
    switch (operator) {
        case '∧': return operand1&&operand2;
        case '∨': return operand1||operand2;
        case '↑': return !(operand1&&operand2);
        case '↓': return !(operand1||operand2);
        case '⊕': return (operand1 && !operand2) || (operand2 && !operand1);
        case '⊙': return !((operand1 && !operand2) || (operand2 && !operand1));
        case '→': return (!operand1 || operand2);
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': return operand1 / operand2;
        default: false;
    }
}

function getCombinationsBoolean(n) {
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

function getFormatTable(matrix, operands) {
    let x = "<table><thead><tr>";
    for (let i = 0; i < operands.length; i++) {
        x += `<td>${operands[i].toLowerCase()}</td>`;
    }
    x += `<td>R</td>`
    x += '</tr></thead><tbody>';
    for (let i = 0; i < matrix.length; i++) {
        x += "<tr>";
        for (let j = 0; j < matrix[i].length; j++) {
            x += `<td>${matrix[i][j]}</td>`;
        }
        x += '</tr>'
    }
    x += '</tbody></table>';
    return x;
}