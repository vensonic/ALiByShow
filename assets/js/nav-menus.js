$(function () {
    //渲染导航菜单栏数据
    function render() {
        $.ajax({
            type: "get",
            url: "/getAllNav",
            dataType: "json",
            success: function (res) {
                console.log(res);
                
                if(res.code == 200){
                    $("tbody").html(
                      template("listTemp", res)
                    );
                }
            }
        });
    }
    render()
    //添加数据
    $(".addNav").on('click',function () {
        $.ajax({
          type: "post",
          url: "/addNavInfo",
          data: $("form").serialize(),
          dataType: "json",
          success: function(res) {
              $("#text").val('')
              $("#title").val("");
              $("#href").val("");
               render()
          }
        });
    })
})