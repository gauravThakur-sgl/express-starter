import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 try {
  const user = new User(req.body);
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  await User.create({ ...user, password: hashedPassword });
  res
   .status(200)
   .json({ message: "User created successfully", user: user.toJSON() });
 } catch (error: any) {
  console.error(`Error while saving user`, error.message);
  next(error);
 }
};

// Login

export const login = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<any> => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: "User not found" });
  }

  // Cmapiring the password
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
   return res.status(400).json({ message: "Invalid password" });
  }

  // creating a token
  const exp = Date.now() + 24 * 60 * 60 * 1000;
  if (!process.env.JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ email: user.email, exp }, process.env.JWT_SECRET);

  // setting the cookie
  res.cookie("token", token, {
   expires: new Date(exp),
   secure: process.env.NODE_ENV === "production",
  });
 } catch (error: any) {
  console.error(`Error while logging in`, error.message);
  next(error);
 }
};

export const logout = async (req: Request, res: Response) => {
 try {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
 } catch (error: any) {
  console.log(`Error while logging out`, error.message);
  res.status(500).json({ message: "Internal server error" });
 }
};

export const checkAuth = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 try {
  console.log("User is authenticated");
  res.status(200).json({ message: "User is authenticated" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ message: "checkAuth failed" });
 }
};
