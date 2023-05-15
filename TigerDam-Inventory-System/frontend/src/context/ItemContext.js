import { createContext, useReducer } from "react";

export const ItemsContext = createContext();

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        items: action.payload,
      };
    case "CREATE_ITEM":
      return {
        items: [action.payload, ...state.items],
      };
    case "DELETE_ITEM":
      return {
        items: state.items.filter((w) => w._id !== action.payload._id),
      };
    case "GET_SINGLE_ITEM":
      return {
        items: [action.payload, ...state.items],
      };
    case "EDIT_ITEM":
      const editedItem = action.payload;
      const editedItemIndex = state.items.findIndex(
        (item) => item._id === editedItem._id
      );
      const newItems = [...state.items];
      newItems[editedItemIndex] = editedItem;
      return {
        items: newItems,
      };
    case "SEARCH_ITEMS":
      const { query } = action.payload;

      const matchingItems = state.items.filter((item) =>
        item.name.includes(query)
      );
      return {
        items: matchingItems,
      };

    default:
      return state;
  }
};

export const ItemsContextProvider = ({ children }) => {
  const [state, itemDispatch] = useReducer(itemsReducer, {
    items: [],
  });

  return (
    <ItemsContext.Provider value={{ ...state, itemDispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
