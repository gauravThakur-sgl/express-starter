const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const entriesRouter = require("./routes/entries.route");
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
mongoose.connect(process.env.MONGODB_URI).catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/entries", entriesRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Connected to DB and app listening on port ${port}`);
});
