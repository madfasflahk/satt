import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API;

export const getCurrentDayResult = async () => {
    try {
        // The skillContext.js shows a URL being passed, but for a dedicated API file,
        // we might want to define the endpoint directly or pass specific parameters.
        // Assuming the endpoint for current day result is just 'currentday' as seen in src/app/api/currentday/route.js
        const response = await axios.get(`${API_BASE_URL}currentday`);
        return response.data;
    } catch (error) {
        console.error('Error fetching current day result:', error);
        throw error;
    }
};
