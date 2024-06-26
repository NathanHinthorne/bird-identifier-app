import axios from 'axios';

const API_URL = 'http://localhost:5000/api/birds';

export const submitUserBirdData = async (birdData) => {
    try {
        const response = await axios.post(API_URL, birdData);
        return response.data;
    } catch (error) {
        console.error('Error submitting bird data:', error);
    }
};


export const fetchUserBirdData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/birds`);
        return response.data;
    } catch (error) {
        console.error('Error fetching birds:', error);
        throw error;
    }
};