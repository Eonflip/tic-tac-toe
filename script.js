let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let restartButton = document.getElementsByClassName("restart-button")[0];
let symbolModal = document.getElementById("symbolModal");
let computerButton = document.getElementById("computerButton");
let playerButton = document.getElementById("secondPlayer");



window.onload = function() {
    modal.style.display = "block";
}

span.onclick = function() {
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




