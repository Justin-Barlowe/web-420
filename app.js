//require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

//App
const app = express();

//Port assignment
const port = process.env.PORT || 3000;

//Json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//options
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

//openapiSpecification
const openapiSpecification = swaggerjsdoc(options); 

//app 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//get request
app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });
  
//http server
http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`);
});
