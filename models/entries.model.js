const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    place: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    social: { type: String, required: true },
    dob: { type: Date, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, autoIndex: true }
);

module.exports = mongoose.model("Entry", entrySchema);
