import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllNotices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}notice?admin=1`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all notices:', error);
        throw error;
    }
};

export const getNoticeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}notice/${id}?admin=1`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching notice with ID ${id}:`, error);
        throw error;
    }
};

export const createNotice = async (noticeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}notice`, noticeData);
        return response.data;
    } catch (error) {
        console.error('Error creating notice:', error);
        throw error;
    }
};

export const updateNotice = async (id, noticeData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}notice/${id}`, noticeData);
        return response.data;
    } catch (error) {
        console.error(`Error updating notice with ID ${id}:`, error);
        throw error;
    }
};

export const deleteNotice = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}notice/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting notice with ID ${id}:`, error);
        throw error;
    }
};
