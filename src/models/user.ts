import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/interface";

const userSchema = new Schema<IUser>({
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  index: true,
 },
 password: {
  type: String,
  required: true,
 },
 firstName: {
  type: String,
  required: true,
 },
 middleName: {
  type: String,
 },
 lastName: {
  type: String,
  required: true,
 },
 dateOfBirth: {
  type: String,
  required: true,
 },
 bio: {
  type: String,
  maxlength: 200,
 },
 links: {
  type: [String],
  required: true,
 },
 font: {
  type: String,
  required: true,
 },
 theme: {
  type: String,
  required: true,
 },
 activeModules: {
  type: [String],
  required: true,
 },
});

export const User = model<IUser>("User", userSchema);
