// storage.js
// A small utility for working with localStorage

export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error("Error saving to storage:", err);
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (err) {
        console.error("Error reading from storage:", err);
        return defaultValue;
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Error removing from storage:", err);
    }
}
