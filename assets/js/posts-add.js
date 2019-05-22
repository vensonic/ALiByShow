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
        var obj = $.ajax({
          type: "post",
          url: "/addPost",
          data: $(".row").serialize(),
          dataType: "json",
          success: function(res) {
            if(res.code==200){
                   $(".tips span").text(res.msg);
                   $(".tips").fadeIn(10).delay(1500).fadeOut(10)
                延迟跳转
                setTimeout(() => {
                    location.href = "/admin/posts";
                },2000)
            }else{
                   $(".tips span").text(res.msg)
                   $(".tips")
                     .fadeIn(500)
                     .delay(1000)
                     .fadeOut(500)
            }
          }
        });

         
      })
})