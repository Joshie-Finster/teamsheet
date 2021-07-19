const express = require("express");
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");

const newRouter = (collection) => {
  const router = express.Router();

  const errorCatcher = (inputError) => {
    console.error(inputError);
    res.status(500);
    res.json({ status: 500, error: inputError });
  };

  router.get("/", (req, res) => {
    collection
      .find()
      .then((docs) => res.json(docs))
      .catch((err) => errorCatcher(err));
  });

  // Route for deleting specific staff
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs))
      .catch((err) => errorCatcher(err));
  });

  // Route for creating new staff
  router.post("/", (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.ops[0]);
      })
      .catch((err) => errorCatcher(err));
  });

  // Route for updating specific staff
  router.put("/:id", (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;

    collection
      .findOneAndUpdate({ _id: ObjectID(itemId) }, { $set: updatedItem })
      .then((result) => {
        res.json(result.value);
      })
      .catch((err) => errorCatcher(err));
  });

  return router;
};

module.exports = newRouter;
