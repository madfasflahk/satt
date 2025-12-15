import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllAlterNatives = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}alterNative?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all alter natives:', error);
        throw error;
    }
};

export const getAlterNativeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}alterNative/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching alter native with ID ${id}:`, error);
        throw error;
    }
};

export const createAlterNative = async (alterNativeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}alterNative`, alterNativeData);
        return response.data;
    } catch (error) {
        console.error('Error creating alter native:', error);
        throw error;
    }
};

export const updateAlterNative = async (id, alterNativeData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}alterNative/${id}`, alterNativeData);
        return response.data;
    } catch (error) {
        console.error(`Error updating alter native with ID ${id}:`, error);
        throw error;
    }
};

export const deleteAlterNative = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}alterNative/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting alter native with ID ${id}:`, error);
        throw error;
    }
};
