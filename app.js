//引入express
const express = require('express')
//引入路由
const router = require('./router')
//引入ejs
const ejs = require('ejs')
//创建应用
const app = express()
//监听端口
app.listen(3008,()=>{
    console.log('http://127.0.0.1:3008')
})

//中间件添加路由模块
app.use(router)

//设置ejs模板引擎
app.set('view engine','ejs')
//设置ejs资源路径
app.set('ejs',__dirname+'/views')

//托管静态资源
app.use("/assets", express.static("assets"))