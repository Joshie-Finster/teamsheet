const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const mongodb = require("mongodb");
require("dotenv").config();
// Variable to be sent to Frontend with Database status

let databaseConnection = "Waiting for Database response...";
router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});

let uri =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PW +
  "@teamsheet.pohxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// If there is a connection error send an error message

mongoose.connection.on("error", (error) => {
  console.log("Database connection error:", error);
  databaseConnection = "Error connecting to Database";
});
// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  databaseConnection = "Connected to Database";
});

module.exports = router;
