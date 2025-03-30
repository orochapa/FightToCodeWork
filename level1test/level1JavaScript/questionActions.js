const attackButton = document.getElementById('attackButton');
const blockButton = document.getElementById('blockButton');
const modal = document.getElementById('questionModal');
const questionText = document.getElementById('questionText');
const optionButtons = document.querySelectorAll('.option-button');
const feedbackEl = document.getElementById('feedback');

let currentAction = '';
let currentQuestion = null;
let optionsMapping = {};
let isDefending = false;
let enemyReadyToStrike = false;

attackButton.addEventListener('click', () => displayQuestion('attack'));
blockButton.addEventListener('click', () => displayQuestion('block'));

function displayQuestion(action) {
    currentAction = action;
    const questions = getQuestions();
    currentQuestion = questions.easy[Math.floor(Math.random() * questions.easy.length)];

    questionText.textContent = currentQuestion.questionText;
    const options = currentQuestion.options;
    optionsMapping = {};

    for (let i = 0; i < options.length; i++) {
        const letter = String.fromCharCode(65 + i);
        optionsMapping[letter] = options[i];
        document.getElementById(`option${letter}`).textContent = `${letter}: ${options[i]}`;
    }

    optionButtons.forEach(button => {
        button.removeAttribute('data-selected');
        button.removeAttribute('data-correct');
        button.removeAttribute('data-incorrect');
    });

    feedbackEl.className = 'feedback';
    feedbackEl.textContent = '';
    feedbackEl.style.display = 'none';

    modal.style.display = 'flex';

    optionButtons.forEach(button => {
        button.onclick = function () {
            handleOptionSelection(this.getAttribute('data-option'));
        };
    });
}

function handleOptionSelection(selectedOption) {
    const selectedAnswer = optionsMapping[selectedOption];
    const correctAnswer = currentQuestion.correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    optionButtons.forEach(button => {
        button.removeAttribute('data-selected');
        button.removeAttribute('data-correct');
        button.removeAttribute('data-incorrect');
    });

    const selectedButton = document.querySelector(`.option-button[data-option="${selectedOption}"]`);
    selectedButton.setAttribute('data-selected', 'true');

    const correctOption = Object.keys(optionsMapping).find(key => optionsMapping[key] === correctAnswer);
    const correctButton = document.querySelector(`.option-button[data-option="${correctOption}"]`);

    if (isCorrect) {
        selectedButton.setAttribute('data-correct', 'true');
        if (isDefending) {
            feedbackEl.textContent = "You blocked the attack! Minimal damage taken.";
            playerHealth -= 5;
        } else {
            feedbackEl.textContent = `Correct! Performing ${currentAction}.`;
            performAction(currentAction);
            enemyReadyToStrike = true;
        }
    } else {
        selectedButton.setAttribute('data-incorrect', 'true');
        correctButton.setAttribute('data-correct', 'true');
        if (isDefending) {
            feedbackEl.textContent = "You failed to block the attack! Major damage taken.";
            playerHealth -= 25;
        } else {
            feedbackEl.textContent = 'Incorrect! Your move failed.';
            enemyReadyToStrike = true;
        }
    }

    feedbackEl.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    feedbackEl.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
        isDefending = false;
        updateHealthBars();
        checkWinCondition();

        if (enemyReadyToStrike) {
            enemyReadyToStrike = false;
            showIncomingEnemyStrike();
        }
    }, 1500);
}

function showIncomingEnemyStrike() {
    const message = document.createElement('div');
    message.className = 'overlay';

    const box = document.createElement('div');
    box.className = 'message-box';

    const h2 = document.createElement('h2');
    h2.textContent = 'The enemy is preparing to strike! You must block it!';
    box.appendChild(h2);

    message.appendChild(box);
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.removeChild(message);
        isDefending = true;
        displayQuestion('defense');
    }, 2500);
}

function performAction(action) {
    console.log(`Performing ${action} action`);

    if (action === 'attack') {
        enemyHealth -= 25;
    } else if (action === 'block') {
        playerHealth += 5;
    }

    updateHealthBars();
    checkWinCondition();
}

function getQuestions() {
    return {
        easy: [
            { questionText: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
            { questionText: "What is the main purpose of HTML?", options: ["To style web pages", "To structure web pages", "To add interactivity", "To store data"], correctAnswer: "To structure web pages" },
            { questionText: "Which is a programming language?", options: ["Python", "Photoshop", "Excel", "PowerPoint"], correctAnswer: "Python" }
        ]
    };
}

document.addEventListener('keydown', (event) => {
    if (modal.style.display === 'flex') {
        const key = event.key.toUpperCase();
        if (["A", "B", "C", "D"].includes(key)) {
            handleOptionSelection(key);
        }
    }
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
