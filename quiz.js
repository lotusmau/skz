var members = ["Bang Chan", "Lee Know", "Changbin", "Hyunjin", "Han", "Felix", "Seungmin", "I.N"];
var pictures = [
    ["bang1.jpg", "bang2.jpg", "bang3.jpg"],
    ["leeknow.jpg", "leeknow2.jpg", "leeknow3.jpg"],
    ["changbin.jpg", "changbin2.jpg", "changbin3.jpg"],
    ["hyunjin.webp", "hyunjin2.webp", "hyunjin3.jpg"],
    ["Han.webp", "Han2.webp", "Han3.webp"],
    ["Felix.jpg", "Felix2.jpg", "Felix3.jpg"],
    ["Seungmin.jpg", "Seungmin2.jpg", "Seungmin3.jpg"],
    ["I.n.jpg", "I.n2.jpg", "I.n3.jpg"]
];
var answers = [];

// Indices we haven't guessed yet
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

    var memberPics = pictures[currentIndex];
    var randomPic = memberPics[Math.floor(Math.random() * memberPics.length)];
    document.getElementById("quiz-image").src = randomPic;
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "feedback";
    document.getElementById("quiz-image-container").style.display = "block";

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
        feedback.textContent = "Correct! That's " + members[currentIndex] + "!";
        feedback.className = "feedback correct";
    } else {
        feedback.textContent = "Nope! That was " + members[currentIndex] + ".";
        feedback.className = "feedback wrong";
    }

    // Remove from remaining
    var pos = remaining.indexOf(currentIndex);
    remaining.splice(pos, 1);

    updateScore();

    // Disable buttons briefly, then move on
    renderButtons(false);
    setTimeout(pickNext, 1500);
}

function updateScore() {
    var total = members.length - remaining.length;
    document.getElementById("score").textContent = score + " / " + total;
}

function showResults() {
    document.getElementById("quiz-image-container").style.display = "none";
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
