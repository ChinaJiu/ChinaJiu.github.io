/**
 * Created by xiaojiu on 2017/12/11.
 */
function TranDocode() {
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    this.touchstart = mobile ? "touchstart" : "mousedown";
    this.touchend = mobile ? "touchend" : "mouseup";
    this.touchmove = mobile ? "touchmove" : "mousemove";

    // 滑动事件参数
    this.stageW = $(window).width();
    this.stageH = $(window).height();
    this.allowMove = true;
    this.allowUserMove = true;

    this.firstClassName = $('.page>div:first-of-type').attr('class');
    this.finalClassName = $('.page>div:last-of-type').attr('class');
    this.nextPageClassName = '';
    this.isLoop = true;//页面是否可以循环滑动
    this.pageMoveTimer = 0.8;//页面滑动时间，不建议修改
    this.page1 = new TimelineMax();
    this.page2 = new TimelineMax();
    this.page3 = new TimelineMax();
    this.page4 = new TimelineMax();
    this.a = true;
    this.b = false;
    // 变量
    this.motionObj = {};
    // 音乐
    this.bg = $('#bg')[0];
}
TranDocode.prototype = {
    constructor: TranDocode,
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'logo-1.png'},
            {src:loadingPath+'logo.png'},
            {src:loadingPath+'p1-1.png'},
            {src:loadingPath+'p1-2.png'},
            {src:loadingPath+'p1-3.png'},
            {src:loadingPath+'p1-4.png'},
            {src:loadingPath+'p2-1.png'},
            {src:loadingPath+'p2-2.png'},
            {src:loadingPath+'p2-3.png'},
            {src:loadingPath+'p2-bg.jpg'},
            {src:loadingPath+'p3-1.png'},
            {src:loadingPath+'p3-2.png'},
            {src:loadingPath+'p3-3.png'},
            {src:loadingPath+'p4-1.png'},
            {src:loadingPath+'p4-2.png'},
            {src:loadingPath+'p4-3.png'},
            {src:loadingPath+'p4-4.png'},
            {src:loadingPath+'p4-bg.jpg'},
            {src:loadingPath+'p5-1.png'},
            {src:loadingPath+'p5-2.png'},
            {src:loadingPath+'p5-3.png'},
            {src:loadingPath+'p5-bg.jpg'},
            {src:loadingPath+'p6-1.png'},
            {src:loadingPath+'p6-2.png'},
            {src:loadingPath+'p6-3.png'},
            {src:loadingPath+'p6-4.png'},
            {src:loadingPath+'p6-5.png'},
            {src:loadingPath+'p6-6.png'},
            {src:loadingPath+'p6-bg.jpg'},
            {src:loadingPath+'p7-1.png'},
            {src:loadingPath+'p7-2.png'},
            {src:loadingPath+'p7-3.png'},
            {src:loadingPath+'p7-4.png'},
            {src:loadingPath+'p7-bg.jpg'},
            {src:loadingPath+'p8-bg.jpg'},
            {src:loadingPath+'p9-1.png'},
            {src:loadingPath+'p9-2.png'},
            {src:loadingPath+'p9-3.png'},
            {src:loadingPath+'p9-bg.jpg'},
            {src:loadingPath+'up.png'}
        ];
        var queue = new createjs.LoadQueue(false);
        queue.installPlugin(createjs.Sound);
        queue.on("progress", this.handleOverallProgress, this);
        queue.on("complete", this.handleComplete, this);
        queue.loadManifest(manifest);
    },
    handleOverallProgress: function (event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    },
    handleComplete: function() {
        $('.loading').remove();
        this.initPageMotion();
    },
    init: function () {
        var _this = this;
        this.preolading();
        this.scroll();



        //阻止屏幕滑动
        $('html,body').on(this.touchmove,function (e){
            e.preventDefault()
        });

        //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
        this.initPreventPageDobuleTap(true);

        //定义时间动画，取决于页面的多少，动态增加，不用管
        $('.page>div').each(function(i){
            _this.motionObj["page"+(i+1)] = new TimelineMax();
        });

        //音乐按钮
        $('.musicicon').on(this.touchstart,function (){
            $(this).hasClass('musicrotate') ? _this.bg.pause() : _this.bg.play()
            document.querySelector('.musicicon').classList.toggle('musicrotate')
        })

    },
    //初始化动画
    initPageMotion: function () {
        var _this = this;
        $(".main").fadeIn(500,function (){
            _this.motionObj["page"+9].play();
        });
        this.TweenMaxAnimate();
        this.addEventListenFun();
    },
    TweenMaxAnimate: function () {
        var _this = this;
        // S 动画

        this.motionObj["page"+9].from('.p9-1', 1, {alpha:0, ease:Expo.easeOut})
        this.motionObj["page"+9].from('.p9-2', 1, {y:50, alpha:0})
        this.motionObj["page"+9].from('.p9-3', 1, {y:50, alpha:0})
        this.motionObj["page"+9].pause();


        this.motionObj["page"+1].from('.p1-1', .6, {delay:.8, alpha:0, y:-100, ease:Expo.easeOut})
        this.motionObj["page"+1].from('.p1-2', .6, {alpha:0, y:100, ease:Expo.easeOut}, '-=.6')
        this.motionObj["page"+1].from('.p1-3', .6, {alpha:0, y:-100, ease:Expo.easeOut}, '-=.6')
        this.motionObj["page"+1].from('.p1-4', .6, {alpha:0, x:100, ease:Expo.easeOut})
        this.motionObj["page"+1].pause();

        this.motionObj["page"+2].staggerFrom('.p2-1,.p2-2,.p2-3', 1, {delay:.8,alpha:0, x:100, ease:Expo.easeOut}, .2)
        this.motionObj["page"+2].pause();

        this.motionObj["page"+3].from('.p3-1', .6, {delay:.8, alpha:0, y:-100, ease:Expo.easeOut})
        this.motionObj["page"+3].from('.p3-2', .6, {alpha:0, y:100, ease:Expo.easeOut}, '-=.6')
        this.motionObj["page"+3].from('.p3-3', .6, {alpha:0, x:-100, ease:Expo.easeOut})
        this.motionObj["page"+3].pause();

        this.motionObj["page"+4].staggerFrom('.p4-1,.p4-2,.p4-3,.p4-4', 1, {delay:.8,alpha:0, x:100, ease:Expo.easeOut}, .1)
        this.motionObj["page"+4].from('.p4-5', 1, {delay:.8, alpha:0, y:-20, ease:Expo.easeOut}, '-=1')
        this.motionObj["page"+4].from('.p4-7', 1, {alpha:0, y:20, ease:Expo.easeOut}, '-=1')
        this.motionObj["page"+4].from('.p4-6', 1, {alpha:0, rotationY:90, ease:Expo.easeOut}, '-=1')
        this.motionObj["page"+4].pause();

        this.motionObj["page"+5].staggerFrom('.p5-1,.p5-2,.p5-3', 1, {delay:.8, alpha:0, rotationX:90,  transformOrigin: "50% 0%", ease:Expo.easeOut},.2)
        this.motionObj["page"+5].pause();

        this.motionObj["page"+6].staggerFrom('.p6-1,.p6-2', 1, {delay:.8,alpha:0, x:-50, ease:Expo.easeOut}, .2)
        this.motionObj["page"+6].from('.p6-3', 1, {alpha:0, x:-50, y:-50, ease:Expo.easeOut}, '-=.5')
        this.motionObj["page"+6].from('.p6-4', 1, {alpha:0, x:50, y:-50, ease:Expo.easeOut}, '-=.5')
        this.motionObj["page"+6].from('.p6-5', 1, {alpha:0, x:-50, y:50, ease:Expo.easeOut}, '-=.5')
        this.motionObj["page"+6].from('.p6-6', 1, {alpha:0, x:50, y:50, ease:Expo.easeOut}, '-=.5')
        this.motionObj["page"+6].pause();

        this.motionObj["page"+7].from('.p7-1', 1, {alpha:0, y:-10, ease:Expo.easeOut,onStart:function () {
            _this.initAllowUserMove(false)
            _this.a = 2;
            // _this.b = true;
            _this.page1.restart();
        }})
        this.motionObj["page"+7].pause();

        this.page1.staggerFrom('.p7-up1>div', 1, {delay:.8,alpha:0, x:100, ease:Expo.easeOut}, .1,'-=.5')
        this.page1.pause();

        this.page2.staggerTo('.p7-up1>div', 1, {alpha:0, x:-100, ease:Expo.easeOut}, .1)
        this.page2.pause();

        this.page3.staggerFrom('.p7-down>div', 1, {alpha:0, x: 100, ease:Expo.easeOut}, .2)
        this.page3.pause();

        this.page4.staggerTo('.p7-down>div', 1, {x:-100, alpha:0, ease:Expo.easeOut}, .2)
        this.page4.pause();

        this.motionObj["page"+8].from('', 1, {delay:.8,ease:Expo.easeOut,onStart:function () {
            $('.p7-down').fadeOut();
        }})
        this.motionObj["page"+8].pause();

        // E 动画
    },
    addEventListenFun: function () {
        var _this = this;
        this.page1.eventCallback('onComplete',function () {
            _this.b = true;
        })
        this.page2.eventCallback('onComplete',function () {
        })
        this.page2.eventCallback('onStart',function () {
            setTimeout(function () {
                $('.p7-down').show();
                _this.page3.restart();
            },1000);
            _this.a = 1;
        })
        this.page4.eventCallback('onStart',function () {
            _this.page1.restart();
            _this.a = 2;
        })
        this.page3.eventCallback('onComplete',function () {
            _this.b = true;
        })

    },
    scroll:function () {
        var _this = this;
        //滑动事件
        var hammertime = new Hammer(document.getElementById('page'), {
            preventDefault: true
        });
        hammertime.on('panmove', function(ev) {
            if(_this.allowMove && _this.allowUserMove){
                if(ev.direction == 8){
                    //向上滑动
                    if($('.page>div').eq(1).attr('class') != _this.firstClassName || _this.isLoop){
                        // if($('.page>div').eq(1).attr('class') == 'page7'){

                        // }
                        // console.log($('.page>div').eq(1).attr('class'))
                        _this.pageMove(-1)
                    }
                }else if(ev.direction == 16){
                    //向下滑动
                    if($('.page>div:last-of-type').attr('class') != _this.finalClassName){
                        _this.pageMove(1)
                    }
                }
            }
        });
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

        //滑动事件
        var hammertime = new Hammer(document.getElementById('page7'), {
            preventDefault: true
        });
        hammertime.on('panmove', function(ev) {
            if(ev.direction == 8 && _this.b){
                //向上滑动
                _this.b = false;
                if(_this.a == 1){
                    console.log('up')
                    _this.initAllowUserMove(true)
                    _this.pageMove(-1)
                    return false;
                }
                _this.page2.restart();
                console.log(_this.b)
            }else if(ev.direction == 16 && _this.b){
                //向下滑动
                _this.b = false;
                if(_this.a == 2){
                    console.log('down')
                    _this.initAllowUserMove(true)
                    _this.pageMove(1)
                    return false;
                }
                _this.page4.restart();
                console.log(_this.b)
            }
        });
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        //滑动事件
    },
    //滑动页面核心内容
    pageMove: function (direction){
        var _this = this
        this.allowMove = false
        var targetTop = this.stageH * direction;
        this.nextPageClassName = $('.page>div').eq(1).attr('class');
        var pageMove = $('.page>div').eq(1).attr('move');
        if(direction == 1){
            $('.page>div:first-of-type').before($('.page>div:last-of-type'))
            TweenMax.set('.page',{y:-targetTop})
            this.nextPageClassName = $('.page>div').eq(0).attr('class');
            pageMove = $('.page>div').eq(0).attr('move');
            targetTop = 0;
        }
        TweenMax.to('.page', this.pageMoveTimer, {y: targetTop, ease: Expo.easeInOut, onComplete: function () {
            TweenMax.set('.page',{y:0});
            if(direction == -1){
                $('.page').append($('.page>div:first-of-type'))
            }
            _this.allowMove = true;
        }})
        if(pageMove == '0'){
            this.initAllowUserMove(false);
        }
        this.motionObj[this.nextPageClassName].restart();
    },
    //是否允许用户滑动页面
    initAllowUserMove: function (isMove){
        this.allowUserMove = isMove;
    },
    //当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    initPreventPageDobuleTap: function (isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(this.touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(this.touchstart);
        }
    }
}


