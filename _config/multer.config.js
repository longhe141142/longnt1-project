module.exports.StorageOptions = {
  destination: (req, file, cb) => {
    const dir = `${__dirname}/../_public/uploads`;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
};

module.exports.UploadOptions = {
        storage: null,
        limits: {
          fileSize: 1000000 // 1000000 Bytes = 1 MB
        },
        fileFilter(req, file, cb) {
          if (!file.originalname.match(/\.(png|jpg)$/)) { 
             // upload only png and jpg format
             return cb(new Error('Please upload a Image'))
           }
         cb(undefined, true)
      }
    
};
