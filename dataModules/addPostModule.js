var commonModule = require('./commonModule')
var connection = commonModule.getConnectionToMysql()
module.exports = {
  addPost(obj, callback) {
    //   console.log(obj)
    var sql = "INSERT INTO posts VALUES(null,?,?,?,?,?,?,?,?,?,?)";
    connection.query(
      sql,
      [
        obj.slug,
        obj.title,
        obj.feature,
        obj.created,
        obj.content,
        obj.views,
        obj.likes,
        obj.status,
        obj.user_id,
        obj.category_id
      ],
      err => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  },
  //根据id获取文章数据
  getPostById(id, callback) {
    var sql = `SELECT * FROM posts where id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result[0]);
      }
    });
  },
  //根据id更新文章信息
  editPostById(obj,callback){
    var sql = 'UPDATE  posts SET ? WHERE id = ?'
    connection.query(sql,[obj,obj.id],(err)=>{
      if(err){
        callback(err)
      }else{
        callback(null)
      }
    })
  }
};