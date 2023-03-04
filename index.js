const startButton = document.querySelector(".start-game");
const colors = ["red", "blue", "yellow", "green"];
let pattern = [];
let inputPattern = [];
let level = 0;
let started = false;

startButton.addEventListener("click", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

const buttons = document.querySelectorAll(".quadrant");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const choosenColor = button.id;
    // console.log({ choosenColor });
    inputPattern.push(choosenColor);
    animatePress(choosenColor);
    checkAnswer(inputPattern.length - 1);
  });
});

// const checkAnswer = (currentLevel) => {
//   if (pattern[currentLevel] === inputPattern[currentLevel]) {
//     if (inputPattern.length === pattern.length) {
//       setTimeout(() => {
//         nextSequence();
//       }, 1000);
//     }
//   } else {
//     startOver();
//   }
// };

const checkAnswer = (currentLevel) => {
  if (pattern[currentLevel] === inputPattern[currentLevel]) {
    if (inputPattern.length === pattern.length) {
      setTimeout(() => {
        // replay the entire pattern
        for (let i = 0; i < pattern.length; i++) {
          setTimeout(() => {
            const button = document.querySelector(`#${pattern[i]}`);
            button.classList.add("active");
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
    startOver();
  }
};

const nextSequence = () => {
  inputPattern = [];
  level++;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNumber];
  pattern.push(randomColor);

  const button = document.querySelector(`#${randomColor}`);
  button.classList.add("active");
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
  level = 0;
  pattern = [];
  started = false;
};
