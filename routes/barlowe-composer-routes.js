// Name: Justin Barlowe
// Title: barlowe-composer-routes.js
// Description: Composer routes for the composer app
// Date Created: 8/31/2023
// Last Modified: 9/25/2023

// Require statements
const express = require("express");
const router = express.Router();
const Composer = require("../models/barlowe-composer");

// GET request for composers
router.get("/composers", async (req, res) => {
  try {
    const composers = await Composer.find();
    res.status(200).json(composers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request for composers by ID
router.get("/composers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const composer = await Composer.findById(id);
    res.status(200).json(composer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request for composers
router.post("/composers", async (req, res) => {
  const composer = new Composer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try {
    await composer.save();
    res.status(201).json(composer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request for composers
router.put("/composers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const composer = await Composer.findOne({ _id: id });
    if (composer) {
      composer.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      const savedComposer = await composer.save();
      res.status(200).json(savedComposer);
    } else {
      // If composer doesn't exist, return a 401 status
      res.status(401).json({ message: "Invalid composerId" });
    }
  } catch (error) {
    if (error.name === "MongoError") {
      res.status(501).json({ message: "MongoDB Exception" });
    } else {
      res.status(500).json({ message: "Server Exception" });
    }
  }
});

// DELETE request for composers
router.delete("/composers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedComposer = await Composer.findByIdAndDelete(id);
    if (deletedComposer) {
      res.status(200).json(deletedComposer);
    } else {
      res.status(500).json({ message: "Composer not found" });
    }
  } catch (error) {
    if (error.name === "MongoError") {
      res.status(501).json({ message: "MongoDB Exception" });
    } else {
      res.status(500).json({ message: "Server Exception" });
    }
  }
});

// Export the router
module.exports = router;
