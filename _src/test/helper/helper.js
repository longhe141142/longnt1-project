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

  const formMenu = () => {
    return `
     ===================CHOOSE FUNCTION TO TEST==============================
      1.add form
      2.submit form
      3.add comment
      4.update content
      5.view probate form
      6.view your form
      7.view evaluate form
      8.approve form
      9.reject form
          `;
  };


  const authMenu = () =>{
    return `
     ===================CHOOSE FUNCTION TO TEST==============================
      1.register 
      2.login`
  }


module.exports = { InputSelection, GetUserText,UserMenu,mainMenu,formMenu,authMenu };
