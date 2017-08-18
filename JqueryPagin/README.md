#基于Jquery的分页插件

##使用方法：

 1.先引入Jquery和本插件
```
<script src="javascripts/jquery-3.2.1.min.js"></script>
<script src="javascripts/JqueryPaging-1.0.js"></script>
```
2.HTML写法
```
<!-- 此标签用于存放分页的按钮-->
<ul id="paging-wrapper"></ul>
```
3.javascript写法
```
//配置参数
var option = {
        id: '#paging-wrapper',
        pages: ,  //总页数
        displayPage: ,  //只显示多少页
        type:,  //请求的类型
        dataType:,  //返回的数据格式
        url:,  //访问的地址
        data:{},  //所传参数（默认已有currentPage参数,无需再添加）
        drawHtml:function(data){
                //data:请求返回的数据
                //拼接显示
        }
}

//调用分页插件
new Paging(option)

```

