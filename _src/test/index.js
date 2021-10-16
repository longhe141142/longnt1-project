const { InputSelection, mainMenu } = require("./helper/helper");

const { userApi, formApi, authAPI } = require("./helper/functionInterface");

let main = () => {
  //  let option =
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    mainMenu(),
    0,
    3
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      userApi();
      break;
    case 2:
      formApi();
      break;
    case 3:
      authAPI();
      break;
    default:
      break;
  }
  return;
};

main();
