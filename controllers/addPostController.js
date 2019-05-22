//引入添加文章数据模块
const addPostModule = require('../dataModules/addPostModule')
module.exports = {
  addPost(req,res){
    // console.log(req.body);
    var obj = req.body
    //添加字段
    obj['views'] = 0
    obj['likes'] = 0
    obj["user_id"] = req.session.current.id

    //调用数据模块
    addPostModule.addPost(obj,(err)=>{
        if(err){
            res.json({
              code: 201,
              msg: "文章添加失败"
            });
        }else{
             res.json({
               code: 200,
               msg: "文章添加成功"
             });
        }
    })
    
  }
};