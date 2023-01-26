const questions = [
    {
        question: "Which of the following is not a basic javascript data type ?",
        optionA: "Boolean",
        optionB: "Integer",
        optionC: "String",
        optionD: "Color",
        correctOption: "optionD"
    },


    {
        question: "What method combines the text of two strings and returns a new string ?",
        optionA: "add()",
        optionB: "concat()",
        optionC: "combine()",
        optionD: "attach()",
        correctOption: "optionB"
    },


    {
        question: "Question ?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "right answer",
        correctOption: "optionD"
    },


    {
        question: "Question ?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "right answer",
        optionD: "wrong answer",
        correctOption: "optionC"
    },


    {
        question: "Question?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "right answer",
        correctOption: "optionD"
    },


    {
        question: "Question ?",
        optionA: "right answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "wrong answer",
        correctOption: "optionA"
    },


    {
        question: "Question ?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "right answer",
        optionD: "wrong answer",
        correctOption: "optionC"
    },


    {
        question: "Question?",
        optionA: "right answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "wrong answer",
        correctOption: "optionA"
    },


    {
        question: "Question ?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "right answer",
        correctOption: "optionD"
    },


    {
        question: "Question ?",
        optionA: "wrong answer",
        optionB: "wrong answer",
        optionC: "wrong answer",
        optionD: "right answer",
        correctOption: "optionD"
    },


]




let shuffledQuestions = [] //empty array to hold shuffled selected questions


function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}




let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;


}




function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null


    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
 


    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }


        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}






//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


// function for when all questions being answered
function handleEndGame() {
    document.getElementById("form").style.display = "block";
    let initials = document.getElementById("initials").value;
       
    // Get the current high scores from local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
   
    // Add the new score and initials to the high scores array
    highScores.push({initials: initials, score: score});
   
    // Sort the high scores by score
    highScores.sort((a, b) => b.score - a.score);
   
    // Save the high scores back to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
   
    // Clear the form
    document.getElementById("form").reset();
}






// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }


  // The startGame function is called when the start button is clicked
function startGame() {
    NextQuestion(0)
    isWin = false;
    timerCount = 60;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
  }


  // The winGame function is called when the win condition is met
function winGame() {
    wordBlank.textContent = "YOU WON!!!🏆 ";
    winCounter++
    startButton.disabled = false;
   
  }
 
  // The loseGame function is called when timer reaches 0
  function loseGame() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++
    startButton.disabled = false;
   
  }



