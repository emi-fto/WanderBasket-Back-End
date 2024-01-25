const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    hashedPassword: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
