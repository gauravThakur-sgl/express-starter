import { IEvent } from "../interfaces/interface";
import { model, Schema } from "mongoose";

const eventSchema = new Schema<IEvent>({
 title: {
  type: String,
  required: [true, "Title is required"],
  maxLength: 20,
  validate: {
   validator: function (v: string) {
    return /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/.test(v);
   },
   message: (props: any) => `${props.value} is not a valid title!`,
  },
 },
 description: {
  type: String,
  required: [true, "Description is required"],
  maxLength: 500,
 },
 date: {
  type: String,
  required: [true, "Date is required"],
},
 startDate: {
  type: String,
  required: [true, "Start date is required"],
},
 endDate: {
  type: String,
  required: [true, "End date is required"],
},
 location: {
  type: String,
  required: [true, "Location is required"],
},
 isDone: {
  type: Boolean,
  required: [true, "isDone is required"],
},
 isImportant: {
  type: Boolean,
  required: [true, "isImportant is required"],
},
 isWork: {
  type: Boolean,
  required: [true, "isWork is required"],
},
 isPersonal: {
  type: Boolean,
  required: [true, "Users are required"],
},
 users: {
  type: [String],
  required: [true, "User ID is required"],
},
 user_id: {
  type: String,
  required: true,
 },
 event_type: {
  type: Number,
  required: [true, "Event type is required"],
},
});

export const Event = model<IEvent>("Event", eventSchema);
