import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllFreeAds = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}freeAd?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all free ads:', error);
        throw error;
    }
};

export const getFreeAdById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}freeAd/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching free ad with ID ${id}:`, error);
        throw error;
    }
};

export const createFreeAd = async (freeAdData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}freeAd`, freeAdData);
        return response.data;
    } catch (error) {
        console.error('Error creating free ad:', error);
        throw error;
    }
};

export const updateFreeAd = async (id, freeAdData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}freeAd/${id}`, freeAdData);
        return response.data;
    } catch (error) {
        console.error(`Error updating free ad with ID ${id}:`, error);
        throw error;
    }
};

export const deleteFreeAd = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}freeAd/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting free ad with ID ${id}:`, error);
        throw error;
    }
};
