const { Schema, model, Types } = require("mongoose");

const groceryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the item is required."],
      trim: true,
    },
    image:{
      type:String,
      default:"https://www.freepik.com/free-photo/top-view-fresh-vegetables-arrangement_22632474.htm#query=grocery&position=7&from_view=keyword&track=sph&uuid=8243c70f-4c68-4b2a-98eb-a362e010d867",
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
