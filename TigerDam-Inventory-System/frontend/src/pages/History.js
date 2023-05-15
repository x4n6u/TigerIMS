import { Layout, Button, Modal, Row, Col, Table, Tag, Space } from "antd";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import SearchBarHistory from "../components/AllPages/SearchBarHistory";
import "../css/Items.css";
import "../css/History.css";

import { HistoryContext } from "../context/HistoryContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
const History = () => {
  const { history, dispatch } = useContext(HistoryContext);

  useEffect(() => {
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
  }, [dispatch]);

  const columns = [
    {
      title: "Object Type",
      dataIndex: "objectTypex",
      key: "objectType",
      render: (_, { objectType }) => {
        return objectType.toUpperCase();
      },
      filters: [
        {
          text: "Item",
          value: "item",
        },
        {
          text: "Order",
          value: "order",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      onFilter: (value, record) => record.objectType === value,
    },
    {
      title: "Action Type",
      dataIndex: "actionTypex",
      key: "actionType",
      render: (_, { actionType }) => {
        return actionType.toUpperCase();
      },
      filters: [
        {
          text: "Created",
          value: "created",
        },
        {
          text: "Edited",
          value: "edited",
        },
        {
          text: "Deleted",
          value: "deleted",
        },
        {
          text: "Fulfilled",
          value: "fulfilled",
        },
      ],
      onFilter: (value, record) => record.actionType === value,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="Views_Button"
            onClick={() => showModal(record)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const renderModalContent = () => {
    if (!modalData) return null;

    const { objectType, actionType, userChanges, itemChanges, orderChanges } =
      modalData;

    const renderUserChanges = () => {
      return (
        <div>
          <h3>User Changes</h3>
          <p>Username: {userChanges.username}</p>
          <p>Is Admin: {userChanges.isAdmin ? "Yes" : "No"}</p>
        </div>
      );
    };

    const renderItemChanges = () => {
      return (
        <div>
          <h3>Item Changes</h3>
          <p>SKU: {itemChanges.sku}</p>
          <p>Quantity: {itemChanges.quantity}</p>
          <p>Description: {itemChanges.description}</p>
          <p>Name: {itemChanges.name}</p>
          <p>Unit Price: {itemChanges.unitPrice}</p>
        </div>
      );
    };

    const renderOrderChanges = () => {
      return (
        <div>
          <h3>Order Changes</h3>
          <p>
            Order Date: {new Date(orderChanges.orderDate).toLocaleDateString()}
          </p>
          <p>Order Name: {orderChanges.orderName}</p>
          <p>Is Fulfilled: {orderChanges.isFulfilled ? "Yes" : "No"}</p>
          <h4>Order Items:</h4>
          <ul>
            {orderChanges.orderItems.map((item) => (
              <li key={item.itemID}>
                {item.itemName} - Quantity: {item.itemQuantity}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    return (
      <div>
        <h2>
          {objectType.toUpperCase()} - {actionType.toUpperCase()}
        </h2>
        {objectType === "user" && renderUserChanges()}
        {objectType === "item" && renderItemChanges()}
        {objectType === "order" && renderOrderChanges()}
      </div>
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = (record) => {
    setModalData(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <TopBar />
      <Layout
        className="Items_Background"
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBar />
        <Layout className="Items_Content">
          <Row className="Items_TopBox">
            <Col span={12}>
              <SearchBarHistory className="Items_SearchBar" />
            </Col>
          </Row>

          <Layout className="Items_List">
            <Table
              className="Items_Table"
              columns={columns}
              dataSource={history}
              pagination={false}
              scroll={{ y: 650 }}
            />
          </Layout>
        </Layout>
      </Layout>
      <Modal
        title="History Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {renderModalContent()}
      </Modal>
    </Layout>
  );
};

export default History;
