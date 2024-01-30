const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Trip = require("../models/Trip.model");
const GroceryItem = require("../models/GroceryItem.model");
const router = require("express").Router();

// Get all trips
router.get("/", async (req, res) => {
  try {
    const allTrips = await Trip.find();
    res.status(200).json(allTrips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the trips" });
  }
});

// Get all trips for a specific participant // /api/trips/emiliano
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const tripsForSpecificParticipant = await Trip.find({
      participants: { $in: [userId] },
    });
    res.json(tripsForSpecificParticipant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while getting the trips for a specific participant",
    });
  }
});

// Get all groceries for a specific trip // /api/trips/:tripId/groceryitens
router.get("/:tripId/groceryitems", async (req, res) => {
  const tripId = req.params.tripId;
  const query = req.query.q; // Retrieve the value of the 'q' query parameter
  try {
    let groceriesForOneTrip;
    if (query) {
      // If a search query is provided, filter groceries by name using a regular expression
      groceriesForOneTrip = await GroceryItem.find({
        trip: tripId,
        name: { $regex: new RegExp(query, "i") },
      });
    } else {
      // If no search query is provided, fetch all groceries for the trip
      groceriesForOneTrip = await GroceryItem.find({ trip: tripId });
    }
    res.json(groceriesForOneTrip);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error while getting the groceries for a specific trip",
    });
  }
});

// Get one trip
router.get("/:tripId", async (req, res) => {
  const { tripId } = req.params;
  try {
    const oneTrip = await Trip.findById(tripId)
      .populate("groceries")
      .populate("participants");
    res.status(200).json(oneTrip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the trip" });
  }
});

// Create a new trip -- ONLY for authenticated users
router.post("/", isAuthenticated, async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.createdBy = userId;
  try {
    const newTrip = await Trip.create(payload);
    res.status(201).json(newTrip);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the trip" });
  }
});

// Edit one trip -- ONLY for authenticated users -- ONLY for participants to the trip
router.put("/:tripId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { tripId } = req.params;
  try {
    const tripToUpdate = await Trip.findById(tripId);
    if (tripToUpdate.participants.includes(userId)) {
      const updatedTrip = await Trip.findByIdAndUpdate(tripId, payload, {
        new: true,
      });
      res.status(200).json(updatedTrip);
    } else {
      res.status(403).json({
        message: "you dont have rights to edit this trip (not a participant)",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the trip" });
  }
});

// Delete one trip  -- ONLY for authenticated users -- ONLY for the creator of the trip
router.delete("/:tripId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { tripId } = req.params;
  try {
    const tripToDelete = await Trip.findById(tripId);
    console.log(tripToDelete, userId);
    if (tripToDelete.createdBy == userId) {
      console.log("Deleting");
      await Trip.findByIdAndDelete(tripId);
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the trip" });
  }
});

module.exports = router;
