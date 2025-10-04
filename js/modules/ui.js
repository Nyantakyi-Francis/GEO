// js/modules/ui.js

// --- Render News Cards ---
export function renderNewsCards(articles) {
    const container = document.getElementById('news');
    if (!container) return;

    container.innerHTML = '';

    if (!articles || articles.length === 0) {
        container.innerHTML = '<p class="text-gray-500 p-4">No news available for this location.</p>';
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'p-4 mb-4 bg-white rounded shadow';
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
    const container = document.getElementById('fact');
    if (!container) return;

    if (!triviaData) {
        container.innerHTML = '<p class="text-gray-500">No trivia available.</p>';
        return;
    }

    container.innerHTML = `
        <p class="mb-4 p-4 bg-white rounded shadow">${triviaData.answer}</p>
    `;
}

// --- Render Favorites ---
export function renderFavorites(favorites) {
    // Favorites functionality disabled for simplicity
    console.log('Favorites loaded:', favorites.length);
}

// --- Set Active Tab ---
export function setActiveTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-teal-600', 'text-teal-600');
        btn.classList.add('text-gray-500');
    });

    const activeBtn = document.getElementById(tabName === 'news' ? 'tabNews' : 'tabFacts');
    if (activeBtn) {
        activeBtn.classList.add('border-teal-600', 'text-teal-600');
        activeBtn.classList.remove('text-gray-500');
    }

    // Show/hide sections
    const newsSection = document.getElementById('newsSection');
    const factsSection = document.getElementById('factsSection');

    if (newsSection) newsSection.classList.toggle('hidden', tabName !== 'news');
    if (factsSection) factsSection.classList.toggle('hidden', tabName !== 'trivia');
}