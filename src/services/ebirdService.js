import axios from 'axios';
import { parse } from 'node-html-parser';

// test ebird api at https://ebird-api-ui.com/taxonomy/ebird-taxonomy
// read ebird api docs at https://documenter.getpostman.com/view/664302/S1ENwy59

export const fetchNearbyBirds = async (location) => {
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY; // Access the API key from .env
    const response = await axios.get(`https://api.ebird.org/v2/product/spplist/${location}`, {
        headers: {
            'X-eBirdApiToken': apiKey // Use the API key in the request header
        }
    });

    return response.data;
};

export const fetchBirdNames = async (speciesCodes) => {
    //https://api.ebird.org/v2/ref/taxonomy/ebird/?species=spcode?fmt=json
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY; // Access the API key from .env
    const response = await axios.get(`https://api.ebird.org/v2/ref/taxonomy/ebird/`, {
        headers: {
            'X-eBirdApiToken': apiKey // Use the API key in the request header
        },
        params: {
            species: speciesCodes.join(','),
            fmt: 'json'
        }
    });

    // Map over the response data to extract names
    return response.data.map(bird => ({
        speciesCode: bird.speciesCode,
        sciName: bird.sciName || 'Scientific name not available.',
        comName: bird.comName || 'Common name not available.'
    }));
}



// Macaulay Library API (Related to eBird. Does not require an API key)
export const fetchBirdPhotos = async (speciesCodes) => {
    const baseUrl = 'https://search.macaulaylibrary.org/api/v1/search';
    const params = {
        mediaType: 'p',
        sort: 'rating_rank_desc',
        // count: 1  // We only need one result per species
    };

    // use promise all instead
    const requests = speciesCodes.map(async (speciesCode) => {
        const response = await axios.get(baseUrl, {
            params: {
                taxonCode: speciesCode,
                ...params
            }
        });

        const firstResult = response.data.results.content[0];

        // extract the small and large image URLs from the response
        const smallImg = firstResult.previewUrl || 'https://search.macaulaylibrary.org/static/blank-placeholder.png'
        const largeImg = firstResult.largeUrl || 'https://search.macaulaylibrary.org/static/blank-placeholder.png'

        return { smallImg, largeImg };
    });

    return Promise.all(requests);
}


// Cornell Lab of Ornithology (Web scraping. Does not require an API key)
export const fetchBirdDescription = async (commonName) => {
    try {
        // Replace spaces with hyphens and convert to lowercase
        const formattedName = commonName.replace(/\s+/g, '-').toLowerCase();
        const url = `https://www.allaboutbirds.org/guide/${formattedName}/overview`;

        // Fetch the HTML content of the page
        const response = await axios.get(url);
        const html = response.data;

        // Parse the HTML
        const root = parse(html);

        // Find the "Basic Description" section
        const basicDescriptionHeader = root.querySelector('h2:contains("Basic Description")');
        if (!basicDescriptionHeader) {
            return 'Basic Description not found.';
        }

        // Get the next paragraph after the "Basic Description" header
        const basicDescription = basicDescriptionHeader.nextElementSibling?.textContent;

        return basicDescription?.trim() || 'Description not available.';
    } catch (error) {
        console.error('Error fetching bird description:', error);
        return 'Description not available.';
    }
}