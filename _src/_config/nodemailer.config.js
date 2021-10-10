const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });


//transporter interface
const TRANSPORTER = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: "longnt1@vmodev.com", pass: "neirmcduqnlpcmzc" },
};

//config mail content
const MAIN_OPTION = {
  from: "NQH-Test nodemailer",
  subject: "Test Nodemailer",
  text: "Your text is here",
  html: "<h1>Hello Billy</h1>",
};

//transporter option include interface
const TransporterOptions = {
  ...TRANSPORTER,
  tls: {
    rejectUnauthorized: false,//set this to use authorize of email
  },
};

const mainOptions = {
  ...MAIN_OPTION,
};

module.exports = { TransporterOptions, mainOptions };
