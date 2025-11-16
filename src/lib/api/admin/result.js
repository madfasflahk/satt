const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllResults = async (limit = 10, page = 1) => {
    try {
        const url = new URL(`/api/v1/result?limit=${limit}&page=${page}&admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all results: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all results:', error);
        throw error;
    }
};

export const getResultById = async (id) => {
    try {
        const url = new URL(`/api/v1/result/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch result with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching result with ID ${id}:`, error);
        throw error;
    }
};

export const createResult = async (resultData) => {
    try {
        const url = new URL(`/api/v1/result`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create result: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating result:', error);
        throw error;
    }
};

export const updateResult = async (id, resultData) => {
    try {
        const url = new URL(`/api/v1/result/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update result with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating result with ID ${id}:`, error);
        throw error;
    }
};

export const deleteResult = async (id) => {
    try {
        const url = new URL(`/api/v1/result/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete result with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting result with ID ${id}:`, error);
        throw error;
    }
};
