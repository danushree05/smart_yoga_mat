
const mongoose = require("mongoose");

const traderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password:String,
    location:String,
    
  },
  {
    timestamps: true,
  }
);



const traderModel = mongoose.model("Trader", traderSchema);

module.exports = traderModel;

