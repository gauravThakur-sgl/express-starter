const bcrypt = require("bcrypt");
import { IUser } from "../interfaces/interface";
import { User } from "../models/user";
const jwt = require("jsonwebtoken");

export const signup = async (userData: IUser) => {
 try {
  const { password, ...rest } = userData;

  // Check if user already exists
  const isUserExist = await User.findOne({ email: rest.email });
  if (isUserExist) {
   throw new Error(JSON.stringify("User already exists"));
  }

  // validating the email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(rest.email)) {
   throw new Error(JSON.stringify({ email: "Invalid email" }));
  }

  // Validating the password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
   throw new Error(
    JSON.stringify({
     password:
      "password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    })
   );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
   ...rest,
   password: hashedPassword,
  });
  return newUser;
 } catch (error: any) {
  if (error.name === "ValidationError") {
   const errors: { [key: string]: string } = {};
   Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message.replace("Path", "").trim();
   });
   throw new Error(JSON.stringify(errors));
  }
  throw new Error(error.message);
 }
};

export const login = async (email: string, password: string) => {
 try {
  const user = await User.findOne({ email });
  if (!user) {
   throw new Error(JSON.stringify({ email: "User not found" }));
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
   throw new Error(JSON.stringify({ password: "Incorrect password" }));
  }

  const exp = Math.floor(Date.now() / 1000) + 60 * 30;
  if (!process.env.JWT_SECRET) {
   throw new Error(JSON.stringify({ message: "Internal server error" }));
  }

  const token = jwt.sign({ sub: user.id, exp }, process.env.JWT_SECRET);
  return { user, token, exp };
 } catch (error: any) {
  if (error.name === "ValidationError") {
   const errors: { [key: string]: string } = {};
   Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message.replace("Path", "").trim();
   });
   throw new Error(JSON.stringify(errors));
  }
  throw new Error(error.message);
 }
};

export const logout = () => {
 return;
};
