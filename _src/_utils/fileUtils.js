const fs = require("fs");
const path = require("path");
const logger = require("../_utils/logger");

//create folder if not exist
const mkdirSync = function (path) {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path,{recursive: true});
  } catch (err) {
    throw err;
  }
};

//delete all png or jpg file in directory
const deleImageFIle = (path) => {
  try {
    let regex = /\.(png|jpg)$/;
    fs.readdirSync(path)
      .filter((f) => regex.test(f))
      .map((f) => fs.unlinkSync(path + "/" + f));
    //file removed
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = { mkdirSync, deleImageFIle };
