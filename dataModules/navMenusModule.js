
//引入公共数据模块
const commonModule = require('./commonModule')
var connection = commonModule.getConnectionToMysql()

module.exports = {
  addNavInfo(obj, callback) {
    //从option表中取出json格式数据
    var sql = `SELECT value FROM options where id = 9 `;
    connection.query(sql, (err, results) => {
      if (err) {
        callback(err);
      } else {
        //将json格式的数据转换成数组
        var arr = JSON.parse(results[0].value);
        //将新增的数据添加到数组中
        arr.push(obj);
        //将数组重新转换成字符串
        var arrStr = JSON.stringify(arr);

        //将数据重新写入数据库
        sql = `UPDATE  options SET value = ? WHERE id = 9`;
        // console.log(sql);

        connection.query(sql, [arrStr], err => {
          if (err) {
            callback(err);
            console.log(err);
          } else {
            callback(null);
          }
        });
      }
    });
  },
  getAllNav(callback){
    var sql = `SELECT value FROM options where id = 9 `;
    connection.query(sql, (err, results) =>{
        if(err){
            callback(err)
        }else{
            callback(null,JSON.parse(results[0].value))
        }
    })
  }
};