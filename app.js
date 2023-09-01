// Name: Justin Barlowe
// Title: barlowe-composer.js
// Description: App entry point
// Date: 8/31/2023

// Require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerAPI = require('./routes/barlowe-composer-routes');
const Composer = require('./models/barlowe-composer');

// App configuration and port assignment
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection string
const conn = 'mongodb+srv://web420_user:waduhek@bellevueuniversity.w2mknhu.mongodb.net/web420DB';

// Connect to MongoDB
mongoose
  .connect(conn)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });

  // Options for the swagger docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./docs/barlowe-composers.yaml'],
};

// Initialize swagger-jsdoc
const openapiSpecification = swaggerJsdoc(options);

// Setup swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);

// Server creation
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
});
