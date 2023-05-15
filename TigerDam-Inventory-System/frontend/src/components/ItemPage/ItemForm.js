import { Button, notification, Form, Input } from "antd";
import { useState } from "react";
import { useItemsContext } from "../../hooks/useItemContext";
import "../../css/Items.css";

const ItemForm = () => {
  const { itemDispatch } = useItemsContext();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDesc] = useState("");
  const [sku, setSku] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [min, setMin] = useState("");
  const [error, setError] = useState(null);

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Sucessfully added new Item",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = { sku, quantity, description, name, unitPrice, min };

    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/item",
      {
        method: "POST",
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
      setName("");
      setQuantity("");
      setDesc("");
      setSku("");
      setUnitPrice("");
      setMin("");
      setError(null);
      openNotification();
      itemDispatch({ type: "CREATE_ITEM", payload: json });
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <Form.Item label="Item Name:" required>
        <Input
          className="Item_Input"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Item>
      <Form.Item label="Quantity:" required>
        <Input
          className="Item_Input"
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
      </Form.Item>
      <Form.Item label="Description:" required>
        <Input
          className="Item_Input"
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={description}
        />
      </Form.Item>
      <Form.Item label="Sku:" required tooltip="Stock-Keeping Unit">
        <Input
          className="Item_Input"
          type="number"
          onChange={(e) => setSku(e.target.value)}
          value={sku}
        />
      </Form.Item>
      <Form.Item label="Unit Price:" required>
        <Input
          className="Item_Input"
          type="number"
          onChange={(e) => setUnitPrice(e.target.value)}
          value={unitPrice}
        />
      </Form.Item>
      <Form.Item
        label="Low Threshold:"
        tooltip="LOW will be displayed if quantity is lower than this threshold"
      >
        <Input
          className="Item_Input"
          type="number"
          onChange={(e) => setMin(e.target.value)}
          value={min}
        />
      </Form.Item>
      <Button type="primary" className="Items_Button" onClick={handleSubmit}>
        Add Item
      </Button>
      {error && <div className="error">{error} </div>}
    </Form>
  );
};

export default ItemForm;
