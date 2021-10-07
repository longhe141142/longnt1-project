const User = require("../../_models/user");
const dataUtils = require("../../_utils/index");
const joi = require("joi");
const logger = require("../..//_utils/logger");




const registerSchema = joi.object({
  userName: joi
    .string()
    .alphanum()
    .min(3)
    .max(25)
    .custom((value, helper) => {
      let user = User.findOne({
        where: {
          userName: value,
        },
      }).then((user) => user);

      if (user) {
        return helper.message("user has already existed");
      } else {
        return user;
      }
    })
    .trim(true)
    .required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .custom()
});

module.exports = { registrationSchema, testSchema };


// const registrationSchema = {
//   userName: {
//     in: ["body"],
//     not: {
//       options: {
//         isEmpty: {
//           errorMessage: "hii",
//         },
//       },
//     },
//     exists: {
//       errorMessage: "must include userName",
//     },

//     custom: {
//       options: (value) => {
//         return User.findOne({
//           where: {
//             userName: value,
//           },
//         }).then((user) => {
//           if (user == null) {
//             return true;
//           } else {
//             return Promise.reject("Email already registered");
//           }
//         });
//       },
//     },
//   },

//   password: {
//     // isStrongPassword: {
//     //     minLength: 8,
//     //     minLowercase: 1,
//     //     minUppercase: 1,
//     //     minNumbers: 1
//     // },
//     isLength: {
//       options: {
//         min: 6,
//       },
//       errorMessage:
//         "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
//     },
//   },
//   // phone: {
//   //     notEmpty: true,
//   //     errorMessage: "Phone number cannot be empty"
//   // },
//   // email: {
//   //     normalizeEmail: true,
//   //     custom: {
//   //         options: value => {
//   //             return User.find({
//   //                 email: value
//   //             }).then(user => {
//   //                 if (user.length > 0) {
//   //                     return Promise.reject('Email address already taken')
//   //                 }
//   //             })
//   //         }
//   //     }
//   // }
// };
