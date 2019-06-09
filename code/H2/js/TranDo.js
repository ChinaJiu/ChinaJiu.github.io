(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var TranDo = function( selector, context ) {
        return new TranDo.fn.init( selector, context );
    };



    TranDo.fn = TranDo.prototype = {
        constructor: TranDo,
        init:function (select) {

        }
    };
    TranDo.fn.init.prototype = TranDo.fn

    TranDo.extend = TranDo.fn.extend = function() {
        var options, src, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;

        //只有一个参数，就是对jQuery自身的扩展处理
        //extend,fn.extend
        if (i === length) {
            target = this; //调用的上下文对象jQuery/或者实例
            i--;
        }
        for (; i < length; i++) {
            //从i开始取参数,不为空开始遍历
            if ((options = arguments[i]) != null) {
                for (var name in options) {
                    copy = options[name];
                    //覆盖拷贝
                    target[name] = copy;
                }
            }
        }
        return target;
    }
    TranDo.fn.extend({
        checkUserName: function (val) {  //检测姓名
            if(val == '') return true
        },
        checkMobile: function (val) {
            if(val.match(/^1[34578]\d{9}$/) === null ) return true  //检测电话
        },
        countDownTime: function(year,month,day,hours,minutes,seconds) {
            var date = new Date()
            // console.log(date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds())
            var newDate = {
                'year': year -  date.getFullYear(),
                'month': month -  ( date.getMonth() + 1 ),
                'day': day - date.getDate(),
                'hours': hours - ( date.getHours() + 1 ),
                'minutes': 60 - minutes - ( date.getMinutes() + 1 ) ,
                'seconds': 60 - seconds - ( date.getSeconds() + 1 ) ,
            }
            return newDate;
        }
    })

    TranDo.extend({

    })
    window.TranDo = window.$TD = TranDo
    return TranDo;
}));







