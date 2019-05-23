(function (window) {
    var Tools = {
        //获取路由的函数
        getRouterName:function (url) {
            var index = url.indexOf("?")
            var routername
            if(index ==-1){
                routername = url.substring(url.lastIndexOf('/')+1)
            }else{
                routername = url.substring(url.lastIndexOf('/')+1,index)
            }
            return routername
        },
        //获取url参数的函数
        getUrlParameters:function (url) {
            var obj = {}
            var str = url.substring(1)
            //第一次分割字符串
            var arr = str.split('&')
            for(var i=0;i<arr.length;i++){
                var temp = arr[i].split('=')
                obj[temp[0]]=temp[1]
            }
            return obj
          }
    }
    window.Tools = Tools
})(window)