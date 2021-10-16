const { InputSelection, UserMenu, formMenu,authMenu } = require("./helper");
let {
  UpdateProfiletest,
  viewProfileTest,
  viewEmployeeList,
  viewOwnEmployee,
  addEmployeeTest,
} = require("../user");

let {
  addForm,
  submitForm,
  viewEmployeeProbateForm,
  updateComment,
  updateContent,
  viewYourForm,
  viewEvalForm,
  approveForm,
  rejectForm,
} = require("../form");

let { testRegister,testLogin } = require("../auth");

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
      viewOwnEmployee();
      break;
    case 4:
      addEmployeeTest();
      break;
    case 5:
      viewProfileTest();
    default:
      break;
  }
  return;
};

let formApi = () => {
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    formMenu(),
    0,
    9
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      addForm();
      break;
    case 2:
      submitForm();
      break;
    case 3:
      updateComment();
      break;
    case 4:
      updateContent();
      break;
    case 5:
      viewEmployeeProbateForm();
      break;
    case 6:
      viewYourForm();
      break;
    case 7:
      viewEvalForm();
      break;
    case 8:
      approveForm();
      break;
    case 9:
      rejectForm();
      break;
    default:
      break;
  }
  return;
};

let authAPI = () => {
  let option = InputSelection(
    "Enter input(0 to exit)->: ",
    "Invalid Value",
    authMenu(),
    0,
    2
  );
  if (option === 0) {
    return;
  }
  switch (option) {
    case 1:
      testRegister();
      break;
    case 2:
      testLogin();
      break;
    default:
      break;
  }
  return;
};

module.exports = {
  userApi,
  formApi,
  authAPI,
};
