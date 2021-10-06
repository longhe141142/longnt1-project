const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const FormDetail = require("../../_models/formDetail");
const Form = require("../../_models/form");
const Employee = require("../../_models/employee");
var event = require("events").EventEmitter;
const sendMail = require("../../_middleware/sendmail");
module.exports = class FormService extends BaseService {
  _model = Form;
  _include = [FormDetail];
  _eventEmitter = new event();
  constructor() {
    super();
    this._eventEmitter.on("sendmail", sendMail);
  }

  addNewForm = async (req) => {
    let { formDetail, userId, ...form } = req.body;
    const transaction = await User.sequelize.transaction();
    let formData;
    let formDetailData;
    let userData;
    try {
      userData = await User.getDetailByWhere(
        {
          id: userId,
        },
        transaction,
        false,
        [Employee]
      );

      if (!userData) {
        transaction.rollback();
      }

      formData = await Form.addNew(form, transaction, req.user.userName);
      await formData.setUser(userData, {
        transaction: transaction,
      });

      formDetailData = await FormDetail.addNew(
        formDetail,
        transaction,
        req.user.userName
      );
      await formDetailData.setForm(formData, {
        transaction: transaction,
      });

      let options = {
        type: formData.type,
        content: formData.content,
        from: null,
        mailReceiver:
          userData.email !== null ? userData.email : "bigherodz54@gmail.com",
      };

      this._eventEmitter.emit("sendmail", options);

      await transaction.commit();

      console.log(userData.getDataValue());
      let { password, ...user } = userData.dataValues;
      let formDataRes = {
        form: {
          info: formData,
          detail: formDetailData,
          receiver: user,
        },
      };

      return formDataRes;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return error;
    }
  };
};
