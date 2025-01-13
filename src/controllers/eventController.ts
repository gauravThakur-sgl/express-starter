import { Request, Response } from "express";
import { Event } from "../models/event";
import { createEvent as createEventService } from "../services/event.service";

interface AuthenticatedRequest extends Request {
 user: {
  id: string;
 };
}
export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
 try {
  const userId = req.user.id;
  const newEvent = await createEventService(req.body, userId);
  res.status(200).json(newEvent);
 } catch (error: any) {
  res.json(`Validation failed: ${error.message}`);
 }
};
