const fs = require("fs");

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
};

const deleFIle = (path) => {
  try {
    fs.unlinkSync(path);
    //file removed
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { mkdirSync, deleFIle };