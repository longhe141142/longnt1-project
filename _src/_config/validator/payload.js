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
      // lastName: req.body.employee.lastName,
      // firstName: req.body.firstName,
    },
    login: {
      userName: req.body.userName,
      password: req.body.password,
    },

    createForm: {
      userId:req.body.userId, 
      type:req.body.type,
      dueDate:req.body.dueDate,
      formDetail: req.body.formDetail,
    },
    submitForm:{
      id:req.body.id
    },
    comment:{
      id:req.body.id,
      comment:req.body.comment,
    },
    content:{
      id:req.body.id,
      content:req.body.content,
    },
    idRequire:{
      id:req.body.id,
    }
  };
};
module.exports = { payload };
