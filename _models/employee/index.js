const BaseModel = require('../base');
const User = require('../user')

module.exports= class Employee extends BaseModel {
    static tableName = 'employee';
    static modelName = 'employee';
    static include = [
        {
            model:User,
            as:"user"
        }
    ];
    static schema = require('./schema');
    static associate(models){
        this.belongsTo(models.User,{
            foreignKey:"userId",
            target:"id",
            as: "user"
        })
    }
}