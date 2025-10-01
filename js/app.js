// js/app.js
import { fetchNews } from "./modules/newsService.js";
import { initMap, getLocation } from "./modules/location.js";
import { getRandomFact } from "./modules/factsService.js";
import { renderNews, renderFact, setupTabs, setupFilters } from "./modules/ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize map
    initMap(-111.8910, 40.7608, 10);

    // Set location name
    const location = await getLocation();
    document.getElementById("location-display").textContent = `News for ${location}`;

    // Load news
    const articles = await fetchNews(location);
    renderNews(articles);

    // Setup tabs + filters + facts
    setupTabs();
    setupFilters(location);

    // Setup fact button (mobile + desktop)
    const factBtn = document.getElementById("fact-btn");
    const factBtnDesktop = document.getElementById("fact-btn-desktop");

    const showFact = () => renderFact(getRandomFact());

    factBtn?.addEventListener("click", showFact);
    factBtnDesktop?.addEventListener("click", showFact);
});
