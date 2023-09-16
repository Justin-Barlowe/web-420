// Name: Justin Barlowe
// Title: barlowe-user.js
// Description: User model
// Date Created: 9/11/2023

// Require mongoose and create schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema
const userSchema = new Schema({
    userName: String,
    password: String,
    emailAddress: [{type: String, unique: true}],
});

// Create model and export it
const User = mongoose.model('User', userSchema);
module.exports = User;