// modules/location.js

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZnJhbmNpc255YW50YWt5aSIsImEiOiJjbWc2dHNwc3gwaXVxMmtwYjA0enM1N2N0In0.qjW9AztKdyKHzL-HycqEqA'; // You need to get this from mapbox.com

// Initialize Mapbox map
export function initializeMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128], // New York
        zoom: 10
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    return map;
}

// Update map center
export function updateMap(map, lat, lng) {
    map.flyTo({
        center: [lng, lat],
        zoom: 10,
        essential: true
    });

    // Add or update marker
    if (window.currentMarker) {
        window.currentMarker.remove();
    }

    window.currentMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
}

// Get user's current position
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        });
    });
}

// Geocode search query to coordinates
export async function geocodeSearch(query) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&limit=1`
        );

        const data = await response.json();

        if (!data.features || data.features.length === 0) {
            return null;
        }

        const feature = data.features[0];
        const [lng, lat] = feature.center;
        const city = feature.place_name || query;

        return {
            city: formatLocationName(city),
            region: feature.context?.find(c => c.id.includes('region'))?.text || '',
            lat: lat,
            lng: lng
        };
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Reverse geocode coordinates to place name
export async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&limit=1`
        );

        const data = await response.json();

        if (!data.features || data.features.length === 0) {
            return 'Unknown Location';
        }

        return formatLocationName(data.features[0].place_name);
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return 'Unknown Location';
    }
}

// Format location name (your existing function)
export function formatLocationName(placeName) {
    if (!placeName) return "Unknown Location";
    return placeName;
}