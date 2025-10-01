// app.js
import { fetchNews } from "./modules/newsService.js";
import { renderNews, renderFact } from "./modules/ui.js";

// Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoiZnJhbmNpc255YW50YWt5aSIsImEiOiJjbWc2dHNwc3gwaXVxMmtwYjA0enM1N2N0In0.qjW9AztKdyKHzL-HycqEqA";

// Initialize map
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-74.5, 40],
    zoom: 3
});

// Handle search
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        // Fetch and render news
        const articles = await fetchNews(query);
        renderNews(articles);

        // Update location label
        const locationLabel = document.getElementById("locationLabel");
        if (locationLabel) locationLabel.textContent = `News for ${query}`;
    });
}

// Fact button
const factBtn = document.getElementById("factBtn");
if (factBtn) {
    factBtn.addEventListener("click", renderFact);
}
