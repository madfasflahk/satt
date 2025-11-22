"use client"

import React, { useState, useEffect, useMemo } from "react"; // Import useMemo
import * as XLSX from 'xlsx';
import useAdminStore from "../../store/adminStore"; // Adjust path as needed
import { monthNames } from "../../static/MonthArray";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// A custom toggle switch component
const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
    </label>
);

// Drag handle icon
const DragHandleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 cursor-grab active:cursor-grabbing">
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
        <circle cx="5" cy="5" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
        <circle cx="5" cy="19" r="1"></circle>
        <circle cx="19" cy="5" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="19" cy="19" r="1"></circle>
    </svg>
);


const Result = () => {
    const {
        isLoading,
        results,
        fetchResults,
        addResult,
        removeResult,
    } = useAdminStore();

    const initialExcelState = { year: "", month: "", file: null };
    const initialDirectState = {
        date: "",
        delhiLuckyBazar: "",
        disawer: "",
        faridabad: "",
        gaziyabad: "",
        kolkataKing: "",
        gali: "",
        delhiBazar: "",
        shreeGanesh: "",
        // New fields
        luckpoti: "",
        sreeRam: "",
        dlb: "",
    };

    const [modal, setModal] = useState(""); // "excel", "direct", or "fields"
    const [formData, setFormData] = useState(initialExcelState);
    const [formDataDirect, setFormDataDirect] = useState(initialDirectState);
    const [excelData, setExcelData] = useState(null);

    const defaultResultFields = useMemo(() => [ // Wrap in useMemo
        { name: "delhiLuckyBazar", virtual_name: "Delhi Lucky Bazar", visible: true, order: 1, isVerified: true, key: "delhiLuckyBazar" },
        { name: "disawer", virtual_name: "Disawer", visible: true, order: 2, isVerified: true, key: "disawer" },
        { name: "faridabad", virtual_name: "Faridabad", visible: true, order: 3, isVerified: true, key: "faridabad" },
        { name: "gaziyabad", virtual_name: "Gaziyabad", visible: true, order: 4, isVerified: true, key: "gaziyabad" },
        { name: "kolkataKing", virtual_name: "Kolkata King", visible: true, order: 5, isVerified: true, key: "kolkataKing" },
        { name: "gali", virtual_name: "Gali", visible: true, order: 6, isVerified: true, key: "gali" },
        { name: "delhiBazar", virtual_name: "Delhi Bazar", visible: true, order: 7, isVerified: true, key: "delhiBazar" },
        { name: "shreeGanesh", virtual_name: "Shree Ganesh", visible: true, order: 8, isVerified: true, key: "shreeGanesh" },
        // New fields
        { name: "luckpoti", virtual_name: "Luckpoti", visible: true, order: 9, isVerified: true, key: "luckpoti" },
        { name: "sreeRam", virtual_name: "Sree Ram", visible: true, order: 10, isVerified: true, key: "sreeRam" },
        { name: "dlb", virtual_name: "DLB", visible: true, order: 11, isVerified: true, key: "dlb" },
    ], []); // Empty dependency array for useMemo

    const [resultFields, setResultFields] = useState([]); // Initialize as empty, will be populated by useEffect

    useEffect(() => {
        fetchResults();
        // In a real app, you would fetch the resultFields configuration from your database here
        // Let's fetch the result order from the API to initialize resultFields
        const fetchResultOrder = async () => {
            try {
                
                const orderRes = await fetch(`https://www.luckpatix.com/api/v1/resultOrder`);
                if (orderRes.ok) {
                    const orderData = await orderRes.json();
                    // Merge fetched order with default fields, prioritizing fetched data
                    const mergedFields = defaultResultFields.map(defaultField => { // Use defaultResultFields here
                        const fetchedField = orderData.find(f => f.key === defaultField.key);
                        return fetchedField ? { ...defaultField, ...fetchedField } : defaultField;
                    });
                    // Add any new fields from fetched data that are not in default
                    orderData.forEach(fetchedField => {
                        if (!mergedFields.some(f => f.key === fetchedField.key)) {
                            mergedFields.push(fetchedField);
                        }
                    });
                    setResultFields(mergedFields.sort((a, b) => a.order - b.order));
                } else {
                    console.error("Failed to fetch result order for admin panel");
                    setResultFields(defaultResultFields); // Fallback to default if fetch fails
                }
            } catch (error) {
                console.error("Error fetching result order for admin panel:", error);
                setResultFields(defaultResultFields); // Fallback to default if error
            }
        };
        fetchResultOrder();
    }, [fetchResults, defaultResultFields]); // fetchResults and defaultResultFields are dependencies

    const handleFieldChange = (name, field, value) => {
        const updatedFields = resultFields.map(f => {
            if (f.name === name) {
                return { ...f, [field]: value };
            }
            return f;
        });
        setResultFields(updatedFields);
    };

    const handleSaveFields = async () => {
        // Here you would typically send the 'resultFields' state to your backend API to save the changes
        console.log("Saving updated fields:", resultFields);
        try {
            
            const res = await fetch(`https://www.luckpatix.com/api/v1/resultOrder`, {
                method: 'POST', // Assuming POST for saving/updating the order
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resultFields.map(field => ({
                    key: field.name,
                    name: field.virtual_name,
                    isVerified: field.visible, // Assuming visible maps to isVerified
                    order: field.order,
                }))),
            });

            if (res.ok) {
                alert("Field configuration saved successfully!");
                setModal("");
            } else {
                const errorBody = await res.text();
                throw new Error(`Failed to save field configuration: ${res.status} ${res.statusText} - ${errorBody}`);
            }
        } catch (error) {
            alert("Something went wrong while saving field configuration");
            console.error(error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(resultFields);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        const updatedItems = items.map((item, index) => ({ ...item, order: index + 1 }));
        setResultFields(updatedItems);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDirectUpload = (e) => {
        const { name, value } = e.target;
        setFormDataDirect({ ...formDataDirect, [name]: value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
            if (fileTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[worksheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    setExcelData(jsonData);
                };
                reader.readAsArrayBuffer(file);
                setFormData({ ...formData, file: file });
            } else {
                alert('Please select a valid Excel file (XLSX, XLS, CSV).');
            }
        }
    };

    const handleSubmitExcel = async (e) => {
        e.preventDefault();
        if (!formData.year || !formData.month || !excelData) {
            alert("Please fill all fields and upload a file.");
            return;
        }
        const data = { year: formData.year, month: formData.month, resultList: excelData };
        try {
            await addResult(data);
            alert("Record updated successfully");
            setFormData(initialExcelState);
            setExcelData(null);
            setModal("");
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    const handleSubmitDirect = async (e) => {
        e.preventDefault();
        const { date, ...rest } = formDataDirect;
        if (!date) {
            alert("Please select a date.");
            return;
        }
        const month = new Date(date).getMonth() + 1;
        const year = date.split("-")[0];
        const day = date.split("-")[2];
        
        // Filter out empty values from rest
        const filteredRest = Object.fromEntries(
            Object.entries(rest).filter(([, value]) => value !== "")
        );

        const resultList = [{ day: parseInt(day), ...filteredRest }];
        const data = { year, month: String(month), resultList };

        try {
            await addResult(data);
            alert('Data uploaded successfully');
            setFormDataDirect(initialDirectState);
            setModal("");
        } catch (error) {
            alert("Something went wrong");
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this result?")) {
            try {
                await removeResult(id);
            } catch (error) {
                alert("Something went wrong during delete");
                console.error(error);
            }
        }
    };

    const renderModal = () => {
        if (!modal) return null;

        const closeModal = () => {
            setModal("");
            setFormData(initialExcelState);
            setFormDataDirect(initialDirectState);
            setExcelData(null);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl">&times;</button>
                    
                    {modal === 'fields' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Manage Result Fields</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Drag and drop to reorder the fields.</p>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="fields">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                            {resultFields.map((field, index) => (
                                                <Draggable key={field.name} draggableId={field.name} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`grid grid-cols-12 gap-3 items-center p-3 rounded-lg transition-shadow ${snapshot.isDragging ? 'shadow-lg bg-gray-100 dark:bg-gray-600' : 'bg-gray-50 dark:bg-gray-700'}`}
                                                        >
                                                            <div {...provided.dragHandleProps} className="col-span-1 flex justify-center items-center">
                                                                <DragHandleIcon />
                                                            </div>
                                                            <div className="col-span-4 sm:col-span-3">
                                                                <label className="font-semibold text-gray-700 dark:text-gray-300 text-sm break-words">{field.name}</label>
                                                            </div>
                                                            <div className="col-span-7 sm:col-span-5">
                                                                <input type="text" value={field.virtual_name} onChange={(e) => handleFieldChange(field.name, 'virtual_name', e.target.value)} placeholder="Virtual Name" className="w-full p-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-sm" />
                                                            </div>
                                                            <div className="col-span-12 sm:col-span-3 flex items-center justify-end sm:justify-center gap-2 mt-2 sm:mt-0">
                                                                <ToggleSwitch checked={field.visible} onChange={(e) => handleFieldChange(field.name, 'visible', e.target.checked)} />
                                                                <span className="text-sm text-gray-600 dark:text-gray-400">Visible</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button onClick={handleSaveFields} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">Save Changes</button>
                        </div>
                    )}

                    {modal === 'excel' && (
                        <form onSubmit={handleSubmitExcel}>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Upload Excel File</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year (e.g., 2023)" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                                <select name="month" value={formData.month} onChange={handleChange} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required>
                                    <option value="">Select Month</option>
                                    {monthNames.map((name, index) => <option key={index} value={index + 1}>{name}</option>)}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Upload File</label>
                                <input type="file" name="file" onChange={handleFile} className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required />
                            </div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">Submit</button>
                        </form>
                    )}
                    {modal === 'direct' && (
                         <form onSubmit={handleSubmitDirect}>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Single Day Result</h2>
                            <div className="mb-6">
                                 <input type="date" name="date" value={formDataDirect.date} onChange={handleChangeDirectUpload} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {resultFields.filter(f => f.visible).sort((a,b) => a.order - b.order).map(field => (
                                    <div key={field.name}>
                                        <label htmlFor={field.name} className="capitalize block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{field.virtual_name}</label>
                                        <input type="number" id={field.name} name={field.name} value={formDataDirect[field.name]} onChange={handleChangeDirectUpload} className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
            {renderModal()}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Results</h1>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                    <button onClick={() => setModal('excel')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                        Post via Excel
                    </button>
                    <button onClick={() => setModal('direct')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                        Post Single Day
                    </button>
                    <button onClick={() => setModal('fields')} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                        Manage Fields
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading Results...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-100 uppercase bg-gray-800 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Year</th>
                                <th scope="col" className="px-6 py-3">Month</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results && results.length > 0 ? results.map((e) => (
                                <tr key={e._id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{e.year}</td>
                                    <td className="px-6 py-4">{monthNames[e.month - 1]}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(e._id)} className="font-medium text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-10 text-center">No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Result;

