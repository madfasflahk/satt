const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllMovements = async () => {
    try {
        const url = new URL(`/api/v1/movement?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all movements: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all movements:', error);
        throw error;
    }
};

export const getMovementById = async (id) => {
    try {
        const url = new URL(`/api/v1/movement/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch movement with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching movement with ID ${id}:`, error);
        throw error;
    }
};

export const createMovement = async (movementData) => {
    try {
        const url = new URL(`/api/v1/movement`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movementData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create movement: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating movement:', error);
        throw error;
    }
};

export const updateMovement = async (id, movementData) => {
    try {
        const url = new URL(`/api/v1/movement/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movementData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update movement with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating movement with ID ${id}:`, error);
        throw error;
    }
};

export const deleteMovement = async (id) => {
    try {
        const url = new URL(`/api/v1/movement/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete movement with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting movement with ID ${id}:`, error);
        throw error;
    }
};
