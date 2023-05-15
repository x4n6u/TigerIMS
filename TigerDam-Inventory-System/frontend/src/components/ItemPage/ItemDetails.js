import { useItemsContext } from "../../hooks/useItemContext";
import { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";

const ItemDetails = ({ itemId }) => {
  const { itemDispatch } = useItemsContext();
  const [item, setItem] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    description: "",
    quantity: "",
    unitPrice: "",
    min: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(
        "https://tiger-inventory-backend.onrender.com/api/item/" + itemId
      );
      const fetchedItem = await response.json();
      setItem(fetchedItem);
      setEditedItem(fetchedItem);
    };
    fetchItem();
  }, [itemId]);

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Successfully Editted Item",
    });
  };

  const handleSave = async () => {
    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/item/" + itemId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      }
    );

    if (response.ok) {
      itemDispatch({ type: "EDIT_ITEM", payload: editedItem });
      openNotification();
    }
  };

  const handleChange = (e) => {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value,
    });
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-details">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Item label="Name:" required>
          <Input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Quantity:" required>
          <Input
            type="number"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Unit Price:" required>
          <Input
            type="number"
            name="unitPrice"
            value={editedItem.unitPrice}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description:" required>
          <Input
            type="text"
            name="description"
            value={editedItem.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Low Threshold:"
          tooltip="LOW will be displayed if quantity is lower than this threshold"
        >
          <Input
            type="number"
            name="min"
            value={editedItem.min}
            onChange={handleChange}
          />
        </Form.Item>
        <Button type="primary" className="Items_Button" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ItemDetails;
