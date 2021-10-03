const Sequelize = require("sequelize");
const logger = require("../_utils/logger");

module.exports = class BaseModel extends Sequelize.Model {
  static tableName = "";
  static modelName = "";
  static schema = {};
  static timestamps = true;
  static includes = null;

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
    // this.sequelize = sequelize;

    let configOptions = {
      tableName: this.tableName,
      modelName: this.modelName,
      sequelize,
      timestamps: this.timestamps,
    };

    return super.init(
      {
        ...this.schema,
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

  // static addNew(data,transaction,who){}

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
  static addMany(data, transaction, who, skipInclude = true, include) {
    let who1 = who || "admin";

    data.map((val) => {
      val.createdBy = who1;
      val.updatedBy = who1;
    });

    const options = {
      returning: true,
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

    // console.log("entry:", id, include);
    return this.findOne(options);
  }
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
};
