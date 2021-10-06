const BaseService = require("../base/base-services");
const logger = require("../../_utils/logger");
const User = require("../../_models/user");
const FormDetail = require("../../_models/formDetail");
const Form = require("../../_models/form");
module.exports = class FormService extends BaseService {
  _model = Form;
  _include = [FormDetail];
  constructor() {
    super();
  }

  addNewForm = async (req) => {
    let { formDetail, ...form } = req.body;
    const transaction = await User.sequelize.transaction();
    let formData;
    let formDetailData;
    try {
      formData = await Form.addNew(form, transaction, req.user.userName);
      formDetailData = await FormDetail.addNew(
        formDetail,
        transaction,
        req.user.userName
      );

      await formDetailData.setForm(formData, {
        transaction: transaction,
      });

      await transaction.commit();

      let formDataRes = {
        form: {
          info: formData,
          detail: formDetailData,
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
