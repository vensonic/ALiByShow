//引入菜单数据mk
const navMenusModule = require('../dataModules/navMenusModule')
module.exports = {
  addNavInfo(req, res) {
    //调用数据模块修改菜单信息
    req.body["icon"] = "fa fa-fire";
    navMenusModule.addNavInfo(req.body, err => {
      if (err) {
        res.json({
          code: 201,
          msg: "数据添加失败"
        });
      } else {
        res.json({
          code: 200,
          msg: "数据添加成功"
        });
      }
    });
  },
  //获取所有菜单数据
  getAllNav(req,res){
    navMenusModule.getAllNav((err,data)=>{
        if(err){
            res.json({
                code:201,
                msg:'数据获取失败'
            })
        }else{
            res.json({
                code:200,
                msg:'数据获取成功',
                data:data
            })
        }
    })
  }
};