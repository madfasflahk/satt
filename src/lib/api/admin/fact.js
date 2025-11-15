import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllFacts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}fact?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all facts:', error);
        throw error;
    }
};

export const getFactById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}fact/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching fact with ID ${id}:`, error);
        throw error;
    }
};

export const createFact = async (factData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}fact`, factData);
        return response.data;
    } catch (error) {
        console.error('Error creating fact:', error);
        throw error;
    }
};

export const updateFact = async (id, factData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}fact/${id}`, factData);
        return response.data;
    } catch (error) {
        console.error(`Error updating fact with ID ${id}:`, error);
        throw error;
    }
};

export const deleteFact = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}fact/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting fact with ID ${id}:`, error);
        throw error;
    }
};
