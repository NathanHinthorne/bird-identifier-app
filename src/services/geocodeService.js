import axios from 'axios';

// read geocoding api docs at https://opencagedata.com/api

export const getLocation = async (lat, lng) => {
    const apiKey = import.meta.env.VITE_GEOCODING_API_KEY; // Accessing the API key
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`,
            { timeout: 5000 } // Set a timeout of 5 seconds
        );

        if (response.data.results && response.data.results.length > 0) {
            const components = response.data.results[0].components;
            return `${components.country_code.toUpperCase()}-${components.state_code}`;
        }

        throw new Error('Location code not found');
    } catch (error) {
        if (axios.isTimeout(error)) {
            // Retry the request if it times out
            return getLocation(lat, lng);
        }
        throw error;
    }
};