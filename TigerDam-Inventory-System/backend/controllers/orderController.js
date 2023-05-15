const Orders = require('../models/orderModel')
const Items = require('../models/itemModel')
const User = require('../models/userModel')
const Log = require('../models/historyModel')
const mongoose = require('mongoose')

const createLogEntry = async(orderChanges,actionType)=>{
    const loggingUser = await User.findOne({isActive: true})
    if(!loggingUser) {
        return res.status(400).json({error: 'No active user recorded'})
    }
    const userId = loggingUser._id
    const name = loggingUser.username
    const logEntry = new Log({
        userId,
        name,
        orderChanges,
        objectType: 'order',
        actionType
    })
    await logEntry.save(); 
};

//get all orders
const getOrders = async (req, res) => {
  const orders = await Orders.find({}).sort({ createdAt: -1 });

  res.status(200).json(orders);
};

//get one order
const getOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Order" });
  }

  const order = await Orders.findById(id);

  if (!order) {
    return res.status(404).json({ error: "No such Order" });
  }

  res.status(200).json(order);
};

//create new Order

const createOrder = async (req, res) => {
    const isFulfilled = false
    const {orderDate, orderName, orderItems} = req.body
    //add to db
    try{
        const order = await Orders.create({orderDate, orderName, orderItems, isFulfilled})
        const orderChanges = {orderDate, orderName, orderItems, isFulfilled}
        createLogEntry(orderChanges, 'created')

        res.status(200).json(order)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete Order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

    const order = await Orders.findOneAndDelete({_id: id})
    const orderDate = order.orderDate
    const orderName = order.orderName
    const orderItems = order.orderItems
    const isFulfilled = order.isFulfilled
    
    const orderChanges = {orderDate, orderName, orderItems, isFulfilled}
    createLogEntry(
        orderChanges,
        'deleted'
      );
    if(!order){
        return res.status(400).json({error: 'No such order'})
    }

    res.status(200).json(order)
}

//update item
const updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Orders.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

    const orderDate = order.orderDate
    const orderName = order.orderName
    const orderItems = order.orderItems
    const isFulfilled = order.isFulfilled
    
    const orderChanges = {orderDate, orderName, orderItems, isFulfilled}
    createLogEntry(
        orderChanges,
        'edited'
      );
    if(!order){
        return res.status(400).json({error: 'No such order'})
    }

    res.status(200).json(order)

}
//fulfill Order
const fulfillOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Orders.findById(id);
  const fulfillOrder = await Orders.updateOne(
    { _id: id },
    { isFulfilled: true }
  );

    const orderDate = order.orderDate
    const orderName = order.orderName
    const orderItems = order.orderItems
    const isFulfilled = true
    console.log(order)
    const orderChanges = {orderDate, orderName, orderItems, isFulfilled}
    createLogEntry(
        orderChanges,
        'fulfilled'
      );

    if(!order) {
        return res.status(400).json({error: 'No such order'})
    } else if(!fulfillOrder) {
        return res.status(400).json({error: 'No such order'})
    }

  const orderArray = order.orderItems;
  for (let x = orderArray.length - 1; x >= 0; x--) {
    var itemToUpdate = orderArray[x];
    await Items.findOneAndUpdate(
      
      { _id: itemToUpdate.itemID },
      { $inc: { quantity: itemToUpdate.itemQuantity * -1 } }
    );
  }
  const newOrder = await Orders.findById(order._id);
  res.status(200).json(newOrder);
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  fulfillOrder,
};
