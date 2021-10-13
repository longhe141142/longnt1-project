const { InputSelection, GetUserText } = require("./helper/helper");
let { UpdateProfiletest } = require("./user");

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
        `;
};

let userApi = () => {
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    UserMenu()
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      UpdateProfiletest();
      break;
    case 2:
      break;
    case 3:
    default:
      break;
  }
  return;
};

let main = () => {
  //  let option =
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    mainMenu()
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      userApi();
      break;
    case 2:
      break;
    case 3:
    default:
      break;
  }
  return;
};

main();
