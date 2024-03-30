let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let restartButton = document.getElementsByClassName("restart-button")[0];

window.onload = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

restartButton.onclick = function() {
    modal.style.display = "block";
}
