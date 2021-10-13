const prompt = require("prompt-sync")();

const GetUserText = (msg) => {
  const Text = prompt(`${msg}`);
  return Text;
};

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
const GetInteger = (msgInput, msgErr, min, max) => {
  while (true) {
    var g = GetUserText(msgInput).trim();
    if (isNumeric(g)) {
      if (parseInt(g) < min || parseInt(g) > max) {
        console.log(msgErr);
      } else {
        return parseInt(g);
      }
    } else {
      console.log(msgErr);
    }
  }
};

const InputSelection = (msg, errMsg, menu,min,max) => {
  console.log(menu);
  let choice = GetInteger(msg, errMsg, min, max);
  return choice;
};

const mainMenu = () => {
    return `
     ===================CHOOSE API TO TEST==============================
      1.USER
      2.FORM
      3.AUTHENTICATION
      4.ADMIN
      `;
  };
  
  const UserMenu = () => {
    return `
     ===================CHOOSE FUNCTION TO TEST==============================
      1.update profile
      2.view employee list
      3.view own employee
      4.add employee
      5.view profile
          `;
  };

module.exports = { InputSelection, GetUserText,UserMenu,mainMenu };
