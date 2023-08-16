const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerjsdoc(options); // Define this before using it

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });
  

http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`);
});
