const startButton = document.querySelector(".start-game");
const restartButton = document.querySelector(".start-over");
const colors = ["red", "blue", "yellow", "green"];
let pattern = [];
let inputPattern = [];
let level = 1;
let wrongCounter = 0;
let started = false;
const wrongTracker = document.querySelector("#wrong-counter");

startButton.addEventListener("click", () => {
  if (!started) {
    nextSequence();
    started = true;
  } else {
    return;
  }
});
restartButton.addEventListener("click", () => startOver());
const buttons = document.querySelectorAll(".quadrant");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const choosenColor = button.id;
    inputPattern.push(choosenColor);
    animatePress(choosenColor);
    checkAnswer(inputPattern.length - 1);
    playSound(choosenColor);
  });
});

const checkAnswer = (currentLevel) => {
  if (pattern[currentLevel] === inputPattern[currentLevel]) {
    if (inputPattern.length === pattern.length) {
      setTimeout(() => {
        // replay the entire pattern
        for (let i = 0; i < pattern.length; i++) {
          setTimeout(() => {
            const button = document.querySelector(`#${pattern[i]}`);
            button.classList.add("active");
            playSound(pattern[i]);
            setTimeout(() => {
              button.classList.remove("active");
            }, 100);
          }, 500 * i);
        }
        setTimeout(() => {
          nextSequence();
        }, 500 * pattern.length);
      }, 1000);
    }
  } else {
    inputPattern = [];
    wrongCounter++;
    wrongTracker.textContent = `Wrong responses: ${wrongCounter}`;
    wrongTracker.classList.add("wrong");

    setTimeout(() => {
      wrongTracker.classList.remove("wrong");

      for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
          const button = document.querySelector(`#${pattern[i]}`);
          button.classList.add("active");
          playSound(pattern[i]);
          setTimeout(() => {
            button.classList.remove("active");
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
  document.querySelector("#steps").textContent = `Steps: ${level}`;
  inputPattern = [];
  level++;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNumber];
  pattern.push(randomColor);

  const button = document.querySelector(`#${randomColor}`);
  button.classList.add("active");
  playSound(randomColor);
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
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
  wrongTracker.textContent = "Wrong responses: 0"; // reset the text content
  nextSequence();
};
