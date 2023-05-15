// import { useItemsContext } from "../../hooks/useItemContext";
// import { useState } from "react";
// import { Row, Col, Collapse } from "antd";

// const OrderDetails = ({ order }) => {
//   const { dispatch } = useItemsContext();
//   const [editMode, setEditMode] = useState(false);
//   const [editedOrder, setEditedOrder] = useState({
//     name: order.name,
//     date: order.date,
//   });

//   const handleDelete = async () => {
//     const response = await fetch("https://tiger-inventory-backend.onrender.com/api/order/" + order._id, {
//       method: "DELETE",
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: "DELETE_ITEM", payload: json });
//     }
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     setEditedOrder({
//       name: item.name,
//       description: item.description,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice,
//     });
//   };

//   const handleSave = async () => {
//     const response = await fetch("https://tiger-inventory-backend.onrender.com/api/order/" + order._id, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(editedOrder),
//     });
//     const JSON = await response.JSON();

//     if (response.ok) {
//       // fetch the updated item and update the state
//       const updatedOrderResponse = await fetch("https://tiger-inventory-backend.onrender.com/api/order/" + order._id);
//       const updatedOrder = await updatedOrderResponse.json();
//       dispatch({ type: "EDIT_ITEM", payload: updatedOrder });
//       setEditMode(false);
//     }
//   };
//   const handleChange = (e) => {
//     setEditedOrder({
//       ...editedOrder,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const { Panel } = Collapse;

//   const onChange = (key) => {
//     console.log(key);
//   };

//   const format = (
//     <Row>
//       <Col span={11}>
//         <h4>{item.name}</h4>
//       </Col>
//       <Col span={6}>
//         <p>
//           <strong>Unit price: </strong>
//           {item.unitPrice}
//         </p>
//       </Col>
//       <Col span={6}>
//         <p>
//           <strong>Quantity: </strong>
//           {item.quantity}
//         </p>
//       </Col>
//       <Col span={1}>
//         <span className="material-symbols-outlined" onClick={handleEdit}>
//           edit
//         </span>
//         <span className="material-symbols-outlined" onClick={handleDelete}>
//           delete
//         </span>
//       </Col>
//     </Row>
//   );

//   const editFormat = (
//     <Row>
//       <Col span={10}>
//         <input
//           type="text"
//           name="name"
//           value={editedItem.name}
//           onChange={handleChange}
//         />
//       </Col>
//       <Col span={6}>
//         <input
//           type="number"
//           name="unitPrice"
//           value={editedItem.unitPrice}
//           onChange={handleChange}
//         />
//       </Col>
//       <Col span={6}>
//         <input
//           type="number"
//           name="quantity"
//           value={editedItem.quantity}
//           onChange={handleChange}
//         />
//       </Col>
//       <Col span={2}>
//         <button onClick={handleSave}>Save</button>
//         <button onClick={handleCancel}>Cancel</button>
//       </Col>
//     </Row>
//   );

//   return (
//     <div className="item-details">
//       {editMode ? (
//         <>
//           <Collapse
//             className="collapse"
//             defaultActiveKey={["1"]}
//             onChange={onChange}
//           >
//             <Panel header={editFormat} key="1">
//               <p>
//                 <input
//                   type="text"
//                   name="description"
//                   value={editedItem.description}
//                   onChange={handleChange}
//                 />
//               </p>
//             </Panel>
//           </Collapse>
//         </>
//       ) : (
//         <>
//           <Collapse
//             className="collapse"
//             defaultActiveKey={["2"]}
//             onChange={onChange}
//           >
//             <Panel header={format} key="1">
//               <p>
//                 <strong>Description: </strong> {item.description}
//               </p>
//             </Panel>
//           </Collapse>
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;
