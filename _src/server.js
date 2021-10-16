const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require("./_utils/logger");
const config = require("./_config/config");
const InitialService = require("./_services/index");
const { responseEnhancer } = require("express-response-formatter");
var cors = require('cors')
// let { InitAssociationData } = require("./_seeder/index");
let { useSwagger } = require("../Api-Doc/index");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(responseEnhancer());
app.use(cors());

app.get("/getBook", (req, res, next) => {
  res.send("haha");
});

app.get("/", (req, res) => res.send("App is working"));

const initService = (app) => {
  const service = new InitialService(app);
  service.registerService();

  logger.info("Initializing service...");
};

const initSequelize = async () => {
  const db = require("./_models/db.connect");
  try {
    await db.connect();
    logger.info(`Establish connection successfully:--->`);
  } catch (error) {
    logger.error("Connection crashed!--->");
    logger.error(err.message);
  }
};

const startServer = async () => {
  initService(app);
  await initSequelize();
  useSwagger(app, config.port);
  app.listen(config.port, config.host);
  logger.info(
    `Listening on host ${config.host} on port ${config.port} http://${config.host}:${config.port}`
  );
};

startServer();

module.exports = app;
