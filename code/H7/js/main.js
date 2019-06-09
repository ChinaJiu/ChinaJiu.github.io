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

    this.video = document.getElementById('video');

    this.endAnimate = new TimelineMax();
}
TranDocode.prototype = {
    constructor: TranDocode,
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'attention.png'},
            {src:loadingPath+'call.png'},
            {src:loadingPath+'end-bg.jpg'},
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'p1-1new.png'},
            {src:loadingPath+'p1-2.png'},
            {src:loadingPath+'p1-3.png'},
            {src:loadingPath+'imgText/0_00000.png'},
            {src:loadingPath+'imgText/0_00001.png'},
            {src:loadingPath+'imgText/0_00002.png'},
            {src:loadingPath+'imgText/0_00003.png'},
            {src:loadingPath+'imgText/0_00004.png'},
            {src:loadingPath+'imgText/0_00005.png'},
            {src:loadingPath+'imgText/0_00006.png'},
            {src:loadingPath+'imgText/0_00007.png'},
            {src:loadingPath+'imgText/0_00008.png'},
            {src:loadingPath+'imgText/0_00009.png'},
            {src:loadingPath+'imgText/0_00010.png'},
            {src:loadingPath+'imgText/0_00011.png'},
            {src:loadingPath+'imgText/0_00012.png'},
            {src:loadingPath+'imgText/0_00013.png'},
            {src:loadingPath+'imgText/0_00014.png'},
            {src:loadingPath+'imgText/0_00015.png'},
            {src:loadingPath+'imgText/0_00016.png'},
            {src:loadingPath+'imgText/0_00017.png'},
            {src:loadingPath+'imgText/0_00018.png'},
            {src:loadingPath+'imgText/0_00019.png'},
            {src:loadingPath+'imgText/0_00020.png'}
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

        TweenMax.set('.page1', {rotation: 90})
        TweenMax.to('.p1-2', 1, {scale:1.2, repeat:-1, yoyo: true})
    },
    //初始化动画
    initPageMotion: function () {
        var _this = this
        $(".main").fadeIn(500,function (){
            _this.videoBegin();
            _this.addEventListenerTouch();
            _this.animateTuex()
        });
        this.TweenMaxAnimate();
    },
    videoBegin: function () {
        $( '.p1-1' ).fadeIn( 1000 ).delay( 2000 ).fadeOut( 1000, function () {
            $( '.p1-2,.p1-3' ).fadeIn()
        })
    },
    addEventListenerTouch: function () {
        var _this = this;

        // 视频监听
        this.video.addEventListener('timeupdate',function (e) {
            // alert(2)
        })

        $('.video-box').on(this.touchstart, function () {
            _this.video.play();
        })

        // 视频播放
        $('.p1-2').on(this.touchstart,function () {
            $( '.p1-2,.p1-3' ).fadeOut()
            $('.video-box').fadeIn(function () {

            })
            _this.video.play();
        })
        // 视频结束
        this.video.addEventListener('ended',function (e) {
            $('.video-box').fadeOut(function () {
                $('.end-bg').fadeIn(function () {
                    _this.endAnimate.play()
                })
            })
        })
        // 关注
        $('.attention').on(this.touchstart, function () {
            $('.cover').fadeIn();
        })
        // 致电
        $('.call').on(this.touchstart, function () {

        })
        $('.cover').on(this.touchend,function(){
            $('.cover').fadeOut();
        });
    },
    animateTuex: function () {
        var s = 0;
        setInterval(function () {
            $('.text-T').fadeIn()
            var a = setInterval(function () {
                if(s > 9){
                    $('.text-T>img').attr({'src':'images/imgText/0_000'+s+'.png'})
                }else {
                    $('.text-T>img').attr({'src':'images/imgText/0_0000'+s+'.png'})
                }
                s++
                if( s == 20 ){
                    s = 0;
                    clearInterval(a)
                }
            },50)
        },2000)

    },
    TweenMaxAnimate: function () {
        // S 动画
        // motionObj["page"+1].add(TweenMax.from('.p1',.6,{delay:.8,alpha:0,scale:2,ease:Expo.easeOut}))
        // motionObj["page"+1].pause();
        this.endAnimate.from('.attention', 1, {alpha: 0, x: -100})
        this.endAnimate.from('.call', 1, {alpha: 0, x: 100},'-=1')
        this.endAnimate.pause();

        // E 动画
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