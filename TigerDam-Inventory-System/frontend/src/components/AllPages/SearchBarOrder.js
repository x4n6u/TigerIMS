import React, { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../../context/OrderContext";

const SearchBarOrder = () => {
  const [query, setQuery] = useState("");
  const { orderDispatch: dispatch } = useContext(OrdersContext);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query === "") {
        const fetchOrders = async () => {
          const response = await fetch(
            "https://tiger-inventory-backend.onrender.com/api/order"
          );
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: "SET_ORDERS", payload: json });
          }
        };
        fetchOrders();
      } else {
        dispatch({ type: "SEARCH_ORDERS", payload: { query } });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      const newQuery = event.target.value;
      setQuery(newQuery);
      dispatch({ type: "SEARCH_ORDERS", payload: { query } });
    }
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBarOrder;
