import React, { useReducer } from "react";
import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, UPLOAD_NOTES } from "./types";
import { NotesContext } from "./NotesContext";
import { notesReducer } from "./NotesReducer";


const NotesState = ({children}) => {
  const initialState = {
    notes: [],
  }

  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNote = () => dispatch({type: ADD_NOTE});
  const removeNote = id => dispatch({type: REMOVE_NOTE, id});
  const updateNote = (id, text) => dispatch({type: UPDATE_NOTE, id, text});
  const uploadNotes = notes => dispatch({type: UPLOAD_NOTES, notes});

  return (
    <NotesContext.Provider value={{
      state,
      addNote,
      updateNote,
      removeNote,
      uploadNotes,
    }}>
      {children}
    </NotesContext.Provider>
  )
};

export default NotesState;
