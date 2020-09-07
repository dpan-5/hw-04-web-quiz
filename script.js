var timerEl = document.getElementById("timer");
var startQuizButton = document.getElementById("start-quiz");
var mainContentEl = document.getElementById("main-content");

var currentQuestionIndex = 0;
var score = 0;

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
        { text: "()", correct: true },
        { text: "%%", correct: false },
        { text: "<>", correct: false },
        { text: "{}", correct: false },
      ],
    }
];

var secondsLeft = 10;
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

    // Render question
    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[currentQuestionIndex].question;
    mainContentEl.append(questionEl);

    // Render list of answers
    var ul = document.createElement("ul");
    mainContentEl.append(ul);

    // Loops through question bank
    for(var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {

        var button = document.createElement("button");
        button.classList.add("button");
        if (questions[currentQuestionIndex].answers[i].correct) {
          button.setAttribute("correct", true);
        }
        button.textContent = questions[currentQuestionIndex].answers[i].text;

        button.addEventListener("click", buttonClick);
  
        mainContentEl.appendChild(button);

    }

    currentQuestionIndex++;
}

function buttonClick(event) {
    if(event.target.matches("button") && event.target.getAttribute("correct") === "true") {
        score += 100;
    }
    renderQuestion();
}
