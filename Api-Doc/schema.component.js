const { string } = require("joi");
const { error: errorResponse, user, employee } = require("./utils/response");

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
            type: string,
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
};

module.exports = { userComponent };
