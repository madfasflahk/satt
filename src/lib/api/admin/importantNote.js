const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllImportantNotes = async () => {
    try {
        const url = new URL(`/api/v1/importantNote?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all important notes: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all important notes:', error);
        throw error;
    }
};

export const getImportantNoteById = async (id) => {
    try {
        const url = new URL(`/api/v1/importantNote/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch important note with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching important note with ID ${id}:`, error);
        throw error;
    }
};

export const createImportantNote = async (importantNoteData) => {
    try {
        const url = new URL(`/api/v1/importantNote`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(importantNoteData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create important note: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating important note:', error);
        throw error;
    }
};

export const updateImportantNote = async (id, importantNoteData) => {
    try {
        const url = new URL(`/api/v1/importantNote/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(importantNoteData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update important note with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating important note with ID ${id}:`, error);
        throw error;
    }
};

export const deleteImportantNote = async (id) => {
    try {
        const url = new URL(`/api/v1/importantNote/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete important note with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting important note with ID ${id}:`, error);
        throw error;
    }
};
