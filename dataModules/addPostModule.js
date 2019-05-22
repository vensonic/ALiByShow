var commonModule = require('./commonModule')
var connection = commonModule.getConnectionToMysql()
module.exports = {
  addPost(obj,callback){
    //   console.log(obj)
      var sql = "INSERT INTO posts VALUES(null,?,?,?,?,?,?,?,?,?,?)"
      connection.query(sql,[obj.slug,obj.title,obj.feature,obj.created,obj.content,obj.views,obj.likes,
        obj.status,obj.user_id,obj.category_id],(err)=>{
            if(err){
                console.log(err);
                callback(err)
            }else{
                callback(null)
            }
        })
  }
};