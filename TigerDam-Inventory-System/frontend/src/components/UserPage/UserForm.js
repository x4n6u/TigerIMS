import { Button, notification, Form, Input } from "antd";
import { useState } from "react";
import { useUsersContext } from "../../hooks/useUserContext";

const UserForm = () => {
  const { userDispatch } = useUsersContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Sucessfully added new User",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password, isAdmin, isActive };

    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/user",
      {
        method: "POST",
        body: JSON.stringify(user),
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
      setUsername("");
      setPassword("");
      setIsAdmin(false);
      setIsActive(false);
      setError(null);
      openNotification();
      userDispatch({ type: "CREATE_USER", payload: json });
    }
  };

  return (
    <Form className="create" onSubmit={handleSubmit}>
      <Form.Item label="Username:" required>
        <Input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </Form.Item>
      <Form.Item label="Password:" required>
        <Input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Item>
      <div>
        <Form.Item
          label="Admin Privileges:"
          required
          style={{ width: "50%", float: "left" }}
        >
          <Input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Item>
        <Form.Item
          label="Unlock:"
          required
          style={{ width: "50%", float: "left" }}
        >
          <Input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Form.Item>
      </div>

      <Button type="primary" onClick={handleSubmit}>
        Add User
      </Button>
      {error && <div className="error">{error} </div>}
    </Form>
  );
};

export default UserForm;
