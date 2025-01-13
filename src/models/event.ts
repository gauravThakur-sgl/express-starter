import { IEvent } from "../interfaces/interface";
import { model, Schema } from "mongoose";

const eventSchema = new Schema<IEvent>({
 title: {
  type: String,
  required: true,
  maxLength: 20,
 },
 description: {
  type: String,
  required: true,
  maxLength: 500,
 },
 date: {
  type: String,
  required: true,
 },
 startDate: {
  type: String,
  required: true,
 },
 endDate: {
  type: String,
  required: true,
 },
 location: {
  type: String,
  required: true,
 },
 isDone: {
  type: Boolean,
  required: true,
 },
 isImportant: {
  type: Boolean,
  required: true,
 },
 isWork: {
  type: Boolean,
  required: true,
 },
 isPersonal: {
  type: Boolean,
  required: true,
 },
 users: {
  type: [String],
  required: true,
 },
 user_id: {
  type: String,
  required: true,
 },
 event_type: {
  type: Number,
  required: true,
 },
});

export const Event = model<IEvent>("Event", eventSchema);
