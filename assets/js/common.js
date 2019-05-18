(function (window) {
    var Tools = {
        getRouterName:function (url) {
            var index = url.indexOf("?")
            var routername
            if(index ==-1){
                routername = url.substring(url.lastIndexOf('/')+1)
            }else{
                routername = url.substring(url.lastIndexOf('/')+1,index)
            }
            return routername
        }
    }
    window.Tools = Tools
})(window)