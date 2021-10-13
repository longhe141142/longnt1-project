const {
    InputSelection,
    UserMenu,
    formMenu
   } = require("./helper");
  let {
    UpdateProfiletest,
    viewProfileTest,
    viewEmployeeList,
    viewOwnEmployee,
    addEmployeeTest,
  } = require("../user");

  let {
    addForm
  } = require("../form")
  
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
      5
    );
    if (option === 0) {
      return;
    }
    switch (option) {
      case 1:
        addForm();
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
      default:
        break;
    }
    return;
  };
  

  module.exports ={
    userApi,formApi
  }