exports.getConnectionToMysql = function() {
  //引入mysql
  const mysql = require("mysql");
  //创建连接
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "baixiu"
  });
  return connection;
};
