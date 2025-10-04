// js/modules/newsService.js

/**
 * GeoSphere News Service Module - Currents API Integration with Fallback
 */

const NEWS_API_KEY = '9x60m4b9BcZ8ewxukcx_0cmOPLBbRrkCFiFV31Wi7kYK70oK';
const NEWS_BASE_URL = 'https://api.currentsapi.services/v1/search';

// Fallback news data for when API fails
const FALLBACK_NEWS = [
    {
        title: "Local Community Event Brings Residents Together",
        description: "Residents gathered for the annual community festival celebrating local culture and traditions.",
        url: "#",
        imageUrl: "https://news-africa.churchofjesuschrist.org/media/960x540/Tesano-screeening-1.jpg",
        author: "Local News",
        source: "Community Herald"
    },
    {
        title: "New Park Development Planned for Downtown Area",
        description: "City council approves plans for a new green space in the urban center.",
        url: "#",
        imageUrl: "https://media.kvue.com/assets/KVUE/images/908d32e3-4d77-45bc-8f53-112c25c2e649/908d32e3-4d77-45bc-8f53-112c25c2e649_1920x1080.jpg",
        author: "City Planning",
        source: "Urban Times"
    },
    {
        title: "Local Business Wins Sustainability Award",
        description: "Award recognizes efforts in environmental conservation and community support.",
        url: "#",
        imageUrl: "https://cdn.prod.website-files.com/63ecbc360f1f40b191bdddd0/675311cabd665bfecc0ae55d_Copy%20of%20SUSTAINABILITY-2025.webp",
        author: "Business Desk",
        source: "Economic Review"
    }
];

const FILTER_MAP = {
    general: '',
    tech: 'technology',
    sports: 'sports',
    business: 'business',
    health: 'health'
};

export async function fetchNews(city, filter) {
    if (!city) return FALLBACK_NEWS;

    const categoryKeyword = FILTER_MAP[filter] ? ` ${FILTER_MAP[filter]}` : '';
    const query = `${city}${categoryKeyword}`;

    try {
        console.log(`Fetching news for: ${query}`);

        const response = await fetch(`${NEWS_BASE_URL}?keywords=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': NEWS_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`News API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.news || data.news.length === 0) {
            console.log('No news found, using fallback data');
            return getFallbackNews(city);
        }

        // Map Currents API response to our app's format
        return data.news.map(article => ({
            source: article.author || article.source || 'Unknown',
            author: article.author || 'Unknown',
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.image || 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=News+Image'
        }));

    } catch (error) {
        console.error('News API fetch failed, using fallback:', error);
        return getFallbackNews(city);
    }
}

// Fallback news generator
function getFallbackNews(city) {
    return FALLBACK_NEWS.map(article => ({
        ...article,
        title: article.title.replace('Local', city),
        description: article.description.replace('community', `${city} community`)
    }));
}