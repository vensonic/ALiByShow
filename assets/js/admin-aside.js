$(function() {
  // 我需要在路由满足条件的情况为#menu-posts添加样式和属性
  // 1.获取到当前路由，需要判断是否带参数
  // http://127.0.0.1:3004/admin/post-add?id=1
  // 判断是否有参数，就是看是否有问号
  // var index = location.href.indexOf("?");
  // var routerName;
  // if (index == "-1") {
  //   //不带参数
  //   routerName = location.href.substring(location.href.lastIndexOf("/") + 1);
  // } else {
  //   //带参数
  //   routerName = location.href.substring(
  //     location.href.lastIndexOf("/") + 1,
  //     index
  //   );
  // }
    var routerName = Tools.getRouterName(location.href)

  //当路由名字满足是 posts post-add categories 时,给#menu-posts添加样式和属性
  if (
    routerName == "posts" ||
    routerName == "post-add" ||
    routerName == "categories"
  ) {
    $("#menu-posts")
      .addClass("in")
      .attr("aria-expanded", true);
    //给点击的li添加active样式
    $("#" + routerName).addClass("active");
  }

  //设置栏也一样menu-settings
  if (
    routerName == "nav-menus" ||
    routerName == "slides" ||
    routerName == "settings"
  ) {
    $("#menu-settings")
      .addClass("in")
      .attr("aria-expanded", true);
    //给点击的li添加active样式
    $("#" + routerName).addClass("active");
  }
});
