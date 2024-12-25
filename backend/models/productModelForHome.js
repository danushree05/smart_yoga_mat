const mongoose = require("mongoose");

const productForHomeSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    username: String,
    location: String,
    phoneNumber:Number,
    status: { type: String, default: "Pending" }, // Status of the e-waste
    remarks: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const productModelForHome = mongoose.model("productforhome", productForHomeSchema);

module.exports = productModelForHome;


