let questions = [
    {question: "What is 2 + 2?", answer: 4, difficulty: 'beginner'},
    {question: "What is the capital of France?", answer: "Paris", difficulty: 'beginner'},
    {question: "What is the derivative of x^2?", answer: "2x", difficulty: 'intermediate'},
    {question: "What is the integral of 1/x?", answer: "ln|x| + C", difficulty: 'intermediate'},
    {question: "What is the square root of 144?", answer: 12, difficulty: 'advanced'},
    {question: "What is the Fibonacci sequence?", answer: "0, 1, 1, 2, 3, 5, 8...", difficulty: 'advanced'},
];

let score = 0;
let level;

function setLevel(difficulty) {
    level = difficulty;
}

function askQuestion(questionObj) {
    let userAnswer = prompt(questionObj.question);
    if (parseInt(userAnswer) === questionObj.answer || userAnswer === questionObj.answer) {
        score += 1;
        alert('Correct!');
    } else {
        alert('Wrong! The correct answer is ' + questionObj.answer);
    }
}

function displayFinalScore() {
    alert('Your final score is: ' + score + '\nLevel: ' + level);
}

function startQuiz(difficulty) {
    setLevel(difficulty);
    let filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    for (let question of filteredQuestions) {
        askQuestion(question);
    }
    displayFinalScore();
}

// Starting the quiz with the selected difficulty level (beginner, intermediate, advanced).
startQuiz('beginner');