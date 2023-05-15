const Users = require("../models/userModel");
const mongoose = require("mongoose");

//get all Users
const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({ createdAt: 1 });

  res.status(200).json(users);
};

//get one item by ID
const getUserId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await Users.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

//get User by username

const getUserUsername = async (req, res) => {
  const { username } = req.params;

  const user = await Users.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

//create new user

const createUser = async (req, res) => {
  const { userId, username, password, isAdmin, isActive } = req.body;

  //add to db
  try {
    const user = await Users.create({
      userId,
      username,
      password,
      isAdmin,
      isActive,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await Users.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

//update User
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await Users.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return req.status(400).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUserId,
  getUserUsername,
  createUser,
  deleteUser,
  updateUser,
};
