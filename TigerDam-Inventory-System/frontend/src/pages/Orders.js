import {
  Layout,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Space,
  Tag,
  notification,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import OrderForm from "../components/OrderPage/OrderForm";
import { useOrdersContext } from "../hooks/useOrderContext";
import { useItemsContext } from "../hooks/useItemContext";
import { useEffect, useState } from "react";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import SearchBarOrder from "../components/AllPages/SearchBarOrder";
import "../css/Orders.css";

const Order = () => {
  const { items, itemDispatch } = useItemsContext();
  const { orders, orderDispatch } = useOrdersContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://tiger-inventory-backend.onrender.com/api/item"
      );
      const json = await response.json();

      if (response.ok) {
        itemDispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, [itemDispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderResponse = await fetch(
        "https://tiger-inventory-backend.onrender.com/api/order"
      );
      const json = await orderResponse.json();

      if (orderResponse.ok) {
        orderDispatch({ type: "SET_ORDERS", payload: json });
      }
    };

    fetchOrders();
  }, [orderDispatch]);

  // const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const response = await fetch(
          "https://tiger-inventory-backend.onrender.com/api/order/" + id,
          {
            method: "DELETE",
          }
        );
        const json = await response.json();

        if (response.ok) {
          orderDispatch({ type: "DELETE_ORDER", payload: json });
          openNotification("Deleted Order");
        }
      },
    });
  };

  // noti
  const openNotification = (message) => {
    notification.open({
      message: "Notification",
      description: message,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFulfill = async (id) => {
    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/order/fulfill/" + id,
      {
        method: "PATCH",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      orderDispatch({ type: "EDIT_ORDER", payload: json });
      openNotification("Successfully Fulfilled Order");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "orderName",
      key: "orderName",
    },
    {
      title: "Order Date",
      dataIndex: "orderDatex",
      key: "orderDatex",
      render: (_, { orderDate }) => {
        return String(orderDate).substring(0, 10);
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { isFulfilled }) => {
        let color;
        let label;
        if (isFulfilled === true) {
          color = "green";
          label = "FULFILLED";
        } else {
          color = "volcano";
          label = "PROCESSING";
        }
        return (
          <Tag color={color} key={label}>
            {label.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "PROCESSING",
          value: false,
        },
        {
          text: "FULFILLED",
          value: true,
        },
      ],
      onFilter: (value, record) => record.isFulfilled === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="Orders_Button"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
          <Button
            className="Orders_Button"
            type="primary"
            onClick={() => handleFulfill(record._id)}
            style={{ display: record.isFulfilled === true ? "none" : "block" }}
          >
            Fulfill
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <TopBar />
      <Layout
        className="Orders_Background"
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBar curr={"3"} />
        <Layout className="Orders_Content">
          <Row className="Orders_TopBox">
            <Col span={12}>
              <SearchBarOrder className="Orders_SearchBar" />
            </Col>
            <Col span={5} offset={7}>
              <Button
                className="Orders_CreateButton"
                type="primary"
                onClick={showModal}
              >
                Create Order
              </Button>
            </Col>
          </Row>
          <Layout className="Orders_List">
            <Table
              rowKey={(record) => record._id}
              className="Orders_Table"
              columns={columns}
              pagination={false}
              scroll={{ y: 950 }}
              expandable={{
                expandedRowRender: (record) => (
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    {record.orderItems &&
                      record.orderItems.map((item) => (
                        <Tag>
                          {item.itemName} x {item.itemQuantity}
                        </Tag>
                      ))}
                  </p>
                ),
              }}
              dataSource={orders}
            />
          </Layout>

          <Modal
            width={1200}
            className="Order_Modal_Create"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            title="Add a new Order"
          >
            <OrderForm items={items} />
          </Modal>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Order;
