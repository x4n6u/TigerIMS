import { createContext, useReducer } from "react";

export const OrdersContext = createContext();

export const ordersReducer = (state, action) => {
  console.log("Inside Reducer")
  switch (action.type) {
    case "SET_ORDERS":
      return {
        orders: action.payload,
      };
    case "CREATE_ORDER":
      return {
        orders: [action.payload, ...state.orders],
      };
    case "DELETE_ORDER":
      return {
        orders: state.orders.filter((w) => w._id !== action.payload._id),
      };
    case "FULFILL_ORDER":
      return {
        orders: state.orders.filter((w) => w._id !== action.payload._id),
      };
    case "GET_SINGLE_ORDER":
      return {
        orders: [action.payload, ...state.orders],
      };
    case "EDIT_ORDER":
      console.log("Inside Edit Order case statment")
      const editedOrder = action.payload;
      // console.log("This is the new pulled Order")
      // console.log(editedOrder)
      const editedOrderIndex = state.orders.findIndex(
        (order) => order._id === editedOrder._id
      );
      const newOrders = [...state.orders];
      newOrders[editedOrderIndex] = editedOrder;
      // console.log("This is the updated Order")
      // console.log(newOrders)
      return {
        orders: newOrders,
      };
    case "SEARCH_ORDERS":
      const { query } = action.payload;

      const matchingOrders = state.orders.filter((order) =>
        order.orderName.includes(query)
      );
      return {
        orders: matchingOrders,
      };

    default:
      return state;
  }
};

export const OrdersContextProvider = ({ children }) => {
  const [state, orderDispatch] = useReducer(ordersReducer, {
    orders: [],
  });

  return (
    <OrdersContext.Provider value={{ ...state, orderDispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};
