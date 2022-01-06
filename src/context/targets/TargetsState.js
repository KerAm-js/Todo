import React, { useReducer } from "react";
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
import { TargetsContext } from "./TargetsContext";
import { targetsReducer } from "./TargetsReducer";
import { DB } from "../../backend/db";

const TargetsState = ({children}) => {

  const initialState = {
    targets: [],
    viewedTarget: null,
  }

  const [state, dispatch] = useReducer(targetsReducer, initialState);

  const getTargetsFromLocalDB = async () => {
    try {
      const targets = await DB.getTargets();
      targets.forEach(target => dispatch({type: ADD_TARGET, target}))
    } catch (e) {
      console.log(e);
    }
  }

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

  const addTarget = async target => {
    try {
      const id = await DB.addTarget(target);
      dispatch({type: ADD_TARGET, target: {...target, id}});
      setTargetExpired(target.id, target.finishTime);
    } catch (e) {
      console.log(e);
    }
  }

  const editTarget = async (id, targetData) => {
    try {
      await DB.editTarget(targetData);
      dispatch({type: EDIT_TARGET, id, targetData});
      setTargetExpired(id, targetData.finishTime);
    } catch (e) {
      console.log(e)
    }
  } 

  const removeTarget = async id => {
    try {
      await DB.deleteTarget(id);
      dispatch({type: REMOVE_TARGET, id});
    } catch (e) {
      console.log(e)
    }
  }

  const completeTarget = async id => {
    try {
      let isCompletedValue;
      let targetsCopy;
      if (!!state.targets.length) {
        targetsCopy = state.targets.map(target => {
          const isCompleted = target.isCompleted;
          if (target.id === id) {
            target.isCompleted = !isCompleted;
            isCompletedValue = !isCompleted;
          }
          return target;
        })
        await DB.completeTarget(id, isCompletedValue);
        dispatch({type: COMPLETE_TARGET, targets: targetsCopy});
      }
    } catch (e) {
      console.log(e);
    }
  }

  const showTargetDetails = (id, navigation) => {
    dispatch({type: SHOW_TARGET_DETAILS, id});
    navigation.navigate("TargetViewing");
  }

  const setTargetExpired = async (id, end) => {
    try {

    } catch (e) {
      console.log(e);
    }
    const finishTime = new Date(end)
    const deadline = new Date(end);
    deadline.setDate(finishTime.getDate() + 1);
    if (id && end) {
      setTimeout(() => {
        dispatch({type: SET_TARGET_EXPIRED, id});
      }, deadline - new Date());
    }
  }

  const findExpiredTargets = async () => {
    try {
      state.targets.forEach(async target => {
        if (target.finishTime) {
          const finish = new Date(target.finishTime);
          finish.setDate(finish.getDate() + 1);
          const currentDate = new Date();
          if (finish < currentDate && !target.isExpired) {
            await DB.setTargetExpired(target.id);
            dispatch({type: SET_TARGET_EXPIRED, id: target.id});
          }
        }
      })
    } catch (e) {
      console.log(e);
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
      getTargetsFromLocalDB,
      findExpiredTargets,
    }}>
      {children}
    </TargetsContext.Provider>
  )
}

export default TargetsState;