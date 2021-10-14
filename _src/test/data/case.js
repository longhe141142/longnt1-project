let userTestData = {
  register: {
    userName: {
      ALPHANUM: "longnt78",
      NON_ALPHANUM: "long$98",
      WHITESPACE: "   LONG NT 4",
      EXISTED: "longnt1",
    },
    password: {
      WITH_LENGTH3: "123",
      WITH_LENGTH8: "12345678",
      WITH_LENGTH8_AND_CONTAIN_WHITESPACE: "12345 78",
    },
    email: {
      EXISTED: "director2@gmail.com",
      INVALID_ACCEPT_DOMAIN: "longnt75@gmail.msc",
      WHITESPACE: "longnt1@  vmdev.com",
    },
    socialInsurance: {
      WITH_LENGTH3: "123",
      WITH_LENGTH5: "12345",
      WITH_CHARACTER: "123cd45",
      WITH_LENGTH13: "123456789451214",
    },
    phone: {
      VIETNAMESE_FORMAT01: "+84866841700",
      VIETNAMESE_FORMAT02: "+84 866 841 700",
      VIETNAMESE_FORMAT03: "0983264215",
      FOREIGN_FORMAT: "+1 866 451 1214",
      INVALID: "02114DS566",
    },
    age: {
      AGE_50: 50,
      AGE_STRING_NUMBER: "19",
      AGE_80: 80,
      AGE_12: 12,
      NOT_NUMBER: "ABC",
    },
    identityNumber: {
      WITH_LENGTH3: "123",
      WITH_LENGTH9: "123456789",
      WITH_CHARACTER: "123cd45",
      WITH_LENGTH13: "123456789451214",
    },
    employee: {
      name: {
        NON_ALPHA: "dung77",
        EMPTY01: "  ",
        EMPTY02: "",
        USING_WHITESPACE: "nguyen long",
        USING_STRING: "huy",
      },
    },
  },
  addEmployee: {
    employeeId: {
      INVALID_ID: "123456",
      VALID_ID: "30ebf3e0-2b5f-11ec-8639-1b33c0b488b9",
      HR02_ID: "f5f33640-2b5e-11ec-8639-1b33c0b488b9",
    },
  },
};

let formTestData = {
  addForm: {
    userId: {
      INVALID_USERID: "1234",
      VALID_USERID: {
        EMPLOYEE_7: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
        EMPLOYEE_5: "5fa82ce0-2b5e-11ec-8639-1b33c0b488b9",
        MANAGER_1: "e11fb500-2b12-11ec-bc29-e58e0a69d32c",
        HR_2: "f5f2e820-2b5e-11ec-8639-1b33c0b488b9",
        DIRECTOR_1: "13cf9260-2b3e-11ec-9809-e7df574df18a",
      },
    },
    type: {
      NON_NUMBER: "ABC",
      PERIODIC_TYPE: 0,
      PROBATION_TYPE: 1,
      OUT_RANGE_TYPE: 3,
    },
    dueDate: {
      VALID_DUEDATE: "2021-09-07",
      INVALID_DUEDATE: "ABC",
    },
  },
  submitForm: {
    NON_EXISTED: "XXXXX",
    FORM_EMPLOYEE_05: {
      FORM_CLOSED: "336e2550-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_NEW: "b16db330-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_SUBMITTED: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_OVERDUE: "64cc2060-2c39-11ec-bb51-2b9b10bb6c90",
      FORM_IS_DELETED: "be707950-2cce-11ec-8cfb-b3851d127efe",
    },
  },

  addContentToForm: {
    NON_EXISTED: "xxxxx",
    FORM_EMPLOYEE_05: {
      FORM_CLOSED: "336e2550-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_NEW: "b16db330-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_SUBMITTED: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
      FORM_OVERDUE: "64cc2060-2c39-11ec-bb51-2b9b10bb6c90",
      FORM_IS_DELETED: "be707950-2cce-11ec-8cfb-b3851d127efe",
    },
  },
 
};

module.exports = { userTestData, formTestData };
