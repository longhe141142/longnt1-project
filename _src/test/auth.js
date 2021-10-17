let { userToken } = require("./token/token");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
let { authTestData } = require("./data/case");
let User = require("../_models/user");
let Employee = require("../_models/employee");
const logger = require("../_utils/logger");

let testRegister = () => {
  //case 1:
  describe("/POST register with existed userName and correct data", () => {
    it(`Should response error with message:"USerName already in use"`, async () => {
      let data = {
        userName: authTestData.register.userName.EXISTED,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.should.equal("USerName already in use");
    });
  });

  //case 2: WRONG USERNAME FORMAT [WHITESPACE AND NONALPHANUM]
  describe("/POST register with nonAlphanum  userName and correct data", () => {
    it(`Should response error with nonAlphanum format userName
        userName:"long$98"`, async () => {
      let data = {
        userName: authTestData.register.userName.NON_ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "not allow special character or whiteSpace"
      );
    });

    it(`Should response error with whitespace userName
        userName:"   LONG NT 4"`, async () => {
      let data = {
        userName: authTestData.register.userName.WHITESPACE,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "not allow special character or whiteSpace"
      );
    });
  });
  //case 3:no userName provide
  describe("/POST register with NO  userName provided", () => {
    it(`Should response error (\"userNAme\" is a required field)`, async () => {
      let data = {
        password: authTestData.register.password.WITH_LENGTH8,
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        '"userNAme" is a required field'
      );
    });
  });

  //case4:no password
  describe("/POST register with NO password provided", () => {
    it(`Should response error (password is required)`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        email: "abc@gmail.com",
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "password is required"
      );
    });
  });

  //case5: no email
  describe("/POST register with NO email provided", () => {
    it(`Should response error (email is required)`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "email is required"
      );
    });
  });
  //case6: invalid password
  describe("/POST register with invalid password", () => {
    it(`Should response error (Please fill in password)
        password": "      "`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.EMPTY02,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Please fill in password"
      );
    });
    it(`Should response error (password not allow whitespace)
        password:"123456 8`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password:
          authTestData.register.password.WITH_LENGTH8_AND_CONTAIN_WHITESPACE,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "password not allow whitespace"
      );
    });

    it(`Should response error (minium password character is  8)
        password:"123"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH3,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "minium password character is  8"
      );
    });
  });

  //case7:wrong phone format
  describe("/POST register with invalid phone format", () => {
    it(`Should response error(Invalid phone number)
        phone:"02114DS566"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.INVALID,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid phone number"
      );
    });
  });

  describe("/POST register with invalid age", () => {
    it(`Should response error(maximum age digit is  60)
        age:"80"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_80,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "maximum age digit is  60"
      );
    });

    it(`Should response error(minium age digit is  18)
        age:"12"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "minium age digit is  18"
      );
    });

    it(`Should response error(age must be number)
        age:"${authTestData.register.age.NOT_NUMBER}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.NOT_NUMBER,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "age must be number"
      );
    });
  });

  describe("/POST register with invalid social insurance number", () => {
    it(`Should response error(Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12))
        socialInsurance:"${authTestData.register.socialInsurance.CONTAIN_CHARACTER}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        socialInsurance:
          authTestData.register.socialInsurance.CONTAIN_CHARACTER,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
      );
    });

    it(`Should response error(Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12))
    socialInsurance:"${authTestData.register.socialInsurance.CONTAIN_SPECIAL_CHARACTER}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        socialInsurance:
          authTestData.register.socialInsurance.CONTAIN_SPECIAL_CHARACTER,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
      );
    });
    it(`Should response error(Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12))
    socialInsurance:"${authTestData.register.socialInsurance.CONTAIN_WHITE_SPACE}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        socialInsurance:
          authTestData.register.socialInsurance.CONTAIN_WHITE_SPACE,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
      );
    });
    it(`Should response error(Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12))
    socialInsurance:"${authTestData.register.socialInsurance.WITH_LENGTH13}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        socialInsurance: authTestData.register.socialInsurance.WITH_LENGTH13,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
      );
    });

    it(`Should response error(Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12))
    socialInsurance:"${authTestData.register.socialInsurance.WITH_LENGTH3}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_12,
        socialInsurance: authTestData.register.socialInsurance.WITH_LENGTH3,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)"
      );
    });
  });

  describe("/POST register with invalid email", () => {
    it(`Should response error(Email existed)
        email:"EMPLOYEE7@gmail.com"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.EXISTED,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
    });

    it(`Should response error(Invalid phone number)
        phone:"${authTestData.register.email.WHITESPACE}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.WHITESPACE,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "email not allow whitespace"
      );
    });
    it(`Should response error(invalid email) with email domain is not allowed
        email:"${authTestData.register.email.INVALID_ACCEPT_DOMAIN}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.INVALID_ACCEPT_DOMAIN,
        phone: authTestData.register.phone.INVALID,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal("invalid email");
    });
  });

  describe("/POST register with invalid name", () => {
    it(`Should response error(Please fill in lastName)
        lastName:""`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: "",
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Please fill in lastName"
      );
    });

    it(`Should response error(Please fill in firstName)
        firstName:""`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: "",
          lastName: authTestData.register.employee.name.lastName.VALID,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Please fill in firstName"
      );
    });
    it(`Should response error(lastName must contain character only)
    lastName:"${authTestData.register.employee.name.NON_ALPHA}"`, async () => {
      let data = {
        userName: authTestData.register.userName.ALPHANUM,
        password: authTestData.register.password.WITH_LENGTH8,
        email: authTestData.register.email.VALID_EMAIL,
        phone: authTestData.register.phone.VIETNAMESE_FORMAT01,
        age: authTestData.register.age.AGE_50,
        employee: {
          firstName: authTestData.register.employee.name.firstName.VALID,
          lastName: authTestData.register.employee.name.NON_ALPHA,
        },
      };
      let res = await chai.request(server).post("/api/register").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "lastName must contain character only"
      );
    });
  });
};

let testLogin = () => {
  describe("/GET login with invalid userName format", () => {
    it(`Should response error(userName not allow whitespace)
        userName:"employee 07"`, async () => {
      let data = {
        userName: "employee 07",
        password: "12345678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "userName not allow whitespace"
      );
    });

    it(`Should response error(Please fill in userName)
        userName:""`, async () => {
      let data = {
        userName: "",
        password: "12345678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Please fill in userName"
      );
    });

    it(`Should response error(userName not allow whitespace)
        userName:"      "`, async () => {
      let data = {
        userName: "       ",
        password: "12345678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "userName not allow whitespace"
      );
    });
  });

  describe("/GET login with NO userName provide", () => {
    it(`Should response error(userName is required)`, async () => {
      let data = {
        password: "12345678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "userName is required"
      );
    });
  });

  describe("/GET login with NO password provide", () => {
    it(`Should response error(password is required)`, async () => {
      let data = {
        userName: "abc",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "password is required"
      );
    });
  });

  describe("/GET login with INVALID password", () => {
    it(`Should response error(password not allow whitespace)
        password:"123456 78"`, async () => {
      let data = {
        userName: "abc",
        password: "123456 78",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "password not allow whitespace"
      );
    });
    it(`Should response error(password not allow whitespace)
        password:"      "`, async () => {
      let data = {
        userName: "abc",
        password: "      ",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "password not allow whitespace"
      );
    });
    it(`Should response error(Please fill in password)
        password:""`, async () => {
      let data = {
        userName: "abc",
        password: "",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.details[0].message.should.equal(
        "Please fill in password"
      );
    });
  });

  describe("/GET login with noneExisted User", () => {
    it(`Should response error(Inccorect UserName or Password)
    userName: "abc",
    password: "12345678"`, async () => {
      let data = {
        userName: "abc",
        password: "12345678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.should.equal("Inccorect UserName or Password");
    });
  });

  describe("/GET login with Existed User and INCORRECT password", () => {
    it(`Should response error(Inccorect UserName or Password)
    userName: "EMPLOYEE7",
    password: "12345678"`, async () => {
      let data = {
        userName: "EMPLOYEE7",
        password: "123456678",
      };
      let res = await chai.request(server).post("/api/login").send(data);
      res.should.have.status(404);
      res.body.error.message.should.equal("Inccorect UserName or Password");
    });
  });
};

module.exports = { testRegister, testLogin };
