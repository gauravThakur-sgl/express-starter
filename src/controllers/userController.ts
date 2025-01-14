import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {
 signup as signupService,
 login as loginService,
 logout as logoutService,
} from "../services/user.service";

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

export const signup = async (req: SignupRequest, res: Response) => {
 try {
  const newUser = await signupService(req.body);
  res
   .status(200)
   .json({ status: true, message: "user created successfully", data: newUser });
 } catch (error: any) {
  console.error(`Error during signup`, error.message);
  try {
   const errors = JSON.parse(error.message);
   res.status(400).json({ status: false, message: errors });
  } catch (parseError) {
   res.status(400).json({ status: false, message: "internal server error" });
  }
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
  const { token, exp } = await loginService(email, password);

  // Setting the Cookie
  res.cookie("token", token, {
   expires: new Date(exp * 1000),
   httpOnly: true,
   sameSite: "lax",
   secure: process.env.Node_ENV === "production",
  });

  res
   .status(200)
   .json({ status: true, message: "user successfully logged in" });
 } catch (error: any) {
  const errors = JSON.parse(error.message);
  res.status(400).json({ status: false, message:errors });
 }
};

export const logout = async (req: Request, res: Response) => {
 try {
  logoutService();

  res.clearCookie("token");

  res.status(200).json({ status: true, message: "logged out successfully" });
 } catch (error: any) {
  console.log(`Error while logging out`, error.message);
  res.status(500).json({ status: false, message: "internal server error" });
 }
};
