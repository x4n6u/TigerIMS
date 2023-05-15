import { Layout, Card, Row, Button, Space } from "antd";
import SideBar from "../components/AllPages/SideBar";
import TopBar from "../components/AllPages/TopBar";
import "../css/Options.css";

const Options = () => {
  const setDefault = () => {
    document.querySelector("body").setAttribute("themecolor", "orange");
    localStorage.setItem("selectedThemeColor", "orange");
  };
  const setRed = () => {
    document.querySelector("body").setAttribute("themecolor", "red");
    localStorage.setItem("selectedThemeColor", "red");
  };
  const setYellow = () => {
    document.querySelector("body").setAttribute("themecolor", "yellow");
    localStorage.setItem("selectedThemeColor", "yellow");
  };
  const setGreen = () => {
    document.querySelector("body").setAttribute("themecolor", "green");
    localStorage.setItem("selectedThemeColor", "green");
  };
  const setBlue = () => {
    document.querySelector("body").setAttribute("themecolor", "blue");
    localStorage.setItem("selectedThemeColor", "blue");
  };
  const setPurple = () => {
    document.querySelector("body").setAttribute("themecolor", "purple");
    localStorage.setItem("selectedThemeColor", "purple");
  };
  const selectedThemeColor = localStorage.getItem("selectedThemeColor");
  if (selectedThemeColor === "") {
    setDefault();
  } else if (selectedThemeColor === "orange") {
    setDefault();
  } else if (selectedThemeColor === "red") {
    setRed();
  } else if (selectedThemeColor === "yellow") {
    setYellow();
  } else if (selectedThemeColor === "green") {
    setGreen();
  } else if (selectedThemeColor === "blue") {
    setBlue();
  } else if (selectedThemeColor === "purple") {
    setPurple();
  }
  return (
    <Layout>
      <TopBar />
      <Layout
        className="Options_Background"
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBar curr={"5"} />
        <Layout className="Options_Content">
          <Row className="Options_TopBox">
            <Card className="Options_Card" title="Theme customization">
              <Space wrap>
                <Button
                  onClick={setDefault}
                  className="Option_Default"
                  color="orange"
                ></Button>
                <Button
                  onClick={setRed}
                  className="Option_Red"
                  color="red"
                ></Button>
                <Button
                  onClick={setYellow}
                  className="Option_Yellow"
                  color="yellow"
                ></Button>
                <Button
                  onClick={setGreen}
                  className="Option_Green"
                  color="green"
                ></Button>
                <Button
                  onClick={setBlue}
                  className="Option_Blue"
                  color="blue"
                ></Button>
                <Button
                  onClick={setPurple}
                  className="Option_Purple"
                  color="purple"
                ></Button>
              </Space>
            </Card>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Options;
