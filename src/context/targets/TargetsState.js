import React, { useReducer } from "react";
import { 
  ADD_TARGET, 
  COMPLETE_TARGET, 
  EDIT_TARGET, 
  REMOVE_TARGET, 
  SET_TARGET_EXPIRED, 
  SHOW_TARGET_DETAILS, 
  UPLOAD_TARGETS 
} from "./types";
import { TargetsContext } from "./TargetsContext";
import { targetsReducer } from "./TargetsReducer";

const TargetsState = ({children}) => {

  const initialState = {
    targets: [
      {
        id: `0_${new Date()}`,
        title: 'Цель 1',
        description: null,
        finishTime: new Date(2022, 10, 10).toString(),
        isCompleted: false,
        isExpired: false,
      }
    ],
    viewedTarget: null,
  }

  const [state, dispatch] = useReducer(targetsReducer, initialState);

  const uploadTargets = targets => {
    targets.forEach(target => {
      const currentDate = new Date();
      const deadline = new Date(target.finishTime);
      deadline.setDate(deadline.getDate() + 1);
      if (currentDate > deadline) {
        target.isExpired = true;
      };
    })
    dispatch({type: UPLOAD_TARGETS, targets})
  };

  const addTarget = target => {
    dispatch({type: ADD_TARGET, target});
    setTargetExpired(target.id, target.finishTime);
  }
  const editTarget = (id, targetData) => {
    dispatch({type: EDIT_TARGET, id, targetData});
    setTargetExpired(id, targetData.finishTime);
  } 

  const removeTarget = id => {
    dispatch({type: REMOVE_TARGET, id});
  }

  const completeTarget = id => {
    dispatch({type: COMPLETE_TARGET, id});
  }

  const showTargetDetails = (id, navigation) => {
    dispatch({type: SHOW_TARGET_DETAILS, id});
    navigation.navigate("TargetViewing");
  }

  const setTargetExpired = (id, end) => {
    const finishTime = new Date(end)
    const deadline = new Date(end);
    deadline.setDate(finishTime.getDate() + 1);
    if (id && end) {
      setTimeout(() => {
        dispatch({type: SET_TARGET_EXPIRED, id});
      }, deadline - new Date());
    }
  }

  return (
    <TargetsContext.Provider value={{
      state,
      addTarget,
      editTarget,
      removeTarget,
      completeTarget,
      showTargetDetails,
      setTargetExpired,
      uploadTargets,
    }}>
      {children}
    </TargetsContext.Provider>
  )
}

export default TargetsState;