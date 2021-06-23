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
  "@teamsheet.pohxj.mongodb.net/Schedule?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});
//methods must be added to a schema before compiling it to a model.
playerSchema.methods.speak = function () {
  const greeting = this.name
    ? "I am " + this.name + " and I play " + this.position
    : "Player not found";
  console.log(greeting);
};
const Player = mongoose.model("Player", playerSchema);
const testPlayer = new Player({
  name: "Test Josh",
  position: "Midfield test",
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
  Player.find({ name: /^Test/ }, function (err, players) {
    if (err) return console.error(err);
    console.log(players);
  });

  console.log(testPlayer.name);
});

router.get("/allPlayers", (req, res) => {
  Player.find(function(err,players){
    if(err) return console.error(err);
    res.json(players)
  })
});
module.exports = router;
