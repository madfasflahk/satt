const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllFreeAds = async () => {
    try {
        const url = new URL(`/api/v1/freeAd?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all free ads: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all free ads:', error);
        throw error;
    }
};

export const getFreeAdById = async (id) => {
    try {
        const url = new URL(`/api/v1/freeAd/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch free ad with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching free ad with ID ${id}:`, error);
        throw error;
    }
};

export const createFreeAd = async (freeAdData) => {
    try {
        const url = new URL(`/api/v1/freeAd`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(freeAdData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create free ad: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating free ad:', error);
        throw error;
    }
};

export const updateFreeAd = async (id, freeAdData) => {
    try {
        const url = new URL(`/api/v1/freeAd/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(freeAdData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update free ad with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating free ad with ID ${id}:`, error);
        throw error;
    }
};

export const deleteFreeAd = async (id) => {
    try {
        const url = new URL(`/api/v1/freeAd/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete free ad with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting free ad with ID ${id}:`, error);
        throw error;
    }
};
