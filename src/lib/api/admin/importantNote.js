import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllImportantNotes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}importantNote?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all important notes:', error);
        throw error;
    }
};

export const getImportantNoteById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}importantNote/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching important note with ID ${id}:`, error);
        throw error;
    }
};

export const createImportantNote = async (importantNoteData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}importantNote`, importantNoteData);
        return response.data;
    } catch (error) {
        console.error('Error creating important note:', error);
        throw error;
    }
};

export const updateImportantNote = async (id, importantNoteData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}importantNote/${id}`, importantNoteData);
        return response.data;
    } catch (error) {
        console.error(`Error updating important note with ID ${id}:`, error);
        throw error;
    }
};

export const deleteImportantNote = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}importantNote/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting important note with ID ${id}:`, error);
        throw error;
    }
};
