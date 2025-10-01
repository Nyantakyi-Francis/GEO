// js/modules/newsService.js
const NEWS_API_KEY = "021a259c609f41058f289c751a4052fe";
const BASE_URL = "https://newsapi.org/v2/everything";

/**
 * Fetches news articles for a given query/location
 */
export async function fetchNews(query, sortBy = "popularity") {
    try {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7); // past 7 days

        const url = `${BASE_URL}?q=${encodeURIComponent(query)}&from=${fromDate
            .toISOString()
            .split("T")[0]}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`News API error: ${res.status}`);

        const data = await res.json();
        if (data.status !== "ok") throw new Error("Invalid News API response");

        return data.articles.map(article => ({
            title: article.title,
            author: article.author,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            source: article.source?.name || "Unknown",
            publishedAt: article.publishedAt,
        }));
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}
