//引入公共数据模块
const commonModule = require("./commonModule");

var connection = commonModule.getConnectionToMysql();
module.exports = {
  //获取所有文章列表
  getAllPostsList(query, callback) {
    // console.log(query);
    var sql = `SELECT posts.id,posts.title,posts.created,posts.status,users.nickname,categories.name as cateName
                FROM posts
                INNER JOIN users ON posts.user_id = users.id
                INNER JOIN categories ON posts.category_id = categories.id where 1=1 `;
    //添加筛选条件
    if (query.category_id) {
      sql += "and posts.category_id = " + query.category_id;
    }
    if (query.status) {
      sql += ` and posts.status = '${query.status}' `;
    }
    //拼接limit和排序
    sql += ` ORDER BY created DESC    
           LIMIT ${(query.pageNumber - 1) * query.pageSize},${query.pageSize} `;

    // console.log(sql);
    connection.query(sql, (err, results) => {
      if (err) {
        callback(err);
      } else {
        //还需要一个总条数,再查一次数据库
        sql = "SELECT COUNT(*) cnt FROM posts where 1=1 ";
        //添加筛选条件
        if (query.category_id) {
          sql += "and posts.category_id = " + query.category_id;
        }
        if (query.status) {
          sql += ` and posts.status = '${query.status}' `;
        }
        connection.query(sql, (err1, res1) => {
          if (err1) {
            callback(err1);
          } else {
            callback(null, {
              data: results,
              count: res1[0].cnt
            });
          }
        });
      }
    });
  },
  //根据id删除单条数据
  deletPostById(id,callback){
    var sql = `DELETE FROM posts WHERE id = `+id
    connection.query(sql,(err)=>{
      if(err){
        callback(err)
        throw err
      }else{
        callback(null)
      }
    })
  }
};
