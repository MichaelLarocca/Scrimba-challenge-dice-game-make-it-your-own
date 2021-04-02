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

const saberOn = document.getElementById("saber-on");
const coolsaber = document.getElementById("coolsaber");
const starWarsWin = document.getElementById("star-wars-win");
const lasrhit1 = document.getElementById("lasrhit1");
const lasrhit2 = document.getElementById("lasrhit2");
const lasrhit3 = document.getElementById("lasrhit3");
const lasrhit4 = document.getElementById("lasrhit4");

saberOn.volume = 0.1;
coolsaber.volume = 0.2;
starWarsWin.volume = 1;
lasrhit1.volume = 0.2;
lasrhit2.volume = 0.2;
lasrhit3.volume = 0.2;
lasrhit4.volume = 0.2;

function rollDie() {
    const randomNumberOneToSix = Math.floor(Math.random() * 6 + 1);
    return randomNumberOneToSix;
} 

function gameStart() {
    btnRollDie.disabled = true;
    btnResetGame.disabled = true;

    playSaberOn();

    setTimeout(() => {
        playCoolSaber();
    }, 750);

    setTimeout(() => {
        btnRollDie.disabled = false;
    }, 4000);

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
            playStarWarsWin();
        }

        if(scorePlayerTwo >= 21 ){
            message.style.color = "blue";
            message.textContent = `🔥Obi-Wan Wins!🔥`; 
            playStarWarsWin();
        }

        dieOne.classList.remove("active");
        dieTwo.classList.remove("active");

        btnRollDie.style.display = "none";
        btnResetGame.style.display = "block";

        setTimeout(() => {
            btnResetGame.disabled = false;
        }, 3000);
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

    btnRollDie.disabled = true;

    const rollDieResult = rollDie();

    if(activePlayerOne) {
        playSaberFight();
        scorePlayerOne += rollDieResult;
        dieTwo.textContent = "-";
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
        playSaberFight();
        scorePlayerTwo += rollDieResult;
        dieOne.textContent = "-";
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

    setTimeout(() => {
        btnRollDie.disabled = false;
    }, 1500);
}

async function playSaberOn() {
    try {
      await saberOn.play();
    } catch(err) {
      console.log(err);
    }
  }

  async function playCoolSaber() {
    try {
      await coolsaber.play();
    } catch(err) {
      console.log(err);
    }
  }

  async function playStarWarsWin() {
    try {
      await starWarsWin.play();
    } catch(err) {
      console.log(err);
    }
  }

  async function playSaberFight() {
    try {

        const x = Math.floor(Math.random() * 4 + 1);
      
        switch (x) {
            case 1:
                await lasrhit1.play();
                break;
            case 2:
                await lasrhit2.play();
                break;
            case 3:
                await lasrhit3.play();
                break;
            case 4: 
            await lasrhit4.play();
                break;  
            default:
                await lasrhit1.play();           
        }


        } catch(err) {
        console.log(err);
        }
  }

gameStart();
btnRollDie.addEventListener("click", btnRollDieCLicked);
btnResetGame.addEventListener("click", gameStart);

