import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllResults = async (limit = 10, page = 1) => {
    try {
        const response = await axios.get(`${API_BASE_URL}result?limit=${limit}&page=${page}&admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all results:', error);
        throw error;
    }
};

export const getResultById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}result/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching result with ID ${id}:`, error);
        throw error;
    }
};

export const createResult = async (resultData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}result`, resultData);
        return response.data;
    } catch (error) {
        console.error('Error creating result:', error);
        throw error;
    }
};

export const updateResult = async (id, resultData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}result/${id}`, resultData);
        return response.data;
    } catch (error) {
        console.error(`Error updating result with ID ${id}:`, error);
        throw error;
    }
};

export const deleteResult = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}result/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting result with ID ${id}:`, error);
        throw error;
    }
};
