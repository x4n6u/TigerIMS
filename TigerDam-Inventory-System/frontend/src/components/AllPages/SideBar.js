import {
  MoreOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/comp_SideBar.css";
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link className="SideBar_Link" to="/">
      Dashboard
    </Link>,
    "1",
    <DashboardOutlined />
  ),
  getItem(
    <Link className="SideBar_Link" to="/item">
      Items
    </Link>,
    "2",
    <UnorderedListOutlined />
  ),
  getItem(
    <Link className="SideBar_Link" to="/order">
      Orders
    </Link>,
    "3",
    <FileDoneOutlined />
  ),
  getItem(
    <Link className="SideBar_Link" to="/users">
      Users
    </Link>,
    "4",
    <UserOutlined />
  ),
  getItem(
    <Link className="SideBar_Link" to="/options">
      Options
    </Link>,
    "5",
    <MoreOutlined />
  ),
];

const SideBar = ({ curr }) => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true" ? true : false
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
        localStorage.setItem("collapsed", value);
      }}
    >
      <Menu
        className="SideBar_Menu"
        theme="none"
        mode="inline"
        items={items}
        selectedKeys={[curr]}
      />
    </Sider>
  );
};

export default SideBar;
