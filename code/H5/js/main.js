/**
 * Created by xiaojiu on 2017/12/11.
 */
function TranDocode() {
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    this.touchstart = mobile ? "touchstart" : "mousedown";
    this.touchend = mobile ? "touchend" : "mouseup";
    this.touchmove = mobile ? "touchmove" : "mousemove";
    // 变量
    this.motionObj = {};
    // 音乐
    this.bg = $('#bg')[0];

    this.barMove = new TimelineMax();
    this.page1 = new TimelineMax();
    this.page2 = new TimelineMax();

    this.colorArry = ['#a70303', '#23287c', '#a70303', '#a70303', '#23287c', '#a70303'];
    this.firstArry = [5, 6, 8, 9, 10, 12];
    this.timeiscroll = [];


}
TranDocode.prototype = {
    constructor: TranDocode,
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'logo.png'},
            {src:loadingPath+'p1-1.png'},
            {src:loadingPath+'p1-2.png'},
            {src:loadingPath+'p2-1.png'},
            {src:loadingPath+'p3-1.png'},
            {src:loadingPath+'p4-1.png'},
            {src:loadingPath+'p5-1.png'},
            {src:loadingPath+'p5-2.png'},
            {src:loadingPath+'p6-1.png'},
            {src:loadingPath+'p6-2.jpg'},
            {src:loadingPath+'poster1.jpg'},
            {src:loadingPath+'poster2.jpg'},
            {src:loadingPath+'poster3.jpg'},
            {src:loadingPath+'poster4.jpg'},
            {src:loadingPath+'poster5.jpg'},
            {src:loadingPath+'page1-bg.jpg'},
            {src:loadingPath+'page2-bg.jpg'},
            {src:loadingPath+'page3-bg.jpg'},
            {src:loadingPath+'page4-bg.jpg'},
            {src:loadingPath+'page5-bg.jpg'},
            {src:loadingPath+'page6-bg.jpg'}
        ];
        var queue = new createjs.LoadQueue(false);
        queue.installPlugin(createjs.Sound);
        queue.on("progress", this.handleOverallProgress, this);
        queue.on("complete", this.handleComplete, this);
        queue.loadManifest(manifest);


        // 创建动画对象
        for(var i = 1; i < 20; i++){
            this.motionObj['page'+i] = new TimelineMax();
        }

        this.motionObj['page'+7].to('.l-1', 1,{alpha:1 })
        this.motionObj['page'+7].to('.l-2', 1,{alpha:1 })
        this.motionObj['page'+7].to('.l-3', 1,{alpha:1 })
        this.motionObj['page'+7].pause();

    },
    handleOverallProgress: function (event){

    },
    handleComplete: function() {
        var _this = this;
        var n = 0;
        var a = setInterval(function () {
            n++;
            console.log(n)
            $('.loadingtxt').text(n+"%");
            if(n == 100){
                $('.loading').remove();
                _this.initPageMotion();
                clearInterval(a);
            }
        },30);
        this.motionObj['page'+7].play();
    },
    init: function () {
        // 加载
        Td.preolading();

        //阻止屏幕滑动
        $('html,body').on(this.touchmove,function (e){
            e.preventDefault()
        });

        //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
        this.initPreventPageDobuleTap(true);

        var _this = this;
        //音乐按钮
        $('.musicicon').on(this.touchstart,function (){
            $(this).hasClass('musicrotate') ? _this.bg.pause() : _this.bg.play()
            document.querySelector('.musicicon').classList.toggle('musicrotate')
        })

        TweenMax.to('.l-img', 1, {alpha:0.5, repeat:-1, yoyo:true})

    },
    //初始化动画
    initPageMotion: function () {
        var _this = this
        $(".main").fadeIn(500,function (){

            _this.addEventListenerBtn();
            _this.addEventListenerVideo();
            _this.motionObj['page'+1].play()
        });
        this.createScroll();

        this.barrageMove();
        this.turnPage();

        this.TweenMaxAnimate();
    },
    TweenMaxAnimate: function () {
        // S 动画
        this.page1.from('.p1-2', .5,{alpha:0,scale:7,ease:Expo.easeOut})
        this.page1.pause();

        this.page2.from('.p5-2', .5,{alpha:0,scale:7,ease:Expo.easeOut})
        this.page2.pause();

        this.motionObj['page'+1].from('.p1-1', 2,{alpha:0, repeat:-1, yoyo: true})
        this.motionObj['page'+1].pause();
        this.motionObj['page'+2].from('.p2-1', 2,{alpha:0, repeat:-1, yoyo: true})
        this.motionObj['page'+2].pause();
        this.motionObj['page'+3].from('.p3-1', 2,{alpha:0, repeat:-1, yoyo: true})
        this.motionObj['page'+3].pause();
        this.motionObj['page'+4].from('.p4-1', 2,{alpha:0, repeat:-1, yoyo: true})
        this.motionObj['page'+4].pause();
        this.motionObj['page'+5].from('.p5-1', 2,{alpha:0, repeat:-1, yoyo: true})
        this.motionObj['page'+5].pause();
        // this.motionObj['page'+6].from('.p6-1', 1,{alpha:0, repeat:-1, yoyo: true})
        // this.motionObj['page'+6].pause();

        // E 动画
    },
    addEventListenerBtn: function () {
        var _this = this;
        $('.turn-left').on(this.touchstart, function () {
            $('#magazine').turn('previous');
        })
        $('.turn-right').on(this.touchstart, function () {
            $('#magazine').turn('next');
        })

        // 打电话
        $('.footer-call').on(this.touchstart, function () {
            console.log(2)
            location.href = 'tel: 010-5652-8888';

        })
    },
    addEventListenerVideo: function () {
        var _this = this;
        document.querySelector('.v1>video').addEventListener('ended',function(){
            _this.page1.play();
        })

        document.querySelector('.v5>video').addEventListener('ended',function(){
            _this.page2.play();
        })


        for(var i = 0 ; i < document.querySelectorAll('video').length ; i++) {
            console.log(document.querySelectorAll('video')[i])
            console.log(document.querySelector('video'))
            document.querySelectorAll('video')[i].addEventListener('play',function(){
                _this.bg.pause();
            })
            document.querySelectorAll('video')[i].addEventListener('ended',function(){
                _this.bg.play();
            })
            document.querySelectorAll('video')[i].addEventListener('pause',function(){
                _this.bg.play();
            })
        }

    },

    createScroll: function () {
        for(var i = 0, len = this.colorArry.length; i < len; i++ ) {
            this.timeiscroll[i] = new TimeIscoll({
                obj: '.numBox'+(i+1),
                width: 140,
                height: 140,
                fontsize: 130,
                fontcolor: this.colorArry[i],
                firstIndex: this.firstArry[i],
                lastIndex: 0,
                time: 2,
            })
        }
        this.timeiscroll[0].init();
        this.timeiscroll[0].run();
    },
    turnPage: function () {
            var _this = this;
            $('#magazine').turn({
                display: 'single',  //单页
                acceleration: true, //设置硬件加速模式，对于触摸设备这个值必须是真的
                gradients: true,  //在转换过程中显示渐变和阴影。
                elevation: 50, //设置过渡期间页面的高程
                when: {
                    turning: function(event, page, pageObject) {
                        if(page == 5){
                            $('.footer-call').hide()
                        }
                        if(page == 6){
                            TweenMax.to('.warning', 4, {x: -1500,ease:Linear.easeNone})
                        }

                    },
                    turned: function(e, page) {
                        _this.pageFade(page);
                        _this.allVideoPause(page);
                    }
                }
            });

    },
    allVideoPause: function (page) {
        var _this = this;
        for(var i = 0 ; i < document.querySelectorAll('video').length ; i++) {
            if( !document.querySelectorAll('video')[i].paused ){
                document.querySelectorAll('video')[i].pause();
            }
        }
        _this.bg.play();
    },
    pageFade: function (page) {
        if( page == 1){
            $('.turn-left').fadeOut();
        }else {
            $('.turn-left').fadeIn();
        }
        if( page == 6){
            $('.turn-right').fadeOut();
            $('.footer-call').fadeIn()
            this.barMove.play()
            TweenMax.to('.p6-1', 1,{alpha:0, repeat:-1, yoyo: true})
        }else {
            $('.turn-right').fadeIn();
            this.barMove.pause()
        }
        console.log(page)
        this.timeiscroll[page-1].init();
        this.timeiscroll[page-1].run();

        this.motionObj['page'+page].play()

    },
    barrageMove: function () {
        var _this = this;
        var moveTime = 10;

        this.barMove.to('', 1, {delay:1,repeat:-1, onRepeat: function () {
            var spArry = [
                '<span class="bar1">亦庄金茂府实楼样板首开<span>千人到访</span></span>',
                '<span class="bar2">9月蓄客18天热销20亿</span>',
                '<span class="bar3">11月网签8亿<span>（北京均价5-7万元商品住宅成交金额第一名）</span></span>',
                '<span class="bar4"><span>1-9月网签21.41亿元</span>（北京均价5-7万元商品住宅成交金额第一名）</span>',
                '<span class="bar5">2017全年<span>逆势劲销70亿</span></span>'
            ]

            console.log($('.barrage>div').length + 1)
            for(var i = 1, len = $('.barrage>div').length + 1; i < len; i++) {
                var objLeft, objWidth;
                if($('.aisle'+i+'>span').length == 0){
                    $('.aisle'+i).append(spArry[i-1])
                    objLeft = $('.aisle'+i+'>span:last ').offset().left
                    objWidth = $('.aisle'+i+'>span:last ').width();
                    TweenMax.to('.aisle'+i+'>span:last-of-type', moveTime, {x: -1840, ease:Linear.easeNone, onCompleteParams:["{self}"], onComplete:function (e) {
                        e.target.remove();
                    }})
                }else {
                    objLeft = $('.aisle'+i+'>span:last ').offset().left
                    objWidth = $('.aisle'+i+'>span:last ').width();
                    if( objLeft < 540 - objWidth ){
                        $('.aisle'+i).append(spArry[ Math.floor(_this.randomTd(1, spArry.length+1))])
                        TweenMax.to('.aisle'+i+'>span:last-of-type', moveTime, {x: -1840, ease:Linear.easeNone, onCompleteParams:["{self}"], onComplete:function (e) {
                            e.target.remove();
                        }})
                    }
                }
            }
        }})
        // this.barMove.pause();
    },
    randomTd: function (min, max) {
        return Math.random() * (max - min) + min;
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


