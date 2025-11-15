import axios from "axios";
import React, { useState } from "react";
import { useGlobalSkills } from "../context/skillContext";

const ImportantNote = () => {
  const { importantNote, updatedAdArray } = useGlobalSkills()

  const initialState = {
    title:"",
    SattaKingImportantNote: "",
    validation: false
  };
  const [post, setPost] = useState(false);
  const [edit, setEdit] = useState("")
  const [formData, setFormData] = useState(initialState);

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
      if (edit === "") { // Corrected comparison operator
        const res = await axios.post(
          `${process.env.REACT_APP_API}importantNote`,
          formData
        );
        if (res.status === 200) {
          setFormData(initialState);
          setPost(false);
          setEdit(""); // Make sure setEdit is called correctly
          const updateArrays = [res.data, ...importantNote];
          updatedAdArray(updateArrays, 'IMPORTANT_NOTE');
        }
      } else {
        const res = await axios.put(
          `${process.env.REACT_APP_API}importantNote/${edit}`,
          formData
        );
        if (res.status === 200) {
          setFormData(initialState);
          setPost(false);
          const afterDelete = importantNote.filter(e => e._id !== edit);
          const updateArrays = [res.data, ...afterDelete];
          setEdit(""); // Make sure setEdit is called correctly
          updatedAdArray(updateArrays, 'IMPORTANT_NOTE'); // No need to spread the array again
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const toggleValidation = () => {
    setFormData({
      ...formData,
      validation: !formData.validation
    });
  };

  return (
    <>  {post && <div style={{ background: "rgba(0,0,0,0.6)" }} className="position-fixed start-0  w-100 h-100 top-0 d-flex justify-content-center align-items-center py-3 px-5 rounded">
      
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="SattaKingImportantNote">Write Your important note text below</label>
          <textarea
            className="form-control"
            id="SattaKingImportantNote"
            name="SattaKingImportantNote"
            rows="4"
            value={formData.SattaKingImportantNote}
            onChange={handleChange}
            
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
        {importantNote && importantNote.map((e, i) => {
          return (
            <div style={{ border: "4px solid var(--myTheme-color)" }} className='  py-4 px-5 rounded-2 m-auto my-2 d-flex' key={i}>
              <div className="d-flex flex-column w-100">

                <h6 className=''> {e.SattaKingImportantNote} </h6>

                <p style={{ color: "red" }} className='fw-bold'> {e.name} </p>
              </div>
              <div className="d-flex gap-1 w-25 align-items-center">
                <button className="btn btn-sm btn-success w-50" onClick={() => {
                  setPost(true);
                  setEdit(e._id)
                  setFormData({
                    ...formData,
                    title:e.title,
                    SattaKingImportantNote: e.SattaKingImportantNote,
                    validation: e.validation

                  });

                }}    >Edit</button>
                <button className="btn btn-sm btn-danger w-50" onClick={async () => {
                  try {
                    const res = await axios.delete(
                      `${process.env.REACT_APP_API}movement/${e._id}`,
                    );
                    if (res.status === 200) {
                      const afterDelete = importantNote.filter(advertise => advertise._id !== e._id)
                      updatedAdArray([...afterDelete], 'MOVEMENT')

                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}   > Delete</button>
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImportantNote;
