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

const checkAnswer = (currentLevel) => {
  if (pattern[currentLevel] === inputPattern[currentLevel]) {
    if (inputPattern.length === pattern.length) {
      setTimeout(() => {
        nextSequence();
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
// const displayColor = (color) => {
//   const button = document.getElementById(`${color}`);
//   button.classList.add("active");

//   setTimeout(() => {
//     button.classList.remove("active");
//   }, 1000);
// };

// const displayPattern = () => {
//   const displayColors = pattern.slice(0, difficulty);

//   displayColors.forEach((color, index) => {
//     setTimeout(() => {
//       displayColor(color);
//     }, (index + 1) * 1000);
//   });

//   setTimeout(() => {
//     checkPattern();
//   }, (difficulty + 1) * 1000);
// };
// const checkPattern = () => {
//   // Array with the pattern that the user will input
//   const inputPattern = [];
//   console.log({ pattern });

//   // Add event listener to every quadrant
//   const button = document.querySelectorAll(".quadrant");
//   button.forEach((button) => {
//     button.addEventListener("click", () => {
//       inputPattern.push(button.id);
//       displayColor(button.id);

//       // Compare the input pattern with the current pattern
//       if (inputPattern.length === pattern.length) {
//         const match = inputPattern.every(
//           (color, index) => color === pattern[index]
//         );

//         if (match) {
//           // If the patterns match, add an additional color to the pattern and replay
//           const randomNumber = Math.floor(Math.random() * 4);
//           const newColor = colors[randomNumber];
//           pattern.push(newColor);
//           difficulty += 1;

//           // Replay the pattern
//           setTimeout(() => {
//             displayPattern();
//           }, 1000);
//         } else {
//           alert("You have lost!!");
//         }
//       }
//     });
//   });
// };

// const checkPattern = () => {
//   // Array with the pattern that the user will input
//   const inputPattern = [];
//   console.log({ pattern });

//   // Create an array with the expected input based on the pattern
//   const expectedInput = pattern.slice(0, inputPattern.length);

//   // Add event listener to every quadrant
//   const button = document.querySelectorAll(".quadrant");
//   button.forEach((button) => {
//     button.addEventListener("click", () => {
//       inputPattern.push(button.id);
//       displayColor(button.id);

//       // Compare the input pattern with the expected input
//       if (inputPattern.length === expectedInput.length) {
//         const match = inputPattern.every(
//           (color, index) => color === expectedInput[index]
//         );

//         if (match) {
//           // If the patterns match, check if the user has completed the pattern
//           if (inputPattern.length === pattern.length) {
//             // Add an additional color to the pattern and replay
//             const randomNumber = Math.floor(Math.random() * 4);
//             const newColor = colors[randomNumber];
//             pattern.push(newColor);
//             difficulty += 1;

//             // Replay the pattern
//             setTimeout(() => {
//               displayPattern();
//             }, 1000);
//           } else {
//             // Update the expected input based on the pattern
//             expectedInput.push(pattern[inputPattern.length]);
//           }
//         } else {
//           // Notify the user and replay the same level
//           alert("Incorrect pattern. Try again.");
//           inputPattern.length = 0;
//           expectedInput.length = 0;
//           displayPattern();
//         }
//       }
//     });
//   });
// };

// const startGame = () => {
//   const randomNumber = Math.floor(Math.random() * 4);
//   const randomColor = colors[randomNumber];

//   pattern.push(randomColor);
//   difficulty = 1;

//   displayPattern();

//   checkPattern();
// };
