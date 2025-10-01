// js/modules/newsService.js

/**
 * GeoSphere News Service Module - Currents API Integration
 * Responsibility: Fetches news based on location and selected category/filter.
 */

// --- 1. Configuration ---

const NEWS_API_KEY = '9x60m4b9BcZ8ewxukcx_0cmOPLBbRrkCFiFV31Wi7kYK70oK';
const NEWS_BASE_URL = 'https://api.currentsapi.services/v1/search';

// Map of user-friendly filters to Currents API keywords
const FILTER_MAP = {
    general: '',       // general location search
    tech: 'technology',
    sports: 'sports',
    business: 'business',
    health: 'health'
};

// --- 2. Public API Function ---

/**
 * Fetches news articles for a given city and filter.
 * @param {string} city - Current city or location name.
 * @param {string} filter - Category filter ('tech', 'sports', etc.).
 * @returns {Promise<Array<object>>} Array of news articles.
 */
export async function fetchNews(city, filter) {
    if (!city) return [];

    const categoryKeyword = FILTER_MAP[filter] ? ` ${FILTER_MAP[filter]}` : '';
    const query = `${city}${categoryKeyword}`;

    try {
        const response = await fetch(`${NEWS_BASE_URL}?keywords=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': NEWS_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`News API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.news || data.news.length === 0) return [];

        // Map Currents API response to our app's format
        return data.news.map(article => ({
            source: article.author || article.source || 'Unknown',
            author: article.author || 'Unknown',
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.image || 'https://via.placeholder.com/400x200'
        }));

    } catch (error) {
        console.error('News fetch error:', error);
        return [];
    }
    
}
