$(function() {
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove, function (e) {
        e.preventDefault()
    });

    var me = {
        t1: new TimelineMax(),
        g1: new TimelineMax(),
        g2: new TimelineMax()
    }

    me.g1.to('.l-1',1,{alpha:0.3,repeat:-1,yoyo:true})
    me.g1.pause();

    me.g2.to('.l-2',1,{alpha:0.3,repeat:-1,yoyo:true})
    me.g2.pause();

    me.t1.to('.me-jn',.6,{y:-50})
    me.t1.to('.me-3',.6,{y:50},'-=.6')
    me.t1.to('.me-1',.6,{alpha:0})
    me.t1.to('.me-l',.6,{x:-150})
    me.t1.to('.me-r',.6,{x:150},'-=.6')
    me.t1.to('.me-l',.6,{rotation:30},'-=.6')
    me.t1.to('.me-r',.6,{rotation:-30,onStart:function () {
        $('.l-1').delay(100).fadeIn()
        $('.l-2').delay(100).fadeIn(function () {
            me.g1.play();
            me.g2.play();
        });
    }},'-=.6')
    me.t1.pause();

    $('.me-jn').on(touchstart,function () {
        me.t1.play()
    })

})