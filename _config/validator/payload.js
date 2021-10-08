let payload = (req) => {
  return {
    register: {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      age: req.body.age,
      identityNumber: req.body.identityNumber,
      socialInsurance: req.body.socialInsurance,
      employee: req.body.employee,
      lastName: req.body.employee.lastName,
      firstName: req.body.firstName,
    },
  };
};
module.exports = { payload };
