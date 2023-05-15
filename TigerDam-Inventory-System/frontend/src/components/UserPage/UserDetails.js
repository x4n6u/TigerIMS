import { useUsersContext } from "../../hooks/useUserContext";
import { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";

const UserDetails = ({ userId }) => {
  const { userDispatch } = useUsersContext();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
    isActive: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://tiger-inventory-backend.onrender.com/api/user/" + userId
      );
      const fetchedUser = await response.json();
      setUser(fetchedUser);
      setEditedUser(fetchedUser);
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/user/" + userId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }
    );

    if (response.ok) {
      userDispatch({ type: "EDIT_USER", payload: editedUser });
      openNotification();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Successfully Editted User",
    });
  };

  return (
    <div className="user-details">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Item label="Username:" required>
          <Input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Password:" required>
          <Input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Admin Privileges:"
          required
          style={{ width: "50%", float: "left" }}
        >
          <Input
            type="checkbox"
            name="isAdmin" // Update this line
            checked={editedUser.isAdmin}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Unlock:"
          required
          style={{ width: "50%", float: "left" }}
        >
          <Input
            type="checkbox"
            name="isActive" // Update this line
            checked={editedUser.isActive === true}
            onChange={handleChange}
          />
        </Form.Item>
        <Button type="primary" className="Users_Button" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default UserDetails;
