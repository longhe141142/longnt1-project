const logger = require("./logger");
const path = require("path");
class DataUtils {
  isNumber(string) {
    return !isNaN(parseFloat(string)) && isFinite(string) && typeof string === "number";
  }

  toNumber(value) {
    let number = !isNaN(parseInt(value)) ? parseInt(value) : 0;
    let dir = path.resolve(path.join(__dirname,"index.js"))
    if (number == 0) this.warning("toNumber(value)",dir,"return default value 0")
    return number;
  }

  warning(functionCall,message,dir){
    logger.warn(`[${functionCall}] [${dir}] <${message}>` )
  }
}


module.exports = new DataUtils();

// console.log(new DataUtils().isNumber(5))