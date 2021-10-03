const roles = require("./_data/role");
// const User = require("../_models/user/index")
const Role = require("../_models/role");

mir =async () => {
  roles.map(async (val) => {
    try {
      let i=  await Role.addNew(val, null, "admin");
      console.log("dsdas",i)

    } catch (err) {
      console.log("err",err)
    }
  });

}

module.exports = mir;