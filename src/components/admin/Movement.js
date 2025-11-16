"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";

const Movement = () => {
    const {
        isLoading,
        movements,
        fetchMovements,
        addMovement,
        updateExistingMovement,
        removeMovement,
    } = useAdminStore();

    const initialState = { Movement: "", validation: false };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchMovements();
    }, [fetchMovements]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEditClick = (movement) => {
        setIsEditing(movement._id);
        setFormData({
            Movement: movement.Movement,
            validation: movement.validation,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await removeMovement(id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateExistingMovement(isEditing, formData);
            } else {
                await addMovement(formData);
            }
            closeModal();
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    const openModal = () => {
        setIsEditing(null);
        setFormData(initialState);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(null);
        setFormData(initialState);
    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg relative">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl">&times;</button>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{isEditing ? 'Edit' : 'Add'} Movement Text</h2>
                        <div className="mb-4">
                            <textarea name="Movement" value={formData.Movement} onChange={handleChange} placeholder="Movement Text" rows="6" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required></textarea>
                        </div>
                        <div className="flex items-center mb-6">
                            <input type="checkbox" id="validation" name="validation" checked={formData.validation} onChange={handleChange} className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="validation" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Validation</label>
                        </div>
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                            {isEditing ? 'Update' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            {renderModal()}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Movement Text</h1>
                <button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    + Add New
                </button>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {movements && movements.length > 0 ? movements.map((item) => (
                        <div key={item._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center">
                            <p className="text-gray-800 dark:text-gray-200">{item.Movement}</p>
                            <div className="flex gap-3 flex-shrink-0">
                                <button onClick={() => handleEditClick(item)} className="font-medium text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center col-span-full">No movement text found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Movement;