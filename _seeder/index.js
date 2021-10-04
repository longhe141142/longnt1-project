const roles = require("./_data/role");
const apis = require("./_data/api");
// const User = require("../_models/user/index")
const Role = require("../_models/role");
const Api = require("../_models/api");
const logger = require("../_utils/logger");

let InitData = async () => {
  roles.map(async (val) => {
    await Role.addNew(val, null, "admin");
  });

  apis.map(async (val) => {
    await Api.addNew(val, null, "admin");
  });
};

let InitAssociationData = async () => {
  try {
    // let employee = await Role.getDetailByWhere({
    //   name: "admin",
    // },null,true,null);
    let employee = await Role.findOne({
      where: {
        name: "employee",
      },
    });

    let apiRecord = await Api.findOne({
      where: {
        feature: "view profile",
      },
    });

    console.log(apiRecord);

    console.log(employee);
    await employee.addApi(apiRecord, {
      through: { createdBy: "admin", updatedBy: "admin" },
    });

    // let w=await employees[0].getApis()
    // await employees[0].addApis()
    // console.log(w)
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { InitData, InitAssociationData };
