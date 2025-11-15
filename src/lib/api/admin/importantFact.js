import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllImportantFacts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}importantFact?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all important facts:', error);
        throw error;
    }
};

export const getImportantFactById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}importantFact/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching important fact with ID ${id}:`, error);
        throw error;
    }
};

export const createImportantFact = async (importantFactData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}importantFact`, importantFactData);
        return response.data;
    } catch (error) {
        console.error('Error creating important fact:', error);
        throw error;
    }
};

export const updateImportantFact = async (id, importantFactData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}importantFact/${id}`, importantFactData);
        return response.data;
    } catch (error) {
        console.error(`Error updating important fact with ID ${id}:`, error);
        throw error;
    }
};

export const deleteImportantFact = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}importantFact/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting important fact with ID ${id}:`, error);
        throw error;
    }
};
