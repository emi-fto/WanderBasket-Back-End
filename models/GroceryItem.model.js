const { Schema, model, Types } = require("mongoose");

const groceryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the item is required."],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    label: {
      type: String,
      enum: ["need to be purchased", "someone will bring it"],
      required: [true, "Label is required."],
    },
    trip: {
      type: Types.ObjectId,
      ref: "Trip",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const groceryItem = model("GroceryItem", groceryItemSchema);

module.exports = GroceryItem;
