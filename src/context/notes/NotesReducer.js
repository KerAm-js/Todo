import { 
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
} from "./types";

export const notesReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: `${state.notes.length}_${new Date()}`,
            text: "",
          },
        ]
      }
    };
    case UPDATE_NOTE: {
      const editedNote = {id: action.id, text: action.text};
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.id ? editedNote : note)
      }
    };
    case REMOVE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id),
      }
    }
    default:
      return state;
  }
}