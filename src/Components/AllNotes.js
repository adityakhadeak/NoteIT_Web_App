import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote, updateNote } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./AllNotes.css";
import { useForm } from "react-hook-form";
import { addNote } from '../Redux/action';
export default function AllNotes(props) {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  //const [deleteButtons, setDeleteButtons] = useState(document.querySelectorAll('.card .btn-danger'));
  
  


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
        var key = localStorage.key(i)
       
        var value = localStorage.getItem(localStorage.key(i));

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

  const handleDeleteNote = (id,title) => {
    dispatch(removeNote(id));
    localStorage.removeItem(title)
  };


  return (
    <>
      <main>
        <div className="notes-container">
          {notes.map((note) => (
            <div className="card" style={{ backgroundColor: props.mode === 'light' ? 'rgb(221, 232, 239)' : '#2e3438 ', color: props.mode === 'light' ? 'black' : 'white' }} key={note.id}>
              <div className="card-body">
                {editNoteId === note.id ? (
                  <form onSubmit={handleSubmit(handleUpdateNote)}>
                    <div className="form-group">
                      <label htmlFor="editTitle">Title:</label>
                      <input
                        type="text"
                        style={{ backgroundColor: props.mode === 'light' ? '#ffffff' : '#2e3438 ', color: props.mode === 'light' ? 'black' : 'white' }}
                        className="form-control"
                        id="editTitle"
                        {...register("title", { required: true })}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />

                      {errors.title && errors.title.type === "required" && (
                        <div className="alert alert-danger" role="alert">
                          Title cannot be empty
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="editContent">Content:</label>
                      <textarea
                        style={{ backgroundColor: props.mode === 'light' ? '#ffffff' : '#2e3438 ', color: props.mode === 'light' ? 'black' : 'white' }}

                        className="form-control"
                        id="editContent"
                        rows="3"
                        value={editContent}
                        {...register("content", { required: true })}
                        onChange={(e) => setEditContent(e.target.value)}
                      ></textarea>
                      {errors.content && errors.content.type === "required" && (
                        <div className="alert alert-danger" role="alert">
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
                        onClick={() => handleDeleteNote(note.id,note.title)}
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
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")} style={{ boxShadow: props.mode === 'light' ? 'rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset' : 'rgb(255 255 255 / 40%) 0 2px 4px, rgb(180 180 180 / 30%) 0 9px 13px -3px, rgb(163 171 220 / 50%) 0 -3px 0 inset' }} width="60" height="60" fill="white" className="bi bi-plus-circle-fill AddNote button-29" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>

      </main>
      
      <footer  style={{ color:props.mode==='light'?'black':'white' }}
>
        <p>&copy; 2023 Notes App by AK. All rights reserved.</p>
      </footer>
    </>
  );
}





