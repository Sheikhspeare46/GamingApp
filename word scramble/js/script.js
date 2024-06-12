const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word"),
  messageDiv = document.getElementById("message"); // Select the message div

let correctWord, timer;

const initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return timeText.innerText = maxTime;
    }
    showMessage(`Time off! ${correctWord.toUpperCase()} was the correct word`); // Display message
    initGame();
  }, 1000);
}

const showMessage = message => {
  messageDiv.innerText = message; // Set message content
}

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  showMessage(""); // Clear previous messages
}
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return showMessage("Please enter the word to check!");
  if (userWord !== correctWord) return showMessage(`Oops! ${userWord} is not the correct word`);
  showMessage(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  setTimeout(() => {
    initGame();
  }, 1000); // Load new word after 1 second
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
