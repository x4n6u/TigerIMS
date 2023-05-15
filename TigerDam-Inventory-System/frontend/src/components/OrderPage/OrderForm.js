import { Card, Button, Form, Input, Divider, notification } from "antd";
import { React, useCallback, useState } from "react";
import { useOrdersContext } from "../../hooks/useOrderContext";
import "../../css/Orders.css";

import { useDropzone } from "react-dropzone";
const XLSX = require("xlsx");

const OrderForm = ({ items }) => {
  const { orderDispatch } = useOrdersContext();
  const [orderDate, setOrderDate] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  //start of MyDropzone
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    let tempId;
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      console.log("File size:" + file.size + "bytes");
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async (e) => {
        var bstr = e.target.result;
        console.log("File data" + bstr);

        var workbook = XLSX.read(bstr, { type: "array" });
        var sheet = workbook.SheetNames[1];
        var jsonFile = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(jsonFile);

        var dateArr = [];
        var nameArr = [];
        var itemArr = [];

        //date formatting
        const excelSerialDate = jsonFile[1].__EMPTY_17;
        const millisecondsPerDay = 86400000;
        const excelStartDate = new Date("1900-01-01");
        const date = new Date(
          excelStartDate.getTime() + (excelSerialDate - 1) * millisecondsPerDay
        );
        const isoDate = date.toISOString();
        const tempDate = new Date(isoDate);
        const year = tempDate.getFullYear();
        const month = String(tempDate.getMonth() + 1).padStart(2, "0");
        const day = String(tempDate.getDate()).padStart(2, "0");
        dateArr.push(year + "-" + month + "-" + day);

        //order items are in the array from 28-63
        for (let i = 28; i < 64; i++) {
          const tempQuery = jsonFile[i].__EMPTY_5;
          const formattedQuery = tempQuery
            .replace(/ /g, "%20")
            .replace(/"/g, "%22")
            .replace(/\+/g, "%20")
            .replace(/\//g, "%2F");
          const currName = { name: formattedQuery };
          const queryParams = new URLSearchParams(currName).toString();
          const response = await fetch(
            "https://tiger-inventory-backend.onrender.com/api/item/name/" +
              currName.name,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
              },
            }
          );

          if (!response.ok) {
            const json = await response.json();
            setError(json.error);
          } else {
            const json = await response.json();
            //console.log("ID: " + json._id)
            tempId = json._id;
            setError(null);
          }
          itemArr.push({
            itemName: jsonFile[i].__EMPTY_5,
            itemQuantity: jsonFile[i].__EMPTY_3,
            itemID: tempId,
          });
          //console.log(arr2)
        }
        //
        //pushing an array with the name
        nameArr.push(jsonFile[3].__EMPTY_4);
        setFiles((prevFiles) => [...prevFiles, jsonFile]);
        setOrderDate(dateArr[0]);
        setOrderName(nameArr[0]);
        setOrderItems(itemArr);
        console.log("Date: " + dateArr[0]);
        console.log("Date: " + date);
        console.log("Name: " + nameArr[0]);
        console.log("Order Items" + itemArr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  //end of MyDropzone

  const [error, setError] = useState(null);

  const [highlight, setHighlight] = useState("");

  const handleItem = useCallback(
    (itemName, quantity, itemID) => {
      const existingItemIndex = orderItems.findIndex(
        (item) => item.itemID === itemID
      );
      if (existingItemIndex > -1) {
        const newOrderItems = [...orderItems];
        newOrderItems[existingItemIndex] = {
          itemName,
          itemQuantity: parseInt(quantity),
          itemID,
        };
        setOrderItems(newOrderItems);
      } else {
        setOrderItems([
          ...orderItems,
          { itemName, itemQuantity: parseInt(quantity), itemID },
        ]);
      }
    },
    [orderItems, setError]
  );

  const order = { orderDate, orderName, orderItems };

  const openNotification = () => {
    notification.open({
      message: "Notification",
      description: "Successfully created new Order",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://tiger-inventory-backend.onrender.com/api/order",
      {
        method: "POST",
        body: JSON.stringify(order),
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
      setOrderDate("");
      setOrderName("");
      setOrderItems([]);
      setError(null);
      openNotification();
      orderDispatch({ type: "CREATE_ORDER", payload: json });
    }
  };

  return (
    <Form>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button type="primary">
          Drag and drop some files here, or click to select files
        </Button>
        <Divider />
        {files.map((file, index) => (
          <div key={index}>
            <h4>File opened</h4>
          </div>
        ))}
      </div>
      <div>
        <Form.Item
          label="Order Date:"
          required
          style={{ width: "45%", display: "inline-block" }}
        >
          <Input
            value={orderDate}
            type="date"
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Client Name:"
          required
          style={{ width: "45%", display: "inline-block", marginLeft: "5%" }}
        >
          <Input
            value={orderName}
            type="text"
            onChange={(e) => setOrderName(e.target.value)}
          />
        </Form.Item>
      </div>

      <table>
        <tbody>
          <Card title="Order Items">
            {items.map((orderItem) => {
              const item =
                orderItems.find((newItem) => newItem.itemID === orderItem._id)
                  ?.itemQuantity || "";
              return (
                <Card.Grid
                  style={{
                    width: "25%",
                    textAlign: "center",
                  }}
                >
                  <td>{orderItem.name}</td>
                  <td style={{ width: "50%" }}>
                    <input
                      type="number"
                      min="0"
                      value={item.toString()} //sets the input value to either the index of the orderItems or nothing ('')
                      onChange={(e) => {
                        handleItem(
                          orderItem.name,
                          e.target.value,
                          orderItem._id
                        );
                      }}
                    />
                  </td>
                </Card.Grid>
              );
            })}
          </Card>
        </tbody>
      </table>
      <Button type="primary" className="Orders_Button" onClick={handleSubmit}>
        Add order
      </Button>
      {error && <div className="error">{error} </div>}
    </Form>
  );
};

export default OrderForm;
