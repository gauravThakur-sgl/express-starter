import { Schema, model } from "mongoose";
import { IEntry } from "../interface/interface";

const entrySchema = new Schema<IEntry>(
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

export default model("Entry", entrySchema);
