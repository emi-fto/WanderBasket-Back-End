const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const groceryItemsRouter = require("./groceryItems.routes");
router.use("/groceryItems", groceryItemsRouter);

const tripsRouter = require("./trip.routes");
router.use("/trips", tripsRouter);

const usersRouter = require("./user.routes");
router.use("/users", usersRouter);

module.exports = router;
