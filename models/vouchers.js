const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const VoucherModel = new mongoose.Schema(
  {
    Voucher: {
      type: String,
    },
    Amount: {
      type: String,
    },
    bandwidth: {
      type: String,
    },
    devices: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Voucher", VoucherModel);
