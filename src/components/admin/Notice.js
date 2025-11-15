"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore"; // Adjust path as needed

const Notice = () => {
    const {
        isLoading,
        notices,
        fetchNotices,
        addNotice,
        updateExistingNotice,
        removeNotice,
    } = useAdminStore();


    const initialState = {
        title: "",
        designation: "",
        notice: "",
        name: "",
        number: "",
        note: "",
        validation: false
    };
    const [post, setPost] = useState(false);
    const [edit, setEdit] = useState("")
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchNotices();
    }, [fetchNotices]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (edit === "") {
                await addNotice(formData);
                setFormData(initialState);
                setPost(false);
                setEdit("");
            } else {
                await updateExistingNotice(edit, formData);
                setFormData(initialState);
                setPost(false);
                setEdit("");
            }

        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    const toggleValidation = () => {
        setFormData({
            ...formData,
            validation: !formData.validation
        });
    };

    const handleDelete = async (id) => {
        try {
            await removeNotice(id);
        } catch (error) {
            alert("Something went wrong during delete");
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading Notices...</div>;
    }

    return (
        <> {post && <div style={{ background: "rgba(0,0,0,0.6)" }} className="position-fixed start-0  w-100 h-100 top-0 d-flex justify-content-center align-items-center py-3 px-5 rounded">
            <form onSubmit={handleSubmit} className="col-md-6 p-5 bg-body position-relative rounded">
            <button style={{ right: "3px", top: "3px", border: "1px solid var(--myTheme-color)", color: "var(--myTheme-color)" }} className="position-absolute   px-2   bg- rounded-pill " onClick={() => setPost(false)} > X </button>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notice">Notice</label>
                    <textarea
                        className="form-control"
                        id="notice"
                        name="notice"
                        rows="4"
                        value={formData.notice}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Number</label>
                    <input
                        type="number"
                        className="form-control"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <textarea
                        className="form-control"
                        id="note"
                        name="note"
                        rows="4"
                        value={formData.note}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="validation"
                        name="validation"
                        checked={formData.validation}
                        onChange={toggleValidation}
                    />
                    <label className="form-check-label" htmlFor="validation">Validation</label>
                </div>
                <button
                    style={{ background: "var(--myTheme-color)" }}
                    type="submit"
                    className="border-0 px-5 py-2 rounded text-white mt-3"
                >
                    Submit
                </button>
            </form>
        </div>}
            {!post && <button style={{ border: "1px solid blue" }} className="btn " onClick={() => { setPost(true); setEdit(""); setFormData(initialState) }}     > Post</button>}
            <div>
                {notices && notices.map((e, i) => {
                    return (
                        <div style={{ border: "4px solid var(--myTheme-color)" }} className='  py-4 px-5 rounded-2 m-auto my-2 d-flex' key={i}>
                            <div className="d-flex flex-column w-100">

                                <h6 className=''> {e.title} </h6>

                                <p style={{ color: "red" }} className='fw-bold'> {e.name} </p>
                            </div>
                            <div className="d-flex gap-1 w-25 ">
                                <button className="btn btn-sm btn-success w-50" onClick={() => {
                                    setPost(true);
                                    setEdit(e._id)
                                    setFormData({
                                        ...formData,
                                        title:e.title,
                                        designation:e.designation,
                                        notice:e.notice,
                                        name:e.name,
                                        number:e.number,
                                        note:e.note,
                                        validation:e.validation
                                    });

                                }}    >Edit</button>
                                <button className="btn btn-sm btn-danger w-50" onClick={() => handleDelete(e._id)} > Delete</button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Notice;
