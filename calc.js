const buttonContainer = document.querySelector('.button-container')
const screen = document.querySelector('.screen')
const screenText = document.querySelector('#screen-text')
const buttons = ['7', '8', '9', 'DEL', 'AC', '4', '5', '6', 'X', '/', '1', '2', '3', '+', '-', '0','.','x10^','Ans','=']

let a = ''
let b = ''
let op = ''
let operatorPressed = false
let answer = ''

buttons.forEach(label => {
    const button = document.createElement('button')
    button.textContent = label
    button.classList.add('btn')
    if (label === 'DEL' || label === 'AC') {
        button.classList.add('del')
    }
    buttonContainer.appendChild(button)

    button.addEventListener('click', (e) => {
        if (!isNaN(label) || label === '.') {
            if (!operatorPressed) {
                a += label
                screenText.textContent = a
            } else {
                b += label
                screenText.textContent = a + op + b
            }
        } else if (label === 'AC') {
            a = ''; b = ''; op = ''; operatorPressed = false
            screenText.textContent = ''
        } else if (label === 'DEL') {
            if (b.length > 0) {
                b = b.slice(0, -1)
                screenText.textContent = a + op + b
            } else if (op) {
                op = ''
                operatorPressed = false
                screenText.textContent = a
            } else {
                a = a.slice(0, -1)
                screenText.textContent = a
            } 
        } else if (label === '=') {
            answer = operate(Number(a), Number(b), op)
            screenText.textContent = answer
            a = String(answer); b = '', op = '', operatorPressed = false
        } else {
            op = label
            operatorPressed = true
            screenText.textContent = a + op
        }
        
    })
})

function add(a,b=0) {
    return a+b
}

function subtract(a,b) {
    return a-b
}

function multiply(a,b) {
    return a*b
}

function divide(a,b) {
    if (b===0) return 'Math Error: Cannot divide by zero'
    return a/b
}

function operate(a,b='',op='') {
    switch(op) {
        case '+':
            return add(a,b=0)
        case '-':
            return subtract(a,b)
        case 'X':
            return multiply(a,b)
        case '/':
            return divide(a,b)
        default:
            return 'Invalid Operator'
    }
}
