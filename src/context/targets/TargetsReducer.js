import { 
  ADD_TARGET, 
  COMPLETE_TARGET, 
  EDIT_TARGET, 
  FIND_EXPIRED_TARGETS, 
  GET_TARGETS_FROM_LOCAL_DB, 
  REMOVE_TARGET, 
  SET_TARGET_EXPIRED, 
  SHOW_TARGET_DETAILS, 
  UPLOAD_TARGETS
} from "./types";

export const targetsReducer = (state, action) => {
  switch (action.type) {
    case GET_TARGETS_FROM_LOCAL_DB: {
      return {
        ...state,
        targets: action.targets,
      }
    };
    case UPLOAD_TARGETS: {
      return {
        targets: [...action.targetsList],
        viewedTarget: null,
      }
    };
    case ADD_TARGET: {
      let targetsCopy = [...state.targets];
      const newTarget = action.target;

      if (newTarget.finishTime) {
        let indexOfNewTarget;
        let firstPartOfArray;
        let secondPartOfArray;

        let targetsWithFinish = targetsCopy.filter(target => target.finishTime);

        if (targetsWithFinish.length > 0) {
          indexOfNewTarget = targetsCopy.findIndex(target => (
            new Date(target.finishTime) >= new Date(newTarget.finishTime)
          ))
          if (indexOfNewTarget === -1) {
            indexOfNewTarget = targetsWithFinish.length;
          }

          firstPartOfArray = targetsCopy.slice(0, indexOfNewTarget );
          secondPartOfArray = targetsCopy.slice(indexOfNewTarget);
          targetsCopy = [...firstPartOfArray, newTarget, ...secondPartOfArray];
        } else {
          targetsCopy.unshift(newTarget);
        }
      } else {
        targetsCopy.push(newTarget);
      }

      return {
        ...state,
        targets: targetsCopy,
      };
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
              isExpired: 1,
            }
          } else {
            return target
          }
        })
      }
    };
    case COMPLETE_TARGET: {
      return {
        ...state,
        targets: action.targets,
      }
    };
    case SHOW_TARGET_DETAILS: {
      return {
        ...state,
        viewedTarget: state.targets.find(target => target.id === action.id),
      }
    };
    case FIND_EXPIRED_TARGETS: {
      const targetsCopy = state.targets.map(target => {
        const finish = new Date(target.finishTime);
        const currentDate = new Date();
        if (finish < currentDate) {
          target.isExpired = 1;
        }
        return target;
      });
      return {
        ...state,
        targets: targetsCopy,
      }
    };
    default:
      return state;
  }
}
