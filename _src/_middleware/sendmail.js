const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { htmlToText } = require("html-to-text");
const juice = require("juice");
const {
  TransporterOptions,
  mainOptions,
} = require("../_config/nodemailer.config");
const { ErrorHandler } = require("../_middleware/handling/ErrorHandle");
const nextErr = require("../_middleware/handerError");
const CustomResponse = require("../_middleware/response");
const fs = require("fs");
const logger = require("../_utils/logger");

// const _dirname = path.resolve();

const sendMail = (options) => {
  let { type, content, from, mailReceiver } = options;
  const templatePath =
    type === 1
      ? path.resolve(__dirname, "../../_public/_views/form.html")
      : path.resolve(_dirname, "../../_public/_views/form2.html");

  const templateVars = {
    content: options.content,
    resetLink: "https://justatest.com",
  };

  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, templateVars);
  const text = htmlToText(html);
  const htmlWithStylesInlined = juice(html);

  mainOptions.html = htmlWithStylesInlined;
  mainOptions.text = text;

  if (from != null) {
    TransporterOptions.auth = from;
  }

  if (html != null) {
  }

  mainOptions.subject = type === 0 ? "danh gia dinh ky" : "thu viec";
  mainOptions.text = content;

  var transporter = nodemailer.createTransport(TransporterOptions);
  let mainOp = {
    ...mainOptions,
    to: mailReceiver,
  };

  transporter.sendMail(mainOp, function (err, info) {
    if (err) {
      logger.error(err);
    } else {
      // console.log("Message sent: " + info.response);
      logger.info(`Message sent:  ${info.response}`);
    }
  });
};

module.exports = sendMail;
