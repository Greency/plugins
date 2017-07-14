#基于Jquery的分页插件

##使用方法：

 1.先引入Jquery和本插件
```
<script src="javascripts/jquery-3.2.1.min.js"></script>
<script src="javascripts/JqueryPaging-1.0.js"></script>
```
2.HTML写法
```
<table id="attendance-record-content" cellpadding="0" cellspacing="0"></table>
```
3.javascript写法
```
//先写一个ajax方法
$.ajax({
    type: "post",
    url: 'api.php',
    dataType: 'json',
    data: 'status=select&id=1&currentPage=1',
    success: function (data) {
        var html = "<tr><td>时间</td><td>地点</td><td>状态</td><td>查看</td></tr>",
        pages = data.length
        for (var i = 0; i < pages - 1; i++) {
        html += "<tr><td>" + data[i]['time'] + "</td><td>" + data[i]['adress'] + "</td><td>" + data[i]['state'] + "</td><td>查看详情</td></tr>"
        }
        $("#attendance-record-content").html(html)
        var option = {
            id: '#paging-wrapper',
            pages: Math.ceil(data[pages - 1] / 8), //总页数
            displayPage: 4, //只显示多少页
            }
            new Paging(option)
        },
    error: function () {
         alert("error");
        }
    })
```
#未完待续。。。。。。