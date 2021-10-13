const path = require("path");
const fs = require("fs");
const { mkdirSync, deleImageFIle } = require("./../_utils/fileUtils");

/*
input: class User extends BaseModel
output: 
object{
  destination: callback,
  filename: callback
} ---> config storage destination and format file
*/
let StorageOptions = (User) => {
  //return this
  let storageOption = {
    destination: async function (req, file, cb) {
      /*take userName , id 
      from user authenticated at
      previous middleware*/
      let { userName, id } = req.user.data;
      //get user instance of User where id = req.user.data.id
      let user = await User.getDetailByWhere({
        id: id,
      });

      //get absolute avatar folder path of that user
      const dir = path.resolve(
        path.join(__dirname, `../../_public/uploads/${userName}`)
      );

      //create folder if not exist
      mkdirSync(dir);

      //delete all image file(if exist) in directory
      if (user.avatar != null) deleImageFIle(dir);
      cb(null, dir);
    },

    filename: function (req, file, cb) {
      //format file follow below formatter
      const filename = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      cb(null, filename);
    },
  };
  return storageOption;
};

//Object that include condition for file to upload
let UploadOptions = {
  storage: null,
  //limit the file size
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    //only file that png or jpg can be uploaded
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
};

module.exports = { StorageOptions, UploadOptions };
