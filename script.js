let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let spanOne = document.getElementsByClassName("close")[1];
let restartButton = document.getElementsByClassName("restart-button")[0];
let symbolModal = document.getElementById("symbolModal");
let computerButton = document.getElementById("computerButton");
let playerButton = document.getElementById("secondPlayer");
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const endRestartButton = document.getElementById('restartButton');
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let circleTurn;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

endRestartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(tile => {
        tile.classList.remove(X_CLASS);
        tile.classList.remove(CIRCLE_CLASS);
        tile.removeEventListener('click', handleClick);
        tile.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}


function handleClick(e) {
    const tile = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(tile, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
    // placeMark
    // Check for Win
    // Check for Draw
    // Switch Turns
    
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
    } 
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(tile, currentClass) {
    tile.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } 
    else {
        board.classList.add(X_CLASS);
    }
}

window.onload = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

spanOne.onclick = function() {
    symbolModal.style.display = "none";
    modal.style.display = "none";
}

restartButton.onclick = function() {
    modal.style.display = "block";
    startGame();
}

playerButton.onclick = function() {
    symbolModal.style.display = "block";
}

computerButton.onclick = function() {
    symbolModal.style.display = "block";
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

//Define player and computer objects



