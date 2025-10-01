// js/modules/ui.js

/**
 * UI Module - Responsible for rendering news, trivia, favorites, and tab management
 */

// --- Render News Cards ---
export function renderNewsCards(articles) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    if (!articles || articles.length === 0) {
        container.textContent = 'No news available for this location.';
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card p-4 mb-4 bg-white rounded shadow';
        card.innerHTML = `
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="w-full h-48 object-cover mb-2 rounded"/>` : ''}
            <h3 class="text-lg font-bold mb-1">${article.title}</h3>
            <p class="text-gray-700 mb-2">${article.description || ''}</p>
            <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read more</a>
        `;
        container.appendChild(card);
    });
}

// --- Render Trivia / Fun Fact ---
export function renderTrivia(triviaData) {
    const container = document.getElementById('trivia-container');
    container.innerHTML = '';
    if (!triviaData) {
        container.textContent = 'No trivia available at the moment.';
        return;
    }

    const questionEl = document.createElement('h3');
    questionEl.textContent = triviaData.question;
    questionEl.className = 'font-semibold mb-2';

    container.appendChild(questionEl);

    triviaData.allAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn mb-2';
        btn.textContent = answer;
        btn.addEventListener('click', () => {
            const correct = answer === triviaData.correctAnswer;
            btn.classList.add(correct ? 'correct' : 'incorrect');
            // disable all buttons
            container.querySelectorAll('button').forEach(b => b.disabled = true);
        });
        container.appendChild(btn);
    });
}

// --- Render Favorites ---
export function renderFavorites(favorites) {
    const container = document.getElementById('favorites-container');
    container.innerHTML = '';
    if (!favorites || favorites.length === 0) {
        container.textContent = 'No favorites yet.';
        return;
    }

    favorites.forEach(fav => {
        const div = document.createElement('div');
        div.className = 'favorite-item cursor-pointer p-2 hover:bg-gray-100 rounded';
        div.textContent = `${fav.city}, ${fav.region}`;
        div.addEventListener('click', () => {
            const event = new CustomEvent('favoriteSelected', { detail: fav });
            document.dispatchEvent(event);
        });
        container.appendChild(div);
    });
}

// --- Set Active Tab ---
export function setActiveTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active-tab'));
    document.getElementById(`${tabName}-tab`).classList.add('active-tab');

    document.getElementById('news-view').style.display = tabName === 'news' ? 'block' : 'none';
    document.getElementById('trivia-view').style.display = tabName === 'trivia' ? 'block' : 'none';
}
