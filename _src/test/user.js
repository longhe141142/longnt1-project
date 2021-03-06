let { userToken } = require("./token/token");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
let { E07, E02 } = userToken.employee;
let { M01, M02 } = userToken.manager;
let { D01 } = userToken.director;
const { userTestData } = require("./data/case");

let viewProfileTest = () => {
  /*===================================test view user profile=========================================*/
  describe("/GET view user profile[EMPLOYEE07] with valid token", () => {
    it("it should DISPLAY user profile", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("Authorization", E07)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.have.property("employee");
          res.body.data.should.have.property("roles");
          done();
        });
    });
  });

  describe("/GET view user profile[EMPLOYEE07] with no token provided", () => {
    it("it should DISPLAY error ", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("error");
          res.body.error.message.should.eql(
            "A token is required for authentication"
          );
          done();
        });
    });
  });

  describe("/GET view user profile[EMPLOYEE07] with Invalid token", () => {
    it("it should DISPLAY user profile", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("Authorization", "invalid token")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe("/GET view user profile[EMPLOYEE07] with Invalid token", () => {
    it("it should DISPLAY user profile", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("Authorization", "invalid token")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
};

let UpdateProfiletest = () => {
  /*============================TEST UPDATE PROFILE=================================== */
  //api:"/api/user/update/profile"

  describe("/PUT update user profile[EMPLOYEE07] with userName", () => {
    it("it should DISPLAY user profile", (done) => {
      let user = {
        userName: "longnt7",
        password: "12345678",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("Can't update userName");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with password Only", () => {
    it("it should DISPLAY user profile", (done) => {
      let user = {
        password: "12345678",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with whitespace password", () => {
    it("it should DISPLAY error", (done) => {
      let user = {
        password: "  ",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "Please fill in password"
          );
          done();
        });
    });
  });
  describe("/PUT update user profile[EMPLOYEE07] with whitespace and character password", () => {
    it("it should DISPLAY error", (done) => {
      let user = {
        password: "  dds sddsds ",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "password not allow whitespace"
          );
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with password have 4 character", () => {
    it("it should DISPLAY error", (done) => {
      let user = {
        password: "char",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "minium password character is  8"
          );
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with password have 8 character", () => {
    it("it should DISPLAY data", (done) => {
      let user = {
        password: "12345678",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with socialInsurance with character", () => {
    it("it should DISPLAY ERROR", (done) => {
      let user = {
        socialInsurance: "123456ce78",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
          );
          // res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with socialInsurance with number length of 5", () => {
    it("it should DISPLAY DATA", (done) => {
      let user = {
        socialInsurance: "12345",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.have.property("data");

          // res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with socialInsurance with number length of 4", () => {
    it("it should DISPLAY ERROR", (done) => {
      let user = {
        socialInsurance: "1234",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
          );
          // res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with IDENTITY with number length of 4", () => {
    it("it should DISPLAY ERROR", (done) => {
      let user = {
        identityNumber: "1234",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "Invalid identity number(minium:9|maximum:12)"
          );
          // res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with IDENTITY with number length of 13", () => {
    it("it should DISPLAY ERROR", (done) => {
      let user = {
        identityNumber: "1234567891234",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "Invalid identity number(minium:9|maximum:12)"
          );
          // res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with IDENTITY with number length of 9", () => {
    it("it should DISPLAY DATA", (done) => {
      let user = {
        identityNumber: "123456789",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.have.property("data");
          done();
        });
    });
  });

  describe("/PUT update user profile[EMPLOYEE07] with IDENTITY with character", () => {
    it("it should DISPLAY ERROR", (done) => {
      let user = {
        identityNumber: "1234jkhj56789",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe(`/PUT update user profile[EMPLOYEE07] with INVALID IDENTITY( with character)
   and INVALID PASSWORD(WITH WHITE SPACE)`, () => {
    it("it should DISPLAY 2 ERROR", (done) => {
      let user = {
        identityNumber: "1234jkhj56789",
        password: "               ",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"].should.have.length(2);
          done();
        });
    });
  });

  describe(`/PUT update user profile[EMPLOYEE07] with INVALID IDENTITY( with character)
   and INVALID PASSWORD(WITH WHITE SPACE) and INVALID AGE(CHARACTER)`, () => {
    it("it should DISPLAY 3 ERROR", (done) => {
      let user = {
        identityNumber: "1234jkhj56789",
        password: "               ",
        age: "ffddf",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"].should.have.length(3);
          done();
        });
    });
  });

  describe(`/PUT update user profile[EMPLOYEE07] with INVALID FIRSTNAME( with  none alphaCharacter)
   and INVALID PASSWORD(WITH WHITE SPACE) and INVALID AGE(CHARACTER)`, () => {
    it("it should DISPLAY 4 ERROR", (done) => {
      let user = {
        identityNumber: "1234jkhj56789",
        password: "               ",
        age: "ffdd#4f",
        firstName: "gy$bunyo",
      };
      chai
        .request(server)
        .put("/api/user/update/profile")
        .set("Authorization", E07)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"].should.have.length(4);
          done();
        });
    });
  });
};

let viewEmployeeList = () => {
  describe(`/GET ALL USER WHO IS EMPLOYEE WITH EMPLOYEE07(ROLE EMPLOYEE),CHECK IF CAN ACCESS)`, () => {
    it("it should UNAUTHORIZE", (done) => {
      chai
        .request(server)
        .get("/api/user/displayEmployeeList")
        .set("Authorization", E07)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          // res.body.error.message["details"].should.have.length(4);
          done();
        });
    });
  });
  describe(`/GET ALL USER WHO IS MANAGER WITH DIRECTOR1(ROLE DIRECTOR),CHECK IF CAN ACCESS AND VIEW EMPLOYEE)`, () => {
    it("it should UNAUTHORIZE", (done) => {
      chai
        .request(server)
        .get("/api/user/displayEmployeeList")
        .set("Authorization", D01)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          res.body.data.should.have.property("employee-list");
          res.body.data["employee-list"].should.be.a("array");
          done();
        });
    });
  });

  describe(`/GET ALL USER WHO IS MANAGER WITH MANAGER01(ROLE MANAGER),CHECK IF CAN ACCESS AND VIEW EMPLOYEE)`, () => {
    it("it should UNAUTHORIZE", (done) => {
      chai
        .request(server)
        .get("/api/user/displayEmployeeList")
        .set("Authorization", M01)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("data");
          res.body.data.should.have.property("employee-list");
          res.body.data["employee-list"].should.be.a("array");
          done();
        });
    });
  });
};

let viewOwnEmployee = () => {
  describe(`/GET VIEW EMPLOYEE WHO ARE EMPLOYEE OF LOGIN USER WITH EMPLOYEE07(ROLE EMPLOYEE),CHECK IF CAN ACCESS)`, () => {
    it("it should UNAUTHORIZE", (done) => {
      chai
        .request(server)
        .get("/api/user/viewOwnEmployees")
        .set("Authorization", E07)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          // res.body.error.message["details"].should.have.length(4);
          done();
        });
    });
  });

  describe(`/GET VIEW EMPLOYEE WHO ARE EMPLOYEE OF LOGIN USER WITH MANAGER01(ROLE MANAGER)WITH NO EMPLOYEE MANAGE,CHECK IF CAN ACCESS)`, () => {
    it("it should DISPLAY ERROR(ADD EMPLOYEE FIRST)", (done) => {
      chai
        .request(server)
        .get("/api/user/viewOwnEmployees")
        .set("Authorization", M01)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql(
            "You have no employee,add someone to your team first"
          );
          // res.body.error.message["details"].should.have.length(4);
          done();
        });
    });
  });

  describe(`/GET view employee WHO ARE EMPLOYEE OF LOGIN USER WITH MANAGER01(role manager)WITH 1 EMPLOYEE MANAGE,CHECK IF CAN ACCESS)`, () => {
    it("it should DISPLAY ARRAY DATA OF EMPLOYEE)", (done) => {
      chai
        .request(server)
        .get("/api/user/viewOwnEmployees")
        .set("Authorization", M02)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.be.a("array");
          // res.body.error.message["details"].should.have.length(4);
          done();
        });
    });
  });
};

let addEmployeeTest = () => {
  describe(`/POST add employee to user team (USER ROLE IS MANAGER AND EMPLOYEE ROLE IS HR)`, () => {
    it(`it should DISPLAY ERROR:( can't add this employee because you have not enough permission.You are Manager,
    can add Employee only(PERMISSION DENIED)))`, (done) => {
      let employee = {
        employee: {
          id: userTestData.addEmployee.employeeId.HR02_ID,
        },
      };
      chai
        .request(server)
        .post("/api/user/addEmployee")
        .set("Authorization", M02)
        .send(employee)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body["error"].message.should.eql(
            "Error: can't add this employee because you have not enough permission.You are Manager,can add Employee only(PERMISSION DENIED)"
          );

          done();
        });
    });
  });

  describe(`/POST ADD EMPLOYEE TO USER TEAM (USER ROLE IS MANAGER AND EMPLOYEE ROLE IS EMPLOYEE)`, () => {
    it(`it should DISPLAY DATA EMPLOYEE`, (done) => {
      let employee = {
        employee: {
          id: userTestData.addEmployee.employeeId.VALID_ID,
        },
      };
      chai
        .request(server)
        .post("/api/user/addEmployee")
        .set("Authorization", M02)
        .send(employee)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");

          done();
        });
    });
  });

  describe(`/POST add employee with NO DATA provided`, () => {
    it(`it should DISPLAY ERROR(employee is required)`, (done) => {
      let employee = {};
      chai
        .request(server)
        .post("/api/user/addEmployee")
        .set("Authorization", M02)
        .send(employee)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message["details"][0].message.should.eql(
            "employee is required"
          );
          done();
        });
    });
  });


  describe(`/POST add employee with invalid id`, () => {
    it(`it should DISPLAY ERROR(EMPLOYEE NOT FOUND)`, (done) => {
      let employee = {
        employee:{
          id:userTestData.addEmployee.employeeId.INVALID_ID
        }
      };
      chai
        .request(server)
        .post("/api/user/addEmployee")
        .set("Authorization", M02)
        .send(employee)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.error.message.should.eql("EMPLOYEE NOT FOUND")
          done();
        });
    });
  });

};

module.exports = {
  UpdateProfiletest,
  viewProfileTest,
  viewEmployeeList,
  viewOwnEmployee,
  addEmployeeTest,
};
