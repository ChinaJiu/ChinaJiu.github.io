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
    this.isLoop = false;//页面是否可以循环滑动
    this.pageMoveTimer = 0.8;//页面滑动时间，不建议修改

    // 变量
    this.motionObj = {};
    this.motionAni = {};
    // 音乐
    this.bg = $('#bg')[0];
}
TranDocode.prototype = {
    constructor: TranDocode,
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'bg.jpg'},
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'logo.png'},
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'p1-1.png'},
            {src:loadingPath+'p1-2.png'},
            {src:loadingPath+'p1-3.png'},
            {src:loadingPath+'p1-4.png'},
            {src:loadingPath+'p1-5.png'},
            {src:loadingPath+'p1-6.png'},
            {src:loadingPath+'p1-7.png'},
            {src:loadingPath+'p1-8.png'},
            {src:loadingPath+'p1-9.png'},
            {src:loadingPath+'p1-10.png'},
            {src:loadingPath+'p1-11.png'},
            {src:loadingPath+'p1-bottom.png'},
            {src:loadingPath+'p1-bottom-2.png'},
            {src:loadingPath+'p2-1.png'},
            {src:loadingPath+'p2-2.png'},
            {src:loadingPath+'p2-3.jpg'},
            {src:loadingPath+'p2-bottom.png'},
            {src:loadingPath+'p2-m-1.png'},
            {src:loadingPath+'p3-1.png'},
            {src:loadingPath+'p3-2.png'},
            {src:loadingPath+'p3-3.jpg'},
            {src:loadingPath+'p3-bottom.png'},
            {src:loadingPath+'p3-m-1.png'},
            {src:loadingPath+'p4-1.png'},
            {src:loadingPath+'p4-2.png'},
            {src:loadingPath+'p4-3.jpg'},
            {src:loadingPath+'p4-bottom.png'},
            {src:loadingPath+'p5-1.png'},
            {src:loadingPath+'p5-2.png'},
            {src:loadingPath+'p5-3.png'},
            {src:loadingPath+'p5-4.png'},
            {src:loadingPath+'p5-5.jpg'},
            {src:loadingPath+'p5-6.png'},
            {src:loadingPath+'p5-bottom.png'},
            {src:loadingPath+'p5-m-1.png'},
            {src:loadingPath+'p5-m-2.png'},
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

        for (var i = 1; i < 20; i++) {
            _this.motionAni["ani"+i] = new TimelineMax();
        }

        //音乐按钮
        $('.musicicon').on(this.touchstart,function (){
            $(this).hasClass('musicrotate') ? _this.bg.pause() : _this.bg.play()
            document.querySelector('.musicicon').classList.toggle('musicrotate')
        })

        // TweenMax.set('.load', {scale:2})
        TweenMax.to('.p1-1-1', 1, {scale:1.2, repeat:-1, yoyo:true})
    },
    //初始化动画
    initPageMotion: function () {
        var _this = this;
        $(".main").fadeIn(500,function (){
            _this.initAllowUserMove(false);
            _this.touchUp()
            _this.TweenMaxCallBack();
            _this.addEventListerTouch();
        });
        this.TweenMaxAnimate();
    },
    TweenMaxAnimate: function () {
        var _this = this;
        // S 动画
        this.motionObj["page"+1].from('.p1-6', .6, {alpha: 0, y: -10})
        this.motionObj["page"+1].from('.p1-7', .6, {alpha: 0, y: -10})
        this.motionObj["page"+1].from('.p1-bottom', .6, {alpha: 0, y: -10})
        this.motionObj["page"+1].pause();

        this.motionAni["ani"+1].from('.p1-8', 1, {alpha: 0})
        this.motionAni["ani"+1].from('.p1-m-1', 1, {alpha: 0, x: 50})
        this.motionAni["ani"+1].from('.p1-9', 1, {alpha: 0, x: 50},'-=.4')
        this.motionAni["ani"+1].from('.p1-10,.p1-11', 1, {alpha: 0})
        this.motionAni["ani"+1].from('.p1-10', 2, {width: 0,x: 536, ease:Linear.easeNone},'-=.2')
        this.motionAni["ani"+1].from('.p1-11', 2, {x: 536, ease:Linear.easeNone},'-=2')
        this.motionAni["ani"+1].from('.p1-bottom-2',1, {alpha: 0, y: 10, onComplete:function () {
            _this.initAllowUserMove(true);
            $('.up').fadeIn()
        }})
        this.motionAni["ani"+1].pause();

        this.motionObj["page"+2].from('.p2-3', 1, {delay:.5, alpha: 0})
        this.motionObj["page"+2].from('.p2-1', 1, {alpha: 0})
        this.motionObj["page"+2].from('.p2-m-1', 1, {alpha: 0, x: -10})
        this.motionObj["page"+2].from('.p2-2', 1, {alpha: 0, x: 10},'-=1')
        this.motionObj["page"+2].from('.p2-bottom', 1, {alpha: 0, y: 10})
        this.motionObj["page"+2].pause();

        this.motionObj["page"+3].from('.p3-3', 1, {delay:.5, alpha: 0})
        this.motionObj["page"+3].from('.p3-1', 1, {alpha: 0})
        this.motionObj["page"+3].from('.p3-m-1', 1, {alpha: 0, x: -10})
        this.motionObj["page"+3].from('.p3-2', 1, {alpha: 0, x: 10},'-=1')
        this.motionObj["page"+3].from('.p3-bottom', 1, {alpha: 0, y: 10})
        this.motionObj["page"+3].pause();

        this.motionObj["page"+4].from('.p4-3', 1, {delay:.5, alpha: 0, onStart:function () {
            $('.up').fadeIn();
        }})
        this.motionObj["page"+4].from('.p4-1', 1, {alpha: 0})
        this.motionObj["page"+4].from('.p4-m-1', 1, {alpha: 0, x: -10})
        this.motionObj["page"+4].from('.p4-2', 1, {alpha: 0, x: 10},'-=1')
        this.motionObj["page"+4].from('.p4-bottom', 1, {alpha: 0, y: 10})
        this.motionObj["page"+4].pause();

        this.motionObj["page"+5].from('.p5-5', 1, {delay:.5, alpha: 0, onStart:function () {
            $('.up').fadeOut();
        }})
        this.motionObj["page"+5].from('.p5-1', 1, {alpha: 0, y: -10})
        this.motionObj["page"+5].from('.p5-2', 1, {alpha: 0, rotationY: 180})
        this.motionObj["page"+5].from('.p5-3', 1, {alpha: 0, rotationY: 180})
        this.motionObj["page"+5].from('.p5-4', 1, {alpha: 0, rotationY: 180})
        this.motionObj["page"+5].from('.p5-m-1', 1, {alpha: 0, x: 50},'-=2')
        this.motionObj["page"+5].from('.p5-m-2', 1, {alpha: 0, x: -50},'-=2')

        this.motionObj["page"+5].from('.p5-bottom', 1, {alpha: 0, rotation: 360*2})
        this.motionObj["page"+5].from('.p5-6', 1, {alpha: 0, onComplete:function () {
            TweenMax.to('.p5-6', 1, {scale:1.2, repeat:-1, yoyo:true})
        }})

        // this.motionObj["page"+5].from('.p4-bottom', 1, {alpha: 0, y: 10})
        this.motionObj["page"+5].pause();
        // E 动画
    },
    addEventListerTouch: function () {
        $('.p5-6').on(this.touchstart, function () {
            location.href = 'tel: 67025558'
        })
    },
    TweenMaxCallBack: function () {
        var _this = this;
        this.motionObj["page"+1].eventCallback('onComplete',function () {
            setTimeout(function () {
                $('.m1').fadeOut(function () {
                    $('.m2').fadeIn(function () {
                        _this.motionAni["ani"+1].play();
                    });
                });
            },2000)
        })
    },
    touchUp: function () {
        var _this = this;
        var touchUp = new TouchDir({obj:'.page'})
        touchUp.touchMove(function (dir) {
            if(dir == 'up'){
                $('.p1-5').fadeOut();
                TweenMax.to('.p1-box1', 1, {y: -490, onComplete:function () {
                    TweenMax.to('.p1-3', 5, {rotation: -360*24, transformOrigin: "100% 100%"})
                    TweenMax.to('.p1-4', 5, {rotation: -360*1, transformOrigin: "50% 100%", onComplete: function () {
                        _this.motionObj["page"+1].play();
                    }})
                }})
            }
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


