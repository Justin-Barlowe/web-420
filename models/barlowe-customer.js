// Name: Justin Barlowe
// Title: barlowe-customer.js
// Description: Customer model for the composer app
// Date Created: 9/18/2023

// Require mongoose
const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Create schemas
const lineItemSchema = new schema({
    name: String,
    price: Number,
    quantity: Number,
});

const invoiceSchema = new schema({
    subtotal: Number,
    tax: Number,
    dateCreated: Date,
    dateShipped: Date,
    lineItems: [lineItemSchema],
});

const customerSchema = new schema({
    firstName: String,
    lastName: String,
    userName: String,
    invoices: [invoiceSchema],
});

//Export model  
module.exports = mongoose.model('Customer', customerSchema);

