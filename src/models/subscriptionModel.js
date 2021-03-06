const mongoose = require("mongoose");

const subscripionSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    planId: {
      type: String,
      required: true,
      enum: ["FREE", "TRIAL", "LITE_1M", "PRO_1M", "LITE_6M", "PRO_6M"],
    },
    startDate: { type: Date, required: true },
    validTill: { type: Date},
  },
  
);

module.exports = mongoose.model("Wishup_Subscription", subscripionSchema);
