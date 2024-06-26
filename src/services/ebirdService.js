import axios from 'axios';

export const fetchNearbyBirds = async (location) => {
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY; // Access the API key from .env
    const response = await axios.get(`https://api.ebird.org/v2/product/spplist/${location}`, {
        headers: {
            'X-eBirdApiToken': apiKey // Use the API key in the request header
        }
    });

    return response.data;
};

export const fetchBirdDetails = async (speciesCode) => {
    // https://api.ebird.org/v2/ref/taxon/forms/{{speciesCode}}
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY; // Access the API key from .env
    const response = await axios.get(`https://api.ebird.org/v2/ref/taxon/forms/${speciesCode}`, {
        headers: {
            'X-eBirdApiToken': apiKey // Use the API key in the request header
        }
    });

    return response.data;
}