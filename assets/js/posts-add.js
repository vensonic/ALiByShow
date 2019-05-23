$(function () {
    //动态加载分类下拉框
      $.ajax({
        type: "get",
        url: "/getAllCategories",
        dataType: "json",
        success: function(res) {
          //   console.log(res);
          $(".selectCate").append(template("optionTemplate", res));
        }
      });
    //文件上传
    $("#feature").on('change',function () {
        var file = document.getElementById("feature").files[0]
        var formdate = new FormData()
        formdate.append("img", file)
        $.ajax({
          type: "post",
          url: "/uploadFile",
          processData:false,
          contentType:false,
          data: formdate,
          dataType: "json",
          success: function(res) {
            if(res.code == 200){
                //预览
                $(".thumbnail").css('display','block').attr('src','/assets/uploads/'+res.img)
                //加入隐藏域
                $(".feature").val("/assets/uploads/" + res.img)
            }
          }
        });
        
      })

    //设置ckeditor
     CKEDITOR.replace("content")
     
     //实现提交
     $(".btnSave").on('click',function () { 
         //将ckeditor的内容保存到文本域内
        //  $("#content").val(CKEDITOR.instances.content.getData())
        //  console.log($("#content").val())
        
        //ckeditor的内容同步到文本框
        CKEDITOR.instances.content.updateElement()
     
        if(id){
          //编辑文章
          option('/editPost')
        }else{
          //添加文章
          option("/addPost")
        }
         
      })
      //封装操作函数
     function option(url) {
        $.ajax({
            type: "post",
            url: url,
            data: $(".row").serialize(),
            dataType: "json",
            success: function(res) {
              if (res.code == 200) {
                $(".tips span").text(res.msg);
                $(".tips")
                  .fadeIn(10)
                  .delay(1500)
                  .fadeOut(10);
                // 延迟跳转;
                setTimeout(() => {
                    location.href = "/admin/posts";
                }, 2000);
              } else {
                $(".tips span").text(res.msg);
                $(".tips")
                  .fadeIn(500)
                  .delay(1000)
                  .fadeOut(500);
              }
            }
          });
       }
    //编辑和添加复用同一个页面结构 编辑的url带有id,添加没有
    var id = Tools.getUrlParameters(location.search).id
    if(id){
      $.ajax({
        type: "get",
        url: "/getPostById",
        data: {id:id},
        dataType: "json",
        success: function (res) {
          if(res.code == 200){
            var value = res.data;
            //为各个元素添加属性值
            $("#id").val(value.id)
            $("#title").val(value.title)
            $("#content").val(value.content);
            $("#slug").val(value.slug);
            $(".thumbnail").attr("src", value.feature).show()
            $(".feature").val(value.feature)
            $("#category").val(value.category_id)
            $("#created").val(value.created)
            $("#status").val(value.status);
            //修改网页相关内容
            $(".page-title h1").text('编辑文章')
            $(".btnSave").val('编辑')
          }
        }
      });
    }
    
    
})