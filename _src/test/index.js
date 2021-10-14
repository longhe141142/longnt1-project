const { InputSelection, mainMenu } = require("./helper/helper");

const { userApi, formApi } = require("./helper/functionInterface");

let main = () => {
  //  let option =
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    mainMenu(),
    0,
    2
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
    default:
      break;
  }
  return;
};

main();
