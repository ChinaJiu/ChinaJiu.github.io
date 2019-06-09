(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var TranDo = function( selector, context ) {
        return new TranDo.fn.init( selector, context );
    };
    
    TranDo.fn = TranDo.prototype = {
        constructor: TranDo,
        init:function (select) {
            this.box = select.box;
            this.side = select.side;
            this.pre = select.pre;
            this.opacity = select.opacity;
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
        initCube: function () {
            var _this = this;
            var _side = _this.side/2;
            var html = '';
            html += '<div class="cube">' +
                '<div class="c-f" style="background-color: red; -webkit-transform: rotateY(0deg) translateZ('+_side+'px); transform: rotateY(0deg) translateZ('+_side+'px); " >1</div>' +
                '<div class="c-b" style="background-color: green; -webkit-transform: rotateY(180deg) translateZ('+(_side)+'px); transform: rotateY(180deg) translateZ('+(_side)+'px); " >2</div>' +
                '<div class="c-l" style="background-color: darkblue; -webkit-transform: rotateY(-90deg) translateZ('+_side+'px); transform: rotateY(-90deg) translateZ('+_side+'px); " >3</div>' +
                '<div class="c-r" style="background-color: wheat; -webkit-transform: rotateY(90deg) translateZ('+_side+'px); transform: rotateY(90deg) translateZ('+_side+'px); " >4</div>' +
                '<div class="c-t" style="background-color: blue; -webkit-transform: rotateX(90deg) translateZ('+_side+'px); transform: rotateX(90deg) translateZ('+_side+'px); " >5</div>' +
                '<div class="c-b" style="background-color: gold; -webkit-transform: rotateX(-90deg) translateZ('+_side+'px); transform: rotateX(-90deg) translateZ('+_side+'px); " >6</div>' +
                '</div>'
            _this.box.innerHTML = html;

            var cube = document.querySelector('.cube');
            var cubeNode = cube.childNodes;
            _this.box.style.width = cube.style.width = _this.side + 'px';
            _this.box.style.height = cube.style.height = _this.side + 'px';

            cubeNode.forEach(function (item,index) {
                item.style.width = _this.side + 'px';
                item.style.height = _this.side + 'px';
                item.style.position = 'absolute';
                item.style.left = 0 + 'px';
                item.style.top = 0 + 'px';
                item.style.opacity = _this.opacity;
            })
            _this.box.style.perspective = _this.pre + 'px';
            cube.style.transformStyle = 'preserve-3d';

        },
        setRotate:function (x,y,z) {
            var cube = document.querySelector('.cube');
            cube.style.transform = cube.style.webkitTransform = 'rotateX('+x+'deg) rotateY('+y+'deg) rotateZ('+z+'deg) '
        }
    })

    TranDo.extend({

    })
    window.TranDo = window.$TD = TranDo
    return TranDo;
}));


// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             if(clientWidth>=640){
//                 docEl.style.fontSize = '100px';
//             }else{
//                 docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
//             }
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);





