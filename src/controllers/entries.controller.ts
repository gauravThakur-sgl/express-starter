const { getEntries, createEntry } = require("../services/entries.service");
import { Request, Response, NextFunction } from "express";

async function get(req: Request, res: Response, next: NextFunction) {
 try {
  res.json(await getEntries());
 } catch (err: any) {
  console.error(`Error while getting entries`, err.message);
  next(err);
 }
}

async function create(req: Request, res: Response, next: NextFunction) {
 try {
  res.json(await createEntry(req.body));
 } catch (err: any) {
  console.error(`Error while saving entries`, err.message);
  next(err);
 }
}

export default { get, create };
