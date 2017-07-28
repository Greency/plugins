/*1.version:1.1,
 *2.基于Jquery的分页插件,
 *3.传输的数据类型默认为JSON
 *4.ajax提交方式默认为POST
 *5.使用本插件前请先引入Jquery
 */

var Paging = function (option) {
    var pagingThis,//记录上一页被点击的元素
        paging,  //获取每一个li标签
        currentPage = 1,  //当前页
        displayPage = 0  //实际显示的页数 

    this.show = function () {
        var _num = 0
        if (option.pages >= option.displayPage) {
        	displayPage = option.displayPage
        } else {
        	displayPage = option.pages
        }
        var html = "<li>首页</li>" + "<li>上一页</li>"
        for (var i = 1; i <= displayPage; i++) {
            html += "<li >" + i + "</li>"
        }
        html += "<li>...</li>" + "<li>下一页</li>" + "<li>尾页</li>"
        $(option.id).html(html)
        paging = $(option.id + " > li")
        $(paging[displayPage + 3]).css("width", "66px")
        $(paging[displayPage + 4]).css("width", "50px")
        pagingThis = paging[2]
    }

    this.changeStyle = function (type, arg1) {
        var _index = 0,  //索引
            _num = 0
        if (option.pages >= displayPage) {
            if (type === "+") {
                if (pagingThis.innerText !== "" + displayPage && parseInt(pagingThis.innerText) < displayPage) {
                    _index = $(pagingThis).index() + 1
                } else {
                    _num = 1
                }
            } else if (type === "-") {
                if (pagingThis !== paging[2]) {
                    _index = $(pagingThis).index() - 1
                } else if (paging[2].innerText !== "1" && pagingThis === paging[2]) {
                    _num = -1
                }
            }
        } else {
            if (type === "+") {
                if (pagingThis.innerText !== "" + displayPage && parseInt(pagingThis.innerText) < displayPage) {
                    _index = $(pagingThis).index() + 1
                }
            } else if (type === "-") {
                if (paging[2].innerText !== "1" && pagingThis !== paging[2]) {
                    _index = $(pagingThis).index() - 1
                }
            }
        }
        if (_index !== 0) {
            $(pagingThis).css({"color": "black", "background": "rgba(0, 0, 0, .1)"})
            pagingThis = paging[_index]
            $(pagingThis).css({"color": "white", "background": "rgba(0, 0, 0, .3)"})
        } else {
            for (var i = 2; i < displayPage + 2; i++) {
                paging[i].innerText = parseInt(paging[i].innerText) + _num
            }
        }
        index = 0
        if (arg1 !== undefined) {
            $(pagingThis).css({"color": "black", "background": "rgba(0, 0, 0, .1)"})
            if (arg1 === 1) {
                for (var i = 0; i < paging.length - 5; i++) {
                    paging[i + 2].innerText = i + 1
                }
                pagingThis = paging[2]
            } else {
                for (var i = displayPage - 1; i >= 0; i--) {
                    paging[i + 2].innerText = arg1--
                }
                pagingThis = paging[paging.length - 4]

            }
            $(pagingThis).css({"color": "white", "background": "rgba(0, 0, 0, .3)"})
        }

    }

    this.addListener = function () {
        var _self = this
        paging.on("click", function () {
                if (option.pages > 1) {
                    var _text = this.innerText
                    if (/\d/.test(_text)) {
                        currentPage = parseInt(_text)
                        $(pagingThis).css({"color": "black", "background": "rgba(0, 0, 0, .1)"});
                        $(this).css({"color": "white", "background": "rgba(0, 0, 0, .3)"});
                        pagingThis = this
                    } else {
                        if (_text === "上一页") {
                            if (currentPage > 1) {
                                --currentPage
                                _self.changeStyle("-")
                            }

                        } else if (_text === "下一页") {
                            if (currentPage < option.pages) {
                                ++currentPage
                                _self.changeStyle("+")
                            }
                        } else if (_text === "首页") {
                            if (currentPage > 1) {
                                currentPage = 1
                                _self.changeStyle("", 1)
                            }
                        } else if (_text === "尾页") {
                            if (currentPage < option.pages) {
                                currentPage = option.pages
                                _self.changeStyle("", option.pages)
                            }
                        }
                    }
                }
                _self.drawHtml(currentPage)
            }
        )
    }

    //绘制html
    this.drawHtml = function(currentPage){
    	option.data.currentPage = currentPage
       $.ajax({
            type: "post",
            url: 'PHP/api.php',
            dataType: 'json',
            data: option.data,
            success: function (data) {
            	option.drawHtml(data)
            },
            error: function () {
                alert("error");
            }
        })
    	
    }

    this.init = function () {
        this.show()
        this.addListener()
    }
    this.init()
}
