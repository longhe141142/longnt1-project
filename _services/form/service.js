const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const FormDetail = require("../../_models/formDetail");
const Form = require("../../_models/form");
const Employee = require("../../_models/employee");
var event = require("events").EventEmitter;
const sendMail = require("../../_middleware/sendmail");
const { report } = require("process");
const { includes } = require("lodash");
module.exports = class FormService extends BaseService {
  _model = Form;
  _include = [FormDetail];
  _eventEmitter = new event();
  constructor() {
    super();
    this._eventEmitter.on("sendmail", sendMail);
  }

  addNewForm = async (req) => {
    let { formDetail, userId, ...form } = req.body;
    const transaction = await User.sequelize.transaction();
    try {
      // await  Promise.all(
      //   userId.map(async (id) => {
      //     let userInstance = await User.getDetailByWhere(
      //       {
      //         id: id,
      //       },
      //       transaction,
      //       false,
      //       [Employee]
      //     );

      //     form.isRejected = 0;
      //     form.isApproved = 0;
      //     form.status = "NEW";
      //     form.dueDate = new Date(form.dueDate);
      //     let formData = await Form.addNew(
      //       form,
      //       transaction,
      //       req.user.userName
      //     );
      //     await formData.setUser(userInstance, {
      //       transaction: transaction,
      //     });

      //     let formDetailData = await FormDetail.addNew(
      //       formDetail,
      //       transaction,
      //       req.user.userName
      //     );

      //     await formDetailData.setForm(formData, {
      //       transaction: transaction,
      //     });

      //     let options = {
      //       type: formData.type,
      //       content: formData.content,
      //       from: null,
      //       content: "",
      //       mailReceiver:
      //         userInstance.email !== null
      //           ? userInstance.email
      //           : "bigherodz54@gmail.com",
      //     };

      //     this._eventEmitter.emit("sendmail", options);
      //   })
      // );
      let formObj = {};

      let formArray = [];
      for (let id of userId) {
        console.log("entryy");
        let userInstance = await User.getDetailByWhere(
          {
            id: id,
          },
          transaction,
          false,
          [Employee]
        );

        if (!userInstance) {
          await transaction.rollback();
          return new Error("User not existed");
        }

        form.isRejected = 0;
        form.isApproved = 0;
        form.status = "NEW";
        form.dueDate = new Date(form.dueDate);

        let formData = await Form.addNew(
          { ...form, userId: id },
          transaction,
          req.user.userName
        );
        // await formData.setUser(userInstance, {
        //   transaction: transaction,
        // });

        console.log(formData.dataValues);
        // await userInstance.addForm(formData,{
        //   transaction: transaction,
        // })

        let formDetailData = await FormDetail.addNew(
          formDetail,
          transaction,
          req.user.userName
        );

        await formDetailData.setForm(formData, {
          transaction: transaction,
        });

        let options = {
          type: formData.type,
          content: formData.content,
          from: null,
          content: "",
          mailReceiver:
            userInstance.email !== null
              ? userInstance.email
              : "bigherodz54@gmail.com",
        };

        formObj.form = formData;
        formObj.formDetail = formDetailData;
        formArray.push(formObj);
        this._eventEmitter.emit("sendmail", options);
      }
      await transaction.commit();
      console.log(formArray);
      return formArray;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return error;
    }
  };

  submit = async (req) => {
    let { id } = req.body;
    let user = req.user.data;
    try {
      let form = await Form.findOne({
        where: {
          id: id,
        },
      });
      if (!form) {
        return new Error("FORM IS NOT EXISTED!");
      }
      if (form.userId !== user.id) {
        return new Error("YOU DONT HAVE PERMISSION TO SUBMIT THIS FORM!");
      }
      let now = new Date().getTime();
      let dueDAte = Date.parse(form.dueDate);
      let isDue = now - dueDAte < 0 ? false : true;
      if (isDue) {
        return new Error("You can't submit because form is overdue");
      }

      if (form.status === "SUBMITTED") {
        return new Error("CANT SUBMIT TWICE");
      }
      await form.update({
        status: "SUBMITTED",
      });

      return form;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  update = async (req, feature) => {
    if (feature === 0) {
      let { content, id } = req.body;
      let user = req.user.data;
      console.log(id);
      let formObj = {};
      let transaction = await Form.sequelize.transaction();
      try {
        let form = await Form.findOne(
          {
            where: {
              id: id,
            },
          },
          {
            transaction: transaction,
          }
        );
        if (!form) {
          return new Error("FORM IS NOT EXISTED!");
        }
        if (form.userId !== user.id) {
          return new Error("YOU DONT HAVE PERMISSION TO EDIT THIS FORM!");
        }

        let isSubmitted = form.status === "SUBMITTED" ? true : false;

        if (isSubmitted) {
          return new Error("You can't update because form is submitted");
        }
        await form.update(
          {
            updatedBy: user.userName,
          },
          { transaction: transaction }
        );

        let formDetail = await FormDetail.getDetailByWhere(
          {
            formId: form.id,
          },
          transaction
        );

        await formDetail.update({
          content: content,
          updatedBy: user.userName,
        });

        formObj.form = form;
        formObj.formDetail = formDetail;

        await transaction.commit();
        return formObj;
      } catch (error) {
        await transaction.rollback();
        console.error(error);
        return error;
      }
    } else {
      let { comment, id } = req.body;
      let manager = req.user.data;
      console.log(id);
      let formObj = {};
      let transaction = await Form.sequelize.transaction();
      try {
        let form = await Form.findOne(
          {
            where: {
              id: id,
            },
          },
          {
            transaction: transaction,
          }
        );
        console.log("entry here");
        if (!form) {
          return new Error("FORM IS NOT EXISTED!");
        }

        let user = await User.getDetailById(form.userId, transaction);
        let employee = await Employee.getDetailByWhere(
          {
            userId: user.id,
          },
          transaction
        );

        if (employee.managerId !== manager.id) {
          return new Error("YOU HAVE NO PERMISSION TO COMMENT");
        }

        let isSubmitted = form.status === "SUBMITTED" ? true : false;

        if (!isSubmitted) {
          return new Error(
            "FORM HASN'T BEEN SUBMITTED YET, CAN'T COMMENT(PERMISSION DENIED)"
          );
        }
        await form.update(
          {
            updatedBy: manager.userName,
          },
          { transaction: transaction }
        );

        let formDetail = await FormDetail.getDetailByWhere(
          {
            formId: form.id,
          },
          transaction
        );

        await formDetail.update({
          managerComment: comment,
          updatedBy: manager.userName,
        });

        formObj.form = form;
        formObj.formDetail = formDetail;

        await transaction.commit();
        return formObj;
      } catch (error) {
        await transaction.rollback();
        console.error(error);
        return error;
      }
    }
  };

  viewInterFormList = async (req, yourRole) => {
    try {
      let ret = [];
      let checkNoForm = false;
      if (yourRole === 2 || yourRole === 3) {
        let users = await User.findAll({});
        for (let user of users) {
          let forms = await Form.getAllWithDetail(
            {
              userId: user.id,
              status: "SUBMITTED",
              type: 1,
            },
            null,
            false,
            ["FormDetail"]
          );
          checkNoForm = forms.length > 0 ? true : checkNoForm;
          let dataObj = {
            user: user,
            forms: forms,
          };
          ret.push(dataObj);
        }

        return checkNoForm ? ret : new Error("No Form submitted yet!");
      } else {
        let ret = [];
        let managerData = req.user.data;
        let manager = await User.getDetailById(managerData.id, null);
        let employees = await manager.getOwnEmployee();
        if (employees.length === 0) {
          return new Error("YOU HAVE NO EMPLOYEE");
        }
        let userList = await Promise.all(
          employees.map((emp) => {
            return User.findOne({
              where: {
                id: emp.userId,
              },
            });
          })
        );

        for (let user of userList) {
          let forms = await Form.getAllWithDetail(
            {
              userId: user.id,
              status: "SUBMITTED",
              type: 1,
            },
            null,
            false,
            ["FormDetail"]
          );
          // logger.info(userList)
          let dataObj = {
            user: user,
            forms: forms,
          };
          ret.push(dataObj);
        }

        console.log(ret);
        return ret;
      }
    } catch (error) {
      return error;
    }
  };

  viewEvalFormList = async (req, yourRole) => {
    try {
      let ret = [];
      let checkNoForm = false;
      if (yourRole === 2 || yourRole === 3) {
        let users = await User.findAll({});
        for (let user of users) {
          let forms = await Form.getAllWithDetail(
            {
              userId: user.id,
              status: "SUBMITTED",
              type: 0,
            },
            null,
            false,
            ["FormDetail"]
          );
          checkNoForm = forms.length > 0 ? true : checkNoForm;
          let dataObj = {
            user: user,
            forms: forms,
          };
          ret.push(dataObj);
        }

        return checkNoForm ? ret : new Error("No Form submitted yet!");
      } else {
        let ret = [];
        let managerData = req.user.data;
        let manager = await User.getDetailById(managerData.id, null);
        let employees = await manager.getOwnEmployee();
        if (employees.length === 0) {
          return new Error("YOU HAVE NO EMPLOYEE");
        }
        let userList = await Promise.all(
          employees.map((emp) => {
            return User.findOne({
              where: {
                id: emp.userId,
              },
            });
          })
        );

        for (let user of userList) {
          let forms = await Form.getAllWithDetail(
            {
              userId: user.id,
              status: "SUBMITTED",
              type: 0,
            },
            null,
            false,
            ["FormDetail"]
          );
          // logger.info(userList)
          let dataObj = {
            user: user,
            forms: forms,
          };
          ret.push(dataObj);
        }

        console.log(ret);
        return ret;
      }
    } catch (error) {
      return error;
    }
  };

 viewYourForm = async (req)=>{

 }

  viewForm = async (req, type) => {
    let yourRole = await this.getHighestRole(req.user.data.id);
    switch (type) {
      case 1:
        return await this.viewInterFormList(req, yourRole);
      case 2:
        return await this.viewEvalFormList(req, yourRole);
      case 3:
        
        break;
    }
  };
};
