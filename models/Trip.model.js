const { Schema, model, Types } = require("mongoose");

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description:{
      type: String,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    destination: {
      type: String,
      required: [true, "Place is required."],
      trim: true,
    },
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    groceries: [
      {
        type: Types.ObjectId,
        ref: "GroceryItem",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
