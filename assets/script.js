const questions = [
  {
    question: "Which of the following is not a basic javascript data type ?",
    optionA: "Boolean",
    optionB: "Integer",
    optionC: "String",
    optionD: "Color",
    correctOption: "optionD",
  },

  {
    question:
      "What method combines the text of two strings and returns a new string ?",
    optionA: "add()",
    optionB: "concat()",
    optionC: "combine()",
    optionD: "attach()",
    correctOption: "optionB",
  },

  {
    question: "Arrays in JavaScript can be used to store ________.",
    optionA: "numbers and strings",
    optionB: "other arrays",
    optionC: "booleans",
    optionD: "all of the above",
    correctOption: "optionD",
  },

  {
    question:
      "The condition in an if / else statement is enclosed with ______.",
    optionA: "square brackets",
    optionB: "curly brackets",
    optionC: "quotes",
    optionD: "parenthesis",
    correctOption: "optionC",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    optionA: "terminal/bash",
    optionB: "for loops",
    optionC: "JavaScript",
    optionD: "console.log",
    correctOption: "optionD",
  },

  {
    question: "What keyword is used to define a function in JavaScript?",
    optionA: "function",
    optionB: "define",
    optionC: "func",
    optionD: "let",
    correctOption: "optionA",
  },

  {
    question: "What does the `push()` method do in JavaScript?",
    optionA: "Adds an element to the beginning of an array",
    optionB: "Removes an element from the beginning of an array",
    optionC: "Adds an element to the end of an array",
    optionD: "Prints a new line",
    correctOption: "optionC",
  },

  {
    question: "What method removes the last element in an array in JavaScript?",
    optionA: "pop()",
    optionB: "push()",
    optionC: "remove()",
    optionD: "cut()",
    correctOption: "optionA",
  },

  {
    question: "What is the purpose of the `typeof` operator in JavaScript?",
    optionA: "it converts the value of a variable",
    optionB: "it assigns a value of `null`",
    optionC: "it checks if a function will run",
    optionD: "it returns the data type of a value",
    correctOption: "optionD",
  },

  {
    question: "What does the modulus oeprator(%) do?",
    optionA: "performs division",
    optionB: "raises to an exponent",
    optionC: "performs multiplication",
    optionD: "performs division and returns the remainder",
    correctOption: "optionD",
  },
];

var startButton = document.getElementById("start-button");
var timerCount = document.getElementById("timer-count");
var quizQuestion = document.getElementById("quiz-question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var resultsSection = document.getElementById("results");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var saveScoreButton = document.getElementById("save-score-button");
var highScoresSection = document.getElementById("high-scores");
var highScoreList = document.getElementById("highscore-list");
var viewHighScores = document.getElementById("scores");
var homeSection = document.getElementById("quiz-home");
var activeQuizSection = document.getElementById("active-quiz");
var backButton = document.getElementById("back-button");
var clearScoresButton = document.getElementById("clear-scores-button");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let highScores = [];

startButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearHighScores);
saveScoreButton.addEventListener("click", saveScore);
option1.addEventListener("click", checkAnswer);
option2.addEventListener("click", checkAnswer);
option3.addEventListener("click", checkAnswer);
option4.addEventListener("click", checkAnswer);
viewHighScores.addEventListener("click", function(event) {
    event.preventDefault(); 
    showHighScores();
  });



function startQuiz() {
  // Hide the home section and display the active quiz section
  homeSection.style.display = "none";
  activeQuizSection.style.display = "block";

  nextQuestion();
  startTimer();
}

function nextQuestion() {
  const question = questions[currentQuestionIndex];
  quizQuestion.textContent = question.question;
  option1.textContent = question.optionA;
  option2.textContent = question.optionB;
  option3.textContent = question.optionC;
  option4.textContent = question.optionD;
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerCount.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  activeQuizSection.style.display = "none";
  resultsSection.style.display = "block";
  finalScore.textContent = timeLeft;
}

function checkAnswer(event) {
  const selectedOption = event.target.id;
  const question = questions[currentQuestionIndex];

  let correctOption;
  if (selectedOption === "option1") {
    correctOption = "optionA";
  } else if (selectedOption === "option2") {
    correctOption = "optionB";
  } else if (selectedOption === "option3") {
    correctOption = "optionC";
  } else if (selectedOption === "option4") {
    correctOption = "optionD";
  }

  if (correctOption === question.correctOption) {
    // Correct answer
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      nextQuestion();
    } else {
      endQuiz();
    }
  } else {
    // Incorrect answer
    timeLeft -= 10;
    if (timeLeft <= 0) {
      endQuiz();
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        nextQuestion();
      } else {
        endQuiz();
      }
    }
  }
}

function saveScore() {
    resultsSection.style.display = "none";
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const score = {
      initials: initials,
      score: timeLeft,
    };
    highScores.push(score);
    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Save high scores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    showHighScores();
  }
}

function showHighScores() {
  // Hide the home section and display the high scores section
  var homeSection = document.getElementById("quiz-home");
  homeSection.style.display = "none";
  highScoresSection.style.display = "block";

  // Clear high score list
  highScoreList.innerHTML = "";

  // Retrieve high scores from local storage
  highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Display high scores in the list
  highScores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials} - ${score.score}`;
    highScoreList.appendChild(listItem);
  });
}

function goBack() {
    homeSection.style.display = "block";
    activeQuizSection.style.display = "none";
    highScoresSection.style.display = "none";
    resultsSection.style.display = "none";
    resetQuiz();
  }
  
  function clearHighScores() {
    highScoreList.innerHTML = "";
    localStorage.removeItem("highScores");
  }
  
  function resetQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    timerCount.textContent = timeLeft;
  }

  
  