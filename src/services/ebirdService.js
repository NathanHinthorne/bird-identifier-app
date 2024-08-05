import axios from 'axios';

// test ebird api at https://ebird-api-ui.com/taxonomy/ebird-taxonomy
// read ebird api docs at https://documenter.getpostman.com/view/664302/S1ENwy59

//! NOT IN USE

const retryRequest = async (url, options = "", maxRetries = 15) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.get(url, options);
            return response.data;
        } catch (error) {
            if (attempt === maxRetries) throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // Add a delay of 5 seconds
    }
};

export const fetchRegionalBirds = async (location) => {
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



