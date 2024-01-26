const User = require("../models/User.model");
const router = require("express").Router();

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

module.exports = router;