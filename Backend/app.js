require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const HttpError = require("./models/http-error");
const categoryRoutes = require("./routes/category-routes");
const itemRoutes = require("./routes/item-routes");
const authRotues = require("./routes/auth-routes");

const connectDB = require("./db/connect");
const URL = require("./helpers/url");

const app = express();
const server = require("http").Server(app);

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRotues);
app.use("/api/item", itemRoutes);
app.use("/api/category", categoryRoutes);

app.use("/", (req, res) => {
  console.log("Hello from main");
  res.status(200).json({ message: "Main Route" });
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(url);
    server.listen(port, (req, res) => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
