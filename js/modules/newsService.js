// newsService.js
// Fetches local news from NewsAPI

const API_KEY = "021a259c609f41058f289c751a4052fe";
const BASE_URL = "https://newsapi.org/v2/everything";

// query = keyword or city
export async function fetchNews(query) {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "ok") {
            throw new Error(data.message || "Failed to fetch news");
        }

        return data.articles || [];
    } catch (err) {
        console.error("News fetch error:", err);
        return [];
    }
}
