const express = require("express");
const {
  getOrder,
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  fulfillOrder,
} = require("../controllers/orderController");

//create an instance of the router
const router = express.Router();

//get all Orders
router.get("/", getOrders);

//get single Order
router.get("/:id", getOrder);

//generate new Order
router.post("/", createOrder);

//delete an Order
router.delete("/:id", deleteOrder);

//update an Order
router.patch("/:id", updateOrder);

//fulfill an Order
router.patch("/fulfill/:id", fulfillOrder);

module.exports = router;
