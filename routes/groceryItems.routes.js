const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const GroceryItem = require("../models/GroceryItem.model");
const Trip = require("../models/Trip.model");
const router = require("express").Router();

//Get All
router.get("/", async (req, res) => {
  try {
    const allGroceryItems = await GroceryItem.find();
    res.status(200).json(allGroceryItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error while getting all the grocery items" });
  }
});

//Get One
router.get("/:groceryItemId", async (req, res) => {
  const { groceryItemId } = req.params;
  try {
    const oneGroceryItem = await GroceryItem.findById(groceryItemId);
    res.status(200).json(oneGroceryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the grocery items" });
  }
});

//POST
router.post("/", isAuthenticated, async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.createdBy = userId;
  try {
    const createdGroceryItem = await GroceryItem.create(payload);

    // add grocery id to the trip model
    const tripToUpdate = await Trip.findById(payload.trip);
    tripToUpdate.groceries.push(createdGroceryItem._id);
    await tripToUpdate.save();
    console.log({tripToUpdate})
    res.status(201).json(createdGroceryItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the grocery items" });
  }
});

//PUT
router.put("/:groceryItemId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { groceryItemId } = req.params;
  try {
    const groceryItemToUpdate = await GroceryItem.findById(groceryItemId);
    if (groceryItemToUpdate.createdBy == userId) {
      const groceryItemToUpdate = await GroceryItem.findByIdAndUpdate(
        groceryItemId,
        payload,
        { new: true }
      );
      res.status(200).json(groceryItemToUpdate);
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the grocery item" });
  }
});

//DELETE
router.delete("/:groceryItemId", isAuthenticated, async (req, res) => {
  const { groceryItemId } = req.params;
  const { userId } = req.tokenPayload;
  console.warn(req.params)
  try {
    const groceryItemToDelete = await GroceryItem.findById(
      groceryItemId
    );
    if (groceryItemToDelete.createdBy == userId) {
        await GroceryItem.findByIdAndDelete(groceryItemId);
        const tripToUpdate = await Trip.findById(groceryItemToDelete.trip);
        console.log({tripToUpdate})
        tripToUpdate.groceries.remove(groceryItemToDelete._id);
        await tripToUpdate.save();
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while deleting the grocery items" });
  }
});

module.exports = router;
