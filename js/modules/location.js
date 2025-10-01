// js/modules/location.js
const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZnJhbmNpc255YW50YW50YWt5aSIsImEiOiJjbWc2dHNwc3gwaXVxMmtwYjA0enM1N2N0In0.qjW9AztKdyKHzL-HycqEqA";

/**
 * Initializes the map and returns the instance
 */
export function initMap(lng = -74.5, lat = 40, zoom = 9) {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return map;
}

/**
 * Example: return default location
 */
export async function getLocation() {
    return "Salt Lake City, UT";
}
