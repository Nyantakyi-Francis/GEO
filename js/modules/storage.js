/**
 * js/modules/storage.js
 * GeoSphere Storage Service Module
 * Responsibility: Manages data persistence, primarily for saving and retrieving the
 * user's favorite locations using localStorage (Function 7).
 */

// --- 1. Configuration ---

const STORAGE_KEY = 'gs-favorites'; // Key used in localStorage

// --- 2. Data Structure ---
// Favorites are stored as an array of objects:
// [{ city: 'Boise', region: 'Idaho', lat: 43.6166, lng: -116.2008 }, ...]

// --- 3. Public API Functions ---

/**
 * Retrieves the current list of favorite locations from localStorage.
 * @returns {Array<object>} The list of favorites, or an empty array if none are found.
 */
export function getFavorites() {
    try {
        const favoritesJson = localStorage.getItem(STORAGE_KEY);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (e) {
        console.error("Error reading favorites from localStorage:", e);
        // Reset corrupted storage for safety
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
}

/**
 * Saves the current list of favorite locations to localStorage.
 * @param {Array<object>} favorites - The complete list of favorites to save.
 */
function _saveFavorites(favorites) {
    try {
        const favoritesJson = JSON.stringify(favorites);
        localStorage.setItem(STORAGE_KEY, favoritesJson);
    } catch (e) {
        console.error("Error writing favorites to localStorage:", e);
    }
}

/**
 * Adds a new location to the list of favorites (Function 7).
 * It prevents adding duplicates.
 * @param {{city: string, region: string, lat: number, lng: number}} location - The location object to add.
 * @returns {Array<object>} The new list of favorites.
 */
export function addFavorite(location) {
    const favorites = getFavorites();

    // Check for duplicates based on coordinates (more reliable than city name)
    const isDuplicate = favorites.some(fav =>
        fav.lat === location.lat && fav.lng === location.lng
    );

    if (!isDuplicate) {
        const newLocation = {
            city: location.city,
            region: location.region,
            lat: location.lat,
            lng: location.lng
        };
        favorites.push(newLocation);
        _saveFavorites(favorites);
    }

    return favorites;
}

/**
 * Removes a location from the favorites list based on its coordinates (Function 7).
 * @param {number} lat - Latitude of the location to remove.
 * @param {number} lng - Longitude of the location to remove.
 * @returns {Array<object>} The new list of favorites.
 */
export function removeFavorite(lat, lng) {
    let favorites = getFavorites();

    favorites = favorites.filter(fav =>
        fav.lat !== lat || fav.lng !== lng
    );

    _saveFavorites(favorites);
    return favorites;
}

/**
 * Checks if a given location (by coordinates) is currently in the favorites list.
 * @param {number} lat - Latitude of the location to check.
 * @param {number} lng - Longitude of the location to check.
 * @returns {boolean} True if the location is favorited, false otherwise.
 */
export function isFavorite(lat, lng) {
    const favorites = getFavorites();
    return favorites.some(fav =>
        fav.lat === lat && fav.lng === lng
    );
}

/**
 * Clears all favorites from localStorage.
 * @returns {Array<object>} An empty array.
 */
export function clearFavorites() {
    _saveFavorites([]);
    return [];
}
