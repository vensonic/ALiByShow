const postsModule = require('../dataModules/postsModule')

//es6新语法
module.exports = {
  //获取所有分类页
  getAllPosts(req, res) {
    postsModule.getAllPostsList(req.query, function(err, data) {
      if (err) {
        res.json({
          code: 201,
          msg: "数据获取失败"
        });
      } else {
        res.json({
          code: 200,
          msg: "数据获取成功",
          data: data
        });
      }
    });
  },
  //根据id删除单条文章
  deletPost(req,res){
      var id = req.query.id
      //调用数据模块删除数据
      postsModule.deletPostById(id,(err)=>{
          if(err){
              res.json({
                  code:201,
                  msg:"数据删除失败"
              })
          }else{
              res.json({
                code: 200,
                msg: "数据删除成功"
              }); 
          }
      })
      
  }
  
};