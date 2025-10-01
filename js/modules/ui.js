/**
 * js/modules/ui.js
 * GeoSphere UI Module
 * Handles rendering and user interactions:
 * - Tabs (mobile)
 * - Sidebar (desktop favorites, filters, fun facts)
 * - News cards
 * - Map resizing
 */

import { addFavorite, removeFavorite, isFavorite, getFavorites } from './storage.js';
import { getFact } from './factsService.js';

// --- DOM Elements ---
const locationDisplay = document.getElementById('location-display');
const newsList = document.getElementById('news-list');
const factsSection = document.getElementById('facts-section');
const funFactDisplay = document.getElementById('fun-fact-display');
const factBtn = document.getElementById('fact-btn');

const favoritesList = document.getElementById('favorites-list');
const tabs = document.querySelectorAll('.tab-btn');

// --- Public Functions ---

/**
 * Update the current location display.
 */
export function updateLocationDisplay(city, region) {
    locationDisplay.textContent = `News for ${city}, ${region}`;
}

/**
 * Render news articles into cards.
 */
export function renderNews(articles) {
    newsList.innerHTML = '';

    if (!articles || articles.length === 0) {
        newsList.innerHTML = `<p class="text-gray-500">No news found for this location.</p>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
      <h3 class="font-semibold mb-2">${article.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${article.description || ''}</p>
      <a href="${article.url}" target="_blank" class="text-teal-600 font-medium">Read more</a>
    `;
        newsList.appendChild(card);
    });
}

/**
 * Render favorites in the sidebar.
 */
export function renderFavorites() {
    if (!favoritesList) return; // mobile might not have sidebar
    favoritesList.innerHTML = '';

    const favorites = getFavorites();
    if (favorites.length === 0) {
        favoritesList.innerHTML = `<p class="text-gray-500 text-sm">No favorites saved.</p>`;
        return;
    }

    favorites.forEach(fav => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center p-2 border-b';
        item.innerHTML = `
      <span>${fav.city}, ${fav.region}</span>
      <button class="text-red-500 text-sm remove-fav" data-lat="${fav.lat}" data-lng="${fav.lng}">✕</button>
    `;
        favoritesList.appendChild(item);
    });

    // Attach remove handlers
    favoritesList.querySelectorAll('.remove-fav').forEach(btn => {
        btn.addEventListener('click', e => {
            const lat = parseFloat(e.target.dataset.lat);
            const lng = parseFloat(e.target.dataset.lng);
            removeFavorite(lat, lng);
            renderFavorites();
        });
    });
}

/**
 * Setup tab functionality (mobile).
 */
export function initTabs() {
    if (!tabs) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');

            if (tab.dataset.tab === 'news') {
                newsList.style.display = 'block';
                factsSection.style.display = 'none';
            } else {
                newsList.style.display = 'none';
                factsSection.style.display = 'block';
            }
        });
    });
}

/**
 * Initialize fun fact generator.
 */
export function initFacts() {
    if (!factBtn) return;
    factBtn.addEventListener('click', async () => {
        funFactDisplay.textContent = "Loading...";
        const fact = await getFact();
        funFactDisplay.textContent = fact;
    });
}
