import React, { useContext, useState, useEffect } from "react";
import { ItemsContext } from "../../context/ItemContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { itemDispatch: dispatch } = useContext(ItemsContext);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query === "") {
        const fetchItems = async () => {
          const response = await fetch(
            "https://tiger-inventory-backend.onrender.com/api/item"
          );
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: "SET_ITEMS", payload: json });
          }
        };
        fetchItems();
      } else {
        dispatch({ type: "SEARCH_ITEMS", payload: { query } });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      const newQuery = event.target.value;
      setQuery(newQuery);
      dispatch({ type: "SEARCH_ITEMS", payload: { query } });
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

export default SearchBar;
