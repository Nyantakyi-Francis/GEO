// js/ui.js

/**
 * Renders a list of news articles into the specified container.
 * @param {Array} articles - Array of news article objects.
 * @param {HTMLElement} container - DOM element where the news will be displayed.
 */
export function renderNewsCards(articles, container) {
    container.innerHTML = ''; // Clear previous content
    if (!articles || articles.length === 0) {
        container.innerHTML = '<p>No news articles available.</p>';
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card p-4 mb-4 rounded-lg shadow-md bg-white';
        card.innerHTML = `
            <img src="${article.imageUrl || 'https://via.placeholder.com/400x200'}" alt="News Image" class="w-full h-48 object-cover rounded-md mb-2">
            <h3 class="text-lg font-bold mb-1">${article.title}</h3>
            <p class="text-gray-600 mb-2">${article.description || ''}</p>
            <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read more</a>
        `;
        container.appendChild(card);
    });
}

/**
 * Renders a trivia question into the specified container.
 * @param {Object} trivia - Trivia question object.
 * @param {HTMLElement} container - DOM element where the trivia will be displayed.
 */
export function renderTrivia(trivia, container) {
    container.innerHTML = ''; // Clear previous content
    if (!trivia) {
        container.innerHTML = '<p>No trivia available at the moment.</p>';
        return;
    }

    const questionEl = document.createElement('h2');
    questionEl.textContent = trivia.question;
    questionEl.className = 'text-xl font-semibold mb-4';
    container.appendChild(questionEl);

    trivia.allAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.addEventListener('click', () => {
            const correct = answer === trivia.correctAnswer;
            btn.classList.add(correct ? 'correct' : 'incorrect');
            // Disable all buttons after selection
            Array.from(container.querySelectorAll('.answer-btn')).forEach(b => b.disabled = true);
        });
        container.appendChild(btn);
    });
}

/**
 * Renders a list of favorite locations.
 * @param {Array} favorites - Array of favorite location objects.
 * @param {HTMLElement} container - DOM element where favorites will be displayed.
 * @param {Function} onClickCallback - Function to call when a favorite is clicked.
 */
export function renderFavorites(favorites, container, onClickCallback) {
    container.innerHTML = '';
    if (!favorites || favorites.length === 0) {
        container.innerHTML = '<p>No favorites yet.</p>';
        return;
    }

    favorites.forEach(fav => {
        const btn = document.createElement('button');
        btn.className = 'block w-full text-left p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200';
        btn.textContent = `${fav.city}, ${fav.region}`;
        btn.addEventListener('click', () => onClickCallback(fav));
        container.appendChild(btn);
    });
}

/**
 * Updates the tab buttons’ active/inactive state.
 * @param {string} activeTab - 'news' or 'facts'.
 * @param {HTMLElement} newsBtn - News tab button element.
 * @param {HTMLElement} factsBtn - Facts tab button element.
 */
export function setActiveTab(activeTab, newsBtn, factsBtn) {
    if (activeTab === 'news') {
        newsBtn.classList.add('active-tab');
        factsBtn.classList.remove('active-tab');
    } else {
        newsBtn.classList.remove('active-tab');
        factsBtn.classList.add('active-tab');
    }
}
