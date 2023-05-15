import { useState } from "react";
import { useOrdersContext } from "../hooks/useOrderContext";

const OrderFormEdit = (id) => {
  // const { dispatch } = useOrdersContext();
  const [name, setName, dispatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = { quantity, name };

    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/order/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName(order.name);
      setQuantity(order.quantity);
      setError(null);
      console.log("New order added", json);
      dispatch({ type: "EDIT_ITEM", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>asd</h3>

      <label>Order Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />

      <button>Add Order</button>
      {error && <div className="error">{error} </div>}
    </form>
  );
};

export default OrderFormEdit;
