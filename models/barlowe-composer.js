// Name: Justin Barlowe
// Title: barlowe-composer.js
// Description: Composer model for the composer app
// Date Created: 8/31/2023

// Require mongoose
const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Create schema
const composerSchema = new schema({
    firstName: String,
    lastName: String,
});

//name the model "Composer" and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);
