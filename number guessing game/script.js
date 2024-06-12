// Get the DOM elements and initialize the game
const input = document.querySelector("input"),
      guessDisplay = document.querySelector(".guess"),
      checkButton = document.querySelector("button"),
      remainingChancesDisplay = document.querySelector(".chances");

// Set the focus on input field
input.focus();

let randomNum = Math.floor(Math.random() * 100) + 1;
let remainingChances = 10;

// Function to reset the game
function resetGame() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  remainingChances = 10;
  input.value = '';
  input.disabled = false;
  guessDisplay.textContent = '';
  guessDisplay.style.color = "#333";
  remainingChancesDisplay.textContent = remainingChances;
  checkButton.textContent = "Check";
  input.focus();
}

// Listen for the click event on the check button
checkButton.addEventListener("click", () => {
  if (checkButton.textContent === "Replay") {
    resetGame();
    return;
  }

  // Decrement the remainingChances variable on every click
  remainingChances--;
  // Get the value from the input field and convert to number
  let userGuess = parseInt(input.value, 10);

  // Check if the input value is equal to the random number
  if (userGuess === randomNum) {
    guessDisplay.textContent = "Congratulations, you guessed it!";
    guessDisplay.style.color = "#28a745";
    input.disabled = true;
    checkButton.textContent = "Replay";
  } else if (userGuess > randomNum && userGuess <= 100) {
    guessDisplay.textContent = "Your guess is high!";
    guessDisplay.style.color = "#333";
  } else if (userGuess < randomNum && userGuess >= 1) {
    guessDisplay.textContent = "Your guess is low!";
    guessDisplay.style.color = "#333";
  } else {
    guessDisplay.textContent = "Please enter a valid number between 1 and 100!";
    guessDisplay.style.color = "#DE0611";
  }

  remainingChancesDisplay.textContent = remainingChances;

  // Check if the remaining chances are zero
  if (remainingChances === 0) {
    guessDisplay.textContent = "You've run out of chances. You lost the game!";
    guessDisplay.style.color = "#DE0611";
    input.disabled = true;
    checkButton.textContent = "Replay";
  }

  // Reload the game if user clicks "Replay" button
  if (remainingChances < 0) {
    window.location.reload();
  }
});

// Add event listener for Enter key press
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkButton.click();
  }
});

