const gameNumber = document.querySelector(".game-number");
const gameReturn = document.querySelector(".game-return");
const gameGuess = document.querySelector(".game-guess");
const healthPointNumber = document.querySelector(".health-point-number");
const healthPointBar = document.querySelector(".health-point-bar");
const playButton = document.querySelector(".game-button-play");
const resetButton = document.querySelector(".game-button-reset");

let gameHealth;
let gameOver;
let randomGuessNumber;

const updateData = (element, message) => {
   element.textContent = message;
}

//* fonction d'initialisation du jeu */
const init = () => {
   gameHealth = 100;
   gameOver = false;
   // nombre aléatoire entre 1 et 10
   randomGuessNumber = Math.trunc(Math.random() * 10) + 1;
   updateData(healthPointNumber, "100%");
   updateData(gameReturn, "What is your guess?");
   updateData(gameNumber, "?");
   gameGuess.value = "";
   healthPointBar.style.background = "green";
   healthPointBar.style.width = `${gameHealth}%`;
}

init();

const playGame = () => {
   const userGuess = Number(gameGuess.value);
   if (!gameOver) {
      if (userGuess <= 0) {
         updateData(gameReturn, "Your guess must be greater than 0");
      } else if (userGuess == randomGuessNumber) {
         gameNumber.textContent = randomGuessNumber;
         updateData(gameReturn, "You win!");
      } else if (userGuess !== randomGuessNumber) {
         if (gameHealth > 20) {
            updateData(gameReturn, userGuess > randomGuessNumber ? "Try a lower number." : "Try a higher number.");
            gameHealth -= 20;
            healthPointBar.style.width = `${gameHealth}%`;
            updateData(healthPointNumber, `${gameHealth}%`);
            if(healthPointBar < 50){
               healthPointNumber.style.background = "red";
            }
         } else {
            updateData(gameReturn, "Game over!");
            gameHealth = 0;
            healthPointBar.style.width = `${gameHealth}%`;
            updateData(healthPointNumber, "0%");
            gameOver = true;
         }
      }
   } else {
      updateData(gameReturn, "Reset to play again!");
   }
}
playButton.addEventListener("click", playGame);
resetButton.addEventListener("click", init);