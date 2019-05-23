//引入添加文章数据模块
const addPostModule = require('../dataModules/addPostModule')
//引入moment
const moment = require('moment')
module.exports = {
  addPost(req, res) {
    // console.log(req.body);
    var obj = req.body;
    //添加字段
    obj["views"] = 0;
    obj["likes"] = 0;
    obj["user_id"] = req.session.current.id;

    //调用数据模块
    addPostModule.addPost(obj, (err) => {
      if (err) {
        res.json({
          code: 201,
          msg: "文章添加失败"
        });
      } else {
        res.json({
          code: 200,
          msg: "文章添加成功"
        });
      }
    });
  },
  //根据id获取文章信息
  getPostById(req, res) {
    // console.log(req.query);
    //调用数据模块获取数据
    addPostModule.getPostById(req.query.id, (err, data) => {
      if (err) {
        res.json({
          code: 201,
          msg: "服务器异常"
        });
      } else {
        //更改时间格式
        data.created = moment(data.created).format("YYYY-MM-DDTHH:mm");
        res.json({
          code: 200,
          msg: "数据获取成功",
          data: data
        });
      }
    });
  },
  //编辑文章
  editPost(req,res){
    //调用数据模块
      addPostModule.editPostById(req.body, (err) => {
        if (err) {
          res.json({
            code: 201,
            msg: "文章编辑失败"
          });
        } else {
          res.json({
            code: 200,
            msg: "文章编辑成功"
          });
        }
      });
  }
};