/**
 * js/modules/locationService.js
 * GeoSphere Location Service Module
 * Responsibility: Get user's location and reverse geocode to a human-readable address.
 */

const MAPBOX_TOKEN = "pk.eyJ1IjoiZnJhbmNpc255YW50YWt5a2l...qjW9AztKdyKHzL-HycqEqA"; // your pk token

/**
 * Get user's current geolocation.
 * @returns {Promise<{lat:number, lon:number}>}
 */
export function getUserCoordinates() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation not supported by your browser.");
        } else {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    resolve({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                },
                err => reject("Unable to retrieve your location: " + err.message)
            );
        }
    });
}

/**
 * Reverse geocode coordinates to city + country.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<string>}
 */
export async function reverseGeocode(lat, lon) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${MAPBOX_TOKEN}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch location info.");

        const data = await res.json();
        const place = data.features.find(f => f.place_type.includes("place"));
        const country = data.features.find(f => f.place_type.includes("country"));

        return place && country
            ? `${place.text}, ${country.text}`
            : "Unknown location";
    } catch (error) {
        console.error("Reverse geocode error:", error);
        return "Unknown location";
    }
}
