const {
  error: errorResponse,
  user,
  employee,
  form,
  formDetail,
} = require("./utils/response");

let userComponent = {
  ViewProfile: {
    success: {
      type: "object",
      properties: {
        data: {
          type: "object",
          description: "The user information",
          example: {
            id: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
            userName: "MANAGER2",
            password:
              "$2b$10$gRYydYCU0wyzOMo8lHPXweXBdHveJhn0I6y8HrgOH5MoaktoJgMxO",
            age: 19,
            email: "pxz41brxc4@gmail.com",
            phone: "+84 866 841700",
            address: null,
            isActive: null,
            identityNumber: "021523251",
            socialInsurance: "00210",
            avatar: null,
            isDeleted: false,
            createdBy: "MANAGER2",
            updatedBy: "MANAGER2",
            createdAt: "2021-10-12T09:19:01.000Z",
            updatedAt: "2021-10-12T09:19:01.000Z",
            employee: {
              id: "6fe74670-2b3d-11ec-9c1a-19f965e7023e",
              lastName: "thai",
              firstName: "goang",
              fullName: "goang thai",
              userId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
              managerId: null,
              isDeleted: false,
              createdBy: "MANAGER2",
              updatedBy: "MANAGER2",
              createdAt: "2021-10-12T09:19:01.000Z",
              updatedAt: "2021-10-12T09:19:01.000Z",
            },
            roles: [
              {
                id: 4,
                name: "manager",
                description: "xxx",
                isDeleted: false,
                createdBy: "admin",
                updatedBy: "admin",
                createdAt: "2021-10-07T07:55:07.000Z",
                updatedAt: "2021-10-07T07:55:07.000Z",
                userRole: {
                  id: "6d3a50d0-2beb-11ec-af6f-cfd0b2aa8737",
                  userId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
                  roleId: 4,
                  isDeleted: false,
                  createdBy: "admin",
                  updatedBy: "admin",
                  createdAt: "2021-10-13T06:04:29.000Z",
                  updatedAt: "2021-10-13T06:04:29.000Z",
                },
              },
              {
                id: 5,
                name: "employee",
                description: "xxx",
                isDeleted: false,
                createdBy: "admin",
                updatedBy: "admin",
                createdAt: "2021-10-07T07:55:07.000Z",
                updatedAt: "2021-10-07T07:55:07.000Z",
                userRole: {
                  id: "6fe79490-2b3d-11ec-9c1a-19f965e7023e",
                  userId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
                  roleId: 5,
                  isDeleted: false,
                  createdBy: "admin",
                  updatedBy: "admin",
                  createdAt: "2021-10-12T09:19:01.000Z",
                  updatedAt: "2021-10-12T09:19:01.000Z",
                },
              },
            ],
          },
        },
      },
    },
    NoTokenProvided: {
      type: "object",
      description: "no token provided",
      properties: {
        error: {
          properties: { ...errorResponse },
        },
      },
      example: {
        error: {
          status: "error",
          statusCode: 403,
          message: "A token is required for authentication",
        },
      },
    },

    invalidToken: {
      type: "object",
      description: "invalid token format",
      properties: {
        error: {
          properties: { ...errorResponse },
        },
      },
      example: {
        error: {
          status: "error",
          statusCode: 403,
          message: "jwt malformed",
        },
      },
    },
  },

  addEmployee: {
    request: {
      addEmployeeRequest: {
        type: "object",
        properties: {
          employee: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "cced32a0-2b5e-11ec-8639-1b33c0b488b9",
              },
            },
            required: ["id"],
          },
        },
      },
    },
    response: {
      unAuthorize: {
        description:
          "provide token of user whose role have no permission to access",
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: { ...errorResponse },
            example: {
              status: "error",
              statusCode: 400,
              message: "cant access",
            },
          },
        },
      },
      success: {
        type: "object",
        properties: {
          data: {
            type: "object",
            example: {
              id: "cced32a0-2b5e-11ec-8639-1b33c0b488b9",
              lastName: "EMPLOYEE",
              firstName: "SIX",
              fullName: "SIX EMPLOYEE",
              userId: "ccece480-2b5e-11ec-8639-1b33c0b488b9",
              managerId: "7e87d0a0-2cdc-11ec-8520-2bd7c9d982df",
              isDeleted: false,
              createdBy: "EMPLOYEE06",
              updatedBy: "EMPLOYEE06",
              createdAt: "2021-10-12T13:17:50.000Z",
              updatedAt: "2021-10-16T12:37:05.000Z",
            },
          },
        },
      },
      notFound: {
        type: "object",
        description: "employee not found",
        properties: {
          error: {
            properties: {
              ...errorResponse,
            },
            example: {
              status: "error",
              statusCode: 404,
              message: "EMPLOYEE NOT FOUND",
            },
          },
        },
      },
      ValidatorException: {
        type: "object",
        description: "validator exception in middleware",
        properties: {
          error: {
            properties: {
              ...errorResponse,
            },
            example: {
              status: "error",
              statusCode: 404,
              message: {
                _original: {
                  employee: {},
                },
                details: [
                  {
                    message: "employee is required",
                    path: ["employee", "id"],
                    type: "any.required",
                    context: {
                      label: "employee.id",
                      key: "id",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  uploadAvatar: {
    response: {
      success: {
        type: "object",
        description: "return success message",
        properties: {
          data: {
            type: "string",
            example: "success",
          },
        },
      },

      code400: {
        type: "object",
        description: "send empty data",
        properties: {
          error: {
            type: "object",
            properties: { ...errorResponse },
            example: {
              status: "error",
              statusCode: 400,
              message: "UPLOAD IMAGE FIRST",
            },
          },
        },
      },
    },
  },

  updateProfile: {
    request: {
      type: "object",
      description: "add here information of user",
      properties: {
        identityNumber: {
          type: "string",
          example: "123456789",
        },
        password: {
          type: "string",
          example: "12345678",
        },
        age: {
          type: "number",
          example: 20,
        },
        firstName: {
          type: "string",
          example: "John",
        },
        lastName: {
          type: "string",
          example: "Carter",
        },
        socialInsurance: {
          type: "string",
          example: "123456789",
        },
        address: {
          type: "string",
          example: "Ha Noi",
        },
        phone: {
          type: "string",
          example: "+84 855 211 444",
        },
      },
    },

    response: {
      success: {
        data: {
          type: "object",
          description: "data of user after updated",
          properties: {
            user: {
              properties: {
                ...user,
              },
            },
          },
          example: {
            id: "323abbe0-2a6b-11ec-8865-4da3af21941e",
            userName: "longnt4",
            password:
              "$2b$10$1F6DINHYf9Xbj/MIlNZwuuSbynOb1M.6tPrr2NAz5sRfLCYWTmrOW",
            age: 19,
            email: "longnt4@fpt.edu.vn",
            phone: "+84 801 562 100",
            address: "phu tho",
            isActive: null,
            identityNumber: "123456789",
            socialInsurance: "123456",
            avatar: null,
            isDeleted: false,
            createdBy: "longnt4",
            updatedBy: "longnt4",
            createdAt: "2021-10-11T08:14:03.000Z",
            updatedAt: "2021-10-16T15:54:31.000Z",
            employee: {
              id: "323b3110-2a6b-11ec-8865-4da3af21941e",
              lastName: "name",
              firstName: "changed",
              fullName: "changed name",
              userId: "323abbe0-2a6b-11ec-8865-4da3af21941e",
              managerId: "cebfbfb0-2a61-11ec-8e61-1330d32b6766",
              isDeleted: false,
              createdBy: "longnt4",
              updatedBy: "longnt4",
              createdAt: "2021-10-11T08:14:03.000Z",
              updatedAt: "2021-10-16T15:54:31.000Z",
            },
          },
        },
      },
      code404: {
        type: "object",
        properties: {
          error: {
            properties: {
              ...errorResponse,
            },
            example: {
              status: "error",
              statusCode: 404,
              message: {
                _original: {
                  password: "12345678",
                  socialInsurance: "123d456",
                  identityNumber: "123456789",
                  phone: "+84 801 562 100",
                  age: "19",
                  lastName: "name",
                  firstName: "changed",
                },
                details: [
                  {
                    message:
                      "Invalid social insurance number,must be number length([minium]:->5:[maximum]:->12)",
                    path: ["socialInsurance"],
                    type: "custom",
                    context: {
                      label: "socialInsurance",
                      value: "123d456",
                      key: "socialInsurance",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  viewOwnEmployee: {
    response: {
      success: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              ...employee,
            },
          },
          example: [
            {
              id: "30ebf3e0-2b5f-11ec-8639-1b33c0b488b9",
              lastName: "EMPLOYEE",
              firstName: "SEVEN",
              fullName: "SEVEN EMPLOYEE",
              userId: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
              managerId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
              isDeleted: false,
              createdBy: "EMPLOYEE7",
              updatedBy: "EMPLOYEE7",
              createdAt: "2021-10-12T13:20:38.000Z",
              updatedAt: "2021-10-16T07:56:10.000Z",
            },
            {
              id: "5fa87b00-2b5e-11ec-8639-1b33c0b488b9",
              lastName: "EMPLOYEE",
              firstName: "FIVE",
              fullName: "FIVE EMPLOYEE",
              userId: "5fa82ce0-2b5e-11ec-8639-1b33c0b488b9",
              managerId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
              isDeleted: false,
              createdBy: "EMPLOYEE5",
              updatedBy: "EMPLOYEE5",
              createdAt: "2021-10-12T13:14:47.000Z",
              updatedAt: "2021-10-13T17:29:09.000Z",
            },
          ],
        },
      },
      code404: {
        noEmployee: {
          type: "object",
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "You have no employee,add someone to your team first",
              },
            },
          },
        },
        unAuthorized: {
          type: "object",
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 400,
                message: "cant access",
              },
            },
          },
        },
      },
    },
  },

  viewEmployeeList: {
    response: {
      success: {
        properties: {
          data: {
            type: "object",
            properties: {
              "employee-list": {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ...employee,
                  },
                },
              },
              totalRecord: {
                type: "number",
                example: 12,
              },
            },
            example: {
              "employee-list": [
                {
                  id: "0ed80900-2b06-11ec-bbec-c71cc3519809",
                  lastName: "longnt nguyn",
                  firstName: "nguyen",
                  fullName: "nguyenlongnt nguyn",
                  userId: "0ed745b0-2b06-11ec-bbec-c71cc3519809",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "longnt45",
                  updatedBy: "longnt45",
                  createdAt: "2021-10-12T02:42:36.000Z",
                  updatedAt: "2021-10-12T02:42:36.000Z",
                },
                {
                  id: "21859b00-2dd9-11ec-b783-13637ba95171",
                  lastName: "MANAGER",
                  firstName: "THREE",
                  fullName: "THREE MANAGER",
                  userId: "21848990-2dd9-11ec-b783-13637ba95171",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "EMPLOYEE77",
                  updatedBy: "EMPLOYEE77",
                  createdAt: "2021-10-15T16:58:33.000Z",
                  updatedAt: "2021-10-15T16:58:33.000Z",
                },
                {
                  id: "26a09c50-2a6b-11ec-8865-4da3af21941e",
                  lastName: "long2",
                  firstName: "nguyen",
                  fullName: "nguyenlong2",
                  userId: "269f8ae0-2a6b-11ec-8865-4da3af21941e",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "longnt2",
                  updatedBy: "longnt2",
                  createdAt: "2021-10-11T08:13:43.000Z",
                  updatedAt: "2021-10-11T08:13:43.000Z",
                },
                {
                  id: "323b3110-2a6b-11ec-8865-4da3af21941e",
                  lastName: "Carter",
                  firstName: "John",
                  fullName: "John Carter",
                  userId: "323abbe0-2a6b-11ec-8865-4da3af21941e",
                  managerId: "cebfbfb0-2a61-11ec-8e61-1330d32b6766",
                  isDeleted: false,
                  createdBy: "longnt4",
                  updatedBy: "longnt4",
                  createdAt: "2021-10-11T08:14:03.000Z",
                  updatedAt: "2021-10-16T16:08:12.000Z",
                },
                {
                  id: "30ebf3e0-2b5f-11ec-8639-1b33c0b488b9",
                  lastName: "EMPLOYEE",
                  firstName: "SEVEN",
                  fullName: "SEVEN EMPLOYEE",
                  userId: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
                  managerId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
                  isDeleted: false,
                  createdBy: "EMPLOYEE7",
                  updatedBy: "EMPLOYEE7",
                  createdAt: "2021-10-12T13:20:38.000Z",
                  updatedAt: "2021-10-16T07:56:10.000Z",
                },
                {
                  id: "5fa87b00-2b5e-11ec-8639-1b33c0b488b9",
                  lastName: "EMPLOYEE",
                  firstName: "FIVE",
                  fullName: "FIVE EMPLOYEE",
                  userId: "5fa82ce0-2b5e-11ec-8639-1b33c0b488b9",
                  managerId: "6fe52390-2b3d-11ec-9c1a-19f965e7023e",
                  isDeleted: false,
                  createdBy: "EMPLOYEE5",
                  updatedBy: "EMPLOYEE5",
                  createdAt: "2021-10-12T13:14:47.000Z",
                  updatedAt: "2021-10-13T17:29:09.000Z",
                },
                {
                  id: "a4fa9ad0-2b5e-11ec-8639-1b33c0b488b9",
                  lastName: "EMPLOYEE",
                  firstName: "THREE",
                  fullName: "THREE EMPLOYEE",
                  userId: "a4fa4cb0-2b5e-11ec-8639-1b33c0b488b9",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "EMPLOYEE3",
                  updatedBy: "EMPLOYEE3",
                  createdAt: "2021-10-12T13:16:43.000Z",
                  updatedAt: "2021-10-12T13:16:43.000Z",
                },
                {
                  id: "ab363e60-2b11-11ec-bc29-e58e0a69d32c",
                  lastName: "longnt",
                  firstName: "nguyen",
                  fullName: "nguyenlongnt",
                  userId: "ab357b10-2b11-11ec-bc29-e58e0a69d32c",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "longnt5",
                  updatedBy: "longnt5",
                  createdAt: "2021-10-12T04:05:42.000Z",
                  updatedAt: "2021-10-12T04:05:42.000Z",
                },
                {
                  id: "cced32a0-2b5e-11ec-8639-1b33c0b488b9",
                  lastName: "EMPLOYEE",
                  firstName: "SIX",
                  fullName: "SIX EMPLOYEE",
                  userId: "ccece480-2b5e-11ec-8639-1b33c0b488b9",
                  managerId: "e11fb500-2b12-11ec-bc29-e58e0a69d32c",
                  isDeleted: false,
                  createdBy: "EMPLOYEE06",
                  updatedBy: "EMPLOYEE06",
                  createdAt: "2021-10-12T13:17:50.000Z",
                  updatedAt: "2021-10-16T12:54:38.000Z",
                },
                {
                  id: "4d3e6e20-2b5e-11ec-8639-1b33c0b488b9",
                  lastName: "EMPLOYEE",
                  firstName: "FOUR",
                  fullName: "FOUR EMPLOYEE",
                  userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                  managerId: "7e87d0a0-2cdc-11ec-8520-2bd7c9d982df",
                  isDeleted: false,
                  createdBy: "EMPLOYEE4",
                  updatedBy: "EMPLOYEE4",
                  createdAt: "2021-10-12T13:14:16.000Z",
                  updatedAt: "2021-10-14T10:52:18.000Z",
                },
                {
                  id: "d36df580-2b11-11ec-bc29-e58e0a69d32c",
                  lastName: "longnt",
                  firstName: "nguyen",
                  fullName: "nguyenlongnt",
                  userId: "d36d5940-2b11-11ec-bc29-e58e0a69d32c",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "longnt6",
                  updatedBy: "longnt6",
                  createdAt: "2021-10-12T04:06:50.000Z",
                  updatedAt: "2021-10-12T04:06:50.000Z",
                },
                {
                  id: "f3cee6a0-2a61-11ec-b693-0d62b864fc59",
                  lastName: "phuong",
                  firstName: "thao",
                  fullName: "thaophuong",
                  userId: "f3cdd530-2a61-11ec-b693-0d62b864fc59",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "tpt249",
                  updatedBy: "tpt249",
                  createdAt: "2021-10-11T07:07:53.000Z",
                  updatedAt: "2021-10-11T07:07:53.000Z",
                },
              ],
              totalRecord: 12,
            },
          },
        },
      },
    },
  },
};

let formComponent = {
  addForm: {
    request: {
      data: {
        type: "object",
        properties: {
          userId: {
            type: "array",
            items: {
              type: "string",
              example: "sample-id",
            },
          },
          type: {
            type: "number",
            example: 1,
          },
          dueDate: {
            type: "string",
            example: "2021-12-21",
          },
          isDeleted: {
            type: "number",
            example: 0,
          },
          formDetail: {
            type: "object",
            properties: {
              content: {
                type: "string",
                example: "abc",
              },
            },
          },
        },
        example: {
          userId: ["5fa82ce0-2b5e-11ec-8639-1b33c0b488b9"],
          type: "0",
          dueDate: "2021-12-07",
          isDeleted: 0,
          formDetail: {
            content: "abc",
          },
        },
      },
    },
    response: {
      success: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              form: {
                type: "object",
                properties: {
                  ...form,
                },
              },
              formDetail: {
                type: "object",
                properties: {
                  ...formDetail,
                },
              },
            },
          },
        },
      },
      code404: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              ...errorResponse,
            },
            example: {
              status: "error",
              statusCode: 404,
              message: {
                _original: {
                  userId: ["5fa82ce0-2b5e-11ec-8639-1b33c0b488b9"],
                  dueDate: "2021-12-07",
                  formDetail: {
                    content: "abc",
                  },
                },
                details: [
                  {
                    message: "type is required",
                    path: ["type"],
                    type: "any.required",
                    context: {
                      label: "type",
                      key: "type",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  submitForm: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...form,
            },
            example: {
              id: "cbb83300-2ea9-11ec-9089-df6da1bf74ab",
              receiver: null,
              type: 1,
              userId: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
              status: "SUBMITTED",
              dueDate: "2021-12-07T00:00:00.000Z",
              isApproved: 0,
              isRejected: 0,
              isDue: 0,
              isDeleted: false,
              createdBy: "bigherodz54",
              updatedBy: "bigherodz54",
              createdAt: "2021-10-16T17:52:14.000Z",
              updatedAt: "2021-10-16T18:04:30.346Z",
            },
          },
        },
      },
      code404: {
        submitTwice: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "CANT SUBMIT TWICE",
              },
            },
          },
        },
        formNotExist: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "FORM IS NOT EXISTED!",
              },
            },
          },
        },
        noPermission: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "YOU DONT HAVE PERMISSION TO SUBMIT THIS FORM!",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { userComponent, formComponent };
