import { IEvent } from "../interfaces/interface";
import { Event } from "../models/event";

export const createEvent = async (eventData: IEvent, userId: string) => {
 const newEvent = new Event({
    ...eventData,
    user_id: userId,
 });
 await newEvent.save();
 return newEvent.toJSON();
};
