const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllImportantFacts = async () => {
    try {
       
        const response = await fetch(`https://satt-mu.vercel.app/api/v1/importantFactSatta?admin=1`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all important facts: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all important facts:', error);
        throw error;
    }
};

export const getImportantFactById = async (id) => {
    try {
        const response = await fetch(`https://satt-mu.vercel.app/api/v1/importantFactSatta/${id}`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch important fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        console.log('Response:', response);
        return response.json();
    } catch (error) {
        console.error(`Error fetching important fact with ID ${id}:`, error);
        throw error;
    }
};

export const createImportantFact = async (importantFactData) => {
    try {
        const url = new URL(`/api/v1/importantFactSatta`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(importantFactData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create important fact: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating important fact:', error);
        throw error;
    }
};

export const updateImportantFact = async (id, importantFactData) => {
    try {
        const url = new URL(`/api/v1/importantFactSatta/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(importantFactData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update important fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating important fact with ID ${id}:`, error);
        throw error;
    }
};

export const deleteImportantFact = async (id) => {
    try {
        const url = new URL(`/api/v1/importantFactSatta/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete important fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting important fact with ID ${id}:`, error);
        throw error;
    }
};
