const userInput = document.querySelector("#user-input")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator-button")
const eqButton = document.querySelector("#eq")
const clearButton = document.querySelector("#c")
const clearAllButton = document.querySelector("#ca")
const deleteButton = document.querySelector("#del")
const decimalButton = document.querySelector("#dec")


const operations = {
    "div": (a, b) => eval(`${a}/${b}`), 
    "mul": (a, b) => eval(`${a}*${b}`),
    "sub": (a, b) => eval(`${a}-${b}`),
    "sum": (a, b) => eval(`${a}+${b}`)
}

const digitWidth = 25
var ans = 0
var a = 0
var curOp = ""
var isWaiting = false

function getCurrentNumber() {
    return parseFloat(userInput.textContent)
}

function setCurrentNumber(number) {
    let text = number.toString()

    let maxFigures = parseInt(userInput.clientWidth / digitWidth)
    console.log(maxFigures)

    if (number.toString().length > maxFigures) {
        let expChars = 6;
        text = number.toExponential(maxFigures - expChars)
    }

    userInput.textContent = text
}

function eq() {
    if (!curOp) return

    b = getCurrentNumber()
    ans = operations[curOp](a, b)

    setCurrentNumber(ans)

    isWaiting = false
}

function clear() {
    setCurrentNumber(0)

    if (!isWaiting) {
        curOp = ""
    }
}

function clearAll() {
    isWaiting = false
    ans = 0
    clear()
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (ans !== 0 && getCurrentNumber() === ans) {
            clearAll()
        }

        let number = userInput.textContent + button.value

        number = parseFloat(number)
        setCurrentNumber(number)
    })
})

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id == "sub" && getCurrentNumber() === 0) {
            setCurrentNumber("-0")
            return
        } 
        
        curOp = button.id

        if(isWaiting) {
            eq()
        }

        a = getCurrentNumber()
        setCurrentNumber(0)

        isWaiting = true
    })
})

decimalButton.addEventListener("click", () => {
    if (userInput.textContent.includes(".")) return

    userInput.textContent = userInput.textContent + "."
})

eqButton.addEventListener("click", eq)

clearButton.addEventListener("click", clear)

clearAllButton.addEventListener("click", () => {
    clearAll()
})

deleteButton.addEventListener("click", () => {
    if (ans !== 0 && getCurrentNumber() === ans) {
        return
    }

    let text = userInput.textContent.slice(0, userInput.textContent.length-1)
    const number = parseFloat(text ? text : "0")

    setCurrentNumber(number)
})

function main () {
    setCurrentNumber(0)
}

window.addEventListener("load", main)