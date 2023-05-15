const mongoose = require("mongoose");
const Items = require("../models/itemModel");
const User = require("../models/userModel");
const Log = require("../models/historyModel");

const createLogEntry = async (itemChanges, actionType) => {
  const loggingUser = await User.findOne({ isActive: true });
  if (!loggingUser) {
    return res.status(400).json({ error: "No active user recorded" });
  }
  const userId = loggingUser._id;
  const name = loggingUser.username;
  const logEntry = new Log({
    userId,
    name,
    itemChanges,
    objectType: "item",
    actionType,
  });
  console.log(itemChanges);
  console.log(logEntry);
  await logEntry.save();
};

//get all items
const getItems = async (req, res) => {
  const items = await Items.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

//get one item
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Items.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

//create new item

const createItem = async (req, res) => {
  const { sku, quantity, description, name, unitPrice, min } = req.body;
  //add to db
  try {
    const item = await Items.create({
      sku,
      quantity,
      description,
      name,
      unitPrice,
      min,
    });
    const itemChanges = { sku, quantity, description, name, unitPrice, min };
    createLogEntry(itemChanges, "created");

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const item = await Items.findById(id);
  const sku = item.sku;
  const quantity = item.quantity;
  const description = item.description;
  const name = item.name;
  const unitPrice = item.unitPrice;
  const min = item.min;

  const itemChanges = { sku, quantity, description, name, unitPrice, min };
  createLogEntry(itemChanges, "deleted");

  const deleteItem = await Items.findOneAndDelete({ _id: id });

  if (!deleteItem) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(deleteItem);
};

//update item
const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const item = await Items.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  const sku = item.sku;
  const quantity = item.quantity;
  const description = item.description;
  const name = item.name;
  const unitPrice = item.unitPrice;
  const min = item.min;

  const itemChanges = { sku, quantity, description, name, unitPrice, min };
  createLogEntry(itemChanges, "edited");

  if (!item) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

const getItemByName = async (req, res) => {
  const { name } = req.params;

  const item = await Items.findOne({ name: name });

  if (!item) {
    return res.status(404).json({ error: "No such item name found" });
  }

  res.status(200).json(item);
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
  getItemByName,
};
