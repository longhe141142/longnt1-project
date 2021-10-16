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

module.exports = { error,user,employee };
