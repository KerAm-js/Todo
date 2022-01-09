import React, { useReducer } from "react";
import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, UPLOAD_NOTES } from "./types";
import { NotesContext } from "./NotesContext";
import { notesReducer } from "./NotesReducer";
import { DB } from "../../backend/db";


const NotesState = ({children}) => {
  const initialState = {
    notes: [],
  }

  const [state, dispatch] = useReducer(notesReducer, initialState);

  const getNotesFromLocalDB = async () => {
    try {
      dispatch({type: UPLOAD_NOTES, notes: []});
      const notes = await DB.getNotes();
      dispatch({type: UPLOAD_NOTES, notes});
    } catch (e) {
      console.log(e);
    }
  }

  const addNote = async () => {
    try {
      const id = await DB.addNote();
      dispatch({type: ADD_NOTE, id});
    } catch (e) {
      console.log(e)
    }
  };
  const removeNote = async id => {
    try {
      await DB.deleteNote(id);
      dispatch({type: REMOVE_NOTE, id});
    } catch (e) {
      console.log(e)
    }
  };
  const updateNote = async (id, text) => {
    try {
      await DB.editNote(id, text);
      dispatch({type: UPDATE_NOTE, id, text});
    } catch (e) {
      console.log(e);
    }
  };
  const uploadNotes = async notes => {
    try {
      if (!notes) {
        dispatch({type: UPLOAD_NOTES, notes: []});
      } else {
        if (notes.length > 0) {
          await DB.deleteAllNotes();
          dispatch({type: UPLOAD_NOTES, notes: []});
          notes.forEach(async note => {
            const result = await DB.addNote(note);
            const id = await result;
            dispatch({type: ADD_NOTE, id, text: note.text});
          });
        }
        dispatch({type: UPLOAD_NOTES, notes});
      }
    } catch (e) {
      console.log(e);
    }
  }

  const deleteAllNotes = async () => {
    try {
      await DB.deleteAllNotes();
      dispatch({type: UPLOAD_NOTES, notes: []});
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <NotesContext.Provider value={{
      state,
      addNote,
      updateNote,
      removeNote,
      uploadNotes,
      getNotesFromLocalDB,
      deleteAllNotes,
    }}>
      {children}
    </NotesContext.Provider>
  )
};

export default NotesState;
