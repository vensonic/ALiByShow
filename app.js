//引入express
const express = require('express')
//引入路由
const router = require('./router')
//引入ejs
const ejs = require('ejs')
//引入body-parser
var bodyParser = require('body-parser')
//引入session
var session = require('express-session')
//创建应用
const app = express()
//监听端口
app.listen(3008,()=>{
    console.log('http://127.0.0.1:3008')
})

// 使用中间件设置session
app.use(
  session({
    secret: "mywords", // 加盐，你可以指定只有你一个人知道字符串
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: false,
    //强制“未初始化”的会话保存到存储。
    saveUninitialized: false
  })
)



//使用中间件设置body-parser
app.use(bodyParser.urlencoded({extended:false}))



//设置ejs模板引擎
app.set('view engine','ejs')
//设置ejs资源路径
app.set('ejs',__dirname+'/views')

//托管静态资源
app.use("/assets", express.static("assets"))

app.use((req, res, next) => {
  // 判断是否登陆
  // 前台页面不用登陆:req.url.indexOf('/admin') == -1
  console.log(req.session)
  if (
     req.session.isLogin == "true" ||
    req.url.indexOf("/admin") == -1 ||
    req.url == "/admin/login"
  ) {
    next()
  } else {
    res.redirect("/admin/login");
  }
})

//中间件添加路由模块
app.use(router)