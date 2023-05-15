import { Layout, Card, Row, Col, Tag, Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useUsersContext } from "../hooks/useUserContext";
import UserForm from "../components/UserPage/UserForm";
import UserDetails from "../components/UserPage/UserDetails";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import SearchBar from "../components/AllPages/SearchBar";
import "../css/Users.css";

const Users = () => {
  const { users, userDispatch } = useUsersContext();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://tiger-inventory-backend.onrender.com/api/user"
      );
      const json = await response.json();

      if (response.ok) {
        userDispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, [userDispatch]);

  const { Meta } = Card;
  // Global Vars
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);

  // Handle Create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Handle Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const showEditModal = (userId) => {
    setSelectedUserId(userId);
    setIsEditOpen(true);
  };
  const handleEditOk = () => {
    setIsEditOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditOpen(false);
  };
  // Handle Delete
  // const handleDelete = async () => {
  //   const response = await fetch(
  //     "https://tiger-inventory-backend.onrender.com/api/user/" + selectedUserId,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  //   const json = await response.json();

  //   if (response.ok) {
  //     userDispatch({ type: "DELETE_USER", payload: json });
  //   }
  //   setIsEditOpen(false);
  // };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const response = await fetch(
          "https://tiger-inventory-backend.onrender.com/api/user/" +
            selectedUserId,
          {
            method: "DELETE",
          }
        );
        const json = await response.json();

        if (response.ok) {
          userDispatch({ type: "DELETE_USER", payload: json });
          setIsEditOpen(false);
          openNotification();
        }
      },
    });
  };

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Successfully Deleted User",
    });
  };

  return (
    <Layout>
      <TopBar />
      <Layout
        className="Users_Background"
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBar curr={"4"} />
        <Layout className="Users_Content">
          <Row className="Users_TopBox">
            <Col span={12}>
              <SearchBar className="Items_SearchBar" />
            </Col>
            <Col span={4} offset={8}>
              <Button
                className="Items_CreateButton"
                type="primary"
                onClick={showModal}
              >
                Create User
              </Button>
            </Col>
          </Row>
          <div className="Users_List">
            {users.map((user) => {
              let adminColor;
              let adminLabel;
              let activeColor;
              let activeLabel;
              if (user.isAdmin) {
                adminColor = "green";
                adminLabel = "ADMIN";
              } else {
                adminColor = "blue";
                adminLabel = "USER";
              }

              if (user.isActive) {
                activeColor = "green";
                activeLabel = "ACTIVE";
              } else {
                activeColor = "volcano";
                activeLabel = "INACTIVE";
              }
              return (
                <Card
                  key={user._id}
                  className="Users_Card"
                  onClick={() => showEditModal(user._id)}
                  hoverable
                  style={{
                    width: 200,
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://media.discordapp.net/attachments/1062056779137159178/1096959236115808337/FDCA4544-1F66-439C-884B-A9B9CB429BFE.jpg?width=464&height=619"
                    />
                  }
                >
                  <Meta
                    className="Users_Meta"
                    title={user.username}
                    description={
                      <div>
                        <Tag color={activeColor}>{activeLabel}</Tag>
                        <Tag color={adminColor}>{adminLabel}</Tag>
                      </div>
                    }
                  />
                </Card>
              );
            })}
          </div>
          <Modal
            title={"Add a new User"}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <UserForm />
          </Modal>
          <Modal
            title={"User Details:"}
            open={isEditOpen}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
            footer={[
              <Button
                className="Users_CreateButton"
                key={"delete"}
                type="primary"
                onClick={handleDelete}
              >
                Delete User
              </Button>,
            ]}
          >
            <UserDetails userId={selectedUserId} />
          </Modal>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Users;
