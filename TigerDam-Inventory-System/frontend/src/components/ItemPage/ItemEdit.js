import { useState } from "react";
import { Button, notification } from "antd";

const ItemFormEdit = (id) => {
  // const { dispatch } = useItemsContext();
  const [name, setName, dispatch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(null);

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Editted Item",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = { quantity, name };

    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/item/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(item),
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
      setName(item.name);
      setQuantity(item.quantity);
      setError(null);
      console.log("New item added", json);
      dispatch({ type: "EDIT_ITEM", payload: json });
      openNotification();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Item Name</label>
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

      <Button className="Items_Button">Add Item</Button>
      {error && <div className="error">{error} </div>}
    </form>
  );
};

export default ItemFormEdit;
