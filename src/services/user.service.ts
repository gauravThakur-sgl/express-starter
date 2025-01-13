const bcrypt = require("bcrypt");
import { IUser } from "../interfaces/interface";
import { User } from "../models/user";
const jwt = require("jsonwebtoken");

export const signup = async (userData: IUser) => {
 try {
  const { password, ...rest } = userData;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
   ...rest,
   password: hashedPassword,
  });
  return newUser;
 } catch (error: any) {
  if (error.name === "ValidationError") {
   const errors = Object.values(error.errors).map(
    (error: any) => error.message
   );
   throw new Error(` ${errors.join(", ")}`);
  }
  throw new Error(error.message);
 }
};

export const login = async (email: string, password: string) => {
 const user = await User.findOne({ email });
 if (!user) {
  throw new Error("User not found");
 }
 const passwordMatch = bcrypt.compareSync(password, user.password);
 if (!passwordMatch) {
  throw new Error("Invalid password");
 }
 const exp = Math.floor(Date.now() / 1000) + 60 * 30;
 if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
 }
 const token = jwt.sign({ sub: user.id, exp }, process.env.JWT_SECRET);
 return { user, token, exp };
};

export const logout = () => {
 return;
};

export const checkAuth = async (token: string) => {
 if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
 }
 const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
  sub: string;
  exp: number;
 };
 if (Date.now() > decoded.exp * 1000) {
  throw new Error("Token Expired");
 }
 return decoded.sub;
};
