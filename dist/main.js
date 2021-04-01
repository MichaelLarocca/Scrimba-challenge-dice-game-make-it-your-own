const message = document.getElementById("message");
let scoreBoardPlayerOne = document.getElementById("score-board-player-one");
let scorePlayerOne = 0;
const dieOne = document.getElementById("die-one");
let scoreBoardPlayerTwo = document.getElementById("score-board-player-two");
let scorePlayerTwo = 0;
const dieTwo = document.getElementById("die-two");
const btnRollDie = document.getElementById("roll-die");
const btnResetGame = document.getElementById("reset-game");
let activePlayerOne = false;
let activePlayerTwo = false;

function rollDie() {
    const randomNumberOneToSix = Math.floor(Math.random() * 6 + 1);
    return randomNumberOneToSix;
} 

function gameStart() {
    btnRollDie.style.display = "block";
    btnResetGame.style.display = "none";

    message.style.color = "white";
    message.textContent = "";
    scorePlayerOne = 0;
    scoreBoardPlayerOne.textContent = scorePlayerOne;
    dieOne.textContent = "-";
    dieOne.classList.remove("active");
    scorePlayerTwo = 0;
    scoreBoardPlayerTwo.textContent = scorePlayerTwo;
    dieTwo.textContent = "-";
    dieTwo.classList.remove("active");

    chooseWhichPlayerStarts();
}

function checkForGameOver() {
    if(scorePlayerOne >= 21 || scorePlayerTwo >= 21){
        message.textContent = `Game Over`;

        if(scorePlayerOne >= 21 ){
            message.style.color = "red";
            message.textContent = `🔥Darth Vader Wins!🔥`; 
        }

        if(scorePlayerTwo >= 21 ){
            message.style.color = "blue";
            message.textContent = `🔥Obi-Wan Wins!🔥`; 
        }

        dieOne.classList.remove("active");
        dieTwo.classList.remove("active");

        btnRollDie.style.display = "none";
        btnResetGame.style.display = "block";
    }
}

function chooseWhichPlayerStarts() {
    const result = rollDie();

    if (result >= 3) {
        message.textContent = `Darth Vader Starts!`;
        activePlayerOne = true;
        dieOne.classList.add("active");
    }   else {
        message.textContent = `Obi-Wan Starts!`;
        activePlayerTwo = true;
        dieTwo.classList.add("active");
    }
}

function btnRollDieCLicked() {

    const rollDieResult = rollDie();

    if(activePlayerOne) {
        scorePlayerOne += rollDieResult;
        dieOne.textContent = rollDieResult;
        scoreBoardPlayerOne.textContent = scorePlayerOne;
        activePlayerOne = false;
        activePlayerTwo = true;
        message.style.color = "blue";
        dieTwo.classList.add("active");
        message.textContent = "Obi-Wan's turn";
        dieOne.classList.remove("active");
        checkForGameOver();
    } else {
        scorePlayerTwo += rollDieResult;
        dieTwo.textContent = rollDieResult;
        scoreBoardPlayerTwo.textContent = scorePlayerTwo;
        activePlayerTwo = false;
        activePlayerOne = true;
        message.style.color = "red";
        dieOne.classList.add("active");
        message.textContent = "Darth Vader's turn";
        dieTwo.classList.remove("active");
        checkForGameOver();
    }
}

gameStart();
btnRollDie.addEventListener("click", btnRollDieCLicked);
btnResetGame.addEventListener("click", gameStart);