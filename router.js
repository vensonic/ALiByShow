//引入express
const express = require('express')
//引入获取页面控制器
const getPagesController = require('./controllers/getPagesController')
//创建路由
const router = express.Router()

//配置路由:约定前台页面 '/'和后台页面 '/admin'分离  
router
  .get("/", getPagesController.getIndexPage)
  //获取前台detail页面
  .get("/detail", getPagesController.getDetailPage)
  //获取前台list页面
  .get("/list", getPagesController.getListPage)

  //获取后台首页
  .get("/admin", getPagesController.getAdminPage)
  //获取后台平台comments
  .get("/admin/comments", getPagesController.getCommentsPage)
  //获取后台分类页
  .get("/admin/categories", getPagesController.getCategoriesPage)
  //获取后台登录页
  .get("/admin/login", getPagesController.getLoginPage)
  //获取后台nav-menus
  .get("/admin/nav-menus", getPagesController.getNavmenusPage)
  //获取后台nav-menus
  .get("/admin/password-reset", getPagesController.getPasswordResetPage)
  //获取后台nav-menus
  .get("/admin/post-add", getPagesController.getPostAddPage)
  //获取后台nav-menus
  .get("/admin/posts", getPagesController.getPostsPage)
  //获取后台profile
  .get("/admin/profile", getPagesController.getProfilePage)
  //获取后台profile
  .get("/admin/settings", getPagesController.getSettingsPage)
  //获取后台slides
  .get("/admin/slides", getPagesController.getSlidesPage)
  //获取后台users
  .get("/admin/users", getPagesController.getUsersPage);
  

module.exports = router