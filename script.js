let n1=0, n2=0, stringN2 = 0, operator, result
//calcula as operações
const operate = (operator, n1, n2) =>  {
    n1 = n1.toString().replace(/,/g, ".")
    n2 = n2.toString().replace(/,/g, ".")
    n1 = parseFloat(n1)
    n2 = parseFloat(n2)
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
    n2 = 0
}

const buttonsArea = document.querySelector('div')
let display = document.querySelector('#display-text')
let newDisplay = false
let storeOnN2 = false

//operar a calculadora com clicks
buttonsArea.addEventListener('click', e => {
    clearInitialDisplay(e)
    clickValues(e)
    clickOperator(e)
    showResult(e)
    clearScreen(e)
    undoLastDigit(e)
    console.log("n1 " + n1)
    console.log("n2 " + n2)
    console.log("result " + result)
})

//operar com teclado
document.addEventListener('keyup', e => {
    clearInitialDisplay(e)
    typeValues(e)
    showResult(e)
    typeOperator(e)
    clearScreen(e)
    undoLastDigit(e)
    console.log("n1 " + n1)
    console.log("n2 " + n2)
    console.log("result " + result)
})

//limpar o 0 inicial do display quando entrar com um número
const clearInitialDisplay = e => {
    if (!newDisplay && (!isNaN(e.target.value) || !isNaN(e.key) || e.key == ",")) {
        display.innerHTML = ""
        newDisplay = true
    } 
}

//concatenar os valores clicados no display e armazenar nas variáveis n1 e n2
const clickValues = e => {
    if (storeOnN2 == false && (!isNaN(e.target.value) || e.target.value == ".")) {
        //validar apenas 1 ponto
        if(e.target.value == "." && display.innerHTML.includes(".")) {
            return
        }
        
        if (n1 == 0) {
            n1 = e.target.value
        } else if (n1 != 0){
            n1 += e.target.value
        } 
        
        display.innerHTML = n1
        
        return n1
    } else if (storeOnN2 == true && ((!isNaN(e.target.value)) || e.target.value == '.')){
        //limpar display após mudar variável
        if(display.textContent != "" && !n2) {
            display.innerHTML = ""
        }
        //validar apenas 1 ponto
        if(e.target.value == "." && display.innerHTML.includes(".")) {
            return
        }

        if(n2 == 0) {
            n2 = e.target.value
        } else {
            n2 += e.target.value
        }

        display.innerHTML = n2

        return n2
    }
}

//concatenar os valores digitados e armazenar nas variáveis n1 e n2
const typeValues = e => {
    if (storeOnN2 == false && ((!isNaN(e.key)) || e.key == ',')) {
        //validar apenas 1 ponto
        if(e.key == "," && display.innerHTML.includes(".")) {
            return
        }
        
        if (n1 == 0) {
            n1 = e.key
        } else if (n1 != 0){
            n1 += e.key
        } 
        
        display.innerHTML = n1.replace(/,/g, ".")
        
        return n1
    } else if (storeOnN2 == true && ((!isNaN(e.key)) || e.key == ',')){
        //limpar display após mudar variável
        if(display.textContent != "" && !n2) {
            display.innerHTML = ""
        }
        //validar apenas 1 ponto
        if(e.key == "," && display.innerHTML.includes(".")) {
            return
        }

        if(n2 == 0) {
            n2 = e.key
        } else {
            n2 += e.key
        }

        display.innerHTML = n2.replace(/,/g, ".")

        return n2
    }
}

//aplicar o operador com click
const clickOperator = e => {
    if (e.target.id == 'operator') {
        if(!n2) {
            storeOnN2 = true
            operator = e.target.value
        //aplicar operações consecutivas
        } else {
            newDisplay = false
            operator = e.target.value
            n2 = 0
        }
    }
}

//operar com teclado
const typeOperator = e => {
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if(!n2) {
            storeOnN2 = true
            operator = e.key
        //aplicar operações consecutivas
        } else {
            newDisplay = false
            operator = e.key
            n2 = 0
        }
    }
}

//exibir o resultado
const showResult = e => {
    if (e.target.value === 'result' || e.target.id ==='vert' || e.key == 'Enter') {
        if (n1 === undefined || n2 === undefined ) {
            return 
        } else if ( n2 == 0 && operator == "/") {
            display.innerHTML = "Impossível!"
            return
        }
        result = operate(operator, n1, n2)
        
        if (result.toString().includes('.')) {
            display.innerHTML = result.toFixed(2)
        } else {
            display.innerHTML = result
        }
    //armazenar o resultado para futuras operações
        n1 = result
    }
}

//limpar tela
const clearScreen = e => {
  if (e.target.value === 'clear' || e.key === 'Escape') {
        display.innerHTML = "0.0"
        n1 = 0
        n2 = 0
        newDisplay = false
        storeOnN2 = false
        //remove focus from limpar
        e.target.blur()
    }
}
    
//desfazer ultimo digito
const undoLastDigit = e => {
    //se o display for limpo mostra 0
    if ((e.target.value == "undo" || e.key == 'Backspace') && display.innerHTML.length == 1 && storeOnN2 == false) {
        e.preventDefault()
        n1 = 0
        display.innerHTML = n1
    } else if ((e.target.value == "undo" || e.key == 'Backspace') && display.innerHTML.length == 1 && storeOnN2 == true){
        e.preventDefault()
        n2 = 0
        display.innerHTML = n2
    } else if (e.target.value == "undo" || e.key == 'Backspace') {
        const undo = display.textContent.split('').slice(0,-1).join('')
        display.innerHTML = undo
        storeOnN2 == false? n1 = parseFloat(undo) : n2 = parseFloat(undo)
    }
}