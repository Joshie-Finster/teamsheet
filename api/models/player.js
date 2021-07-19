const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Name too short"],
    maxLength: [25, "Name too long"],
  },
  position: {
    type: String,
    required: true,
    enum: {
      values: ["Striker", "Midfield", "Defence", "Goalie", "Bench/Sub/Backup"],
      message: "Not a valid position",
    },
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

module.exports = Player;
