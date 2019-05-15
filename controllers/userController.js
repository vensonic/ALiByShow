
//引入userModule
const userModule = require('../dataModules/userModule')
exports.login = function (req,res) {
//    var data = ''
//    req.on('data',function (chunk) {
//        data+=chunk;
//    })
//    req.on('end',function () {
//        console.log(data);
       
//    })
   //调用数据库查询邮箱和密码
userModule.getByEmail(req.body.email,(err,data)=>{
    if(err){
        res.json({
            code:201,
            msg:"数据库查询失败"
        })
    }else{
        if(data){
            if(req.body.password == data.password){
                 res.json({
                   code: 200,
                   msg: "登录成功"
                 });
            }else{
               res.json({
                 code: 201,
                 msg: "密码输入错误"
               }); 
            }
        }else{
              res.json({
                code: 201,
                msg: "邮箱输入错误"
              })
        }
    }
})

    
}