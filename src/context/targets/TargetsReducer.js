import { 
  ADD_TARGET, 
  COMPLETE_TARGET, 
  EDIT_TARGET, 
  REMOVE_TARGET, 
  SET_TARGET_EXPIRED, 
  SHOW_TARGET_DETAILS 
} from "./types";

export const targetsReducer = (state, action) => {
  switch (action.type) {
    case ADD_TARGET: {
      return {
        ...state,
        targets: [
          ...state.targets,
          action.target,
        ]
      }
    };
    case EDIT_TARGET: {
      const editedTarget = {id: action.id, ...action.targetData};
      return {
        ...state,
        targets: state.targets.map(target => target.id === action.id ? editedTarget : target),
        viewedTarget: editedTarget,
      }
    };
    case REMOVE_TARGET: {
      return {
        ...state,
        targets: state.targets.filter(target => target.id !== action.id),
      }
    };
    case SET_TARGET_EXPIRED: {
      return {
        ...state,
        targets: state.targets.map(target => {
          if (target.id === action.id) {
            return {
              ...target,
              isExpired: true
            }
          } else {
            return target
          }
        })
      }
    };
    case COMPLETE_TARGET: {
      const targetsCopy = [...state.targets];
      targetsCopy.forEach(target => {
        target.id === action.id ? target.isCompleted = !target.isCompleted : null
      });
      return {
        ...state,
        targets: targetsCopy
      }
    };
    case SHOW_TARGET_DETAILS: {
      return {
        ...state,
        viewedTarget: state.targets.find(target => target.id === action.id),
      }
    };
    default:
      return state;
  }
}
