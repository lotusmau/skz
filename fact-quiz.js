var members = ["Bang Chan", "Lee Know", "Changbin", "Hyunjin", "Han", "Felix", "Seungmin", "I.N"];
var facts = [
    [
        "This member trained for 7 years before he was an idol",
        "This member is the leader of Stray Kids 👑",
        "This member produces music under the name 3RACHA 🎵"
    ],
    [
        "This member was a backup dancer for BTS before joining Stray Kids 💃",
        "This member has a pet cat named Soonie 🐱",
        "This member is known for his sharp and precise dance moves 🩰"
    ],
    [
        "This member is known for his incredibly fast rap 🔥",
        "This member's nickname comes from a cute pig character 🐷",
        "This member is known for working out"
    ],
    [
        "This member is known as the visual of the group ✨",
        "This member is a talented painter and visual artist 🎨",
        "This member starred in the K-drama Salut d'Amour 🎬"
    ],
    [
        "This member was born in Seoul but grew up in Malaysia 🇲🇾",
        "This member is born on September 14",
        "This member is known for his emotional songwriting 🖊️"
    ],
    [
        "This member is from Sydney, Australia 🇦🇺",
        "This member is known for his deep voice despite his bright personality 🌞",
        "This member has a lot of freckles that fans love 🍪"
    ],
    [
        "This member is a huge baseball fan ⚾",
        "This member is the main vocalist of the group 🎙️",
        "This member often covers other artists' songs on social media 🎧"
    ],
    [
        "This member is the youngest (maknae) of the group 🌟",
        "This member trained for the shortest time before debuting 🦊",
        "This member's real name is Yang Jeong-in 📝"
    ]
];

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

    var memberFacts = facts[currentIndex];
    var randomFact = memberFacts[Math.floor(Math.random() * memberFacts.length)];
    document.getElementById("quiz-clue").textContent = randomFact;
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
        feedback.textContent = "Correct! That's " + members[currentIndex] + "!";
        feedback.className = "feedback correct";
    } else {
        feedback.textContent = "Nope! That was " + members[currentIndex] + ".";
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
