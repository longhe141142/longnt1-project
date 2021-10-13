const {
  InputSelection,
  GetUserText,
  UserMenu,
  mainMenu,
} = require("./helper/helper");
let { UpdateProfiletest, viewProfileTest,viewEmployeeList } = require("./user");

let userApi = () => {
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    UserMenu(),
    0,
    5
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      UpdateProfiletest();
      break;
    case 2:
      viewEmployeeList();
      break;
    case 3:
    case 4:
    case 5:
      viewProfileTest();
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
    mainMenu(),
    0,
    4
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
