import axios from 'axios';

export const getLocation = async (lat, lng) => {
    const apiKey = import.meta.env.VITE_GEOCODING_API_KEY; // Accessing the API key
    const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
    );

    if (response.data.results && response.data.results.length > 0) {
        const components = response.data.results[0].components;
        return `${components.country_code.toUpperCase()}-${components.state_code}`;
    }

    throw new Error('Location code not found');
};