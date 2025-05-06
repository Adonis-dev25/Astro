const quizData = [
    {
        question: "How do you typically handle conflicts in relationships?",
        options: [
            "I prefer to address issues immediately and directly",
            "I need time to process before discussing",
            "I tend to avoid confrontation",
            "I try to find compromise right away"
        ]
    },
    {
        question: "What's your primary way of showing affection?",
        options: [
            "Verbal expressions of love",
            "Physical touch and closeness",
            "Acts of service and help",
            "Giving gifts and surprises"
        ]
    },
    {
        question: "How do you prefer to receive emotional support?",
        options: [
            "Through deep conversations",
            "Through physical presence",
            "Through practical help",
            "Through encouraging messages"
        ]
    },
    {
        question: "What's your approach to maintaining boundaries?",
        options: [
            "I clearly communicate my needs",
            "I adjust based on the situation",
            "I struggle to set boundaries",
            "I maintain strict boundaries"
        ]
    },
    {
        question: "How do you handle trust issues?",
        options: [
            "Open communication about concerns",
            "Taking time to build trust gradually",
            "Requiring proof of trustworthiness",
            "Giving trust until proven otherwise"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-quiz');
    const retryButton = document.getElementById('retry-quiz');
    
    startButton.addEventListener('click', startQuiz);
    retryButton.addEventListener('click', resetQuiz);
});

function startQuiz() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-container').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const questionData = quizData[currentQuestion];
    const progressPercent = (currentQuestion / quizData.length) * 100;
    
    document.getElementById('progress-bar').style.setProperty('--progress', `${progressPercent}%`);
    document.getElementById('question-text').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    
    document.querySelectorAll('.option-button').forEach(button => {
        button.classList.remove('selected');
    });
    
    document.querySelectorAll('.option-button')[index].classList.add('selected');
    
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    }, 500);
}

function showResults() {
    document.getElementById('question-container').classList.remove('active');
    document.getElementById('results-container').classList.add('active');
    
    const resultsContent = document.getElementById('results-content');
    const personalityTraits = analyzeAnswers();
    
    resultsContent.innerHTML = `
        <h3>Your Relationship Style</h3>
        <p>${personalityTraits.style}</p>
        <h3>Strengths</h3>
        <p>${personalityTraits.strengths}</p>
        <h3>Areas for Growth</h3>
        <p>${personalityTraits.growth}</p>
    `;
}

function analyzeAnswers() {
    // Simple analysis based on answer patterns
    const styles = {
        communicator: 0,
        nurturer: 0,
        independent: 0,
        harmonizer: 0
    };
    
    answers.forEach((answer, index) => {
        if (answer === 0) styles.communicator++;
        if (answer === 1) styles.nurturer++;
        if (answer === 2) styles.independent++;
        if (answer === 3) styles.harmonizer++;
    });
    
    const dominantStyle = Object.entries(styles)
        .sort((a, b) => b[1] - a[1])[0][0];
    
    const results = {
        communicator: {
            style: "You're a Direct Communicator",
            strengths: "You excel at expressing your needs and addressing issues head-on.",
            growth: "Consider being more patient with those who need processing time."
        },
        nurturer: {
            style: "You're an Emotional Nurturer",
            strengths: "You're highly attuned to emotional needs and provide great support.",
            growth: "Work on setting healthy boundaries and self-care practices."
        },
        independent: {
            style: "You're an Independent Partner",
            strengths: "You maintain a strong sense of self in relationships.",
            growth: "Practice being more vulnerable and interdependent when appropriate."
        },
        harmonizer: {
            style: "You're a Natural Harmonizer",
            strengths: "You excel at finding compromise and maintaining peace.",
            growth: "Work on expressing your own needs more directly."
        }
    };
    
    return results[dominantStyle];
}

function resetQuiz() {
    currentQuestion = 0;
    answers = [];
    document.getElementById('results-container').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
}
