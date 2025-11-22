

export const getAllNotices = async () => {
    try {
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice?admin=1`);
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
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice/${id}?admin=1`);
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
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice`, {
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
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice/${id}`, {
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
        const response = await fetch(`https://www.luckpatix.com/api/v1/notice/${id}`, {
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
