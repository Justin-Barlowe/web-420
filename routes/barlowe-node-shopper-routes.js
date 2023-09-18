// Name: Justin Barlowe
// Title: barlowe-node-shopper-routes.js
// Description: Person routes for the person api
// Date Created: 9/19/2023

const express = require("express");
const router = express.Router();
const Customer = require("../models/barlowe-customer");

// POST: Create a new customer
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };
    const customer = await Customer.create(newCustomer);
    res
      .status(200)
      .json({ message: "Customer added to MongoDB", data: customer });
  } catch (error) {
    console.error(error); // Debug line
    if (error.name === "MongoDBError") {
      res.status(501).json({ message: "MongoDB Exception", error: error });
    } else {
      res.status(500).json({ message: "Server Exception", error: error });
    }
  }
});

// POST: Create an invoice by username
router.post("/customers/:username/invoices", async (req, res) => {
  try {
    //Some error handling
    console.log(`Querying username: ${req.params.username}`);

    const customer = await Customer.findOne({ userName: req.params.username });
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create new invoice
    const newInvoice = {
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      dateCreated: req.body.dateCreated,
      dateShipped: req.body.dateShipped,
      lineItems: req.body.lineItems,
    };

    // Add invoice to customer
    customer.invoices.push(newInvoice);
    await customer.save();
    res
      .status(200)
      .json({ message: "Invoice added to MongoDB", data: newInvoice });
  } catch (error) {
    //Some more error handling
    console.error(error);
    if (error.name === "MongoError") {
      res.status(501).json({ message: "MongoDB Exception", error: error });
    } else {
      res.status(500).json({ message: "Server Exception", error: error });
    }
  }
});

// GET: Find all invoices by username
router.get("/customers/:username/invoices", async (req, res) => {
  try {
    const customer = await Customer.findOne({ userName: req.params.username });
    if (customer) {
      res
        .status(200)
        .json({
          message: "Invoices retrieved successfully",
          data: customer.invoices,
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error); // Debug line
    if (error.name === "MongoError") {
      res.status(501).json({ message: "MongoDB Exception", error: error });
    } else {
      res.status(500).json({ message: "Server Exception", error: error });
    }
  }
});

//Export the router
module.exports = router;
