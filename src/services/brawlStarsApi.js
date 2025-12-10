import { API_BASE_URL, PROXY_URL } from '../config';

const getHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
});

// Helper to handle errors
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || response.statusText);
    }
    return response.json();
};

export const brawlStarsApi = {
    // Fetch club info (including members)
    getClub: async (clubTag, token) => {
        // The tag must be URL encoded (replace # with %23, but usually tags come without # in the config, 
        // we need to ensure they have it or not. API expects %23 prefix usually if passed in URL)
        // Actually, the API documentation says "playerTag" or "clubTag".
        // Tags usually start with #. If our config doesn't have #, we add it.
        const formattedTag = clubTag.startsWith('#') ? clubTag.replace('#', '%23') : '%23' + clubTag;

        // Using a proxy to bypass CORS
        const url = `${PROXY_URL}${encodeURIComponent(`${API_BASE_URL}/clubs/${formattedTag}`)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(token),
        });
        return handleResponse(response);
    },

    // Fetch player info
    getPlayer: async (playerTag, token) => {
        const formattedTag = playerTag.startsWith('#') ? playerTag.replace('#', '%23') : '%23' + playerTag;
        const url = `${PROXY_URL}${encodeURIComponent(`${API_BASE_URL}/players/${formattedTag}`)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(token),
        });
        return handleResponse(response);
    }
};
