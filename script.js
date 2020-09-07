var timerEl = document.getElementById("timer");
var startQuizButton = document.getElementById("start-quiz");
var mainContentEl = document.getElementById("main-content");
var resultEl = document.getElementById("result");

var currentQuestionIndex = 0;
var score = 0;
var hiscoresList = [];

// Question and answer bank
var questions = [
    {
      question: "Commonly used data types do NOT include:",
      answers: [
        { text: "strings", correct: false },
        { text: "numbers", correct: false },
        { text: "booleans", correct: false },
        { text: "alerts", correct: true },
      ],
    },
    {
      question:
        "The condition in an if/else statement is contained within _____?",
      answers: [
        { text: "parenthesis", correct: true },
        { text: "curly brackets", correct: false },
        { text: "quotation marks", correct: false },
        { text: "square brackets", correct: false },
      ],
    }
];

var secondsLeft = 80;
// Set Timer function
function setTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = `Time: ${secondsLeft}`;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

startQuizButton.addEventListener("click", function(event) {
    event.preventDefault();
    setTimer();
    renderQuestion();
});

function renderQuestion() {
    mainContentEl.innerHTML = "";

    if(currentQuestionIndex === questions.length) {
        renderEnd();
    }

    else {
    // Render question
    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[currentQuestionIndex].question;
    mainContentEl.append(questionEl);

    // Render list of answers
    var ul = document.createElement("ul");
    mainContentEl.append(ul);

    // Loops through question bank and generates a button element for each choice
    for(var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {

        var button = document.createElement("button");
        button.classList.add("button");
        if (questions[currentQuestionIndex].answers[i].correct) {
          button.setAttribute("correct", true);
        }
        button.textContent = `${i+1}. ${questions[currentQuestionIndex].answers[i].text}`;

        button.addEventListener("click", buttonClick);
  
        mainContentEl.appendChild(button);
    }

    currentQuestionIndex++;

    }
}

// Displays either right or wrong to the user based on their answer choice, could probably be improved bc of DRY
function buttonClick(event) {
    if(event.target.matches("button") && event.target.getAttribute("correct") === "true") {
        score += 100;
        var resultMessage = document.createElement("p");
        resultMessage.textContent = `Correct!`;
        resultEl.append(resultMessage);
        resultDisappear();
    }
    else {
        secondsLeft -= 10;
        var resultMessage = document.createElement("p");
        resultMessage.textContent = `Wrong!`;
        resultEl.append(resultMessage);
        resultDisappear();
    }

    renderQuestion();
}

// Timer function that makes question result message disappear after a set interval
function resultDisappear() {
    var timeUntilDisappear = 1;
    var timerInterval = setInterval(function() {
        timeUntilDisappear--;
        
        if(timeUntilDisappear === 0) {
          clearInterval(timerInterval);
          resultEl.innerHTML = "";
        }
      }, 1000);
}

// Renders display for end of quiz
function renderEnd() {
    mainContentEl.innerHTML = "<h2>All done!</h2>";
    mainContentEl.append(document.createElement("p").textContent = `Your final score is ${score}`);

    var formEl = document.createElement("form");
    formEl.textContent = "Enter initials: ";
        var inputEl = document.createElement("input");
        inputEl.setAttribute("id", "initial-input");
        formEl.append(inputEl);
        var button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Submit";
        button.setAttribute("id", "initial-submit");
        formEl.append(button);

    formEl.addEventListener("submit", renderHiscores);

    mainContentEl.append(formEl);

}

// Renders Highscore page
function renderHiscores(event) {
    event.preventDefault();
// still trying to decipher why this is needed 
    var storedHiscoresList = JSON.parse(localStorage.getItem("hiscores"));
    if(storedHiscoresList !== null) {
        hiscoresList = storedHiscoresList;
    }

    var userInitials = document.getElementById("initial-input").value;
    mainContentEl.innerHTML = "<h2>Highscores</h2>";
    var button = document.createElement("button");
    button.textContent = "Go back";
    button.setAttribute("id", "go-back");
    button.addEventListener("click", function (event) {
        if(event.target.getAttribute("id") === "go-back") {
            location.reload();
        }
    });
    mainContentEl.append(button);

console.log(userInitials, score);

    var user = {
        userInits: userInitials,
        userScore: score
    };

    hiscoresList.push(user);

    localStorage.setItem("hiscores", JSON.stringify(hiscoresList));

}
