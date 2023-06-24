import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addNote } from "../Redux/action";
import "./form.css";
import { useForm } from "react-hook-form";
import NavBar from './NavBar'

const NotesForm = () => {
  const notes = useSelector((state) => state.notes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // let { noOfNotes, setNoOfNotes } = useContext(NotesContext);

  // localStorage.setItem('noOfNotes',noOfNotes)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let keyID = 0;
  const handleSubmission = () => {
    keyID = notes.length + 1;
    dispatch(addNote(title, content));
    localStorage.setItem(title + " " + keyID, content);
    setTitle("");
    setContent("");
    navigate("/allNotes");
    // setNoOfNotes(noOfNotes++);
    // localStorage.setItem("noOfNotes",noOfNotes)
  };

  return (
  <>
    <NavBar/>
    <div className="d-flex justify-content-between flex-wrap ps-3 pt-3 pe-3 mainDiv">
      <div className=" d-flex justify-content-center flex-column left-sec p-2">
        <h1>MY NOTES</h1>
        <h3>CREATED USING</h3>
        <h4>REACT - REDUX</h4>
      </div>

      <div className="notesFormContainer ">
        <div className="notesForm">
          <h3 className="notesForm__title">Write Your Note Here</h3>
          <form className="formSub" onSubmit={handleSubmit(handleSubmission)}>
            <div className="notesForm__inputGroup">
              <label className="notesForm__label">Title:</label>
              <input
                className="notesForm__input"
                type="text"
                name="title"
                {...register("title", { required: true })}
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="alertdiv">
                {errors.title && errors.title.type === "required" && (
                  <div class="alert alert-danger" role="alert">
                    Title cannot be empty
                  </div>
                )}
              </div>
            </div>
            <div className="notesForm__inputGroup">
              <label className="notesForm__label">Content:</label>
              <textarea
                className="notesForm__input"
                name="content"
                {...register("content", { required: true, min: 5 })}
                value={content}
                placeholder="Enter content"
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="alertdiv">
                {errors.content && errors.content.type === "required" && (
                  <div class="alert alert-danger" role="alert">
                    Content cannot be empty
                  </div>
                )}
              </div>
            </div>
            <button className="notesForm__button" role="button">
              Add Note
            </button>
          </form>
          <div className="notesForm__footer">
            <Link to="/allNotes" className="notesForm__link">
              View All Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotesForm;
