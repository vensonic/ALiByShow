//引入mysql
const mysql = require('mysql')
//创建连接
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'baixiu'
})
connection.connect()
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