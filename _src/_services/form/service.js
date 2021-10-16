const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");

//model
const User = require("../../_models/user");
const FormDetail = require("../../_models/formDetail");
const Form = require("../../_models/form");
const Employee = require("../../_models/employee");

//event send mail
var event = require("events").EventEmitter;
const sendMail = require("../../_middleware/sendmail");

module.exports = class FormService extends BaseService {
  _model = Form;
  _include = [FormDetail];
  _eventEmitter = new event();
  constructor() {
    super();
    this._eventEmitter.on("sendmail", sendMail);
  }


  checkPermission = async (currentUserId, userIdToAdd, transaction) => {
    let currentUsr_Role = await this.getHighestRole(currentUserId, transaction);
    let userToAdd_Role = await this.getHighestRole(userIdToAdd, transaction);
    if (currentUsr_Role >= userToAdd_Role) {
      return new Error(`You do not have permission to add form to this user`);
    }
    return true;
  };


  addNewForm = async (req) => {
    let { formDetail, userId, ...form } = req.body;
    const transaction = await User.sequelize.transaction();
    try {
      //repair object for pushing to formArray
      let formObj = {};

      let formArray = [];
      //get list userId from request
      for (let id of userId) {
        let userInstance = await User.getDetailByWhere(
          {
            id: id,
          },
          transaction,
          false,
          [Employee]
        );
        //if no record found
        if (!userInstance) {
          await transaction.rollback();
          return new Error("User not existed");
        }
        //higher role can add form to lower 
        let checkPermission = await this.checkPermission(
          req.user.data.id,
          userInstance.id
        );
        //if some error occur
        if (checkPermission instanceof Error) {
          return checkPermission;
        }
        //default value
        form.isRejected = 0;
        form.isApproved = 0;
        form.status = "NEW";
        form.dueDate = new Date(form.dueDate);
        
        let formData = await Form.addNew(
          { ...form, userId: id },
          transaction,
          req.user.data.userName
        );
        //add form detail with form
        let formDetailData = await FormDetail.addNew(
          formDetail,
          transaction,
          req.user.data.userName
        );
        //set id of form to form detail
        await formDetailData.setForm(formData, {
          transaction: transaction,
        });
        //preparation for send email
        let options = {
          type: formData.type,
          content: formData.content,
          from: null,
          content: "",
          
          mailReceiver://config the mail to receiver
            userInstance.email !== null
              ? userInstance.email
              : "bigherodz54@gmail.com",
        };
        formObj.form = formData;
        formObj.formDetail = formDetailData;
        
        formArray.push(formObj);
        
        this._eventEmitter.emit("sendmail", options);//event send mail fired
      }
      await transaction.commit();
      return formArray;//return array of object
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return error;
    }
  };

  //update content or managerComment
  updateFormDetail = async (formId, data) => {
    let formDetail = await FormDetail.findOne({
      where: {
        id: formId,
      },
    });
    await formDetail.update(data);
  };


  submit = async (req) => {
    let { id } = req.body;//get id of form to submit
    let user = req.user.data;//get current user info
    try {
      let form = await Form.findOne({
        where: {
          id: id,
        },
      });
      //oops,form is not existed
      if (!form) {
        return new Error("FORM IS NOT EXISTED!");
      }
      //mean that this form is not belong to current user
      if (form.userId !== user.id) {
        return new Error("YOU DONT HAVE PERMISSION TO SUBMIT THIS FORM!");
      }
      //check due date
      let checkDueDAte = this.checkFormDue(form, "submit");
      if (checkDueDAte instanceof Error) return checkDueDAte;
      //check if form is closed or not
      if (form.status === this.formSatus.CLOSED)
        return new Error("FORM CLOSED,CAN'T SUBMIT");
      //check if form is submitted
      if (form.status === this.formSatus.SUBMITTED) {
        return new Error("CANT SUBMIT TWICE");
      }
      //check if form is deleted
      if (form.isDeleted === true) {
        return new Error("You can't submit because form is deleted!");
      }
      //after overcome all test,form will update status to submitted
      await form.update({
        status: this.formSatus.SUBMITTED,
      });

      //return
      return form;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  //check if form is overDUe
  checkFormDue = (form, action) => {
    let now = new Date().getTime();
    let dueDAte = Date.parse(form.dueDate);
    let isDue = now - dueDAte < 0 ? false : true;
    if (isDue || form.isDue) {
      return new Error(`You can't ${action} because form is overdue`);
    }
  };

  update = async (req, feature) => {
    //feature:0-->update content
    //feature:1-->update manager comment
    if (feature === 0) {
      let { content, id } = req.body;
      let user = req.user.data;
      let formObj = {};//prepare for returning data
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
        //no record
        if (!form) {
          return new Error("FORM IS NOT EXISTED!");
        }
        //form is not of yours
        if (form.userId !== user.id) {
          return new Error("YOU DONT HAVE PERMISSION TO EDIT THIS FORM!");
        }
        //if form is submitted,can't modify
        let isSubmitted =
          form.status === this.formSatus.SUBMITTED ? true : false;
        //if form is deleted,can't modify  
        let isDeleted = form.isDeleted === true ? true : false;
        if (isSubmitted) {
          return new Error("You can't update because form is submitted");
        }
        if (isDeleted) {
          return new Error("You can't update because form is deleted");
        }
        //form closed can't modify
        if (form.status === this.formSatus.CLOSED)
          return new Error("You can't update because form is closed");
        //form overDue,can't modify
        let checkDueDAte = this.checkFormDue(form, "update");
        if (checkDueDAte instanceof Error) return checkDueDAte;
        //update content
        //find form to update
        await form.update(
          {
            updatedBy: user.userName,
          },
          { transaction: transaction }
        );
        //content actually in form detail so must take more step
        let formDetail = await FormDetail.getDetailByWhere(
          {
            formId: form.id,
          },
          transaction
        );
        //then update the content
        await formDetail.update({
          content: content,
          updatedBy: user.userName,
        });
        //prepare data returning
        formObj.form = form;
        formObj.formDetail = formDetail;

        await transaction.commit();
        return formObj;
      } catch (error) {
        await transaction.rollback();
        logger.error(error);
        return error;
      }
    } else {//for update manager comment (for manager and director)
      let { comment, id } = req.body;
      let manager = req.user.data;
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
        //get user who is form owner
        let user = await User.getDetailById(form.userId, transaction);
        let employee = await Employee.getDetailByWhere(
          {
            userId: user.id,
          },
          transaction
        );
        //get employee(purpose: find manager of this employee)
        //if current user is not manager of this employee
        if (employee.managerId !== manager.id) {
          return new Error("YOU HAVE NO PERMISSION TO COMMENT");//return no permission
        }
        //check form is submitted or not? | if submitted can add comment otherwise will throw error
        let isSubmitted = form.status === this.formSatus.SUBMITTED ? true : false;

        if (!isSubmitted) {
          return new Error(
            "FORM HASN'T BEEN SUBMITTED YET, CAN'T COMMENT(PERMISSION DENIED)"
          );
        }
        //check if form is deleted
        let isDeleted = form.isDeleted === true ? true : false;
        if (isDeleted) {
          return new Error("You can't update because form is deleted");
        }
        //start update comment
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
        logger.error(error);
        await transaction.rollback();
        return error;
      }
    }
  };


  //view current user forms
  viewYourForm = async (req) => {
    try {
      let userData = req.user.data;
      let forms = await Form.getAllWithDetail(
        {
          userId: userData.id,
        },
        null,
        false,
        "FormDetail"
      );
      //if no form found return error
      if (forms.length === 0)
        return new Error("You have no form,wait in the future");
      return forms;
    } catch (error) {
      return error;
    }
  };

  //type 1:probate form
  //type 0:periodic evaluate form
  viewListBaseOnType = async (req, yourRole, formType) => {
    try {
      let ret = [];
      //check if form available
      let checkNoForm = false;
      //if manager role:can only view own employee forms which are submitted
      //if hr or director: can view all user form
      if (yourRole === 2 || yourRole === 3) {
        let users = await User.findAll({});
        for (let user of users) {
          let forms = await Form.getAllWithDetail(
            {
              userId: user.id,
              status: this.formSatus.SUBMITTED,
              type: formType,
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
        //if array ret is empty return error
        return checkNoForm ? ret : new Error("No Form submitted yet!");
      } else {

        let ret = [];
        let managerData = req.user.data;
        let manager = await User.getDetailById(managerData.id, null);
        let employees = await manager.getOwnEmployee();
        if (employees.length === 0) { //this current user have no employees
          return new Error("YOU HAVE NO EMPLOYEE");
        }
        //from employee,find all corresponding user 
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
              status: this.formSatus.SUBMITTED,
              type: formType,
            },
            null,
            false,
            ["FormDetail"]//include formDetail to view content and manager comment
          );
          checkNoForm = forms.length > 0 ? true : checkNoForm;
          let dataObj = {
            user: user,
            forms: forms,
          };
          ret.push(dataObj);
        }
        return checkNoForm ? ret : new Error("No Form submitted yet!");
      }
    } catch (error) {
      return error;
    }
  };

  
  viewForm = async (req, type) => {
    let yourRole = await this.getHighestRole(req.user.data.id);
    switch (type) {
      case 1:
        return await this.viewListBaseOnType(req, yourRole,1);
      case 2:
        return await this.viewListBaseOnType(req, yourRole,0);
      case 3:
        return await this.viewYourForm(req);
    }
  };

  formAction = async (manager, formId, action) => {
    let transaction = await Form.sequelize.transaction();
    try {
      let form = await Form.getDetailById(formId, transaction, false, [
        "FormDetail",
      ]);
      if (!form) return new Error(`FORM IS NOT EXISTED`);
      let user = await User.getDetailById(form.userId, transaction, false, [
        Employee,
      ]);
      if (manager.id != user.employee.managerId)
        return new Error(`YOU HAVE NOT PERMISSION IN THIS FORM`);

      if (form.status !== this.formSatus.SUBMITTED) {
        return new Error(`FORM IS PENDING FOR SUBMISSION`);
      }

      if (action === this.ManagerAction.APPROVE) {
        if (form.isRejected === 1) {
          form.isRejected = 0;
          await form.save({
            transaction: transaction,
          });
        }
        form.isApproved = 1;
      } else {
        if (form.isApproved === 1) {
          form.isApproved = 0;
          await form.save({
            transaction: transaction,
          });
        }
        form.isRejected = 1;
      }

      await form.save({
        transaction: transaction,
      });
      await transaction.commit();
      return form;
    } catch (e) {
      await transaction.rollback();
      return e;
    }
  };

  approveOrReject = async (req, action) => {
    let userData = req.user.data;
    let { id: formId } = req.body;
    return await this.formAction(userData, formId, action);
  };

  checkDue = async () => {
    let formChanged = 0;
    let now = new Date().getTime();
    let forms = await Form.findAll({});
    if (forms.length === 0) {
      return new Error(`No form available now`);
    }
    let transaction = await Form.sequelize.transaction();
    try {
      await Promise.all(
        forms.map(async (form) => {
          let formInstance = await form;
          let dueDAte = Date.parse(formInstance.dueDate);
          if (
            now - dueDAte > 0 &&
            formInstance.status !== this.formSatus.CLOSED
          ) {
            formChanged++;
            return formInstance.update(
              {
                isDue: 1,
                isDeleted: 1,
              },
              { transaction: transaction }
            );
          }
        })
      );
      transaction.commit();
      return `${formChanged} form over Due!`;
    } catch (error) {
      transaction.rollback();
      return error;
    }
  };

  closeForm = async (req) => {
    try {
      let { id: formId } = req.body;
      let form = await Form.findOne({
        where: { id: formId },
      });
      if (!form) {
        logger.error("FORM IS NOT EXISTED");
        return new Error("FORM IS NOT EXISTED!");
      }

      if (form.status === this.formSatus.CLOSED) {
        logger.error("FORM IS CLOSED");
        return new Error("FORM IS CLOSED CAN'T DO IT AGAIN!");
      }

      await form.update({
        status: this.formSatus.CLOSED,
      });

      logger.info("CLOSE FORM SUCCESSFULLY");
      return `CLOSE FORM SUCCESSFULLY`;
    } catch (error) {
      return error;
    }
  };
};
