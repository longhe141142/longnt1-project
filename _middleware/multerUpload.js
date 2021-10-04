const multer = require("multer");

const path = require("path");
const { mkdirSync, deleFIle } = require("./../_utils/fileUtils");
const { StorageOptions, UploadOptions } = require("../_config/multer.config");
const pathdir = path.resolve(__dirname, "../");
mkdirSync(pathdir + "/_public/uploads");

var imageStorage = multer.diskStorage(StorageOptions);

UploadOptions.storage = imageStorage;

const imageUpload = multer(UploadOptions);
module.exports = {
  uploadSingle: imageUpload.single("image"),
  UploadMultil: imageUpload.array("images"),
};
