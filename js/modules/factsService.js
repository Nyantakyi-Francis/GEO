// js/modules/factsService.js

/**
 * GeoSphere Facts Service Module
 * Responsibility: Fetches trivia questions using the Open Trivia Database API.
 * Provides utilities for question formatting and answer validation.
 * Replaces deprecated Randommer.io / Numbers API.
 */

// --- 1. Configuration ---

const TRIVIA_API_BASE_URL = 'https://opentdb.com/api.php?';

// --- 2. Utility Functions ---

/**
 * Decodes HTML entities commonly found in API responses.
 * @param {string} text - The text string potentially containing HTML entities.
 * @returns {string} The decoded text string.
 */
function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

/**
 * Fetches data with exponential backoff for resilience against network errors.
 * @param {string} url - The URL to fetch.
 * @param {number} maxRetries - Maximum number of retries.
 * @returns {Promise<any>} Parsed JSON data.
 */
async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`[FactsService] Attempt ${attempt + 1} failed: ${error.message}`);
            if (attempt === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
    }
}

// --- 3. Main Trivia Functions ---

/**
 * Fetches a single trivia question from the API, prioritizing Geography or History categories.
 * @param {string} city - Current city (for context in UI, not direct API query).
 * @returns {Promise<object|null>} A formatted trivia question object or null on failure.
 */
export async function fetchTriviaQuestion(city) {
    console.log(`[FactsService] Fetching trivia question for: ${city}`);

    const categories = [22, 23]; // Geography (22) or History (23)
    const category = categories[Math.floor(Math.random() * categories.length)];

    const params = new URLSearchParams({
        amount: 1,
        type: 'multiple',
        category: category,
        encode: 'url3986'
    });

    const url = TRIVIA_API_BASE_URL + params.toString();

    try {
        const data = await fetchWithRetry(url);

        if (data.response_code !== 0 || !data.results?.length) {
            console.warn('[FactsService] Trivia API returned no questions.', data);
            return null;
        }

        const raw = data.results[0];

        // Decode question/answers
        const correct = decodeHTMLEntities(raw.correct_answer);
        const incorrect = raw.incorrect_answers.map(decodeHTMLEntities);
        const question = decodeHTMLEntities(raw.question);

        // Shuffle all answers (new array, not in-place)
        const allAnswers = [...incorrect, correct]
            .sort(() => Math.random() - 0.5);

        return {
            title: `Trivia from ${city}`,
            category: decodeHTMLEntities(raw.category),
            question: question,
            correctAnswer: correct,
            allAnswers: allAnswers
        };

    } catch (error) {
        console.error('[FactsService] Failed to fetch trivia:', error);
        return null;
    }
}

/**
 * Validates the user's selected answer.
 * @param {string} userAnswer - Answer selected by the user.
 * @param {string} correctAnswer - Correct answer from the API.
 * @returns {boolean} True if answers match, false otherwise.
 */
export function checkAnswer(userAnswer, correctAnswer) {
    return decodeHTMLEntities(userAnswer) === decodeHTMLEntities(correctAnswer);
}
