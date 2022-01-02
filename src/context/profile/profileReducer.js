import { CREATE_USER, LOG_IN, LOG_OUT, EDIT_USER_DATA, SEND_ALL_DATA_TO_SERVER } from "./types";

export const profileReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER: {
      return {
        userData: {
          id: action.id,
          email: action.email,
          name: "",
          surname: "",
          age: "",
          place: "",
          job: "",
        },
        token: action.token,
      }
    };
    case EDIT_USER_DATA: {
      return {
        ...state,
        userData: {
          email: state.userData.email,
          ...action.userData
        }
      };
    };
    case LOG_IN: {
      return {
        ...state,
        userData: {
          ...action.userData,
        },
        token: action.token,
      };
    };
    case LOG_OUT: {
      return {
        userData: {
          email: "",
          name: "",
          surname: "",
          age: "",
          place: "",
          job: "",
        },
        token: null
      }
    };
    default:
      return state;
  }
}