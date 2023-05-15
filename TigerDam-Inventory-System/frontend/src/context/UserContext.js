import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((w) => w._id !== action.payload._id),
      };
    case "GET_SINGLE_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "EDIT_USER":
      const editedUser = action.payload;
      const editedUserIndex = state.users.findIndex(
        (user) => user._id === editedUser._id
      );
      const newUsers = [...state.users];
      newUsers[editedUserIndex] = editedUser;
      return {
        users: newUsers,
      };
    case "SEARCH_USERS":
      const { query } = action.payload;

      const matchingUsers = state.users.filter((user) =>
        user.username.includes(query)
      );
      return {
        users: matchingUsers,
      };

    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(usersReducer, {
    users: [],
  });

  return (
    <UsersContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
