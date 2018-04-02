/**
 * Created by wqx on 2016/8/25.
 */
//验证
function check_all(objlist) {
    var msg;
    var success = true;
    for (var i = 0; i < objlist.length; i++) {
        var funs = objlist[i].function_name;
        for (var f = 0; f < funs.length; f++) {
            var func = eval(funs[f]);
            var msgs;
            if (objlist[i].msg != null) {
                msgs = objlist[i].msg[f];
            } else {
                msgs = null;
            }
            var minLength;
            if(objlist[i].minLength != null){
                minLength = objlist[i].minLength;
            }else{
                minLength = null;
            }
            var res = func(objlist[i].value, msgs,minLength);
            if (!res.success) {
                msg = res.msg;
                success = res.success;
                break;
            }
        }
    }
    return {
        success: success,
        msg: msg
    };
}
//验证为空
function isNotNull(val, p_msg) {
    var success = true;
    var msg;
    var checkVal = $.trim(val);
    if (checkVal == -1 || checkVal == "-1" || checkVal == "" || checkVal == null || checkVal == "undefined") {
        msg = "不能为空";
        if (p_msg != null) {
            msg = p_msg;
        }
        success = false;
    }
    return {
        success: success,
        msg: msg
    }
}
//验证为电话号码
function isTelNum(val, p_msg) {
    var success = true;
    var msg;
    if (val != null && val != "") {
        var reg = /0?(13|14|15|18|17)[0-9]{9}/,
            reg1 = /0\d{2}-\d{8}|0\d{2}-\d{7}|0\d{3}-\d{7}|0\d{3}-\d{8}/;
        if (!reg.test(val) && !reg1.test(val)) {
            if (p_msg != null) {
                msg = p_msg;
            }
            success = false;
        };
    }

    return {
        success: success,
        msg: msg
    }
}
//验证字符最小长度(strLength)
function isLength(val, p_msg, minLength) {
    var success = true;
    var msg;
    var reg = val.length;
    if (!(reg >= minLength)) {
        msg = "字符长度不够";
        if (p_msg != null) {
            msg = p_msg;
        }
        success = false;
    }

    return {
        success: success,
        msg: msg
    }
}
//验证时间(结束时间&开始时间 <= 当前)
var compareNowTime = function (time) {
    var nowTime = new Date().getTime();
    var newstr = time.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    if(time_str <= nowTime){
        return true;
    }else{
        return false;
    }
}

//验证时间(结束时间>=开始时间)
var compareDate = function(endTime,startTime) {
    //将所有的短横线替换为斜杠
    return ((new Date(endTime.replace(/-/g,"\/"))) >= (new Date(startTime.replace(/-/g,"\/"))));
}

/******* 自定义alertTip弹出信息框 Created by wqx on 2016/8/29. *******/
var alertTip = {
    "close":function () {
        $("#markDiv").remove();
        $("#layerDiv").remove();
    },
    "mark":"<div id='markDiv'></div>",
    "loading":function (_loadMsg) {
        var _load = "<div id='layerDiv'>"+
                        "<div class='layerLoad'>"+
                            "<div class='loader-inner ball-pulse'>"+
                                "<div></div>"+
                                "<div></div>"+
                                "<div></div>"+
                            "</div>"+
                            "<button class='loadingMsg'>"+_loadMsg+"</button>"+
                        "</div>"+
                    "</div>";
        $("body").append(alertTip.mark + _load);
    },
    "alert":function (_msg) {
        var _str="";
        if($("#layerDiv").length == 0){
            _str =  "<div id='layerDiv'>" +
                        "<div class='layerCenter'>"+
                        "<div class='layerMsg'>"+ _msg +"</div>"+
                    "</div>";
            _str += "<div class='layerBottom'>" +
                        "<button class='closeAlert'>关闭</button>" +
                    "</div>";
            _str += "</div>";
            $("body").append(alertTip.mark + _str);
        }else{
            $(".layerLoad").remove();
            _str =  "<div class='layerCenter'>"+
                        "<div class='layerMsg'>"+ _msg +"</div>"+
                    "</div>";
            _str += "<div class='layerBottom'>" +
                        "<button class='closeAlert'>关闭</button>" +
                    "</div>";
            $("#layerDiv").append(_str);
        }
        $(".closeAlert").on("click",function () {
            alertTip.close();
        });
        $("#markDiv").on("click",function () {
            alertTip.close();
        })
    }
}