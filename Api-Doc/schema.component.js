const {
  error: errorResponse,
  user,
  employee,
  form,
  formDetail,
  role,
  userRole,
  errorMiddleware,
  userOnly,
  pagingOPtion,
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

let AuthenComponent = {
  login: {
    request: {
      type: "object",
      properties: {
        username: {
          type: "string",
          example: "MANAGER6",
        },
        password: {
          type: "string",
          example: "12345678",
        },
      },
    },
    response: {
      success: {
        properties: {
          data: {
            properties: {
              status: {
                type: "number",
                example: 200,
              },
              user: {
                properties: {
                  ...user,
                  roles: {
                    properties: {
                      ...role,
                      userRole: {
                        properties: {
                          ...userRole,
                        },
                      },
                    },
                  },
                },
              },
              token: {
                type: "string",
                example: "token",
              },
            },
          },
        },
        example: {
          data: {
            status: 200,
            message: {
              User: {
                id: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                userName: "MANAGER6",
                password:
                  "$2b$10$wMnPMSiwzCekiQF1bQMkOelnqEr4G2OdFrw7NzcI671eMYZBG1izK",
                age: 50,
                email: "MANAGER6@gmail.com",
                phone: "+84866841700",
                address: null,
                isActive: null,
                identityNumber: "021523251",
                socialInsurance: "00210",
                avatar: null,
                isDeleted: false,
                createdBy: "MANAGER6",
                updatedBy: "MANAGER6",
                createdAt: "2021-10-15T10:18:25.000Z",
                updatedAt: "2021-10-15T10:18:25.000Z",
                employee: {
                  id: "3b8306b0-2da1-11ec-a12c-236f151614b9",
                  lastName: "MANAGER",
                  firstName: "THREE",
                  fullName: "THREE MANAGER",
                  userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "MANAGER6",
                  updatedBy: "MANAGER6",
                  createdAt: "2021-10-15T10:18:25.000Z",
                  updatedAt: "2021-10-15T10:18:25.000Z",
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
                      id: "86a23d60-2e9f-11ec-829b-3312f77f9ee0",
                      userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                      roleId: 4,
                      isDeleted: false,
                      createdBy: "admin",
                      updatedBy: "admin",
                      createdAt: "2021-10-16T16:38:43.000Z",
                      updatedAt: "2021-10-16T16:38:43.000Z",
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
                      id: "3b832dc0-2da1-11ec-a12c-236f151614b9",
                      userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                      roleId: 5,
                      isDeleted: false,
                      createdBy: "admin",
                      updatedBy: "admin",
                      createdAt: "2021-10-15T10:18:25.000Z",
                      updatedAt: "2021-10-15T10:18:25.000Z",
                    },
                  },
                ],
              },
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiM2I4MmRmYTAtMmRhMS0xMWVjLWExMmMtMjM2ZjE1MTYxNGI5IiwidXNlck5hbWUiOiJNQU5BR0VSNiIsInBhc3N3b3JkIjoiJDJiJDEwJHdNblBNU2l3ekNla2lRRjFiUU1rT2VsbnFFcjRHMk9kRnJ3N056Y0k2NzFlTVlaQkcxaXpLIiwiYWdlIjo1MCwiZW1haWwiOiJNQU5BR0VSNkBnbWFpbC5jb20iLCJwaG9uZSI6Iis4NDg2Njg0MTcwMCIsImFkZHJlc3MiOm51bGwsImlzQWN0aXZlIjpudWxsLCJpZGVudGl0eU51bWJlciI6IjAyMTUyMzI1MSIsInNvY2lhbEluc3VyYW5jZSI6IjAwMjEwIiwiYXZhdGFyIjpudWxsLCJpc0RlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQnkiOiJNQU5BR0VSNiIsInVwZGF0ZWRCeSI6Ik1BTkFHRVI2IiwiY3JlYXRlZEF0IjoiMjAyMS0xMC0xNVQxMDoxODoyNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0xNVQxMDoxODoyNS4wMDBaIiwiZW1wbG95ZWUiOnsiaWQiOiIzYjgzMDZiMC0yZGExLTExZWMtYTEyYy0yMzZmMTUxNjE0YjkiLCJsYXN0TmFtZSI6Ik1BTkFHRVIiLCJmaXJzdE5hbWUiOiJUSFJFRSIsImZ1bGxOYW1lIjoiVEhSRUUgTUFOQUdFUiIsInVzZXJJZCI6IjNiODJkZmEwLTJkYTEtMTFlYy1hMTJjLTIzNmYxNTE2MTRiOSIsIm1hbmFnZXJJZCI6bnVsbCwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEJ5IjoiTUFOQUdFUjYiLCJ1cGRhdGVkQnkiOiJNQU5BR0VSNiIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTVUMTA6MTg6MjUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTVUMTA6MTg6MjUuMDAwWiJ9LCJyb2xlcyI6W3siaWQiOjQsIm5hbWUiOiJtYW5hZ2VyIiwiZGVzY3JpcHRpb24iOiJ4eHgiLCJpc0RlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQnkiOiJhZG1pbiIsInVwZGF0ZWRCeSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMS0xMC0wN1QwNzo1NTowNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0wN1QwNzo1NTowNy4wMDBaIiwidXNlclJvbGUiOnsiaWQiOiI4NmEyM2Q2MC0yZTlmLTExZWMtODI5Yi0zMzEyZjc3ZjllZTAiLCJ1c2VySWQiOiIzYjgyZGZhMC0yZGExLTExZWMtYTEyYy0yMzZmMTUxNjE0YjkiLCJyb2xlSWQiOjQsImlzRGVsZXRlZCI6ZmFsc2UsImNyZWF0ZWRCeSI6ImFkbWluIiwidXBkYXRlZEJ5IjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIxLTEwLTE2VDE2OjM4OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEwLTE2VDE2OjM4OjQzLjAwMFoifX0seyJpZCI6NSwibmFtZSI6ImVtcGxveWVlIiwiZGVzY3JpcHRpb24iOiJ4eHgiLCJpc0RlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQnkiOiJhZG1pbiIsInVwZGF0ZWRCeSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMS0xMC0wN1QwNzo1NTowNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMC0wN1QwNzo1NTowNy4wMDBaIiwidXNlclJvbGUiOnsiaWQiOiIzYjgzMmRjMC0yZGExLTExZWMtYTEyYy0yMzZmMTUxNjE0YjkiLCJ1c2VySWQiOiIzYjgyZGZhMC0yZGExLTExZWMtYTEyYy0yMzZmMTUxNjE0YjkiLCJyb2xlSWQiOjUsImlzRGVsZXRlZCI6ZmFsc2UsImNyZWF0ZWRCeSI6ImFkbWluIiwidXBkYXRlZEJ5IjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIxLTEwLTE1VDEwOjE4OjI1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEwLTE1VDEwOjE4OjI1LjAwMFoifX1dfSwiaWF0IjoxNjM0NDU4OTQ0fQ.lsKf_iXtEddI7QOMfHwz5_yB8NGNFLl1zVo5aoOTnz4",
            },
          },
        },
      },
      code404: {
        incorrectUser: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "Inccorect UserName or Password",
              },
            },
          },
        },
        validationFailed: {
          properties: {
            error: {
              properties: {
                ...errorMiddleware,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: {
                  _original: {
                    userName: "",
                    password: "admin123",
                  },
                  details: [
                    {
                      message: "Please fill in userName",
                      path: ["userName"],
                      type: "string.empty",
                      context: {
                        label: "userName",
                        value: "",
                        key: "userName",
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
  },
  register: {
    request: {
      properties: {
        userName: {
          type: "string",
          example: "EMPLOYEE9",
        },
        password: {
          type: "string",
          example: "12345678",
        },
        email: {
          type: "string",
          example: "EMPLOYEE9@gmail.com",
        },
        phone: {
          type: "string",
          example: "+84866841700",
        },
        age: {
          type: "number",
          example: 20,
        },
        socialInsurance: {
          type: "string",
          example: "00210",
        },
        identityNumber: {
          type: "string",
          example: "021523251",
        },
        employee: {
          type: "object",
          properties: {
            lastName: {
              type: "string",
              example: "NINE",
            },
            firstName: {
              type: "string",
              example: "EMPLOYEE",
            },
          },
        },
      },
    },
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...user,
              employee: {
                properties: {
                  ...employee,
                },
              },
              roles: {
                type: "array",
                items: {
                  properties: {
                    ...role,
                    userRole: {
                      properties: {
                        ...userRole,
                      },
                    },
                  },
                },
              },
              userRoles: {
                type: "array",
                items: {
                  properties: {
                    ...userRole,
                  },
                },
              },
            },
            example: {
              id: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
              userName: "EMPLOYEE9",
              password:
                "$2b$10$2rIucmTkluAqv8./ntDZjeXH1NNexl2sFhcgdH/HNsOCNsRBB4g2e",
              age: 20,
              email: "EMPLOYEE9@gmail.com",
              phone: "+84866841700",
              address: null,
              isActive: null,
              identityNumber: "021523251",
              socialInsurance: "00210",
              avatar: null,
              isDeleted: false,
              createdBy: "EMPLOYEE9",
              updatedBy: "EMPLOYEE9",
              createdAt: "2021-10-17T10:12:05.000Z",
              updatedAt: "2021-10-17T10:12:05.000Z",
              employee: {
                id: "ae175e00-2f32-11ec-9f54-2ba08a3f7d93",
                lastName: "EMPLOYEE",
                firstName: "NINE",
                fullName: "NINE EMPLOYEE",
                userId: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                managerId: null,
                isDeleted: false,
                createdBy: "EMPLOYEE9",
                updatedBy: "EMPLOYEE9",
                createdAt: "2021-10-17T10:12:05.000Z",
                updatedAt: "2021-10-17T10:12:05.000Z",
              },
              roles: [
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
                    id: "ae17d330-2f32-11ec-9f54-2ba08a3f7d93",
                    userId: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                    roleId: 5,
                    isDeleted: false,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdAt: "2021-10-17T10:12:05.000Z",
                    updatedAt: "2021-10-17T10:12:05.000Z",
                  },
                },
              ],
              userRoles: [
                {
                  id: "ae17d330-2f32-11ec-9f54-2ba08a3f7d93",
                  userId: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                  roleId: 5,
                  isDeleted: false,
                  createdBy: "admin",
                  updatedBy: "admin",
                  createdAt: "2021-10-17T10:12:05.000Z",
                  updatedAt: "2021-10-17T10:12:05.000Z",
                },
              ],
            },
          },
        },
      },
      code404: {
        userNameExisted: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "USerName already in use",
              },
            },
          },
        },
        failedInMiddleware: {
          properties: {
            error: {
              properties: {
                ...errorMiddleware,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: {
                  _original: {
                    userName: "EMPLOYEE9",
                    email: "EMPLOYEE9@gmail.us",
                    password: "12345678",
                    phone: "+84866841700",
                    age: "20",
                    identityNumber: "021523251",
                    socialInsurance: "00210",
                    employee: {
                      lastName: "EMPLOYEE",
                      firstName: "NINE",
                    },
                  },
                  details: [
                    {
                      message: "invalid email",
                      path: ["email"],
                      type: "string.email",
                      context: {
                        value: "EMPLOYEE9@gmail.us",
                        invalids: ["EMPLOYEE9@gmail.us"],
                        label: "email",
                        key: "email",
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

  modifyContent: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              form: {
                properties: {
                  ...form,
                },
              },
              formDetail: {
                properties: {
                  ...formDetail,
                },
              },
            },
            example: {
              form: {
                id: "4142e1e0-2c54-11ec-b143-8d67b78cb9b8",
                receiver: null,
                type: 1,
                userId: "30eb7eb0-2b5f-11ec-8639-1b33c0b488b9",
                status: "NEW",
                dueDate: "2021-12-07T00:00:00.000Z",
                isApproved: 0,
                isRejected: 0,
                isDue: 0,
                isDeleted: false,
                createdBy: null,
                updatedBy: "EMPLOYEE7",
                createdAt: "2021-10-13T18:34:52.000Z",
                updatedAt: "2021-10-17T02:42:22.183Z",
              },
              formDetail: {
                id: "4144ddb0-2c54-11ec-b143-8d67b78cb9b8",
                formId: "4142e1e0-2c54-11ec-b143-8d67b78cb9b8",
                content: "updated content",
                managerComment: "",
                isDeleted: false,
                createdBy: null,
                updatedBy: "EMPLOYEE7",
                createdAt: "2021-10-13T18:34:52.000Z",
                updatedAt: "2021-10-17T02:42:22.196Z",
              },
            },
          },
        },
      },
      code404: {
        formIsClosedException: {
          description: "form is closed",
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "You can't update because form is closed",
              },
            },
          },
        },
        isDeletedException: {
          description: "form is deleted",
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "You can't update because form is deleted",
              },
            },
          },
        },
        formNotExistException: {
          description: "form is not existed",
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
          description: "form is not not yours",
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: "YOU DONT HAVE PERMISSION TO EDIT THIS FORM!",
              },
            },
          },
        },
      },
    },
  },
  viewProbateList: {
    response: {
      success: {
        properties: {
          data: {
            type: "array",
            items: {
              properties: {
                user: {
                  properties: {
                    ...userOnly,
                  },
                  example: {
                    id: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                    userName: "EMPLOYEE4",
                    password:
                      "$2b$10$wX.1Qzxm9pWgXgAFRuB.JOXbp4LESHIYMjcE4nAK7eQ4OXA.DfG.a",
                    age: 19,
                    email: "EMPLOYEE4@gmail.com",
                    phone: "+84 866 841700",
                    address: null,
                    isActive: null,
                    identityNumber: "021523251",
                    socialInsurance: "00210",
                    avatar: null,
                    isDeleted: false,
                    createdBy: "EMPLOYEE4",
                    updatedBy: "EMPLOYEE4",
                    createdAt: "2021-10-12T13:14:16.000Z",
                    updatedAt: "2021-10-12T13:14:16.000Z",
                  },
                },
                forms: {
                  type: "array",
                  items: {
                    properties: {
                      ...form,
                      formDetail: {
                        properties: {
                          ...formDetail,
                        },
                        example: {
                          id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                          formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                          content: "abc",
                          managerComment: "",
                          isDeleted: false,
                          createdBy: "admindeptrai",
                          updatedBy: "admindeptrai",
                          createdAt: "2021-10-14T11:06:44.000Z",
                          updatedAt: "2021-10-14T11:06:44.000Z",
                        },
                      },
                    },
                    example: {
                      id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                      receiver: null,
                      type: 1,
                      userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                      status: "SUBMITTED",
                      dueDate: "2021-12-07T00:00:00.000Z",
                      isApproved: 1,
                      isRejected: 0,
                      isDue: 0,
                      isDeleted: false,
                      createdBy: "admindeptrai",
                      updatedBy: "admindeptrai",
                      createdAt: "2021-10-14T11:06:44.000Z",
                      updatedAt: "2021-10-14T11:52:31.000Z",
                      FormDetail: {
                        id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                        formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                        content: "abc",
                        managerComment: "",
                        isDeleted: false,
                        createdBy: "admindeptrai",
                        updatedBy: "admindeptrai",
                        createdAt: "2021-10-14T11:06:44.000Z",
                        updatedAt: "2021-10-14T11:06:44.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      code400: {
        noEmployee: {
          properties: {
            data: {
              properties: {
                error: {
                  properties: {
                    ...errorResponse,
                  },
                  example: {
                    status: "error",
                    statusCode: 400,
                    message: "YOU HAVE NO EMPLOYEE",
                  },
                },
              },
            },
          },
        },
        noFormSubmitted: {
          properties: {
            data: {
              properties: {
                error: {
                  properties: {
                    ...errorResponse,
                  },
                  example: {
                    status: "error",
                    statusCode: 400,
                    message: "No Form submitted yet!",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  viewEvaluateFormList: {
    response: {
      success: {
        properties: {
          data: {
            type: "array",
            items: {
              properties: {
                user: {
                  properties: {
                    ...userOnly,
                  },
                  example: {
                    id: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                    userName: "EMPLOYEE4",
                    password:
                      "$2b$10$wX.1Qzxm9pWgXgAFRuB.JOXbp4LESHIYMjcE4nAK7eQ4OXA.DfG.a",
                    age: 19,
                    email: "EMPLOYEE4@gmail.com",
                    phone: "+84 866 841700",
                    address: null,
                    isActive: null,
                    identityNumber: "021523251",
                    socialInsurance: "00210",
                    avatar: null,
                    isDeleted: false,
                    createdBy: "EMPLOYEE4",
                    updatedBy: "EMPLOYEE4",
                    createdAt: "2021-10-12T13:14:16.000Z",
                    updatedAt: "2021-10-12T13:14:16.000Z",
                  },
                },
                forms: {
                  type: "array",
                  items: {
                    properties: {
                      ...form,
                      formDetail: {
                        properties: {
                          ...formDetail,
                        },
                        example: {
                          id: "6f3ebd60-2cdd-11ec-8520-2bd7c9d982df",
                          formId: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
                          content: "abc",
                          managerComment: "",
                          isDeleted: false,
                          createdBy: "admindeptrai",
                          updatedBy: "admindeptrai",
                          createdAt: "2021-10-14T10:56:50.000Z",
                          updatedAt: "2021-10-14T10:56:50.000Z",
                        },
                      },
                    },
                    example: {
                      id: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
                      receiver: null,
                      type: 0,
                      userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                      status: "SUBMITTED",
                      dueDate: "2021-12-07T00:00:00.000Z",
                      isApproved: 0,
                      isRejected: 1,
                      isDue: 0,
                      isDeleted: false,
                      createdBy: "admindeptrai",
                      updatedBy: "admindeptrai",
                      createdAt: "2021-10-14T10:56:50.000Z",
                      updatedAt: "2021-10-14T11:39:57.000Z",
                      FormDetail: {
                        id: "6f3ebd60-2cdd-11ec-8520-2bd7c9d982df",
                        formId: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
                        content: "abc",
                        managerComment: "",
                        isDeleted: false,
                        createdBy: "admindeptrai",
                        updatedBy: "admindeptrai",
                        createdAt: "2021-10-14T10:56:50.000Z",
                        updatedAt: "2021-10-14T10:56:50.000Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  approveForm: {
    request: {
      properties: {
        id: {
          type: "string",
          example: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
        },
      },
    },
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...form,
              FormDetail: {
                properties: {
                  ...formDetail,
                },
                example: {
                  id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                  formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                  content: "abc",
                  managerComment: "",
                  isDeleted: false,
                  createdBy: "admindeptrai",
                  updatedBy: "admindeptrai",
                  createdAt: "2021-10-14T11:06:44.000Z",
                  updatedAt: "2021-10-14T11:06:44.000Z",
                },
              },
            },
            example: {
              id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
              receiver: null,
              type: 1,
              userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
              status: "SUBMITTED",
              dueDate: "2021-12-07T00:00:00.000Z",
              isApproved: 1,
              isRejected: 0,
              isDue: 0,
              isDeleted: false,
              createdBy: "admindeptrai",
              updatedBy: "admindeptrai",
              createdAt: "2021-10-14T11:06:44.000Z",
              updatedAt: "2021-10-14T11:52:31.000Z",
              FormDetail: {
                id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                content: "abc",
                managerComment: "",
                isDeleted: false,
                createdBy: "admindeptrai",
                updatedBy: "admindeptrai",
                createdAt: "2021-10-14T11:06:44.000Z",
                updatedAt: "2021-10-14T11:06:44.000Z",
              },
            },
          },
        },
      },
      code400: {
        formNotExist: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 400,
                message: "FORM IS NOT EXISTED",
              },
            },
          },
        },
        validationException: {
          properties: {
            error: {
              properties: {
                ...errorMiddleware,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: {
                  _original: {
                    id: "",
                  },
                  details: [
                    {
                      message: "Please fill in form id",
                      path: ["id"],
                      type: "string.empty",
                      context: {
                        label: "id",
                        value: "",
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
  },
  rejectForm: {
    request: {
      properties: {
        id: {
          type: "string",
          example: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
        },
      },
    },
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...form,
              FormDetail: {
                properties: {
                  ...formDetail,
                },
                example: {
                  id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                  formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                  content: "abc",
                  managerComment: "",
                  isDeleted: false,
                  createdBy: "admindeptrai",
                  updatedBy: "admindeptrai",
                  createdAt: "2021-10-14T11:06:44.000Z",
                  updatedAt: "2021-10-14T11:06:44.000Z",
                },
              },
            },
            example: {
              id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
              receiver: null,
              type: 1,
              userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
              status: "SUBMITTED",
              dueDate: "2021-12-07T00:00:00.000Z",
              isApproved: 0,
              isRejected: 1,
              isDue: 0,
              isDeleted: false,
              createdBy: "admindeptrai",
              updatedBy: "admindeptrai",
              createdAt: "2021-10-14T11:06:44.000Z",
              updatedAt: "2021-10-14T11:52:31.000Z",
              FormDetail: {
                id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                content: "abc",
                managerComment: "",
                isDeleted: false,
                createdBy: "admindeptrai",
                updatedBy: "admindeptrai",
                createdAt: "2021-10-14T11:06:44.000Z",
                updatedAt: "2021-10-14T11:06:44.000Z",
              },
            },
          },
        },
      },
      code400: {
        formNotExist: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 400,
                message: "FORM IS NOT EXISTED",
              },
            },
          },
        },
        validationException: {
          properties: {
            error: {
              properties: {
                ...errorMiddleware,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: {
                  _original: {
                    id: "",
                  },
                  details: [
                    {
                      message: "Please fill in form id",
                      path: ["id"],
                      type: "string.empty",
                      context: {
                        label: "id",
                        value: "",
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
  },
  checkDueDate: {
    response: {
      success: {
        properties: {
          data: {
            type: "string",
            example: "38 form over Due!",
          },
        },
      },
      code400: {
        unauthorized: {
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
  closeForm: {
    request: {
      properties: {
        id: {
          type: "string",
          example: "336e2550-2c38-11ec-bb51-2b9b10bb6c90",
        },
      },
    },
    response: {
      success: {
        properties: {
          data: {
            type: "string",
            example: "CLOSE FORM SUCCESSFULLY",
          },
        },
      },
      code400: {
        unAuthorized: {
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

      code404: {
        failedInMiddleware: {
          properties: {
            error: {
              properties: {
                ...errorResponse,
              },
              example: {
                status: "error",
                statusCode: 404,
                message: {
                  _original: {},
                  details: [
                    {
                      message: "form id is required",
                      path: ["id"],
                      type: "any.required",
                      context: {
                        label: "id",
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
  },
};

let adminComponent = {
  listAllForm: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...pagingOPtion,
              forms: {
                type: "array",
                items: {
                  properties: {
                    form: {
                      properties: {
                        ...form,
                        formDetail: {
                          properties: {
                            ...formDetail,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            example: {
              orderBy: "status",
              orderType: "DESC",
              limit: 5,
              offset: 0,
              forms: [
                {
                  id: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
                  receiver: null,
                  type: 1,
                  userId: "5fa82ce0-2b5e-11ec-8639-1b33c0b488b9",
                  status: "SUBMITTED",
                  dueDate: "2021-12-07T00:00:00.000Z",
                  isApproved: 0,
                  isRejected: 0,
                  isDue: 0,
                  isDeleted: false,
                  createdBy: null,
                  updatedBy: "MANAGER2",
                  createdAt: "2021-10-13T15:18:03.000Z",
                  updatedAt: "2021-10-17T08:15:34.000Z",
                  FormDetail: {
                    id: "c28f6190-2c38-11ec-bb51-2b9b10bb6c90",
                    formId: "c28e0200-2c38-11ec-bb51-2b9b10bb6c90",
                    content: "abc",
                    managerComment: "update comment",
                    isDeleted: false,
                    createdBy: null,
                    updatedBy: "MANAGER2",
                    createdAt: "2021-10-13T15:18:03.000Z",
                    updatedAt: "2021-10-14T02:14:03.000Z",
                  },
                },
                {
                  id: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
                  receiver: null,
                  type: 0,
                  userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                  status: "SUBMITTED",
                  dueDate: "2021-12-07T00:00:00.000Z",
                  isApproved: 0,
                  isRejected: 1,
                  isDue: 0,
                  isDeleted: false,
                  createdBy: "admindeptrai",
                  updatedBy: "admindeptrai",
                  createdAt: "2021-10-14T10:56:50.000Z",
                  updatedAt: "2021-10-14T11:39:57.000Z",
                  FormDetail: {
                    id: "6f3ebd60-2cdd-11ec-8520-2bd7c9d982df",
                    formId: "6f3e9650-2cdd-11ec-8520-2bd7c9d982df",
                    content: "abc",
                    managerComment: "",
                    isDeleted: false,
                    createdBy: "admindeptrai",
                    updatedBy: "admindeptrai",
                    createdAt: "2021-10-14T10:56:50.000Z",
                    updatedAt: "2021-10-14T10:56:50.000Z",
                  },
                },
                {
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
                  updatedAt: "2021-10-16T18:04:30.000Z",
                  FormDetail: {
                    id: "cbb96b80-2ea9-11ec-9089-df6da1bf74ab",
                    formId: "cbb83300-2ea9-11ec-9089-df6da1bf74ab",
                    content: "abc",
                    managerComment: "",
                    isDeleted: false,
                    createdBy: "bigherodz54",
                    updatedBy: "bigherodz54",
                    createdAt: "2021-10-16T17:52:14.000Z",
                    updatedAt: "2021-10-16T17:52:14.000Z",
                  },
                },
                {
                  id: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                  receiver: null,
                  type: 1,
                  userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                  status: "SUBMITTED",
                  dueDate: "2021-12-07T00:00:00.000Z",
                  isApproved: 1,
                  isRejected: 0,
                  isDue: 0,
                  isDeleted: false,
                  createdBy: "admindeptrai",
                  updatedBy: "admindeptrai",
                  createdAt: "2021-10-14T11:06:44.000Z",
                  updatedAt: "2021-10-17T11:52:22.000Z",
                  FormDetail: {
                    id: "d0f8f060-2cde-11ec-bc3e-db15a81a0069",
                    formId: "d0f80600-2cde-11ec-bc3e-db15a81a0069",
                    content: "abc",
                    managerComment: "",
                    isDeleted: false,
                    createdBy: "admindeptrai",
                    updatedBy: "admindeptrai",
                    createdAt: "2021-10-14T11:06:44.000Z",
                    updatedAt: "2021-10-14T11:06:44.000Z",
                  },
                },
                {
                  id: "9c734f80-2cdd-11ec-8520-2bd7c9d982df",
                  receiver: null,
                  type: 0,
                  userId: "4d3c7250-2b5e-11ec-8639-1b33c0b488b9",
                  status: "SUBMITTED",
                  dueDate: "2021-12-07T00:00:00.000Z",
                  isApproved: 0,
                  isRejected: 0,
                  isDue: 0,
                  isDeleted: false,
                  createdBy: "admindeptrai",
                  updatedBy: "admindeptrai",
                  createdAt: "2021-10-14T10:58:06.000Z",
                  updatedAt: "2021-10-14T10:58:20.000Z",
                  FormDetail: {
                    id: "9c737690-2cdd-11ec-8520-2bd7c9d982df",
                    formId: "9c734f80-2cdd-11ec-8520-2bd7c9d982df",
                    content: "abc",
                    managerComment: "",
                    isDeleted: false,
                    createdBy: "admindeptrai",
                    updatedBy: "admindeptrai",
                    createdAt: "2021-10-14T10:58:06.000Z",
                    updatedAt: "2021-10-14T10:58:06.000Z",
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
  listAllUser: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...pagingOPtion,
              users: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ...user,
                    employee: {
                      properties: {
                        ...employee,
                      },
                    },
                    roles: {
                      type: "array",
                      items: {
                        properties: {
                          ...role,
                          userRole: {
                            properties: {
                              ...userRole,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            example: {
              orderBy: "id",
              orderType: "DESC",
              limit: 5,
              offset: 5,
              users: [
                {
                  id: "ccece480-2b5e-11ec-8639-1b33c0b488b9",
                  userName: "EMPLOYEE06",
                  password:
                    "$2b$10$dDGybGLAjBRbk8SgsPY4Ru84DqS1qVUPhqQxe6.owH8OGIGx83FTa",
                  age: 30,
                  email: "EMPLOYEE06@gmail.com",
                  phone: "+84866841700",
                  address: null,
                  isActive: null,
                  identityNumber: "021523251",
                  socialInsurance: "00210",
                  avatar: null,
                  isDeleted: false,
                  createdBy: "EMPLOYEE06",
                  updatedBy: "EMPLOYEE06",
                  createdAt: "2021-10-12T13:17:50.000Z",
                  updatedAt: "2021-10-12T13:17:50.000Z",
                  employee: {
                    id: "cced32a0-2b5e-11ec-8639-1b33c0b488b9",
                    lastName: "EMPLOYEE",
                    firstName: "SIX",
                    fullName: "SIX EMPLOYEE",
                    userId: "ccece480-2b5e-11ec-8639-1b33c0b488b9",
                    managerId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                    isDeleted: false,
                    createdBy: "EMPLOYEE06",
                    updatedBy: "EMPLOYEE06",
                    createdAt: "2021-10-12T13:17:50.000Z",
                    updatedAt: "2021-10-16T12:54:38.000Z",
                  },
                  roles: [
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
                        id: "cced59b0-2b5e-11ec-8639-1b33c0b488b9",
                        userId: "ccece480-2b5e-11ec-8639-1b33c0b488b9",
                        roleId: 5,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-12T13:17:50.000Z",
                        updatedAt: "2021-10-12T13:17:50.000Z",
                      },
                    },
                  ],
                },
                {
                  id: "c094e320-2a61-11ec-8e61-1330d32b6766",
                  userName: "longnt1",
                  password:
                    "$2b$10$ESLrQsW68n7N0fUpTZ.SSO4oMPkGhtCPR70ybbtwdFe8iW4XLC.d2",
                  age: 19,
                  email: "longnt1@fpt.edu.vn",
                  phone: "+84 866 841700",
                  address: null,
                  isActive: null,
                  identityNumber: "021523251",
                  socialInsurance: "00210",
                  avatar: null,
                  isDeleted: false,
                  createdBy: "longnt1",
                  updatedBy: "longnt1",
                  createdAt: "2021-10-11T07:06:27.000Z",
                  updatedAt: "2021-10-11T07:06:27.000Z",
                  employee: {
                    id: "c09669c0-2a61-11ec-8e61-1330d32b6766",
                    lastName: "Gtbunyo",
                    firstName: "???",
                    fullName: "???Gtbunyo",
                    userId: "c094e320-2a61-11ec-8e61-1330d32b6766",
                    managerId: null,
                    isDeleted: false,
                    createdBy: "longnt1",
                    updatedBy: "longnt1",
                    createdAt: "2021-10-11T07:06:27.000Z",
                    updatedAt: "2021-10-11T07:06:27.000Z",
                  },
                  roles: [
                    {
                      id: 2,
                      name: "director",
                      description: "xxx",
                      isDeleted: false,
                      createdBy: "admin",
                      updatedBy: "admin",
                      createdAt: "2021-10-07T07:55:07.000Z",
                      updatedAt: "2021-10-07T07:55:07.000Z",
                      userRole: {
                        id: "d4770580-2a6b-11ec-a97d-cd844283d96c",
                        userId: "c094e320-2a61-11ec-8e61-1330d32b6766",
                        roleId: 2,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-11T08:18:35.000Z",
                        updatedAt: "2021-10-11T08:18:35.000Z",
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
                        id: "c096def0-2a61-11ec-8e61-1330d32b6766",
                        userId: "c094e320-2a61-11ec-8e61-1330d32b6766",
                        roleId: 5,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-11T07:06:27.000Z",
                        updatedAt: "2021-10-11T07:06:27.000Z",
                      },
                    },
                  ],
                },
                {
                  id: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                  userName: "EMPLOYEE9",
                  password:
                    "$2b$10$2rIucmTkluAqv8./ntDZjeXH1NNexl2sFhcgdH/HNsOCNsRBB4g2e",
                  age: 20,
                  email: "EMPLOYEE9@gmail.com",
                  phone: "+84866841700",
                  address: null,
                  isActive: null,
                  identityNumber: "021523251",
                  socialInsurance: "00210",
                  avatar: null,
                  isDeleted: false,
                  createdBy: "EMPLOYEE9",
                  updatedBy: "EMPLOYEE9",
                  createdAt: "2021-10-17T10:12:05.000Z",
                  updatedAt: "2021-10-17T10:12:05.000Z",
                  employee: {
                    id: "ae175e00-2f32-11ec-9f54-2ba08a3f7d93",
                    lastName: "EMPLOYEE",
                    firstName: "NINE",
                    fullName: "NINE EMPLOYEE",
                    userId: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                    managerId: null,
                    isDeleted: false,
                    createdBy: "EMPLOYEE9",
                    updatedBy: "EMPLOYEE9",
                    createdAt: "2021-10-17T10:12:05.000Z",
                    updatedAt: "2021-10-17T10:12:05.000Z",
                  },
                  roles: [
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
                        id: "ae17d330-2f32-11ec-9f54-2ba08a3f7d93",
                        userId: "ae15b050-2f32-11ec-9f54-2ba08a3f7d93",
                        roleId: 5,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-17T10:12:05.000Z",
                        updatedAt: "2021-10-17T10:12:05.000Z",
                      },
                    },
                  ],
                },
                {
                  id: "ac2f00d0-2b12-11ec-bc29-e58e0a69d32c",
                  userName: "pxz41",
                  password:
                    "$2b$10$gUbUolwdw1TOrYdoRo2CZ.zdh0d9k7XEPPo6QKELdY27m0YcUEZra",
                  age: 19,
                  email: "pxz41brxc@gamil.com",
                  phone: "+84 866 841700",
                  address: null,
                  isActive: null,
                  identityNumber: "021523251",
                  socialInsurance: "00210",
                  avatar: null,
                  isDeleted: false,
                  createdBy: "pxz41",
                  updatedBy: "pxz41",
                  createdAt: "2021-10-12T04:12:53.000Z",
                  updatedAt: "2021-10-12T04:12:53.000Z",
                  employee: {
                    id: "ac2fc420-2b12-11ec-bc29-e58e0a69d32c",
                    lastName: "hoang",
                    firstName: "duy",
                    fullName: "duyhoang",
                    userId: "ac2f00d0-2b12-11ec-bc29-e58e0a69d32c",
                    managerId: null,
                    isDeleted: false,
                    createdBy: "pxz41",
                    updatedBy: "pxz41",
                    createdAt: "2021-10-12T04:12:53.000Z",
                    updatedAt: "2021-10-12T04:12:53.000Z",
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
                        id: "beef9220-2b12-11ec-bc29-e58e0a69d32c",
                        userId: "ac2f00d0-2b12-11ec-bc29-e58e0a69d32c",
                        roleId: 4,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-12T04:13:25.000Z",
                        updatedAt: "2021-10-12T04:13:25.000Z",
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
                        id: "ac2feb30-2b12-11ec-bc29-e58e0a69d32c",
                        userId: "ac2f00d0-2b12-11ec-bc29-e58e0a69d32c",
                        roleId: 5,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-12T04:12:53.000Z",
                        updatedAt: "2021-10-12T04:12:53.000Z",
                      },
                    },
                  ],
                },
                {
                  id: "ab357b10-2b11-11ec-bc29-e58e0a69d32c",
                  userName: "longnt5",
                  password:
                    "$2b$10$mm7G6d4Ql0OuKexjWjvEqeC67tSNUQkpnHkOm9sTGn8Km7YzRANIi",
                  age: 19,
                  email: "longnt5@fpt.edu.vn",
                  phone: "+84 866 841700",
                  address: null,
                  isActive: null,
                  identityNumber: "021523251",
                  socialInsurance: "00210",
                  avatar: null,
                  isDeleted: false,
                  createdBy: "longnt5",
                  updatedBy: "longnt5",
                  createdAt: "2021-10-12T04:05:42.000Z",
                  updatedAt: "2021-10-12T04:05:42.000Z",
                  employee: {
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
                  roles: [
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
                        id: "ab368c80-2b11-11ec-bc29-e58e0a69d32c",
                        userId: "ab357b10-2b11-11ec-bc29-e58e0a69d32c",
                        roleId: 5,
                        isDeleted: false,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: "2021-10-12T04:05:42.000Z",
                        updatedAt: "2021-10-12T04:05:42.000Z",
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  },

  promoteUSer: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              status: {
                type: "number",
                example: 200,
              },
              message: {
                properties: {
                  ...user,
                  employee: {
                    properties: {
                      ...employee,
                    },
                  },
                  roles: {
                    type: "array",
                    items: {
                      properties: {
                        ...role,
                        userRole: {
                          properties: {
                            ...userRole,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            example: {
              status: 200,
              message: {
                id: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                userName: "MANAGER6",
                password:
                  "$2b$10$wMnPMSiwzCekiQF1bQMkOelnqEr4G2OdFrw7NzcI671eMYZBG1izK",
                age: 50,
                email: "MANAGER6@gmail.com",
                phone: "+84866841700",
                address: null,
                isActive: null,
                identityNumber: "021523251",
                socialInsurance: "00210",
                avatar: null,
                isDeleted: false,
                createdBy: "MANAGER6",
                updatedBy: "MANAGER6",
                createdAt: "2021-10-15T10:18:25.000Z",
                updatedAt: "2021-10-15T10:18:25.000Z",
                employee: {
                  id: "3b8306b0-2da1-11ec-a12c-236f151614b9",
                  lastName: "MANAGER",
                  firstName: "THREE",
                  fullName: "THREE MANAGER",
                  userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                  managerId: null,
                  isDeleted: false,
                  createdBy: "MANAGER6",
                  updatedBy: "MANAGER6",
                  createdAt: "2021-10-15T10:18:25.000Z",
                  updatedAt: "2021-10-15T10:18:25.000Z",
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
                      id: "86a23d60-2e9f-11ec-829b-3312f77f9ee0",
                      userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                      roleId: 4,
                      isDeleted: false,
                      createdBy: "admin",
                      updatedBy: "admin",
                      createdAt: "2021-10-16T16:38:43.000Z",
                      updatedAt: "2021-10-16T16:38:43.000Z",
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
                      id: "3b832dc0-2da1-11ec-a12c-236f151614b9",
                      userId: "3b82dfa0-2da1-11ec-a12c-236f151614b9",
                      roleId: 5,
                      isDeleted: false,
                      createdBy: "admin",
                      updatedBy: "admin",
                      createdAt: "2021-10-15T10:18:25.000Z",
                      updatedAt: "2021-10-15T10:18:25.000Z",
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

  getUSer: {
    response: {
      success: {
        properties: {
          data: {
            properties: {
              ...user,
              employee: {
                properties: {
                  ...employee,
                },
              },
              roles: {
                type: "array",
                items: {
                  properties: {
                    ...role,
                    userRole: {
                      properties: {
                        ...userRole,
                      },
                    },
                  },
                },
              },
            },
            example: {
              id: "15db4410-2b42-11ec-820e-27908212d139",
              userName: "DIRECTOR2",
              password:
                "$2b$10$XhEhbxLyjIiO7gxuI4zKHujR2w8X8ORRpjMHqK9ojeFpWVJq/rbju",
              age: 19,
              email: "director2@gmail.com",
              phone: "+84 866 841700",
              address: null,
              isActive: null,
              identityNumber: "021523251",
              socialInsurance: "00210",
              avatar: null,
              isDeleted: false,
              createdBy: "DIRECTOR2",
              updatedBy: "DIRECTOR2",
              createdAt: "2021-10-12T09:52:17.000Z",
              updatedAt: "2021-10-12T09:52:17.000Z",
              employee: {
                id: "15dc0760-2b42-11ec-820e-27908212d139",
                lastName: "john",
                firstName: "smith",
                fullName: "smith john",
                userId: "15db4410-2b42-11ec-820e-27908212d139",
                managerId: null,
                isDeleted: false,
                createdBy: "DIRECTOR2",
                updatedBy: "DIRECTOR2",
                createdAt: "2021-10-12T09:52:17.000Z",
                updatedAt: "2021-10-12T09:52:17.000Z",
              },
              roles: [
                {
                  id: 2,
                  name: "director",
                  description: "xxx",
                  isDeleted: false,
                  createdBy: "admin",
                  updatedBy: "admin",
                  createdAt: "2021-10-07T07:55:07.000Z",
                  updatedAt: "2021-10-07T07:55:07.000Z",
                  userRole: {
                    id: "90de9d20-2beb-11ec-af6f-cfd0b2aa8737",
                    userId: "15db4410-2b42-11ec-820e-27908212d139",
                    roleId: 2,
                    isDeleted: false,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdAt: "2021-10-13T06:05:28.000Z",
                    updatedAt: "2021-10-13T06:05:28.000Z",
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
                    id: "15dc5580-2b42-11ec-820e-27908212d139",
                    userId: "15db4410-2b42-11ec-820e-27908212d139",
                    roleId: 5,
                    isDeleted: false,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdAt: "2021-10-12T09:52:17.000Z",
                    updatedAt: "2021-10-12T09:52:17.000Z",
                  },
                },
              ],
            },
          },
        },
      },
    },
  },

  authorizeException: {
    properties: {
      error: {
        properties: {
          ...errorResponse,
        },
        example: { status: 404, message: "BAD REQUEST" },
      },
    },
  },
};

module.exports = {
  userComponent,
  formComponent,
  adminComponent,
  AuthenComponent,
};
