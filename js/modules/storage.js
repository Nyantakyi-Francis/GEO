/**
 * js/modules/storage.js
 * GeoSphere Storage Service Module
 * Responsibility: Manage persistence of user's favorite locations.
 */

const STORAGE_KEY = 'gs-favorites';

/**
 * Get favorites list from localStorage.
 * @returns {Array} favorites
 */
export function getFavorites() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading favorites:", err);
        return [];
    }
}

/**
 * Save favorites list to localStorage.
 * @param {Array} favorites
 */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
        console.error("Error saving favorites:", err);
    }
}

/**
 * Add a favorite location (avoids duplicates).
 * @param {Object} location {city, region, lat, lng}
 */
export function addFavorite(location) {
    const favorites = getFavorites();
    const exists = favorites.some(
        fav => fav.lat === location.lat && fav.lng === location.lng
    );
    if (!exists) {
        favorites.push(location);
        saveFavorites(favorites);
    }
    return favorites;
}

/**
 * Remove a favorite by coordinates.
 * @param {number} lat
 * @param {number} lng
 */
export function removeFavorite(lat, lng) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.lat !== lat || fav.lng !== lng);
    saveFavorites(favorites);
    return favorites;
}

/**
 * Check if a location is already favorited.
 * @param {number} lat
 * @param {number} lng
 */
export function isFavorite(lat, lng) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.lat === lat && fav.lng === lng);
}
