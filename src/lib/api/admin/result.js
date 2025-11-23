

export const getAllResults = async (limit = 10, page = 1) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}result?limit=${limit}&page=${page}&admin=1`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}result/${id}?admin=1`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}result`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}result/${id}`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}result/${id}`, {
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
