let n1, n2, operator, result, displayValue
//calcula as operações
const operate = (operator, n1, n2) =>  {
    switch(operator) {
        case '+':
            return n1 + n2
        case '-':
            return n1 - n2
        case '*':
            return n1 * n2
        case '/':
            return n1 / n2 
    }
}

const buttonsArea = document.querySelector('div')
let display = document.querySelector('.display-area')
let newDisplay = false
let storeOnN2 = false

//operar a calculadora
buttonsArea.addEventListener('click', e => {
    clearInitialDisplay(e)
    clickValues(e)
    getOperator(e)
    showResult(e)
    clearScreen(e)
    undoLastDigit(e)
})

//limpar o 0 inicial do display quando entrar com um número
const clearInitialDisplay = e => {
    if (!newDisplay && !isNaN(e.target.value) || !isNaN(e.key)) {
        display.innerHTML = ""
        newDisplay = true
    } 
}

//concatenar os valores digitados no display e armazenar nas variáveis n1 e n2
const clickValues = e => {
    if (storeOnN2 == false && (!isNaN(e.target.value) || e.target.value == ".")) {
        //filtrar mais de um . nos numeros

        if(e.target.value == "." && display.innerHTML.includes(".")) {
            return
        }

        displayValue = e.target.value
        display.innerHTML += displayValue 
        return n1 = parseFloat(display.textContent, 10)
    } else if (storeOnN2 == true && (!isNaN(e.target.value) || e.target.value == ".")) {
    //limpar o display após mudar a variável
        if(display.textContent != "" && !n2) {
            display.innerHTML = ""
        }
        if(e.target.value == "." && display.innerHTML.includes(".")) {
            return
        }
        display.innerHTML += e.target.value
        return n2 = parseFloat(display.textContent, 10)
    }
}

//aplicar o operador
const getOperator = e => {
    if (e.target.id == 'operator') {
        if(!n2) {
            storeOnN2 = true
            operator = e.target.value
        //aplicar operações consecutivas
        } else {
            newDisplay = false
            operator = e.target.value
        }
    }
}

//exibir o resultado
const showResult = e => {
    if (e.target.value === 'result' || e.target.id=='vert') {
        if (n1 === undefined || n2 === undefined ) {
            return 
        } else if ( n2 == 0 && operator == "/") {
            display.innerHTML = "Não divida por 0!"
            return
        }
        result = operate(operator, n1, n2)
        display.innerHTML = result.toFixed(2)
        console.log("res " + result)
    //armazenar o resultado para futuras operações
        n1 = result
    }
}

//limpar tela
const clearScreen = e => {
    if (e.target.value === 'clear') {
        display.innerHTML = "0.0"
        n1 = 0
        n2 = 0
        newDisplay = false
        storeOnN2 = false
    }
}
    
//desfazer ultimo digito
const undoLastDigit = e => {
    if (e.target.value == "undo") {
        const undo = display.textContent.split('').slice(0,-1).join('')
        display.innerHTML = undo
        storeOnN2 == false? n1 = parseFloat(undo) : n2 = parseFloat(undo)
        console.log("undo n1 " + n1)
        console.log("undo n2 " + n2)
    }
}