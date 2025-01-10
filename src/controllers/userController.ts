import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {
 signup as signupService,
 login as loginService,
 logout as logoutService,
 checkAuth as checkAuthService,
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

export const signup = async (
 req: SignupRequest,
 res: Response,
 next: NextFunction
) => {
 try {
  const newUser = await signupService(req.body);
  res.status(200).json(newUser);
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
  const { user, token, exp } = await loginService(email, password);
  // Setting the Cookie
  res.cookie("token", token, {
   expires: new Date(exp * 1000),
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
  logoutService();
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
 } catch (error: any) {
  console.log(`Error while logging out`, error.message);
  res.status(500).json({ message: "Internal server error" });
 }
};

export const checkAuth = async (req: Request, res: Response) => {
 try {
  console.log("req.user", req.user);
  res.status(200).json({ message: "User is authenticated" });
 } catch (error) {
  console.log(error);
  res.status(500).json({ message: "checkAuth failed" });
 }
};
