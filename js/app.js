// js/ui.js

// --- DOM References ---
const newsContainer = document.getElementById('news-container');
const triviaContainer = document.getElementById('trivia-container');
const favoritesContainer = document.getElementById('favorites-container');
const tabButtons = document.querySelectorAll('.tab-btn');

// --- 1. Render News Cards ---
export function renderNewsCards(articles) {
    newsContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p class="text-center text-gray-500 mt-4">No news available.</p>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card p-4 mb-4 rounded-lg bg-white shadow cursor-pointer';
        card.innerHTML = `
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-2">` : ''}
            <h3 class="font-semibold text-lg mb-1">${article.title}</h3>
            <p class="text-gray-600 mb-2">${article.description || ''}</p>
            <p class="text-sm text-gray-400 mb-2">Source: ${article.source} | Author: ${article.author}</p>
            <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read More</a>
        `;
        newsContainer.appendChild(card);
    });
}

// --- 2. Render Trivia ---
export function renderTrivia(trivia) {
    triviaContainer.innerHTML = '';

    if (!trivia) {
        triviaContainer.innerHTML = `<p class="text-center text-gray-500 mt-4">No trivia available.</p>`;
        return;
    }

    const questionEl = document.createElement('div');
    questionEl.className = 'mb-4';
    questionEl.innerHTML = `<h3 class="font-semibold text-lg mb-2">${trivia.question}</h3>`;

    triviaContainer.appendChild(questionEl);

    trivia.allAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;

        btn.addEventListener('click', () => {
            const buttons = triviaContainer.querySelectorAll('.answer-btn');
            buttons.forEach(b => b.disabled = true);

            if (answer === trivia.correctAnswer) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
                // Highlight the correct answer
                const correctBtn = Array.from(buttons).find(b => b.textContent === trivia.correctAnswer);
                if (correctBtn) correctBtn.classList.add('correct');
            }
        });

        triviaContainer.appendChild(btn);
    });
}

// --- 3. Render Favorites ---
export function renderFavorites(favorites) {
    favoritesContainer.innerHTML = '';

    if (!favorites || favorites.length === 0) {
        favoritesContainer.innerHTML = `<p class="text-gray-500">No favorites yet.</p>`;
        return;
    }

    favorites.forEach(fav => {
        const favEl = document.createElement('div');
        favEl.className = 'p-2 mb-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200';
        favEl.textContent = `${fav.city}, ${fav.region}`;
        favoritesContainer.appendChild(favEl);

        favEl.addEventListener('click', () => {
            const event = new CustomEvent('favoriteSelected', { detail: fav });
            document.dispatchEvent(event);
        });
    });
}

// --- 4. Set Active Tab ---
export function setActiveTab(tab) {
    tabButtons.forEach(btn => {
        if (btn.dataset.tab === tab) {
            btn.classList.add('active-tab');
        } else {
            btn.classList.remove('active-tab');
        }
    });

    if (tab === 'news') {
        newsContainer.style.display = 'block';
        triviaContainer.style.display = 'none';
    } else {
        newsContainer.style.display = 'none';
        triviaContainer.style.display = 'block';
    }
}
