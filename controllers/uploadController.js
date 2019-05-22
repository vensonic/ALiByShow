//引入文件formidable
const formidable = require("formidable")
//引入path
const path = require('path')
module.exports = {
  uploadFile(req,res){
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = __dirname+'/../assets/uploads'
    form.keepExtensions = true
    form.parse(req,function (err,fields,files) { 
        var img = path.basename(files.img.path)
        if(err){
            res.json({
                code:201,
                msg:"文件上传失败"
            })
        }else{
            res.json({
              code: 200,
              msg: "文件上传成功",
              img: img
            });
        }
     })
  }
};