let error = (fieldName, datatype) => {
  return (errors) => {
    errors.forEach((err) => {
      switch (err.code) {
        case `${datatype}.empty`:
          err.message = `Please fill in ${fieldName}`;
          break;
        case `${datatype}.base`:
          err.message = `${fieldName} must be ${datatype}`;
          break;
        case `${datatype}.integer`:
          err.message = "Please fill in integer value";
          break;
        case `${datatype}.min`:
          err.message =
            datatype === "number"
              ? `minium ${fieldName} digit is  ${err.local.limit}`
              : `minium ${fieldName} character is  ${err.local.limit}`;
          break;
        case `${datatype}.max`:
            err.message =
            datatype === "number"
              ? `maximum ${fieldName} digit is  ${err.local.limit}`
              : `maximum ${fieldName} character is  ${err.local.limit}`;
          break;
        case `any.required`:
          err.message = `${fieldName} is required`;
          break;
      }
    });

    return errors;
  };
};



module.exports = {error}
