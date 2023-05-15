import { Layout, Card, Row, Col, Table, Tag } from "antd";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import "../css/DashBoard.css";
import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemContext";
import { useOrdersContext } from "../hooks/useOrderContext";

const DashBoard = () => {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { quantity, min }) => {
        let color;
        let label;
        if (quantity > min) {
          color = "green";
          label = "PLENTY";
        } else {
          color = "volcano";
          label = "LOW";
        }
        return (
          <Tag color={color} key={label}>
            {label.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "orderName",
      key: "orderName",
    },
    {
      title: "Order Date",
      dataIndex: "orderDatex",
      key: "orderDate",
      render: (_, { orderDate }) => {
        return String(orderDate).substring(0, 10);
      },
    },
    {
      title: "Status",
      key: "orderStatus",
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
  ];

  return (
    <Layout>
      <TopBar />
      <Layout
        className="Dashboard_Background"
        style={{
          minHeight: "90vh",
        }}
      >
        <SideBar curr={"1"} />
        <Layout className="Dashboard_Content">
          <Layout className="Dashboard_TopBox">
            <Row className="Dashboard_Row">
              <Col className="Dashboard_Col" span={8}>
                <Card className="Dashboard_Small">
                  <iframe
                    title="ds"
                    className="dslw"
                    src="https://charts.mongodb.com/charts-capstone-mernapp-ketir/embed/charts?id=6403c77a-058e-4879-8f18-ecc495617b3f&maxDataAge=3600&theme=dark&autoRefresh=true"
                  ></iframe>
                </Card>
              </Col>
              <Col className="Dashboard_Col" span={8}>
                <Card className="Dashboard_Small">
                  <iframe
                    title="ds"
                    className="dslw"
                    src="https://charts.mongodb.com/charts-capstone-mernapp-ketir/embed/charts?id=6406892c-e7f9-43e9-8826-04cbc0dc3b8f&maxDataAge=300&theme=dark&autoRefresh=true"
                  ></iframe>
                </Card>
              </Col>
              <Col className="Dashboard_Col" span={8}>
                <Card className="Dashboard_Small">
                  {/* <iframe
                    title="ds"
                    className="dslw"
                    src="https://charts.mongodb.com/charts-capstone-mernapp-ketir/embed/charts?id=6406892c-e7f9-43e9-8826-04cbc0dc3b8f&maxDataAge=300&theme=dark&autoRefresh=true"
                  ></iframe> */}
                  <iframe
                    title="ds"
                    className="dslw"
                    src="https://charts.mongodb.com/charts-capstone-mernapp-ketir/embed/charts?id=643afccb-66b9-4fa9-8dee-d21f881f69b5&maxDataAge=300&theme=dark&autoRefresh=true"
                  ></iframe>
                </Card>
              </Col>
            </Row>
          </Layout>

          <Layout className="Dashboard_Lists">
            <Row className="Dashboard_Row">
              <Col className="Dashboard_Col" span={12}>
                <Card className="Dashboard_Mid">
                  <label
                    htmlFor="Dashboard_Table_Items"
                    className="Dashboard_Label"
                  >
                    Items
                  </label>
                  <Table
                    className="Dashboard_Table_Items"
                    columns={columns}
                    dataSource={items}
                    pagination={false}
                    scroll={{ y: 280 }}
                  />
                </Card>
              </Col>
              <Col className="Dashboard_Col" span={12}>
                <Card className="Dashboard_Mid">
                  <label
                    htmlFor="Dashboard_Table_Items"
                    className="Dashboard_Label"
                  >
                    Orders
                  </label>
                  <Table
                    className="Dashboard_Table_Items"
                    columns={columns2}
                    dataSource={orders}
                    pagination={false}
                    scroll={{ y: 280 }}
                  />
                </Card>
              </Col>
            </Row>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default DashBoard;
