import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { React, useState } from "react";
import "../../css/comp_TopBar.css";
import { Menu, Switch } from "antd";
import { Link } from "react-router-dom";
import logo from "../../images/US-Flood-Control-logo-dark.png";
const handleLogout = () => {
  console.log("I can remove");
  localStorage.removeItem("user");
  console.log("I have removed");
};
const setDarkMode = () => {
  document.querySelector("body").setAttribute("themeMode", "dark");
  localStorage.setItem("selectedThemeMode", "dark");
};
const setLightMode = () => {
  document.querySelector("body").setAttribute("themeMode", "light");
  localStorage.setItem("selectedThemeMode", "light");
};
const selectedThemeMode = localStorage.getItem("selectedThemeMode");

if (selectedThemeMode === "") {
  setLightMode();
} else if (selectedThemeMode === "dark") {
  setDarkMode();
} else if (selectedThemeMode === "light") {
  setLightMode();
}
const toggleTheme = (checked) => {
  if (checked === false) {
    setDarkMode();
  } else {
    setLightMode();
  }
};
const items1 = [
  {
    label: (
      <Link to="/" className="comp_TopBar_link">
        Home
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link to="/history" className="comp_TopBar_link">
        History
      </Link>
    ),
    key: "2",
  },
];

const onChangeSwitch = (checked) => {
  toggleTheme(checked);
};

const TopBar = () => {
  const [checked, setChecked] = useState(
    localStorage.getItem("checked") === "true" ? true : false
  );
  const items2 = [
    {
      label: (
        <Switch
          defaultChecked={true}
          checked={checked}
          onChange={(value) => {
            onChangeSwitch(checked);
            setChecked(value);
            localStorage.setItem("checked", value);
          }}
        />
      ),
      key: "3",
    },
    {
      label: (
        <Link to="https://usfloodcontrol.com/" className="comp_TopBar_link">
          <label className="trans">TigerDam </label>
          <UserOutlined />
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link to="/login" className="comp_TopBar_link" onClick={handleLogout}>
          <label className="trans">Log out </label>
          <LogoutOutlined />
        </Link>
      ),
      key: "5",
    },
  ];

  return (
    <>
      <nav>
        <Link to="/">
          <img
            src={logo}
            className="comp_TopBar_usLogo"
            alt="Italian Trulli"
          ></img>
        </Link>

        <Menu
          theme="none"
          className="comp_TopBar_menu_left"
          mode="horizontal"
          items={items1}
        />
        <Menu
          theme="none"
          className="comp_TopBar_menu_right"
          mode="horizontal"
          items={items2}
        />
      </nav>
    </>
  );
};

export default TopBar;
