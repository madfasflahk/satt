// src/lib/api/admin/fact.js
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}fact`;

export const getAllFacts = async () => {
    const response = await fetch(`${API_URL}?admin=1`);
    if (!response.ok) {
        throw new Error('Failed to fetch facts');
    }
    return response.json();
};

export const getFactById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch fact');
    }
    return response.json();
};

export const createFact = async (factData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factData),
    });
    if (!response.ok) {
        throw new Error('Failed to create fact');
    }
    return response.json();
};

export const updateFact = async (id, factData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factData),
    });
    if (!response.ok) {
        throw new Error('Failed to update fact');
    }
    return response.json();
};

export const deleteFact = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete fact');
    }
    return response.json();
};