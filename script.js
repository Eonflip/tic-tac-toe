let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let spanOne = document.getElementsByClassName("close")[1];
let restartButton = document.getElementsByClassName("restart-button")[0];
let symbolModal = document.getElementById("symbolModal");
let computerButton = document.getElementById("computerButton");
let playerButton = document.getElementById("secondPlayer");
const cellElements = document.querySelectorAll('[data-cell]')


cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})


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



