"use client"

import React, { useState, useEffect } from "react";
import useAdminStore from "../../store/adminStore"; // Adjust path as needed

const AlterNative = () => {
    const {
        isLoading,
        alterNatives,
        fetchAlterNatives,
        addAlterNative,
        updateExistingAlterNative,
        removeAlterNative,
    } = useAdminStore();

    const initialState = {
        alternative: "",
    };
    const [post, setPost] = useState(false);
    const [edit, setEdit] = useState("")
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchAlterNatives();
    }, [fetchAlterNatives]);

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
                await addAlterNative(formData);
                setFormData(initialState);
                setPost(false);
                setEdit("");
            } else {
                await updateExistingAlterNative(edit, formData);
                setFormData(initialState);
                setPost(false);
                setEdit("");
            }
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading Alternative SattaKing...</div>;
    }

    return (
        <>  {post && <div style={{ background: "rgba(0,0,0,0.6)" }} className="position-fixed start-0  w-100 h-100 top-0 d-flex justify-content-center align-items-center py-3 px-5 rounded">
            <form onSubmit={handleSubmit} className="col-md-6 p-5 bg-body position-relative rounded">
                <button style={{ right: "3px", top: "3px", border: "1px solid var(--myTheme-color)", color: "var(--myTheme-color)" }} className="position-absolute   px-2   bg- rounded-pill " onClick={() => setPost(false)} > X </button>
                <div className="form-group">
                    <label htmlFor="alternative">SattaKing Alternative </label>
                    <textarea
                        className="form-control"
                        id="alternative"
                        name="alternative"
                        rows="4"
                        value={formData.alternative}
                        onChange={handleChange}

                    ></textarea>
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
                {alterNatives && alterNatives.map((e, i) => {
                    return (
                        <div style={{ border: "4px solid var(--myTheme-color)" }} className='  py-4 px-5 rounded-2 m-auto my-2 d-flex' key={i}>
                            <div className="d-flex flex-column w-100">

                                <p className=''> {e.alternative} </p>

                            </div>
                            <div className="d-flex gap-1 w-25 align-items-center">
                                <button className="btn btn-sm btn-success w-50" onClick={() => {
                                    setPost(true);
                                    setEdit(e._id)
                                    setFormData({
                                        ...formData,

                                        alternative: e.alternative

                                    });

                                }}    >Edit</button>
                                <button className="btn btn-sm btn-danger w-50" onClick={() => removeAlterNative(e._id)}   > Delete</button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AlterNative;
