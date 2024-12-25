const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  traderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trader",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: String,
  },
  productName: {
    type: String,
  },
  category: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
