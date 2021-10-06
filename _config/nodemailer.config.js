const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// const config_transport = JSON.parse(process.env.TRANSPORTER);
// const main_option = JSON.parse(process.env.MAIN_OPTION);
const TRANSPORTER = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: "longnt1@vmodev.com", pass: "neirmcduqnlpcmzc" },
};
const MAIN_OPTION = {
  from: "NQH-Test nodemailer",
  subject: "Test Nodemailer",
  text: "Your text is here",
  html: "<h1>Hello Billy</h1>",
};
const TransporterOptions = {
  ...TRANSPORTER,
  tls: {
    rejectUnauthorized: false,
  },
};

const mainOptions = {
  ...MAIN_OPTION,
};

module.exports = { TransporterOptions, mainOptions };
