const swaggerUI = require("swagger-ui-express");

const swaggerJSDoc = require("swagger-jsdoc");
let {
  userComponent,
  formComponent,
  AuthenComponent,
  adminComponent,
} = require("./schema.component");

let useSwagger = (app, port) => {
  const swaggerDefinition = {
    openapi: "3.0.1",
    info: {
      title: "API-DOC FOR HUMAN-RESOURCE SYSTEM",
      version: "1.0.0",
      description:
        "THIS IS AN API DOCUMENT FOR HUMAN-RESOURCE PROJECT DEMAND FOR DEVELOPMENT PURPOSE",
      license: {
        name: "Licensed Under MIT",
        // url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "developing by longnt1",
        url: "https://www.facebook.com/he141142/",
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
      adminComponent: {
        ...adminComponent,
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
