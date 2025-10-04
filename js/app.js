// js/app.js
import { initializeMap, updateMap, getCurrentPosition, geocodeSearch, reverseGeocode } from './modules/location.js';
import { fetchNews } from './modules/newsService.js';
import { fetchTriviaQuestion, getRandomFact } from './modules/factsService.js'; // Fixed import
import { addFavorite, removeFavorite, getFavorites, isFavorite } from './modules/storage.js';
import { renderNewsCards, renderTrivia, renderFavorites, setActiveTab } from './modules/ui.js';

// --- Initialize Map ---
const map = initializeMap();
let currentLocation = null;

// --- Load Favorites ---
let favorites = getFavorites();
renderFavorites(favorites);

// --- Search Form ---
const searchForm = document.getElementById('searchForm'); // Fixed ID
const searchInput = document.getElementById('searchInput'); // Fixed ID

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
document.getElementById('tabNews').addEventListener('click', () => setActiveTab('news')); // Fixed ID
document.getElementById('tabFacts').addEventListener('click', () => setActiveTab('trivia')); // Fixed ID

// --- Trivia Button ---
document.getElementById('factBtn').addEventListener('click', async () => { // Fixed ID
    if (!currentLocation) return alert('Select a location first.');
    await loadTrivia(currentLocation.city);
});

// --- Functions ---
async function loadNews(city) {
    const articles = await fetchNews(city, 'general');
    renderNewsCards(articles);
}

async function loadTrivia(city) {
    const triviaData = await fetchTriviaQuestion(city); // Fixed function name
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