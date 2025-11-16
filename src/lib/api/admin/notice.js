const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'; // Default for local development

export const getAllNotices = async () => {
    try {
        const url = new URL(`/api/v1/notice?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch all notices: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all notices:', error);
        throw error;
    }
};

export const getNoticeById = async (id) => {
    try {
        const url = new URL(`/api/v1/notice/${id}?admin=1`, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch notice with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching notice with ID ${id}:`, error);
        throw error;
    }
};

export const createNotice = async (noticeData) => {
    try {
        const url = new URL(`/api/v1/notice`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to create notice: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error creating notice:', error);
        throw error;
    }
};

export const updateNotice = async (id, noticeData) => {
    try {
        const url = new URL(`/api/v1/notice/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to update notice with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error updating notice with ID ${id}:`, error);
        throw error;
    }
};

export const deleteNotice = async (id) => {
    try {
        const url = new URL(`/api/v1/notice/${id}`, baseUrl).toString();
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to delete notice with ID ${id}: ${response.status} ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error deleting notice with ID ${id}:`, error);
        throw error;
    }
};
