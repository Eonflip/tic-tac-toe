let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let spanOne = document.getElementsByClassName("close")[1];
let restartButton = document.getElementsByClassName("restart-button")[0];
let symbolModal = document.getElementById("symbolModal");
let computerButton = document.getElementById("computerButton");
let playerButton = document.getElementById("secondPlayer");
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let circleTurn;


cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})


function handleClick(e) {
    const tile = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(tile, currentClass);
    // placeMark
    // Check for Win
    // Check for Draw
    // Switch Turns
    swapTurns();
    setBoardHoverClass();
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
}

playerButton.onclick = function() {
    symbolModal.style.display = "block";
}

computerButton.onclick = function() {
    symbolModal.style.display = "block";
}


//Define player and computer objects



