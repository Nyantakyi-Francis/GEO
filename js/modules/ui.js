// ui.js
import { getFact } from "./factsService.js";

// Render news cards
export function renderNews(articles) {
    const container = document.getElementById("news");
    if (!container) return;

    container.innerHTML = "";

    if (!articles.length) {
        container.innerHTML = `<p class="text-gray-500">No news found.</p>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "p-4 border rounded-lg mb-4 shadow bg-white";
        card.innerHTML = `
      <h3 class="font-bold mb-2">${article.title}</h3>
      <p class="text-sm mb-2">${article.description || ""}</p>
      <a href="${article.url}" target="_blank" class="text-blue-600 underline">Read more</a>
    `;
        container.appendChild(card);
    });
}

// Render a random fact
export function renderFact() {
    const factEl = document.getElementById("fact");
    if (factEl) {
        factEl.textContent = getFact();
    }
}
