//引入querystring
var queryString = require('querystring')
//获取前台首页
exports.getIndexPage = function (req,res) {
    res.render('index.ejs')
}
//获取前台detial页
exports.getDetailPage = function(req, res) {
  res.render("detail.ejs")
}
//获取前台list页
exports.getListPage = function(req, res) {
  res.render("list.ejs")
}

//获取后台首页
exports.getAdminPage = function (req,res) {
  // 使用cookie
    // var myCookie = queryString.parse(req.headers.cookie)
    // // console.log(myCookie);
    // if(myCookie.isLogin && myCookie.isLogin == 'true'){
    //    res.render("admin/index.ejs")
    // }else{
    //   res.redirect("/admin/login")
    // }
  //   //使用session
  //  if(req.session.isLogin && req.session.isLogin == true){
  //    res.render("admin/index.ejs")
  //  }else{
  //      res.redirect("/admin/login")
  //  }
     res.render("admin/index.ejs")
   
}
//获取后台评论页
exports.getCommentsPage = function (req,res) {
    res.render('admin/comments.ejs')
}
//获取后台分类页
exports.getCategoriesPage = function(req, res) {
  res.render("admin/categories.ejs")
}
//后台登录页
exports.getLoginPage = function (req,res) {
    res.render("admin/login.ejs")
}
//获取后台NavmenusPage
exports.getNavmenusPage = function (req,res) {
     res.render("admin/nav-menus.ejs")
}
//获取password-reset
exports.getPasswordResetPage = function (req,res) {
   res.render("admin/password-reset.ejs")
}
//获取文章提交页面
exports.getPostAddPage = function (req,res) {
   res.render("admin/post-add.ejs")
}
//获取Posts页面
exports.getPostsPage = function (req,res) {
   res.render("admin/posts.ejs")
}
  //获取后台profile
exports.getProfilePage = function (req,res) {
 res.render("admin/profile.ejs")
}
  //获取后台profile
exports.getSettingsPage = function (req,res) {
   res.render("admin/settings.ejs")
}
exports.getSlidesPage = function (req,res) {
   res.render("admin/slides.ejs")
}
exports.getUsersPage = function name(req,res) {
    res.render("admin/users.ejs")
}