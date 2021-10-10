const multer = require("multer");

const path = require("path");
const { mkdirSync, deleFIle } = require("./../_utils/fileUtils");
const { StorageOptions, UploadOptions } = require("../_config/multer.config");
const pathdir = path.resolve(__dirname, "../../");

mkdirSync(pathdir + "/_public/uploads");

let imageUpload = (User) => {
  var imageStorage = multer.diskStorage(StorageOptions(User));
  UploadOptions.storage = imageStorage;
  return multer(UploadOptions);
};
module.exports = {
  imageUpload,
};
