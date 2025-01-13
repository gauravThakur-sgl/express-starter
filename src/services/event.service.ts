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
   const errors = Object.values(error.errors).map(
    (error: any) => error.message
   );
   throw new Error(` ${errors.join(", ")}`);
  }
  throw new Error(`Error creating event: ${error.message}`);
 }
};
