//引入categorymodule
const categoryModule = require('../dataModules/categoryModule')
//引入url
const url = require('url')
//获取所有分类目录
exports.getAllCategories = function (req,res) {
    //调用数据模块获取数据
    categoryModule.getAllCategories((err,data)=>{
        if(err){
            res.json({
                code:201,
                msg:"数据获取失败"
            })
        }else{
            res.json({
              code: 200,
              msg: "数据获取成功",
              data: data
            });
        }
    })
  }

  //更新目录数据
  exports.updateCategories = function (req,res) {
    var obj = req.body
    //调用数据模块更新数据
    categoryModule.updateCategoryById(obj,(err)=>{
        if(err){
            res.json({
                code:201,
                msg:"数据编辑失败"
            })
        }else{
             res.json({
               code: 200,
               msg: "数据编辑成功"
             })
        }
    })
    }

//添加分类数据
exports.addCategory = function (req,res) {
    var obj = req.body;
    //调用数据模块更新数据
    categoryModule.addCategory(obj, err => {
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
  }

//根据id删除单条数据
exports.delSingleCategory = function (req,res) {
    var id = url.parse(req.url,true).query.id
    
    categoryModule.delCategoryById(id,(err)=>{
         if (err) {
           res.json({
             code: 201,
             msg: "数据删除失败"
           });
         } else {
           res.json({
             code: 200,
             msg: "数据删除成功"
           });
         }
    })
   
  }
//批量删除
exports.delCategoriesByMid = function (req,res) { 
    var ids = req.body.ids 
 categoryModule.delCategoriesByMid(ids, err => {
   if (err) {
     res.json({
       code: 201,
       msg: "数据删除失败"
     });
   } else {
     res.json({
       code: 200,
       msg: "数据删除成功"
     });
   }
 });
 
 }
