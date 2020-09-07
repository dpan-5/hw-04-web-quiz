var timerEl = document.getElementById("timer");
var startQuizEl = document.getElementById("start-quiz");
var mainContentEl = document.getElementById("main-content");


var questions = [
    ["Commonly used data types DO NOT include:", "strings", "booleans", "alerts", "numbers"]
];

var secondsLeft = 10;
// Set Timer
function setTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = `Time: ${secondsLeft}`;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

startQuizEl.addEventListener("click", function(event) {
    event.preventDefault();
    setTimer();

    document.getElementById("main-content").innerHTML = "";
    for(var i = 0; i<questions.length; i++) {
        for(var j = 0; j<questions[i].length; i++) {
            var headerEl = document.createElement("h1");
            headerEl.textContent = questions[i][j];      
            mainContentEl.append(headerEl1);


        }

    }

})

