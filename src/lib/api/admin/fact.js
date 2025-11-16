const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllFacts = async () => {
    try {
        const url = new URL(`/api/v1/fact?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all facts: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all facts:', error);
        throw error;
    }
};

export const getFactById = async (id) => {
    try {
        const url = new URL(`/api/v1/fact/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching fact with ID ${id}:`, error);
        throw error;
    }
};

export const createFact = async (factData) => {
    try {
        const url = new URL(`/api/v1/fact`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(factData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create fact: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating fact:', error);
        throw error;
    }
};

export const updateFact = async (id, factData) => {
    try {
        const url = new URL(`/api/v1/fact/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(factData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating fact with ID ${id}:`, error);
        throw error;
    }
};

export const deleteFact = async (id) => {
    try {
        const url = new URL(`/api/v1/fact/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting fact with ID ${id}:`, error);
        throw error;
    }
};
