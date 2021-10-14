let { userToken } = require("./token/token");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
let { E07, E02, E05, E03 } = userToken.employee;
let { M01, M02, M03 } = userToken.manager;
let { D01 } = userToken.director;
let { HR02 } = userToken.hr;
let { formTestData } = require("./data/case");
let Form = require("../_models/form");
let User = require("../_models/user");
let Employee = require("../_models/employee");
let FormDetail = require("../_models/formDetail");
const logger = require("../_utils/logger");
const { data } = require("../_utils/logger");

let addForm = () => {
  /*===================================test add form =========================================*/
  describe("/POST add form with user [EMPLOYEE02] to entry", () => {
    it("it should not allow this user(UNAUTHORIZE) ", (done) => {
      chai
        .request(server)
        .post("/api/form/create")
        .set("AuthenticateToken", E07)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("cant access");
          done();
        });
    });
  });

  describe("/POST add form with user [MANAGER] to entry", () => {
    it("it should not allow this user(UNAUTHORIZE)", (done) => {
      chai
        .request(server)
        .post("/api/form/create")
        .set("AuthenticateToken", M01)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("cant access");
          done();
        });
    });
  });

  describe("/POST add form with user [role hr] to add form to director", () => {
    it(`it should not allow send form
        with error message:You do not have permission to add form to this user`, (done) => {
      let formData = {
        userId: [formTestData.addForm.userId.VALID_USERID.DIRECTOR_1],
        type: formTestData.addForm.type.PERIODIC_TYPE,
        dueDate: formTestData.addForm.dueDate.VALID_DUEDATE,
      };
      chai
        .request(server)
        .post("/api/form/create")
        .set("AuthenticateToken", HR02)
        .send(formData)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql(
            "You do not have permission to add form to this user"
          );
          done();
        });
    });
  });
};

let submitForm = () => {
  describe("/POST submit form which is overdue", () => {
    it(`it should not allow submit form
        with error message: You can't submit because form is overdue`, (done) => {
      let formData = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_OVERDUE,
      };
      chai
        .request(server)
        .put("/api/form/submit")
        .set("AuthenticateToken", E05)
        .send(formData)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql(
            "You can't submit because form is overdue"
          );
          done();
        });
    });
  });

  describe("/POST submit form which is submitted", () => {
    it(`it should not allow submit form
        with error message: CANT SUBMIT TWICE`, (done) => {
      let formData = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_SUBMITTED,
      };
      chai
        .request(server)
        .put("/api/form/submit")
        .set("AuthenticateToken", E05)
        .send(formData)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("CANT SUBMIT TWICE");
          done();
        });
    });
  });

  describe("/POST submit form which is closed", () => {
    it(`it should not allow submit form
        with error message:FORM CLOSED,CAN'T SUBMIT`, (done) => {
      let formData = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_CLOSED,
      };
      chai
        .request(server)
        .put("/api/form/submit")
        .set("AuthenticateToken", E05)
        .send(formData)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("FORM CLOSED,CAN'T SUBMIT");
          done();
        });
    });
  });

  describe("/POST submit form which is valid form", () => {
    it(`it should submit form
        with error message:FORM IS NOT EXISTED!`, async () => {
      afterEach(async () => {
        let form = await Form.findOne({
          where: {
            id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_NEW,
          },
        });
        // console.log("form", form);
        await form.update({
          status: "NEW",
        });
      });
      let formData1 = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_NEW,
      };
      let res = await chai
        .request(server)
        .put("/api/form/submit")
        .set("AuthenticateToken", E05)
        .send(formData1);

      res.should.have.status(200);
      res.body.should.have.property("data");
      res.body.data.id.should.equal(formData1.id);
    });
  });
};

let viewEmployeeProbateForm = () => {
  describe("/GET view Employee view probate form list with [MANAGER2]", () => {
    it(`it should not display form,
        with error message:No Form submitted yet`, async () => {
      let res = await chai
        .request(server)
        .get("/api/form/list/intern")
        .set("AuthenticateToken", M02);

      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.eql("No Form submitted yet!");
    });
    beforeEach(async () => {
      let form = await Form.findOne({
        where: {
          id: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
        },
      });
      await form.update({
        status: "NEW",
      });
    });
    afterEach(async () => {
      let form = await Form.findOne({
        where: {
          id: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
        },
      });
      await form.update({
        status: "SUBMITTED",
      });
    });
  });

  describe("/GET view Employee view probate form list with [MANAGER2] when one employee submit form", () => {
    it(`it should DISPLAY forms which ARE SUBMITTED
        with data of length:2`, async () => {
      let res = await chai
        .request(server)
        .get("/api/form/list/intern")
        .set("AuthenticateToken", M02);

      res.should.have.status(200);
      res.body.should.have.property("data");
      res.body.data.should.have.lengthOf(2);
      // res.body.error.message.should.eql("No Form submitted yet!");
    });
    beforeEach(async () => {
      let employee07 = await User.findOne({
        where: {
          id: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
        },
      });
      let form = await Form.findOne({
        where: {
          userId: employee07.id,
        },
      });

      await form.update({
        status: "SUBMITTED",
      });
    });

    afterEach(async () => {
      let employee07 = await User.findOne({
        where: {
          id: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
        },
      });
      let form = await Form.findOne({
        where: {
          userId: employee07.id,
        },
      });

      await form.update({
        status: "NEW",
      });
    });
  });
};

let updateComment = () => {
  describe("/PATCH Update comment in form which is not submitted yet", () => {
    it(`it should DISPLAY ERROR (FORM HASN'T BEEN SUBMITTED YET, CAN'T COMMENT(PERMISSION DENIED))
        status code:404`, async () => {
      let data = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_NEW,
        comment: "update",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/comment")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.should.eql(
        "FORM HASN'T BEEN SUBMITTED YET, CAN'T COMMENT(PERMISSION DENIED)"
      );
    });
  });

  describe("/PATCH Update comment in form which is submitted", () => {
    it(`it should DISPLAY data and confirm that manager's comment is updated)
        status code:200`, async () => {
      let data = {
        id: formTestData.submitForm.FORM_EMPLOYEE_05.FORM_SUBMITTED,
        comment: "update comment",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/comment")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(200);
      res.body.should.have.property("data");
      res.body.data.formDetail.managerComment.should.eql("update comment");
    });
  });

  describe("/PATCH Update comment in form which isn't belong to your employee", () => {
    let tmp = {};
    let data = {};
    it(`it should DISPLAY ERROR(YOU HAVE NO PERMISSION TO COMMENT)
        status code:404`, async () => {
      let res = await chai
        .request(server)
        .patch("/api/form/modify/comment")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.should.eql("YOU HAVE NO PERMISSION TO COMMENT");
    });

    beforeEach(async () => {
      let transaction = await User.sequelize.transaction();

      try {
        let user = await User.create(
          {
            userName: "temporaryUser",
            password: "abc",
          },
          {
            transaction: transaction,
          }
        );

        let employee = await Employee.create(
          {
            userId: user.id,
            firstName: "Nguyen",
            lastName: "Long",
          },
          {
            transaction: transaction,
          }
        );

        let form = await Form.create(
          {
            type: "1",
            status: "NEW",
            dueDate: new Date(),
            userId: user.id,
          },
          {
            transaction: transaction,
          }
        );
        await transaction.commit();
        tmp.form = form;
        tmp.user = user;
        tmp.employee = employee;

        data.id = form.id;
        data.comment = "update comment";
      } catch (error) {
        transaction.rollback();
        console.log(error);
      }
    });
    afterEach(async () => {
      if (tmp.form) {
        await tmp.form.destroy();
        await tmp.employee.destroy();
        await tmp.user.destroy();
      }
    });
  });

  describe(`/PATCH update comment in form which is CLOSED`);
};

let viewYourForm = () => {
  describe("/GET view own form with EMPLOYEE05[already have 5 forms]", () => {
    it(`it should DISPLAY all form of that user)
        and display 5 forms
        status code:200`, async () => {
      let res = await chai
        .request(server)
        .get("/api/form/list/yours")
        .set("AuthenticateToken", E05);
      res.should.have.status(200);
      res.body.should.have.property("data");
      res.body.data.should.have.lengthOf(5);
    });
  });

  describe("/GET view own form with EMPLOYEE03[have NO forms]", () => {
    it(`it should not DISPLAY anything)
        with error:(You have no form,wait in the future)
        status code: 400`, async () => {
      let res = await chai
        .request(server)
        .get("/api/form/list/yours")
        .set("AuthenticateToken", E03);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.eql("You have no form,wait in the future");
    });
  });
};

let updateContent = () => {
  describe(`/PATCH update content form 
             status = SUBMITTED 
             dueDate is NOT OVERDUE
             isDeleted=0
             with EMPLOYEE05`, () => {
    let data = {};
    it(`it should DISPLAY ERROR)
        with message(You can't update because form is submitted)
        update content MUST BE FAILED
        status code: 404`, async () => {
      let dataSend = {
        id: data.form.id,
        content: "new content",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/content")
        .set("AuthenticateToken", E05)
        .send(dataSend);
      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.should.equal(
        "You can't update because form is submitted"
      );
    });
    beforeEach(async () => {
      let transaction = await User.sequelize.transaction();
      try {
        let dueDate = Date.parse("2021-12-19");
        let form = await Form.create(
          {
            dueDate: dueDate,
            status: "SUBMITTED",
            userId: formTestData.addForm.userId.VALID_USERID.EMPLOYEE_5,
            type: 1,
          },
          { transaction: transaction }
        );

        let formDetail = await FormDetail.create(
          {
            formId: form.id,
            content: "abc",
          },
          { transaction: transaction }
        );
        data.form = form;
        data.formDetail = formDetail;
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        logger.error(error);
      }
    });
    afterEach(async () => {
      let transaction = await User.sequelize.transaction();
      try {
        await data.form.destroy({
          transaction: transaction,
        });
        await data.formDetail.destroy({
          transaction: transaction,
        });
        await transaction.commit();
      } catch (error) {
        logger.error(error);
        await transaction.rollback();
      }
    });
  });

  describe(`/PATCH update content form
             status = NEW
             dueDate is OVERDUE
             isDeleted=0
             with EMPLOYEE05`, () => {
    let data = {};

    it(`it should DISPLAY ERROR)
        with message(You can't update because form is overdue)
        update content MUST BE FAILED
        status code: 404`, async () => {
      let dataSend = {
        id: data.form.id,
        content: "new content",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/content")
        .set("AuthenticateToken", E05)
        .send(dataSend);
      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.should.equal(
        "You can't update because form is overdue"
      );
    });
    beforeEach(async () => {
      let transaction = await User.sequelize.transaction();
      try {
        let dueDate = Date.parse("2021-05-19");
        let form = await Form.create(
          {
            dueDate: dueDate,
            status: "NEW",
            userId: formTestData.addForm.userId.VALID_USERID.EMPLOYEE_5,
            type: 1,
          },
          { transaction: transaction }
        );

        let formDetail = await FormDetail.create(
          {
            formId: form.id,
            content: "abc",
          },
          { transaction: transaction }
        );
        data.form = form;
        data.formDetail = formDetail;
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        logger.error(error);
      }
    });
    afterEach(async () => {
      let transaction = await User.sequelize.transaction();
      try {
        await data.form.destroy({
          transaction: transaction,
        });
        await data.formDetail.destroy({
          transaction: transaction,
        });
        await transaction.commit();
      } catch (error) {
        logger.error(error);
        await transaction.rollback();
      }
    });
  });

  describe(`/PATCH update content form
             status = NEW
             dueDate is NOT OVERDUE AND
             isDeleted=1
             with EMPLOYEE05`, () => {
    let data = {};

    it(`it should DISPLAY ERROR)
        with message(You can't update because form is deleted)
        update content MUST BE FAILED
        status code: 404`, async () => {
      let dataSend = {
        id: data.form.id,
        content: "new content",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/content")
        .set("AuthenticateToken", E05)
        .send(dataSend);
      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.should.equal(
        "You can't update because form is deleted"
      );
    });
    beforeEach(async () => {
      let transaction = await User.sequelize.transaction();
      try {
        let dueDate = Date.parse("2021-12-19");
        let form = await Form.create(
          {
            dueDate: dueDate,
            status: "NEW",
            userId: formTestData.addForm.userId.VALID_USERID.EMPLOYEE_5,
            type: 1,
            isDeleted: 1,
          },
          { transaction: transaction }
        );

        let formDetail = await FormDetail.create(
          {
            formId: form.id,
            content: "abc",
          },
          { transaction: transaction }
        );
        data.form = form;
        data.formDetail = formDetail;
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        logger.error(error);
      }
    });
    afterEach(async () => {
      try {
        await data.form.destroy({});
        await data.formDetail.destroy({});
      } catch (error) {
        logger.error(error);
      }
    });
  });

  describe("/PATCH update form content which form id is invalid", () => {
    it(`it should display error
        with error message:FORM IS NOT EXISTED!`, async () => {
      let formData1 = {
        id: formTestData.addContentToForm.NON_EXISTED,
        content: "abc",
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/content")
        .set("AuthenticateToken", E05)
        .send(formData1);

      res.should.have.status(404);
      res.body.should.have.property("error"),
        res.body.error.message.should.eql("FORM IS NOT EXISTED!");
    });
  });

  describe("/PATCH update form content which no content provide", () => {
    it(`it should display error
        with error message:content is required
        and against go to controller
        status code:404`, async () => {
      let formData1 = {
        id: formTestData.addContentToForm.NON_EXISTED,
      };
      let res = await chai
        .request(server)
        .patch("/api/form/modify/content")
        .set("AuthenticateToken", E05)
        .send(formData1);

      res.should.have.status(404);
      res.body.should.have.property("error");
      res.body.error.message.details[0].message.should.eql(
        "content is required"
      );
    });
  });
};

let viewEvalForm = () => {
  describe(`/GET LIST PERIODIC EVALUATE FORM OF ALL EMPLOYEE OF MANAGER03
            LOGIN AS MANAGER3`, () => {
    it(`Should display all user and form of user((2 record)) who is managed by MANAGER03
        status code:200`, async () => {
      let res = await await chai
        .request(server)
        .get("/api/form/list/evaluate")
        .set("AuthenticateToken", M03);
      res.should.have.status(200);
      res.body.data.should.have.lengthOf(2);
    });
  });

  describe(`/GET LIST PERIODIC EVALUATE FORM OF ALL EMPLOYEE OF MANAGER02
            LOGIN AS MANAGER2`, () => {
    it(`Should display error(No Form submitted yet!)
        because EMPLOYEE07 AND EMPLOYEE05 have no evaluate form submitted
        status code:404`, async () => {
      let res = await await chai
        .request(server)
        .get("/api/form/list/evaluate")
        .set("AuthenticateToken", M02);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.equal("No Form submitted yet!");
    });
  });

  describe(`/GET LIST PERIODIC EVALUATE FORM OF ALL EMPLOYEE AND MANAGER
            LOGIN AS HR02`, () => {
    it(`Should display all form of employee and manager(which is submitted)
        status code:200`, async () => {
      let res = await await chai
        .request(server)
        .get("/api/form/list/evaluate")
        .set("AuthenticateToken", HR02);
      res.should.have.status(200);
    });
  });
};

let approveForm = () => {
  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS NOT EMPLOYEE OF MANAGER02
            LOGIN AS MANAGER2`, () => {
    it(`Should display error(YOU HAVE NOT PERMISSION IN THIS FORM)
        because FORM IS BELONG TO EMPLOYEE4 WHICH IS EMPLOYEE OF MANAGER03
        status code:400`, async () => {
      let data = {
        id: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/approve")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.equal(
        "YOU HAVE NOT PERMISSION IN THIS FORM"
      );
    });
  });

  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS NOT SUBMITTED(FORM OF EMPLOYEE05
           WHO IS EMPLOYEE OF MANAGER02)
            LOGIN AS MANAGER2`, () => {
    it(`Should display error(FORM IS PENDING FOR SUBMISSION)
        because FORM IS IN STATUS NEW
        status code:400`, async () => {
      let data = {
        id: "c08351c0-2ce4-11ec-a8f7-658730940118",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/approve")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.equal("FORM IS PENDING FOR SUBMISSION");
    });
  });

  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS SUBMITTED(FORM OF EMPLOYEE04
           WHO IS EMPLOYEE OF MANAGER03)
           LOGIN AS MANAGER3`, () => {
    it(`Should approve the form)
        status code:400`, async () => {
      let data = {
        id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/approve")
        .set("AuthenticateToken", M03)
        .send(data);
      res.should.have.status(200);
    });
  });
};

let rejectForm = () => {
  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS NOT EMPLOYEE OF MANAGER02
            LOGIN AS MANAGER2`, () => {
    it(`Should display error(YOU HAVE NOT PERMISSION IN THIS FORM)
        because FORM IS BELONG TO EMPLOYEE4 WHICH IS EMPLOYEE OF MANAGER03
        status code:400`, async () => {
      let data = {
        id: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/approve")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.equal(
        "YOU HAVE NOT PERMISSION IN THIS FORM"
      );
    });
  });

  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS NOT SUBMITTED(FORM OF EMPLOYEE05
           WHO IS EMPLOYEE OF MANAGER02)
            LOGIN AS MANAGER2`, () => {
    it(`Should display error(FORM IS PENDING FOR SUBMISSION)
        because FORM IS IN STATUS NEW
        status code:400`, async () => {
      let data = {
        id: "c08351c0-2ce4-11ec-a8f7-658730940118",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/reject")
        .set("AuthenticateToken", M02)
        .send(data);
      res.should.have.status(400);
      res.body.should.have.property("error");
      res.body.error.message.should.equal("FORM IS PENDING FOR SUBMISSION");
    });
  });

  describe(`/PUT APPROVE FORM WITH FORM WHICH FORM IS SUBMITTED(FORM OF EMPLOYEE04
           WHO IS EMPLOYEE OF MANAGER03)
           LOGIN AS MANAGER3`, () => {
    it(`Should approve the form)
        status code:400`, async () => {
      let data = {
        id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
      };
      let res = await await chai
        .request(server)
        .put("/api/form/approve")
        .set("AuthenticateToken", M03)
        .send(data);
      res.should.have.status(200);
    });
  });
};

module.exports = {
  addForm,
  submitForm,
  viewEmployeeProbateForm,
  updateComment,
  viewYourForm,
  updateContent,
  viewEvalForm,
  approveForm,
  rejectForm
};
