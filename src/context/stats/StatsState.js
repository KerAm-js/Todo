import React, { useReducer } from "react";
import { StatsContex } from "./StatsContext";
import { statsReducer } from "./StatsReducer";


const StatisticsState = ({children}) => {
  const initialState = {
    
  }

  const [state, dispatch] = useReducer(statsReducer, initialState);

  return (
    <StatsContex.Provider value={{
      
    }}>
      {children}
    </StatsContex.Provider>
  )
};

export default StatisticsState;
