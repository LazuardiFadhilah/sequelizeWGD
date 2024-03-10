const express = require('express');
const users = require('./router/Users.js');
const bodyParser = require('body-parser');
const auth = require('./router/Auth.js');
const app = express();
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Belajar NodeJS",
      version: "0.0.1",
      description: "Belajar NodeJS dengan ExpressJS",
      contact: {
        name: "Lazuardi Fadhilah",
      },
    },
  },
  apis: ["./src/router/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
swaggerDocs.components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/users', users);
app.use('/auth', auth);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
