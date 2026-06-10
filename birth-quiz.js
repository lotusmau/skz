var members = ["Bang Chan", "Lee Know", "Changbin", "Hyunjin", "Han", "Felix", "Seungmin", "I.N"];
var ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
// index matches members array — Bang Chan is oldest (1st), I.N is youngest (8th)

var answers = [];
var remaining = [];
var currentIndex = -1;
var score = 0;

function initQuiz() {
    remaining = [];
    for (var i = 0; i < members.length; i++) {
        remaining.push(i);
    }
    answers = [];
    score = 0;
    document.getElementById("results").innerHTML = "";
    updateScore();
    pickNext();
}

function pickNext() {
    if (remaining.length === 0) {
        showResults();
        return;
    }

    var randomPos = Math.floor(Math.random() * remaining.length);
    currentIndex = remaining[randomPos];

    document.getElementById("quiz-clue").innerHTML =
        "Who is the <strong>" + ordinals[currentIndex] + " oldest</strong> member?";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "feedback";
    document.getElementById("quiz-clue-container").style.display = "flex";

    renderButtons(true);
}

function renderButtons(enabled) {
    var container = document.getElementById("buttons");
    container.innerHTML = "";

    for (var i = 0; i < members.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = members[i];
        btn.className = "guess-btn";
        btn.setAttribute("data-index", i);
        if (enabled) {
            btn.addEventListener("click", handleGuess);
        } else {
            btn.disabled = true;
        }
        container.appendChild(btn);
    }
}

function handleGuess(e) {
    var guessedIndex = parseInt(e.target.getAttribute("data-index"));
    var correct = guessedIndex === currentIndex;
    var feedback = document.getElementById("feedback");

    answers.push({
        member: members[currentIndex],
        guessed: members[guessedIndex],
        correct: correct
    });

    if (correct) {
        score++;
        feedback.textContent = "Correct! " + members[currentIndex] + " is the " + ordinals[currentIndex] + " oldest!";
        feedback.className = "feedback correct";
    } else {
        feedback.textContent = "Nope! The " + ordinals[currentIndex] + " oldest is " + members[currentIndex] + ".";
        feedback.className = "feedback wrong";
    }

    var pos = remaining.indexOf(currentIndex);
    remaining.splice(pos, 1);

    updateScore();
    renderButtons(false);
    setTimeout(pickNext, 1500);
}

function updateScore() {
    var total = members.length - remaining.length;
    document.getElementById("score").textContent = score + " / " + total;
}

function showResults() {
    document.getElementById("quiz-clue-container").style.display = "none";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("feedback").textContent = "";

    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Results: " + score + " / " + members.length + "</h2>";

    var list = document.createElement("ul");
    list.className = "results-list";
    for (var i = 0; i < answers.length; i++) {
        var li = document.createElement("li");
        if (answers[i].correct) {
            li.innerHTML = "<b>" + answers[i].member + "</b> &mdash; Correct!";
            li.className = "result-correct";
        } else {
            li.innerHTML = "<b>" + answers[i].member + "</b> &mdash; You guessed " + answers[i].guessed;
            li.className = "result-wrong";
        }
        list.appendChild(li);
    }
    resultsDiv.appendChild(list);

    var btn = document.createElement("button");
    btn.textContent = "Play Again";
    btn.className = "guess-btn play-again";
    btn.addEventListener("click", function () {
        resultsDiv.innerHTML = "";
        initQuiz();
    });
    resultsDiv.appendChild(btn);
}

document.addEventListener("DOMContentLoaded", initQuiz);
