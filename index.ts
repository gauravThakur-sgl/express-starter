const express = require("express");
import { Request, Response } from "express";
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const entriesRouter = require("./src/routes/entries.route").default;
const dotenv = require("dotenv");
const userRouter = require("./src/routes/userRoute").default;
// import userRouter from "./src/routes/userRoute";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(
 express.urlencoded({
  extended: true,
 })
);

//connect database
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
 mongoose.connect(mongoUri).catch((err: any) => console.log(err));
} else {
 console.error("MONGODB_URI is not defined in the environment variables");
}

app.get("/", (req: Request, res: Response) => {
 res.json({ message: "Hello World" });
});

app.use("/entries", entriesRouter);
app.use("/api/users", userRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
 console.log(`Connected to DB and app listening on port ${port}`);
});
