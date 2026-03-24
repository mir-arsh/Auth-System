const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    default: ""
  },

  lastName: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);