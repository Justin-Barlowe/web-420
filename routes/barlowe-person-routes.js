// Name: Justin Barlowe
// Title: barlowe-person-routes.js
// Description: Person routes for the person api
// Date Created: 9/7/2023

// Require statements
const express = require('express');
const router = express.Router();
const Person = require('../models/barlowe-person');

// GET request for people
router.get('/people', async (req, res) => {
    try {
      const findAllPersons = await Person.find();
      res.status(200).json(findAllPersons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// POST request for creating a person
router.post('/people', async (req, res) => {
  const createPerson = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roles: req.body.roles,
    dependents: req.body.dependents,
    birthDate: req.body.birthDate,
  });
  try {
    await createPerson.save();
    res.status(200).json(createPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Export the router
module.exports = router;
