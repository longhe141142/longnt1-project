const swaggerUI = require("swagger-ui-express");

const swaggerJSDoc = require("swagger-jsdoc");
let {
  userComponent,
  formComponent,
  AuthenComponent,
} = require("./schema.component");
let useSwagger = (app, port) => {
  const swaggerDefinition = {
    openapi: "3.0.1",
    info: {
      title: "Express API for JSONPlaceholder",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      ...userComponent,
      formComponent: {
        ...formComponent,
      },
      AuthComponent: {
        ...AuthenComponent,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions

    apis: ["./_src/_services/*/*.js", "./_src/server.js", "./Api-Doc/*.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = { useSwagger };
