// js/modules/storage.js

const STORAGE_KEY = 'gs-favorites';

// Get favorites
export function getFavorites() {
    try {
        const favoritesJson = localStorage.getItem(STORAGE_KEY);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (e) {
        console.error("Error reading favorites:", e);
        return [];
    }
}

// Save favorites internally
function _saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error("Error saving favorites:", e);
    }
}

// Add a favorite
export function addFavorite(location) {
    const favorites = getFavorites();
    const exists = favorites.some(fav => fav.lat === location.lat && fav.lng === location.lng);
    if (!exists) {
        favorites.push({
            city: location.city,
            region: location.region,
            lat: location.lat,
            lng: location.lng
        });
        _saveFavorites(favorites);
    }
    return favorites;
}

// Remove a favorite
export function removeFavorite(lat, lng) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.lat !== lat || fav.lng !== lng);
    _saveFavorites(favorites);
    return favorites;
}

// Check if favorite
export function isFavorite(lat, lng) {
    return getFavorites().some(fav => fav.lat === lat && fav.lng === lng);
}
