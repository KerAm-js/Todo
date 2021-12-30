import React, { useReducer } from "react";
import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from "./types";
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

  return (
    <NotesContext.Provider value={{
      state,
      addNote,
      updateNote,
      removeNote,
    }}>
      {children}
    </NotesContext.Provider>
  )
};

export default NotesState;
