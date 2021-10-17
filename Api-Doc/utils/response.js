let error = {
  message: {
    type: "string",
  },
  statusCode: {
    type: "number",
  },
  status: {
    type: "string",
  },
};

let errorMiddleware = {
  status: {
    type: "string",
    example: "error",
  },

  statusCode: {
    type: "number",
    example: 400,
  },
  message: {
    type: "object",
    properties: {
      _original: {
        properties: {
          username: {
            type: "string",
            example: "entered_userName",
          },
          password: {
            type: "string",
            example: "entered_password",
          },
        },
      },
      details: {
        type: "array",
        items: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Please fill in userName",
            },
            path: {
              type: "array",
              items: {
                type: "string",
                example: "fieldName",
              },
            },
            type: {
              type: "string",
              example: "string.empty",
            },
            context: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                  example: "fieldName",
                },
                value: {
                  type: "string",
                  example: "",
                },
                key: {
                  type: "string",
                  example: "fieldName",
                },
              },
            },
          },
        },
      },
    },
  },
};

let common = {
  isDeleted: {
    type: "string",
  },
  createdBy: {
    type: "string",
  },
  updatedBy: {
    type: "string",
  },
  createdAt: {
    type: "string",
  },
  updatedAt: {
    type: "string",
  },
};

let employee = {
  id: {
    type: "string",
  },
  lastName: {
    type: "string",
  },
  firstName: {
    type: "string",
  },
  fullName: {
    type: "string",
  },
  userId: {
    type: "string",
  },
  managerId: {
    type: "string",
  },
  ...common,
};

let user = {
  id: {
    type: "string",
  },
  userName: {
    type: "string",
  },
  password: {
    type: "string",
  },
  age: {
    type: "string",
  },
  email: {
    type: "string",
  },
  phone: {
    type: "number",
  },
  address: {
    type: "string",
  },
  isActive: {
    type: "string",
  },
  identityNumber: {
    type: "string",
  },
  socialInsurance: {
    type: "string",
  },
  avatar: {
    type: "string",
  },
  ...common,
  employee: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...employee,
      },
    },
  },
};

let userOnly = {
  id: {
    type: "string",
  },
  userName: {
    type: "string",
  },
  password: {
    type: "string",
  },
  age: {
    type: "string",
  },
  email: {
    type: "string",
  },
  phone: {
    type: "number",
  },
  address: {
    type: "string",
  },
  isActive: {
    type: "string",
  },
  identityNumber: {
    type: "string",
  },
  socialInsurance: {
    type: "string",
  },
  avatar: {
    type: "string",
  },
  ...common,
}

let form = {
  id: {
    type: "string",
  },
  isDue: {
    type: "number",
    example: 0,
  },
  type: {
    type: "number",
    example: 1,
  },
  dueDate: {
    type: "string",
    example: "2021-11-12",
  },
  isDeleted: {
    type: "number",
    example: 1,
  },
  isRejected: {
    type: "number",
    example: 1,
  },
  isApproved: {
    type: "number",
    example: 1,
  },
  status: {
    type: "string",
    example: "NEW",
  },
  userId: {
    type: "string",
  },
  ...common,
};

let formDetail = {
  id: {
    type: "string",
  },
  managerComment: {
    type: "string",
    example: "comment",
  },
  isDeleted: {
    type: "boolean",
  },
  content: {
    type: "string",
    example: "abc",
  },
  ...common,
};

let role = {
  id: {
    type: "string",
    example: "uuidv",
  },
  name: {
    type: "string",
    example: "admin",
  },
  description: {
    type: "string",
    example: "abc",
  },
  ...common,
};
let userRole = {
  id: {
    type: "string",
    example: "uuidv",
  },
  roleId: {
    type: "string",
    example: "uuidv",
  },
  userId: {
    type: "string",
    example: "uuidv",
  },
  ...common,
};

module.exports = {
  error,
  user,
  employee,
  form,
  formDetail,
  userRole,
  role,
  errorMiddleware,
  userOnly
};
