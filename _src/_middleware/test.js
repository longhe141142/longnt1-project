const {
    TransporterOptions,
    mainOptions,
  } = require("../_config/nodemailer.config");


  TransporterOptions.auth = {
     user:"overrided",
     pass:"override pass"
  }

  console.log(TransporterOptions)