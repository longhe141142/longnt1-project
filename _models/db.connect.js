const fs = require("fs");
const path = require("path");
const logger = require("../_utils/logger");
const _ = require("lodash");
const { sequelize } = require("../_config/db.config");
const config = require("../_config/config")
const _dirname = path.resolve();
class DB {
  constructor() {
    const models = {};
    fs.readdirSync(path.join(__dirname, "../_models"), {
      withFileTypes: true,
    })
      .filter((file) => file.isDirectory())
      .map((directory) => {
        const model = require(path.join(__dirname, directory.name));
        logger.info(path.join(_dirname, directory.name));
        model.init(sequelize);
        models[_.upperFirst(directory.name)] = model;
        // logger.info(`model: ${model}`);
      });

    Object.values(models)
      .filter((val) => {
        console.log("val", val);
        return typeof val.associate === "function";
      })
      .map((val) => {
        val.associate(models);
        console.log("?");
      });
    console.log(">>>>");
  }

  connect = () => {
    let connectPromise = sequelize
      .authenticate()
      .then(() => {
        logger.info(`connected to database  ${sequelize.config.database}`);
        return sequelize.sync({ force: config.force_reset }).then((sequelize) => sequelize);
      })
      .catch((error) => {
        logger.error(error);
      });
    return connectPromise;
  };
}

module.exports = new DB();

// const db = new DB();

// db.connect();
