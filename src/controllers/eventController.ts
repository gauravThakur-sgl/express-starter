import { Request, Response } from "express";
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
  res.status(200).json({
   status: true,
   message: "event created successfully",
   data: newEvent,
  });
 } catch (error: any) {
  try {
   const errors = JSON.parse(error.message);
   res.status(400).json({ status: false, message: errors });
  } catch (parseError) {
   res.status(400).json({ status: false, message: "internal server error" });
  }
 }
};
