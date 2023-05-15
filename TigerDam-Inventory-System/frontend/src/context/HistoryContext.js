import { createContext, useReducer } from "react";

export const HistoryContext = createContext();

export const historyReducer = (state, action) => {
  switch (action.type) {
    case "SET_HISTORY":
      return {
        history: action.payload,
      }; 
      case "SEARCH_HISTORY":
        const { query } = action.payload;
      
        const matchingItems = state.history.filter((record) => {
          const regex = new RegExp(query, "i");
          return (
            record.name.match(regex) ||
            record.objectType.match(regex) ||
            record.actionType.match(regex)
          );
        });
      
        return {
          ...state,
          history: matchingItems,
        };
    default:
      return state;
  }
};

export const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, {
    history: [],
  });

  return (
    <HistoryContext.Provider value={{ ...state,dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};
