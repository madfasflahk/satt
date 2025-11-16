"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAdminStore from '../../../../../store/adminStore';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const EditImportantFactPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const { importantFacts, fetchImportantFacts, updateExistingImportantFact, isLoading } = useAdminStore();
    const [formData, setFormData] = useState({ importantFactSatta: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (importantFacts.length === 0) {
            fetchImportantFacts();
        }
    }, [importantFacts.length, fetchImportantFacts]);

    useEffect(() => {
        if (id && importantFacts.length > 0) {
            const factToEdit = importantFacts.find(fact => fact._id === id);
            if (factToEdit) {
                setFormData({ importantFactSatta: factToEdit.importantFactSatta });
            } else {
                setError("Fact not found.");
            }
        }
    }, [id, importantFacts]);

    const handleQuillChange = (content) => {
        setFormData({ ...formData, importantFactSatta: content });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExistingImportantFact(id, formData);
            alert('Fact updated successfully!');
            router.push('/admin/important-fact');
        } catch (err) {
            alert('Failed to update fact.');
            console.error(err);
        }
    };

    if (isLoading && !formData.importantFactSatta && importantFacts.length === 0) {
        return <div className="text-center p-10">Loading...</div>;
    }
    
    if (error) return <div className="text-red-500 text-center p-10">{error}</div>;

    return (
        <>
            <style jsx global>{`
                .quill-container .ql-editor {
                    min-height: 250px;
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Edit Important Fact</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 quill-container">
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
                    <div className="flex gap-4">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                            Save Changes
                        </button>
                        <button type="button" onClick={() => router.push('/admin/important-fact')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditImportantFactPage;
