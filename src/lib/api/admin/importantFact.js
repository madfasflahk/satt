

export const getAllImportantFacts = async () => {
    try {
       
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta?admin=1`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta/${id}?admin=1`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch important fact with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching important fact with ID ${id}:`, error);
        throw error;
    }
};

export const createImportantFact = async (importantFactData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta/${id}`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}importantFactSatta/${id}`, {
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
