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

const InputSelection = (msg, errMsg, menu) => {
  console.log(menu);
  let choice = GetInteger(msg, errMsg, 0, 3);
  return choice;
};

module.exports = { InputSelection, GetUserText };
