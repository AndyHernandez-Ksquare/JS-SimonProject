const startButton = document.querySelector(".start-game");
const restartButton = document.querySelector(".start-over");
const colors = ["red", "blue", "yellow", "green"];
let pattern = [];
let inputPattern = [];
let level = 1;
let wrongCounter = 0;
let hardMode = false;
let started = false;
const wrongTracker = document.querySelector("#wrong-counter");
const winText = document.querySelector(".newGame");
const buttons = document.querySelectorAll(".quadrant");
const hardModeButton = document.querySelector("#hard-mode"); // new button for hard mode
const hardModeText = document.querySelector("#hard-mode-advice");

startButton.addEventListener("click", () => {
  if (!started) {
    nextSequence();
    started = true;
    winText.textContent = "Follow the pattern";
    wrongTracker.textContent = "Wrong responses: 0";
  } else {
    return;
  }
});

restartButton.addEventListener("click", () => {
  startOver();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const chosenColor = button.id;
    inputPattern.push(chosenColor);
    animatePress(chosenColor);
    checkAnswer(inputPattern.length - 1);
    playSound(chosenColor);
  });
});
// toggle hard mode button event listener
hardModeButton.addEventListener("click", () => {
  hardMode = !hardMode; // toggle the hardMode variable
  hardModeButton.textContent = !hardMode ? "Easy Mode" : "Hard Mode"; // change button text content
  if (hardMode) {
    hardModeText.textContent = "Watch out, hard mode is on!";
  } else {
    hardModeText.textContent = "You are playing on easy mode";
  }
  startOver(); // start over the game with the new mode
});

const checkAnswer = (currentLevel) => {
  if (pattern[currentLevel] === inputPattern[currentLevel]) {
    if (inputPattern.length === pattern.length) {
      toggleButtonActivity(true);
      setTimeout(() => {
        // replay the entire pattern
        for (let i = 0; i < pattern.length; i++) {
          setTimeout(() => {
            const button = document.querySelector(`#${pattern[i]}`);
            button.classList.add("active");
            playSound(pattern[i]);
            setTimeout(() => {
              button.classList.remove("active");
              if (i === pattern.length - 1) {
                toggleButtonActivity(false);
              }
            }, 100);
          }, 500 * i);
        }
        level++;
        document.querySelector("#steps").textContent = `Steps: ${level}`;
        setTimeout(() => {
          nextSequence();
        }, 500 * pattern.length);
      }, 1000);
    }
  } else {
    // If hardMode active restart the game
    if (hardMode) {
      startOver();
    }
    inputPattern = [];
    wrongCounter++;
    wrongTracker.textContent = `Wrong responses: ${wrongCounter}`;
    wrongTracker.classList.add("wrong");
    toggleButtonActivity(true);
    setTimeout(() => {
      wrongTracker.classList.remove("wrong");

      for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
          const button = document.querySelector(`#${pattern[i]}`);
          button.classList.add("active");
          playSound(pattern[i]);
          setTimeout(() => {
            button.classList.remove("active");
            if (i === pattern.length - 1) {
              toggleButtonActivity(false);
            }
          }, 100);
        }, 500 * i);
      }
    }, 1000);
  }
};

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const nextSequence = () => {
  inputPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNumber];
  pattern.push(randomColor);

  const button = document.querySelector(`#${randomColor}`);
  button.classList.add("active");
  playSound(randomColor);
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);

  if (level === 20) {
    winText.textContent = "Congrats! Press this text to start a new game";
    toggleButtonActivity(true);
    winText.addEventListener("click", () => {
      startOver();
    });
  }
};

const animatePress = (currentColor) => {
  const button = document.querySelector(`#${currentColor}`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
};
const startOver = () => {
  level = 1;
  inputPattern = [];
  wrongCounter = 0;
  pattern = [];
  started = false;
  winText.textContent = "Follow the pattern";
  toggleButtonActivity(false);
  document.querySelector("#steps").textContent = `Steps: 1`;

  wrongTracker.textContent = "Wrong responses: 0"; // reset the text content
  nextSequence();
};

const toggleButtonActivity = (activity) => {
  const colors = document.querySelectorAll(".quadrant");
  colors.forEach((button) => {
    button.disabled = activity;
  });
};
