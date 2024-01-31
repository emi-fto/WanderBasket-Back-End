const { Schema, model, Types } = require("mongoose");

const groceryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the item is required."],
      trim: true,
    },
    image:{
      type: String,
      default:"https://img.freepik.com/free-photo/top-view-fresh-vegetables-arrangement_23-2149271094.jpg?w=900&t=st=1706691719~exp=1706692319~hmac=aa12dce3ae0d9b6cf827cc6c9540cc1d90211bd91bd0d201f4f1770b1f3fdf5f",
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required."],
    },
    label: {
      type: String,
      enum: ["Needs to be purchased", "Someone will bring it"],
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

const GroceryItem = model("GroceryItem", groceryItemSchema);

module.exports = GroceryItem;
