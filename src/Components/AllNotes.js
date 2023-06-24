import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote, updateNote } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useForm } from "react-hook-form";
import { addNote } from '../Redux/action';
import NavBar from './NavBar'

export default function AllNotes() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { register, handleSubmit, formState: { errors }, } = useForm({});
  // let [dataLoaded, setData] = useState('no')
  let dataLoaded = 'no'
  let breakMe = 'no'
  let toBeDel = 0

  const skipLastWord = (sentence) => {
    var words = sentence.split(' ');
    words.pop();
    var result = words.join(' ')
    return result;
  }

  useEffect(() => {
    if (dataLoaded === 'no') {
      dataLoaded = 'yes'
      for (var i = 0; i < localStorage.length; i++) {
        var key = skipLastWord(localStorage.key(i))

        var value = localStorage.getItem(localStorage.key(i));
        // console.log('Iteration', i + 1, ':', key + ': ' + value);

        notes.map((note) => {
          if (note.title == key || note.content == value)
            breakMe = 'yes'
        })
        if (breakMe == 'yes') {
          break
        }
        dispatch(addNote(key, value));
      }
    }
  }, []);

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdateNote = (e) => {
    dispatch(updateNote(editNoteId, editTitle, editContent));
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).split(" ").slice(-1)[0] == editNoteId) {
        toBeDel = i
        break
      }
    }
    localStorage.removeItem(localStorage.key(toBeDel))
    localStorage.setItem(editTitle + " " + editNoteId, editContent)
    setEditNoteId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleDeleteNote = (id) => {
    dispatch(removeNote(id));
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).split(" ").slice(-1)[0] == id) {
        toBeDel = i
        break
      }

    }
    console.log(localStorage.key(toBeDel))
    localStorage.removeItem(localStorage.key(toBeDel))
    //setNoOfNotes(noOfNotes--);
    // localStorage.setItem("noOfNotes", noOfNotes)
  };

  const homeButton = <button className="button-29" role="button" onClick={() => navigate("/")}>Home</button>

  return (
    <>
      <NavBar elementProp={homeButton}/>
      <main>
        <div className="notes-container">
          {notes.map((note) => (
            <div className="card" key={note.id}>
              <div className="card-body">
                {editNoteId === note.id ? (
                  <form onSubmit={handleSubmit(handleUpdateNote)}>
                    <div className="form-group">
                      <label htmlFor="editTitle">Title:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editTitle"
                        {...register("title", { required: true })}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />

                      {errors.title && errors.title.type === "required" && (
                        <div class="alert alert-danger" role="alert">
                          Title cannot be empty
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="editContent">Content:</label>
                      <textarea
                        className="form-control"
                        id="editContent"
                        rows="3"
                        value={editContent}
                        {...register("content", { required: true })}
                        onChange={(e) => setEditContent(e.target.value)}
                      ></textarea>
                      {errors.content && errors.content.type === "required" && (
                        <div class="alert alert-danger" role="alert">
                          Content cannot be empty
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditNoteId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <div className="card-buttons">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditNote(note)}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2023 Notes App by AK. All rights reserved.</p>
      </footer>
    </>
  );
}
