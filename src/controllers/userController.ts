import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignupRequest extends Request {
 body: {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  bio: string;
  links: string[];
  font: string;
  theme: string;
  activeModules: string[];
 };
}

export const signup = async (
 req: SignupRequest,
 res: Response,
 next: NextFunction
) => {
 try {
  const {
   email,
   password,
   firstName,
   middleName,
   lastName,
   dateOfBirth,
   bio,
   links,
   font,
   theme,
   activeModules,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.create({
   email,
   password: hashedPassword,
   firstName,
   middleName,
   lastName,
   dateOfBirth,
   bio,
   links,
   font,
   theme,
   activeModules,
  });
  res.status(200).json({
   message: "User created successfully",
   email,
   password: hashedPassword,
   firstName,
   middleName,
   lastName,
   dateOfBirth,
   bio,
   links,
   font,
   theme,
   activeModules,
  });
 } catch (error: any) {
  console.error(`Error while saving user`, error.message);
  next(error);
 }
};

// Login
interface LoginRequest extends Request {
 body: {
  email: string;
  password: string;
 };
}

export const login = async (req: LoginRequest, res: Response) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
   res.status(400).json({ message: "User not found" });
   return;
  }

  //   compairing the password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
   res.status(401).json({ message: "Invalid password" });
   return;
  }
  // Creating a token
  const exp = Date.now() + 1000 * 60 * 30;
  if (!process.env.JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);

  // Setting the Cookie
  res.cookie("token", token, {
   expires: new Date(exp),
   httpOnly: true,
   sameSite: "lax",
   secure: process.env.Node_ENV === "production",
  });

  res.status(200).json({ message: "User Successfully logged in" });
 } catch (error) {
  console.log(error);
  res.status(401).json({ message: "login failed" });
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
