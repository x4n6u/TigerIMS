import {
  Layout,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Tag,
  Space,
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useItemsContext } from "../hooks/useItemContext";
import ItemForm from "../components/ItemPage/ItemForm";
import ItemDetails from "../components/ItemPage/ItemDetails";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import SearchBar from "../components/AllPages/SearchBar";
import "../css/Items.css";

const Items = () => {
  const { items, itemDispatch } = useItemsContext();

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
  // Global Vars
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);

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
  const showEditModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsEditOpen(true);
  };
  const handleEditOk = () => {
    setIsEditOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditOpen(false);
  };
  // Handle Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const showDeleteModal = (itemId, itemName) => {
    setSelectedItemId(itemId);
    setSelectedItemName(itemName);
    setIsDeleteOpen(true);
  };
  const handleDeleteCancel = () => {
    setIsDeleteOpen(false);
  };
  const handleDelete = async (id) => {
    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/item/" + id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      itemDispatch({ type: "DELETE_ITEM", payload: json });
      setIsDeleteOpen(false);
      openNotification();
    }
  };
  //Noti
  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Deleted Item",
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        {
          text: "Strap",
          value: "Strap",
        },
        {
          text: "Quick Link",
          value: "Quick Link",
        },
      ],
      onFilter: (value, record) => record.name.includes(value) === true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      sorter: (a, b) => a.unitPrice - b.unitPrice,
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
          label = "STOCKED";
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="Items_Button"
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record._id)}
          />
          <Button
            className="Items_Button"
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteModal(record._id, record.name)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <TopBar />
      <Layout
        className="Items_Background"
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBar curr={"2"} />
        <Layout className="Items_Content">
          <Row className="Items_TopBox">
            <Col span={12}>
              <SearchBar className="Items_SearchBar" />
            </Col>
            <Col span={4} offset={8}>
              <Button
                className="Items_CreateButton"
                type="primary"
                onClick={showModal}
              >
                Create Item
              </Button>
            </Col>
          </Row>

          <Layout className="Items_List">
            <Table
              className="Items_Table"
              columns={columns}
              dataSource={items}
              pagination={false}
              scroll={{ y: 650 }}
            />
            {/* Create Item Modal */}
            <Modal
              open={isModalOpen}
              footer={null}
              title={"Add a new Item"}
              onCancel={handleCancel}
            >
              <ItemForm />
            </Modal>
            {/* Edit Modal */}
            <Modal
              title={"Edit Item"}
              open={isEditOpen}
              onOk={handleEditOk}
              onCancel={handleEditCancel}
              footer={null}
            >
              <ItemDetails itemId={selectedItemId} />
            </Modal>
            {/* Delete Item Modal */}
            <Modal
              className="Item_Modal"
              open={isDeleteOpen}
              onOk={() => handleDelete(selectedItemId)}
              onCancel={handleDeleteCancel}
              title="Warning"
            >
              Are you sure you want to delete {selectedItemName}
            </Modal>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Items;
