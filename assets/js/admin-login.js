
   $(function()
   {$(".btn-primary").on("click", function() {
     var email = $("#email").val();
     var password = $("#password").val();
     // console.log(email, password)
     $.ajax({
       type: "post",
       url: "/admin/login",
       data: {
         email: email,
         password: password
       },
       dataType: "json",
       success: function(res) {
        if(res.code == 201){
          $(".alert-danger").css('display','block')
          $(".alert-danger span").text(res.msg)
        }else{
          location.href ='/admin'
        }
       }
     });
   })}
   )

