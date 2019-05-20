//引入commonMOdule
const commonModule = require('./commonModule')
var connection = commonModule.getConnectionToMysql()
exports.getByEmail = function (email,callback) {
    var sql = 'SELECT * FROM users WHERE email = ?'
    connection.query(sql, [email],(err,res)=>{
        if(err){
            callback(err)
        }else{
            callback(null,res[0])
        }
    })
}