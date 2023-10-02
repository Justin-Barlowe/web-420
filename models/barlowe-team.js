// Name: Justin Barlowe
// Title: barlowe-team.js
// Description: Team model for Capstone Project
// Date Created: 10/2/2023

// Require mongoose and create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create player schema
const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    salary: Number,

});

// Create team schema
const teamSchema = new Schema({
    name: String,
    mascot: String,
    players: [playerSchema],
});

// Create model and export it
const Teams = mongoose.model('Teams', teamSchema);
module.exports = Teams;

