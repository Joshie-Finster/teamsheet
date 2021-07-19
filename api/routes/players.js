const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Player = require("../models/player");

router.get("/", (req, res) => {
  Player.find().then((docs) => res.json(docs));
});

router.post("/", async (req, res) => {
  let data = req.body;
  let newName = data.name;
  let regex = new RegExp(newName, "i");
  let newPosition = data.position;
  (await Player.exists({ name: regex }))
    ? res.send("Player already in database. Choose new name")
    : new Player({ name: newName, position: newPosition })
        .save()
        .catch((err) => {
          res.json(err.message);
          console.log(err.message);
        })
        .then(res.send("New Player Added"));
});

module.exports = router;
