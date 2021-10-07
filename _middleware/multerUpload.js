const multer = require("multer");

const path = require("path");
const { mkdirSync, deleFIle } = require("./../_utils/fileUtils");
const { StorageOptions, UploadOptions } = require("../_config/multer.config");
const pathdir = path.resolve(__dirname, "../");

//  function refresh(pathdir){
// deleFIle(pathdir + "/_public");
mkdirSync(pathdir + "/_public/uploads");

// }

// refresh(pathdir);

// const imageUpload = multer(UploadOptions);

let imageUpload = (User) => {
  var imageStorage = multer.diskStorage(StorageOptions(User));
  UploadOptions.storage = imageStorage;
  return multer(UploadOptions);
};
module.exports = {
  // uploadSingle: imageUpload.single("image"),
  // UploadMultil: imageUpload.array("images"),
  imageUpload,
};
