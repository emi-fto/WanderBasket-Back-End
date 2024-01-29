const User = require("../models/User.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the users" });
  }
});

// Endpoint to get user data
router.get('/:userId',isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to update user data
router.put('/:userId', isAuthenticated, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;