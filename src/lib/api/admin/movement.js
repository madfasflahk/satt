import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllMovements = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}movement?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all movements:', error);
        throw error;
    }
};

export const getMovementById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}movement/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movement with ID ${id}:`, error);
        throw error;
    }
};

export const createMovement = async (movementData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}movement`, movementData);
        return response.data;
    } catch (error) {
        console.error('Error creating movement:', error);
        throw error;
    }
};

export const updateMovement = async (id, movementData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}movement/${id}`, movementData);
        return response.data;
    } catch (error) {
        console.error(`Error updating movement with ID ${id}:`, error);
        throw error;
    }
};

export const deleteMovement = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}movement/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting movement with ID ${id}:`, error);
        throw error;
    }
};
