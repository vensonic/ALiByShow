$(function() {
  var pageNumber = 1, //当前页码
      pageSize = 2; //每页显示条数
  function render (query={}) {
    $.ajax({
      type: "get",
      url: "/getAllPosts",
      dataType: "json",
      data: {
        pageNumber,
        pageSize,
        ...query
      },
      success: function(res) {
        if (res.code == 200) {
          //    console.log(res);
          //使用moment修改时间格式
          for (var i = 0; i < res.data.data.length; i++) {
            //   console.log(res.data.data[i].created);
            //  console.log(moment(res.data.data[i].created).format('YYYY-MM-DD HH:mm:SS'));
            res.data.data[i].created = moment(res.data.data[i].created).format(
              "YYYY-MM-DD HH:mm:SS"
            );
          }
          var html = template("postsTemplate", res.data);
          $("tbody").html(html);
          // 调用分页函数.参数:总页数(用总条数 除以 每页显示多少条,在向上取整)
         if (res.data.count==0){
             res.data.count=1
         }
           setPage(Math.ceil(res.data.count / pageSize));
        }
      }
    });
  }
  render();
  //s设置分页函数
  function setPage(totalPages) {
    $(".pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: pageNumber,
      // 总页数
      totalPages: totalPages,
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      onPageClicked: function(event, originalEvent, type, page) {
        // 把当前点击的页码赋值给currentPage
        pageNumber = page;
        //重新渲染
        //获取筛选条件
        var categoryId = $(".selectCate").val()
        var status = $(".selectStatus").val()
        //重新渲染
        render({
          category_id: categoryId,
          status: status
        });
     
      }
    });
  }
  //动态加载分类下拉列表数据
  $.ajax({
    type: "get",
    url: "/getAllCategories",
    dataType: "json",
    success: function(res) {
      //   console.log(res);
      $(".selectCate").append(template("optionTemplate", res));
    }
  });

  //实现筛选功能
  $(".btnFilter").on("click", function() {
    //获取筛选条件
    var categoryId = $(".selectCate").val();
    var status = $(".selectStatus").val();
    // console.log(categoryId, status);
    render({
      category_id: categoryId,
      status: status
    })
  });

  //单条删除
  $("tbody").on("click",".btndel",function () { 
    if(confirm('确定要删除这条数据?')){
       var id = $(this).data("id");
       $.ajax({
         type: "get",
         url: "/deletPost",
         data: { id: id },
         dataType: "json",
         success: function(res) {
           if (res.code == 200) {
             $(".alert-danger span").text(res.msg);
             $(".alert-danger")
               .fadeIn(200)
               .delay(1000)
               .fadeOut(200);
             //重新渲染数据
             render();
           } else {
             $(".alert-danger span").text(res.msg);
             $(".alert-danger")
               .fadeIn(200)
               .delay(1000)
               .fadeOut(200);
           }
         }
       });
    }
   
   })
  //全选和全不选
  $(".selectAll").on('click',function () {
     //获取全选框的状态,让单选框与全选框保持一致
      var status = $(this).prop('checked')
      $('.selectSingle').prop('checked',status)
      //让批量按钮显示
      var count = $(".selectSingle:checked").length
      if(count>1){
        $(".btn-delAllChecked").show()
      }else{
        $(".btn-delAllChecked").hide()
      }
    })
  //单选
  
  $('tbody').on('click','.selectSingle',function () {
      //判断选中的个数是否超过两个
       var count = $(".selectSingle:checked").length;
       if (count > 1) {
         $(".btn-delAllChecked").show();
       } else {
         $(".btn-delAllChecked").hide();
       }
      //是否全选
      if($('.selectSingle').length ==count ){
        $(".selectAll").prop('checked',true)
      }else{
        $(".selectAll").prop("checked", false)
      }
    })
});
