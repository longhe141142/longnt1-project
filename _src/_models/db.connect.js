const fs = require("fs");
const path = require("path");
const logger = require("../_utils/logger");
const _ = require("lodash");
const { sequelize } = require("../_config/db.config");
const config = require("../_config/config")
class DB {
  constructor() {
    //storage all Sequelize.Model : [User,Api,UserRole,....]
    const models = {};

    fs.readdirSync(path.join(__dirname, "../_models"), {
      //add this to get fileType
      //if this config is not set,error will occur in next line
      withFileTypes: true,
    })
      /*only file is directory (folder) ,file is not allowed 
      Example: allow: api,user,role,....
               denied: base.js,db.connect.js,...
      */
      .filter((file) => file.isDirectory())
      .map((directory) => {
        /*require model to sync with database
        the following code will init model and create table
        */
        const model = require(path.join(__dirname, directory.name));
        model.init(sequelize);
        //upper the first letter of directory name and set as model name
        models[_.upperFirst(directory.name)] = model;
      });

    Object.values(models)
      //only model is instance of BaseModel can associate
      .filter((val) => {
        return typeof val.associate === "function";
      })
      .map((val) => {
        /*associate each model:
        Eg: user.belongsToMany(models.Role,{through:model.UserRole}),form.hasOne(models.FormDetail)...etc
        */
        val.associate(models);
      });
  }

  /*after create model and associate them
  then connect to database to sync all options
  */
  connect = () => {
    let connectPromise = sequelize
      .authenticate()
      .then(() => {
        //success
        logger.info(`connected to database  ${sequelize.config.database}`);
        return sequelize.sync({ force: config.force_reset }).then((sequelize) => sequelize);
      })
      .catch((error) => {
        //failed
        logger.error(error);
      });
    return connectPromise;
  };
}

module.exports = new DB();

// const db = new DB();

// db.connect();
