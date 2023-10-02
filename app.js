// Name: Justin Barlowe
// Title: barlowe-composer.js
// Description: App entry point
// Date: 8/31/2023
// Last Modified: 9/25/2023


// Require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

//API specific require statements
const composerAPI = require('./routes/barlowe-composer-routes');
const Composer = require('./models/barlowe-composer');
const Person = require('./models/barlowe-person');
const personAPI = require('./routes/barlowe-person-routes');
const userAPI = require('./routes/barlowe-session-routes');
const customerAPI = require('./routes/barlowe-node-shopper-routes');
const teamAPI = require('./routes/barlowe-team-routes');

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
  apis: ['./docs/barlowe-team.yaml',
        './docs/barlowe-composers.yaml',
         './docs/barlowe-persons.yaml',
         './docs/barlowe-users.yaml',
         './docs/barlowe-customers.yaml'
         ],
};

// Initialize swagger-jsdoc
const openapiSpecification = swaggerJsdoc(options);

// Setup swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', teamAPI);
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);


// Server creation
http.createServer(app).listen(port, function () {
  console.log(`Server started and listening on port: ${port}`);
  console.log('To test with Swagger, visit: http://localhost:3000/api-docs/');
  console.log('To terminate the server, press Ctrl + C');
});
