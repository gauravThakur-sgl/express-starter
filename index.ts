import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import { entriesRouter } from "./src/routes/entries.route";
require("dotenv").config();
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
 mongoose.connect(mongoUri).catch((err) => console.log(err));
} else {
 console.error("MONGODB_URI is not defined in the environment variables");
}

app.get("/", (req, res) => {
 res.json({ message: "Hello World" });
});

app.use("/entries", entriesRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
 console.log(`Connected to DB and app listening on port ${port}`);
});
