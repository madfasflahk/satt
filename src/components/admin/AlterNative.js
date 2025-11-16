"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";

const AlterNative = () => {
    const {
        isLoading,
        alterNatives,
        fetchAlterNatives,
        addAlterNative,
        updateExistingAlterNative,
        removeAlterNative,
    } = useAdminStore();

    const initialState = { alternative: "" };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchAlterNatives();
    }, [fetchAlterNatives]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = (item) => {
        setIsEditing(item._id);
        setFormData({ alternative: item.alternative });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await removeAlterNative(id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateExistingAlterNative(isEditing, formData);
            } else {
                await addAlterNative(formData);
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
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{isEditing ? 'Edit' : 'Add'} Alternative</h2>
                        <div className="mb-4">
                            <textarea name="alternative" value={formData.alternative} onChange={handleChange} placeholder="Alternative Text" rows="6" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required></textarea>
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Alternatives</h1>
                <button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    + Add New
                </button>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {alterNatives && alterNatives.length > 0 ? alterNatives.map((item) => (
                        <div key={item._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center">
                            <p className="text-gray-800 dark:text-gray-200">{item.alternative}</p>
                            <div className="flex gap-3 flex-shrink-0">
                                <button onClick={() => handleEditClick(item)} className="font-medium text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center col-span-full">No alternatives found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlterNative;