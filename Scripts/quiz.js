// Quiz Game for Relationships

function startQuiz() {
    const quizData = getQuizData();
    let score = 0;

    quizData.forEach((quiz) => {
        const userAnswer = prompt(quiz.question);
        if (userAnswer.toLowerCase() === quiz.answer.toLowerCase()) {
            score++;
        }
    });

    displayResults(score, quizData.length);
}

function getQuizData() {
    return [
        // Beginner Questions
        { question: "What is your favorite type of date? (a) Movie (b) Dinner (c) Walk", answer: "a" },
        { question: "Do you believe in love at first sight? (a) Yes (b) No", answer: "a" },
        { question: "How often do you communicate with your partner? (a) Daily (b) Weekly (c) Rarely", answer: "a" },
        { question: "What's your favorite relationship activity? (a) Traveling (b) Game Night (c) Cooking together", answer: "a" },
        { question: "Do you like surprise dates? (a) Yes (b) No", answer: "a" },
        { question: "How do you feel about public displays of affection? (a) Love it (b) Dislike it", answer: "a" },
        { question: "What is your relationship goal? (a) Casual (b) Serious", answer: "a" },
        { question: "Do you believe in soulmates? (a) Yes (b) No", answer: "a" },
        
        // Intermediate Questions
        { question: "How do you resolve conflicts? (a) Talking it out (b) Avoiding (c) Getting angry", answer: "a" },
        { question: "What role does trust play in your relationships? (a) Very important (b) Somewhat important (c) Not important", answer: "a" },
        { question: "How do you feel about long-distance relationships? (a) I’m okay with them (b) I don’t prefer them", answer: "a" },
        { question: "What's your biggest relationship pet peeve? (a) Being ignored (b) Not being understood (c) Lack of affection", answer: "a" },
        { question: "How do you feel about your partner's friends? (a) Great (b) Neutral (c) Not great", answer: "a" },
        { question: "Do you believe in second chances? (a) Yes (b) No", answer: "a" },
        { question: "How often do you compromise in a relationship? (a) Always (b) Sometimes (c) Rarely", answer: "a" },
        { question: "What do you think about dating apps? (a) Good (b) Bad (c) Indifferent", answer: "a" },
        { question: "Do you like to plan dates or go with the flow? (a) Plan (b) Flow", answer: "a" },
        
        // Advanced Questions
        { question: "What's your view on commitment? (a) Very important (b) Somewhat important (c) Not important", answer: "a" },
        { question: "How do you ensure a healthy relationship? (a) Communication (b) Trust (c) Time apart", answer: "a" },
        { question: "What's the key ingredient for a successful relationship? (a) Love (b) Trust (c) Respect", answer: "a" },
        { question: "How do you handle your partner's flaws? (a) Accept them (b) Try to change them", answer: "a" },
        { question: "Do you believe in love evolving over time? (a) Yes (b) No", answer: "a" },
        { question: "How important is personal space in a relationship? (a) Very important (b) Somewhat important (c) Not important", answer: "a" },
        { question: "What's your opinion on therapy in relationships? (a) Good (b) Bad (c) Neutral", answer: "a" },
        { question: "How do you feel about marriage? (a) Important (b) Not important", answer: "a" },
        { question: "How do you celebrate relationship milestones? (a) Big celebrations (b) Small acknowledgments", answer: "a" },
    ];
}

function displayResults(score, total) {
    const percentage = (score / total) * 100;
    const difficulty = (total <= 8) ? 'Beginner' : (total <= 9) ? 'Intermediate' : 'Advanced';
    alert(`Your Score: ${score}/${total}\nPercentage: ${percentage.toFixed(2)}%\nDifficulty Level: ${difficulty}`);
    analyzeRelationshipStyle(score);
}

function analyzeRelationshipStyle(score) {
    let style;
    if (score >= 15) {
        style = "You are a Romantic! You thrive on affection and deep connections.";
    } else if (score >= 10) {
        style = "You are a Realist! You balance love and practicality.";
    } else {
        style = "You are a Free Spirit! You enjoy spontaneity in relationships.";
    }
    alert(style);
}

startQuiz();