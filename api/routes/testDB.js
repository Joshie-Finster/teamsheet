const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const Player = require("../models/player");
const db = mongoose.connection;
require("dotenv").config();

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});

// If there is a connection error send an error message

db.on("error", (error) => {
  console.log("Database connection error:", error);
  databaseConnection = "Error connecting to Database";
});
// If connected to MongoDB send a success message

db.once("open", () => {
  console.log("Connected to Database!");
  databaseConnection = "Connected to Database";
});

router.get("/allPlayers", (req, res) => {
  Player.find(function (err, players) {
    if (err) return console.error(err);
    res.json(players);
  });
});
module.exports = router;
