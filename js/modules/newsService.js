// js/modules/newsService.js

/**
 * GeoSphere News Service Module - WorldNewsAPI.com Integration
 */

const WORLD_NEWS_API_KEY = 'd9366004485645fa8780d40bda10f0db';
const WORLD_NEWS_BASE_URL = 'https://api.worldnewsapi.com/search-news';

const FILTER_MAP = {
    general: 'general',
    tech: 'technology',
    sports: 'sports',
    business: 'business',
    health: 'health'
};

// Fallback news data
const FALLBACK_NEWS = [
    {
        title: "Local Community Events Bring Residents Together",
        description: "Community gatherings and festivals celebrate local culture and traditions across the region.",
        url: "#",
        imageUrl: "https://picsum.photos/400/200?random=1",
        author: "Local News",
        source: "Community Herald"
    },
    {
        title: "Urban Development Projects Enhance City Living",
        description: "New green spaces and infrastructure improvements planned for metropolitan areas.",
        url: "#",
        imageUrl: "https://picsum.photos/400/200?random=2",
        author: "Urban Planning",
        source: "City Times"
    }
];

export async function fetchNews(city, filter) {
    if (!city) return getFallbackNews('your location');

    try {
        const category = FILTER_MAP[filter] || 'general';
        const query = city;

        // WorldNewsAPI.com call
        const url = `${WORLD_NEWS_BASE_URL}?api-key=${WORLD_NEWS_API_KEY}&text=${encodeURIComponent(query)}&source-countries=us,gb&language=en&number=10`;

        console.log(`Fetching WorldNewsAPI for: ${query} (${category})`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`WorldNewsAPI error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.news || data.news.length === 0) {
            console.log('No WorldNewsAPI articles found, using fallback');
            return getFallbackNews(city);
        }

        // Map WorldNewsAPI response to our app's format
        return data.news.map(article => ({
            source: article.source?.name || 'Unknown Source',
            author: article.author || 'Unknown Author',
            title: article.title,
            description: article.text?.substring(0, 150) + '...' || 'No description available',
            url: article.url,
            imageUrl: article.image || `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 10)}`
        }));

    } catch (error) {
        console.error('WorldNewsAPI fetch failed, using fallback:', error);
        return getFallbackNews(city);
    }
}

// Fallback news generator
function getFallbackNews(city) {
    return FALLBACK_NEWS.map((article, index) => ({
        ...article,
        title: article.title.replace('Local', city || 'Local'),
        description: article.description,
        imageUrl: `https://picsum.photos/400/200?random=${index + 1}`
    }));
}