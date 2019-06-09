/**
 * Created by xiaojiu on 2017/12/20.
 */
function TimeIscoll(option,callback) {
    this.obj = option.obj;
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.fontcolor = option.fontcolor || "#000";
    this.fontsize = option.fontsize || option.height;
    this.lineheight = option.lineheight || option.height;
    this.fontfamily = option.fontfamily || "Microsoft YaHei";
    this.firstIndex = option.firstIndex || 0;  //数组第一个数
    this.lastIndex = option.lastIndex || 0;  //数组最后一个数
    this.time = option.time || 1;  //动画时间

    this.numBoxArry = new Array(10);
    this.iscrollHeight = this.numBoxArry.length * this.height;
    this.callback = callback;
}

TimeIscoll.prototype = {
    constructor: TimeIscoll,
    init: function () {
        $(this.obj+'>div').remove();
        $(this.obj).css({"height":this.height+"px","width":this.width+"px","overflow":"hidden"})
        var dropObjc = $('<div></div>',{
            class: 'time-iscroll',
            css: {
                'transform': 'translateZ(0)',
                '-webkit-transform': 'translateZ(0)'
            }
        })
        // TweenMax.set('.time-iscroll', {y: 0})
        $(this.obj).append(dropObjc);
        for (var i = 0; i < this.numBoxArry.length; i++) {
            var numRand = Math.floor( this.randomTd(1,10) )
            this.numBoxArry[i] = numRand;
            this.numBoxArry[0] = this.firstIndex;
            this.numBoxArry[this.numBoxArry.length - 1] = this.lastIndex;
            var dropObj = $('<div></div>',{
                text: this.numBoxArry[i],
                class: 'd-number-'+ this.numBoxArry[i]+'',
                width: this.width + 'px',
                height: this.height + 'px',
                css:{
                    fontSize: this.fontsize + 'px',
                    display: 'block',
                    position: 'relative',
                    color: this.fontcolor,
                    'text-align': 'center',
                    'line-height': this.lineheight + 'px',
                    'font-family': this.fontfamily,
                    'letter-spacing': '-15px'
                },
            })
            $('.time-iscroll').append(dropObj);
        }
        console.log(this.obj)
        TweenMax.set('.time-iscroll', {height: this.iscrollHeight, y: -this.iscrollHeight + this.height})
        console.log('init')
        // this.callback();
    },
    run: function () {
        console.log('run')
        console.log(-this.iscrollHeight,this.iscrollHeight)
        TweenMax.set('.time-iscroll', {height: this.iscrollHeight, y: -this.iscrollHeight})
        TweenMax.to('.time-iscroll', this.time, {y: 0});
    },
    randomTd: function (min, max) {
        return Math.random() * (max - min) + min;
    },
}