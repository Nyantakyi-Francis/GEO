// js/app.js

import { initializeMap, updateMap, getCurrentPosition, geocodeSearch, reverseGeocode } from './modules/location.js';
import { fetchNews } from './modules/newsService.js';
import { fetchTriviaQuestion, checkAnswer } from './modules/factsService.js';
import { addFavorite, removeFavorite, getFavorites, isFavorite } from './modules/storage.js';
import { renderNewsCards, renderTrivia, renderFavorites, setActiveTab } from './modules/ui.js';

// --- Initialize Map ---
const map = initializeMap();
let currentLocation = null;

// --- Load Favorites ---
let favorites = getFavorites();
renderFavorites(favorites);

// --- Search Form ---
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const location = await geocodeSearch(query);
        if (!location) {
            alert('Location not found.');
            return;
        }
        currentLocation = location;
        updateMap(map, location.lat, location.lng);
        await loadNews(location.city);
        await loadTrivia(location.city);
    } catch (err) {
        console.error(err);
        alert('Failed to fetch location.');
    }
});

// --- Favorites Click ---
document.addEventListener('favoriteSelected', async e => {
    const fav = e.detail;
    currentLocation = fav;
    updateMap(map, fav.lat, fav.lng);
    await loadNews(fav.city);
    await loadTrivia(fav.city);
});

// --- Tabs ---
document.getElementById('news-tab').addEventListener('click', () => setActiveTab('news'));
document.getElementById('trivia-tab').addEventListener('click', () => setActiveTab('trivia'));

// --- Trivia Button ---
document.getElementById('trivia-btn').addEventListener('click', async () => {
    if (!currentLocation) return alert('Select a location first.');
    await loadTrivia(currentLocation.city);
});

// --- Functions ---
async function loadNews(city) {
    const articles = await fetchNews(city, 'general');
    renderNewsCards(articles);
}

async function loadTrivia(city) {
    const triviaData = await fetchTrivia(city);
    renderTrivia(triviaData);
}

// --- Initial Load: Get user position ---
(async () => {
    try {
        const pos = await getCurrentPosition();
        const { latitude, longitude } = pos.coords;
        currentLocation = { city: 'Current Location', region: '', lat: latitude, lng: longitude };
        updateMap(map, latitude, longitude);
        await loadNews(currentLocation.city);
        await loadTrivia(currentLocation.city);
    } catch (err) {
        console.warn('Geolocation failed, using default location.');
        currentLocation = { city: 'New York', region: 'NY', lat: 40.7128, lng: -74.0060 };
        updateMap(map, currentLocation.lat, currentLocation.lng);
        await loadNews(currentLocation.city);
        await loadTrivia(currentLocation.city);
    }
})();
