const Sequelize = require("sequelize");
const logger = require("../_utils/logger");

module.exports = class BaseModel extends Sequelize.Model {
  /*Override all static variable 
  if exist on Sequelize.Model*/
  static tableName = "";
  static modelName = "";
  static schema = {};
  static timestamps = true;
  static includes = null;

  /*Init model in here*/
  static init(sequelize) {
    if (
      !this.tableName ||
      !this.modelName ||
      !Object.keys(this.schema).length
    ) {
      logger.warn("Empty table name , model or schema");
      logger.error(
        new Error("The model name, table name and schema cannot be empty!")
      );
    }

    //config after call super init
    let configOptions = {
      tableName: this.tableName,
      modelName: this.modelName,
      sequelize,
      timestamps: this.timestamps,
    };

    return super.init(
      {
        ...this.schema, //schema's fields ex: User have fields: id,email,userName,password,....etc(individual field)

        /*This part use for all model(common field) */
        isDeleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdBy: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        updatedBy: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      configOptions
    );
  }
  //will override later
  static associate(models) {}

  /*
  data: data to set {data: Object}
  transaction: use for multiple manipulate database data {data: sequelize.transaction}
  skipInclude: decide if include the association Model or not {true,false}
  who:updatedBy,cratedBy {String}
  include:include the model associated {instance of BaseModel}
  */
  static addNew(data, transaction, who, skipInclude = true, include) {
    if (who) {
      data.createdBy = who;
      data.updatedBy = who;
    }

    const options = {
      returning: true,
      transaction: transaction,
    };

    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }

    return this.create(data, options);
  }

  /*
  data: data to set {data: Array[...Objects]}
  transaction: use for multiple manipulate database data {data: sequelize.transaction}
  skipInclude: decide if include the association Model or not {true,false}
  who:updatedBy,cratedBy {String}
  include:include the model associated {instance of BaseModel}
  */
  static addMany(data, transaction, who, skipInclude = true, include) {
    let who1 = who || "admin"; //if who is not provided,set default is admin

    data.map((val) => {
      val.createdBy = who1;
      val.updatedBy = who1;
    });

    const options = {
      returning: true, //set this to return instance of Model
      transaction: transaction,
    };

    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }

    return this.bulkCreate(data, options);
  }

  static getDetailById(id, transaction, skipInclude = true, include) {
    let options = {
      where: {
        id: id,
      },
      returning: true,
    };

    if (transaction) {
      options.transaction = transaction;
    }
    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }

    return this.findOne(options);
  }

  /*
 where:condition to match
 skipInclude: decide if include the association Model or not {true,false}
 include:include the model associated {instance of BaseModel}
 */
  static getOneByWhere(where, skipInclude = true, include) {
    let options = {
      where,
      returning: true,
    };

    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }

    return this.findOne(options);
  }

  /*
 where:condition to match
 transaction
 skipInclude: decide if include the association Model or not {true,false}
 include:include the model associated {instance of BaseModel}

 output: instance of Sequelize.Model
 */
  static getDetailByWhere(where, transaction, skipInclude = true, include) {
    let options = {
      where,
      returning: true,
    };

    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }
    if (transaction) {
      options.transaction = transaction;
    }
    return this.findOne(options);
  }

  /*
 where:condition to match
 transaction
 skipInclude: decide if include the association Model or not {true,false}
 include:include the model associated {instance of BaseModel}
 output: Array instance of Sequelize.Model
 */
  static getAllWithDetail(where, transaction, skipInclude = true, include) {
    let options = {
      where,
      returning: true,
    };
    if (!skipInclude && (include || this.include)) {
      options.include = include || this.include;
    }
    if (transaction) {
      options.transaction = transaction;
    }
    return this.findAll(options);
  }
};
