const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to retrieve users" });
  };
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Failed to create user" });
    }

    const newUser = await User.create({ ...req.body }); // Spread the req.body object
    if (newUser) {
      res.status(201).json(newUser); // 201 Created
    } else {
      // Handle error (e.g., failed to create user)
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to create user" });
  };
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to retrieve user" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      { ...req.body }, 
      {new: true, overwrite: true}
      ); // Spread the req.body object
  
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      // Handle update failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error, failed to update user" });
   }

};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const {userId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  
  const isDeleted = await User.findOneAndDelete({_id: userId});

  try {
    if (isDeleted) {
      res.status(204).send(); // 204 No Content
    } else {
      // Handle deletion failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete user" });
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
