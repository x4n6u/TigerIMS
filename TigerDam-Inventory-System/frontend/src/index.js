import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { ItemsContextProvider } from "./context/ItemContext";
import { OrdersContextProvider } from "./context/OrderContext";
import { UsersContextProvider } from "./context/UserContext";
import { HistoryContextProvider } from "./context/HistoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <OrdersContextProvider>
        <UsersContextProvider>
          <HistoryContextProvider>
            <App />
          </HistoryContextProvider>
        </UsersContextProvider>
      </OrdersContextProvider>
    </ItemsContextProvider>
  </React.StrictMode>
);
