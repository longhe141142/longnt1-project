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
    example:"comment"
  },
  isDeleted: {
    type: "boolean",
  },
  content: {
    type: "string",
    example: "abc"
  },
  ...common
};

module.exports = { error, user, employee, form ,formDetail};
