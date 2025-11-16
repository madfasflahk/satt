"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";

const ImportantNote = () => {
    const {
        isLoading,
        importantNotes,
        fetchImportantNotes,
        addImportantNote,
        updateExistingImportantNote,
        removeImportantNote,
    } = useAdminStore();

    const initialState = {
        title: "", SattaKingImportantNote: "", validation: false
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchImportantNotes();
    }, [fetchImportantNotes]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEditClick = (note) => {
        setIsEditing(note._id);
        setFormData({
            title: note.title,
            SattaKingImportantNote: note.SattaKingImportantNote,
            validation: note.validation,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            await removeImportantNote(id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateExistingImportantNote(isEditing, formData);
            } else {
                await addImportantNote(formData);
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
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl relative">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl">&times;</button>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{isEditing ? 'Edit' : 'Add'} Important Note</h2>
                        <div className="mb-4">
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                        </div>
                        <div className="mb-4">
                            <textarea name="SattaKingImportantNote" value={formData.SattaKingImportantNote} onChange={handleChange} placeholder="Important Note Text" rows="6" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required></textarea>
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Important Notes</h1>
                <button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    + Add Note
                </button>
            </div>

            {isLoading ? (
                <div className="text-center">Loading Notes...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {importantNotes && importantNotes.length > 0 ? importantNotes.map((note) => (
                        <div key={note._id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{note.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{note.SattaKingImportantNote}</p>
                            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4 flex justify-end gap-3">
                                <button onClick={() => handleEditClick(note)} className="font-medium text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDelete(note._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center col-span-full">No important notes found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImportantNote;