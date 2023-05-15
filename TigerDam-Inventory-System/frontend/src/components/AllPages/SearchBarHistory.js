import React, { useContext, useState, useEffect } from "react";
import { HistoryContext } from "../../context/HistoryContext";

const SearchBarHistory = () => {
  const [query, setQuery] = useState("");
  const { dispatch } = useContext(HistoryContext);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query === "") {
        const fetchHistory = async () => {
          const response = await fetch(
            "https://tiger-inventory-backend.onrender.com/api/history"
          );
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: "SET_HISTORY", payload: json });
          }
        };
        fetchHistory();
      } else {
        dispatch({ type: "SEARCH_HISTORY", payload: { query } });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      const newQuery = event.target.value;
      setQuery(newQuery);
      dispatch({ type: "SEARCH_HISTORY", payload: { query } });
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

export default SearchBarHistory;
