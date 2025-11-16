"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const ImportantFact = () => {
    const router = useRouter();
    const {
        isLoading,
        importantFacts,
        fetchImportantFacts,
        addImportantFact,
        removeImportantFact,
    } = useAdminStore();

    const initialState = { importantFactSatta: "" };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchImportantFacts();
    }, [fetchImportantFacts]);

    const handleQuillChange = (content) => {
        setFormData({ ...formData, importantFactSatta: content });
    };

    // Updated to navigate to the edit page
    const handleEditClick = (item) => {
        router.push(`/admin/important-fact/edit/${item._id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await removeImportantFact(id);
        }
    };

    // This now only handles ADDING a new fact
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addImportantFact(formData);
            closeModal();
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    const openModal = () => {
        setFormData(initialState);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // This modal is now only for CREATING new facts
    const renderCreateModal = () => {
        if (!isModalOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl relative">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl">&times;</button>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Important Fact</h2>
                        <div className="mb-4 quill-container">
                            <ReactQuill
                                theme="snow"
                                value={formData.importantFactSatta}
                                onChange={handleQuillChange}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                        [{size: []}],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}, 
                                         {'indent': '-1'}, {'indent': '+1'}],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
        <style jsx global>{`
            .quill-container .ql-editor {
                min-height: 200px;
                background-color: #fff;
                color: #000;
            }
            .quill-container .ql-toolbar {
                background-color: #f3f4f6;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
            .dark .quill-container .ql-editor {
                background-color: #4b5563;
                color: #fff;
            }
            .dark .quill-container .ql-toolbar {
                 background-color: #374151;
                 border-color: #4b5563;
            }
            .dark .quill-container .ql-toolbar .ql-stroke {
                stroke: #fff;
            }
            .dark .quill-container .ql-toolbar .ql-fill {
                fill: #fff;
            }
            .dark .quill-container .ql-toolbar .ql-picker-label {
                color: #fff;
            }
        `}</style>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            {renderCreateModal()}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Important Facts</h1>
                <button onClick={openModal} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    + Add New
                </button>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {importantFacts && importantFacts.length > 0 ? importantFacts.map((item) => (
                        <div key={item._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow relative min-h-[80px]">
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button onClick={() => handleEditClick(item)} className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors text-xs w-16 h-8 flex items-center justify-center">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors text-xs w-16 h-8 flex items-center justify-center">Delete</button>
                            </div>
                            <div
                                className="prose dark:prose-invert max-w-none pr-24"
                                dangerouslySetInnerHTML={{ __html: item.importantFactSatta }}
                            />
                        </div>
                    )) : (
                        <p className="text-center col-span-full">No important facts found.</p>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default ImportantFact;

