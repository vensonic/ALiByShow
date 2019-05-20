
//引入公共数据模块
const commonModule = require('./commonModule')
var connection = commonModule.getConnectionToMysql()

//获取所有目录数据
exports.getAllCategories = function (callback) {
    var sql = "SELECT * FROM categories WHERE id != 1"
    connection.query(sql,(err,res)=>{
        if(err){
            callback(err)
        }else{
            callback(null,res)
        }
    })
  }

//更新目录数据
exports.updateCategoryById = function (obj,callback) {
 
  
    var sql = 'UPDATE categories SET name = ?, slug = ? WHERE id = ?'
    connection.query(sql,[obj.name,obj.slug,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
  }

//添加目录数据
exports.addCategory = function (obj,callback) { 
  
    var sql = 'INSERT INTO categories(NAME,slug) VALUES(?,?)'
    connection.query(sql,[obj.name,obj.slug],(err)=>{
         if (err) {
           console.log(err);
           
           callback(err)
         } else {
           callback(null)
         }
    })
 }

 //根据id删除单条数据
 exports.delCategoryById = function (id,callback) {
     var sql = "DELETE FROM categories where id = "+id
     connection.query(sql,(err)=>{
         if (err) {
           callback(err)
         } else {
           callback(null)
         }
     })
 }

 //实现批量删除
 exports.delCategoriesByMid = function(arr,callback) {
       var sql = "DELETE FROM categories where id in (?)"
        connection.query(sql,[arr], (err) => {
          if (err) {
            callback(err)
          }else{
            callback(null)
          }
        })
 }