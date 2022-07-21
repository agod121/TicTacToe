const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const winningMessage = document.querySelector('data-winning-message-text')
const winningMessageElement = document.getElementById('winningMessage')
let circleTurn
const winnerCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

                 ]
hoverOverBoard()

const splash = document.getElementById('splash1')

document.addEventListener('DOMContentLoaded', (e) => { 
    setTimeout(() => {
    splash.classList.add('display-none')
    },1500)  
})

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell =>  {
        cell.addEventListener('click',handleClick, { once:true })
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)

    })
    hoverOverBoard()
    winningMessageElement.classList.remove('show')
    
}

const restartButton = document.getElementById('restartButton') 

restartButton.addEventListener('click',startGame)


cellElements.forEach(cell =>  {
    cell.addEventListener('click',handleClick, { once:true })
})

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    
    if(checkWinner(currentClass)) {
        endGame(false)
    }
    else if(isDraw()) {
        endGame(true)
    }
    else {
        swapTurn()
        hoverOverBoard()
    }
}

function endGame(draw) {
    
    if(draw) {
        winningMessage.innerText = 'Draw!'
    }
    else {
        winningMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function hoverOverBoard() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkWinner(currentClass) {
   return winnerCombo.some(combination => {
    return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })
    })
   }