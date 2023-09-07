// Name: Justin Barlowe
// Title: barlowe-person.js
// Description: Person model
// Date Created: 9/7/2023

// Require mongoose and create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// Create role schema
const roleSchema = new Schema({
    text: String,
});

// Create dependent schema
const dependentSchema = new Schema({
    firstName: String,
    lastName: String,
});

// Create person schema
const personSchema = new Schema({
    firstName: String,
    lastName: String,
    roles: [roleSchema], 
    dependents: [dependentSchema],
    birthDate: String,
});

// Create model and export it
const Person = mongoose.model('Person', personSchema); 
module.exports = Person; 
