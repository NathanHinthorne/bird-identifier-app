import axios from 'axios';
import { parse } from 'node-html-parser';

// test ebird api at https://ebird-api-ui.com/taxonomy/ebird-taxonomy
// read ebird api docs at https://documenter.getpostman.com/view/664302/S1ENwy59

const retryRequest = async (url, options, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(url, options);
            return response.data;
        } catch (error) {
            if (attempt === maxRetries) throw error;
        }
    }
};

export const fetchNearbyBirds = async (location) => {
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY;
    const options = {
        headers: {
            'X-eBirdApiToken': apiKey
        }
    };
    const url = `https://api.ebird.org/v2/product/spplist/${location}`;
    return retryRequest(url, options);
};

export const fetchBirdNames = async (speciesCodes) => {
    const apiKey = import.meta.env.VITE_EBIRD_API_KEY;
    const options = {
        headers: {
            'X-eBirdApiToken': apiKey
        },
        params: {
            species: speciesCodes.join(','),
            fmt: 'json'
        }
    };
    const url = `https://api.ebird.org/v2/ref/taxonomy/ebird/`;
    const data = await retryRequest(url, options);

    // Map over the data to extract names
    return data.map(bird => ({
        speciesCode: bird.speciesCode,
        sciName: bird.sciName || 'Scientific name not available.',
        comName: bird.comName || 'Common name not available.'
    }));
};




// Cornell Lab of Ornithology 
export const fetchBirdDescription = async (commonName) => {
    try {
        // Replace spaces with underscores and convert to lowercase
        const formattedName = commonName.replace(/\s+/g, '_').toLowerCase();
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