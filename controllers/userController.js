//引入userModule
const userModule = require("../dataModules/userModule");
exports.login = function(req, res) {
  //调用数据库查询邮箱和密码
  userModule.getByEmail(req.body.email, (err, data) => {
    if (err) {
      res.json({
        code: 201,
        msg: "服务器异常"
      });
    } else {
      if (data) {
        if (req.body.password == data.password) {
          //登录成功,设置cookie
          //  res.writeHead(200,{
          //    'Set-Cookie':'isLogin=true'
          //  })
          req.session.isLogin = "true";
          req.session.current = data;
          res.json({
            code:200,
            msg:'登录成功'
          })
        } else {
          res.json({
            code: 201,
            msg: "密码输入错误"
          });
        }
      } else {
        res.json({
          code: 201,
          msg: "邮箱输入错误"
        });
      }
    }
  });
};
