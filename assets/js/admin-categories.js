$(function() {

    init();
  //事件委托实现编辑操作
  $("tbody").on("click", ".btnEdit", function() {
    $("#name").val($(this).data()["name"]);
    $("#slug").val($(this).data()["slug"]);
    $("#id").val($(this).data()["id"]);

    //显示编辑按钮,隐藏添加按钮
    $(".btn-edit").css("display", "block");
    $(".btn-add").css("display", "none");
  });

  //实现编辑操作
  $(".btn-edit").on("click", function() {
    $.ajax({
      type: "post",
      url: "/updateCategories",
      data: $("#addForm").serialize(),
      dataType: "json",
      success: function(res) {
        $(".tips span").text(res.msg);
        $(".tips")
          .fadeIn(500)
          .delay(1000)
          .fadeOut(500);
          //刷新
          init();
          //初始化添加的默认样式
           $("#name").val('');
           $("#slug").val('');
           $("#id").val('');
            $(".btn-edit").css("display", "none");
            $(".btn-add").css("display", "block");
      }
    });
  });
 
 //实现数据添加
    $(".btn-add").on('click',function () { 
        if ($("#name").val() == "" || $("#slug").val() == '') {
          $(".tips").css('display','block')
          $(".tips span").text("名字称或别名不能为空");
        }else{
          $(".tips").css("display", "none")
          $.ajax({
            type: "post",
            url: "/addCategory",
            data: $("#addForm").serialize(),
            dataType: "json",
            success: function(res) {
                  $(".tips span").text(res.msg);
                  $(".tips")
                    .fadeIn(500)
                    .delay(1000)
                    .fadeOut(500);
                  //刷新
                  init();
                  //初始化添加的默认样式
                  $("#name").val("");
                  $("#slug").val("");
                  $("#id").val("");
            }
          });
        }
       
     })

 //实现全选和全不选
    $(".checkeAll").on('click',function(){
        var status = $(this).prop('checked')
        $(".checkSingle").prop("checked",status)
        //判断选中的个数,超过2个显示
        var count = $(".checkSingle:checked").length
        if(count>1){
            $(".deletAllchecked").css('display','block')
        }else{
            $(".deletAllchecked").css("display", "none")
        } 
    })
 //单个选中状态
    $("tbody").on("click", '.checkSingle',function () { 
        var count = $(".checkSingle:checked").length
        if (count > 1) {
          $(".deletAllchecked").css("display", "block");
        } else {
          $(".deletAllchecked").css("display", "none");
        } 
        if (count == $("tbody .checkSingle").length) {
          $(".checkeAll").prop("checked", true);
        } else {
          $(".checkeAll").prop("checked", false);
        }
     })
//实现单条删除
     $("tbody").on("click", ".btn-del", function() {
         if(confirm('确定删除本条数据吗?')){
            var id = $(this).data()["id"];
            $.ajax({
              type: "get",
              url: "/delSingleCategory",
              data: { id: id },
              dataType: "json",
              success: function(res) {
                if(res.code == 200){
                    alert(res.msg)
                    init()
                    
                }else{
                    alert(res.msg)
                }
              }
            });
         }
         
     });

//实现批量删除
      $(".deletAllchecked").on('click',function () { 
          //获取所有被选中的id
          var arr = []
         $(".checkSingle:checked").each((index,item)=>{
            arr.push($(item).data().id)
         })
        $.ajax({
            type: "post",
            url: "/delCategoriesByMid",
            data:{id:arr},
            dataType: "json",
            success: function (res) {
                if (res.code == 200) {
                    alert(res.msg)
                    init();
                     $(".deletAllchecked").css("display", "none")
                } else {
                  alert(res.msg);
                }
            }
        });
         
       })

});

//初始化分类列表信息
  function init() {
    //获取动态分类列表
    $.ajax({
      type: "get",
      url: "/getAllCategories",
      dataType: "json",
      success: function(res) {
        if (res.code == 200) {
          var html = template("categoryTemplate",res)
          $("tbody").html(html)
        }
      }
    });
  }