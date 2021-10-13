let { userToken } = require("./token/token");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
let { E07, E02 } = userToken.employee;
let { M01, M02 } = userToken.manager;
let { D01 } = userToken.director;
let { HR02 } = userToken.hr;
let { formTestData } = require("./data/case");

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

module.exports = { addForm };
