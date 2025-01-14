import { IEvent } from "../interfaces/interface";
import { Event } from "../models/event";

export const createEvent = async (eventData: IEvent, userId: string) => {
 try {
  const newEvent = new Event({
   ...eventData,
   user_id: userId,
  });
  await newEvent.save();
  return newEvent.toJSON();
 } catch (error: any) {
  if (error.name === "ValidationError") {
   const errors: { [key: string]: string } = {};
   Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
   });
   throw new Error(JSON.stringify(errors));
  }
  throw new Error(`Error saving event: ${error.message}`);
 }
};
