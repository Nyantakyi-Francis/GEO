// modules/factsService.js
// A simple fun facts generator

const facts = [
    "The Earth is the only planet known to support life.",
    "Mount Everest is the tallest mountain above sea level.",
    "The Amazon rainforest produces about 20% of the world's oxygen.",
    "The Sahara is the largest hot desert on Earth.",
    "The Pacific Ocean is the largest ocean on Earth."
];

export function getRandomFact() {
    const index = Math.floor(Math.random() * facts.length);
    return facts[index];
}

// Alias to match what app.js expects
export function fetchTriviaQuestion(city) {
    return {
        question: `Fun fact about ${city || 'our planet'}:`,
        answer: getRandomFact(),
        type: 'fact'
    };
}

// Mock function for compatibility
export function checkAnswer(question, userAnswer) {
    return { correct: true, correctAnswer: "All facts are interesting!" };
}