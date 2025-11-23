

export const getAllMovements = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movement?admin=1`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movement/${id}?admin=1`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movement`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movement/${id}`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movement/${id}`, {
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
