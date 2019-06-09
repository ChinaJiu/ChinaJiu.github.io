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
    this.bgmusic = $('#bg-music')[0]

    this.pageArr = ['','','','.m5-text','.m5-text','.m5-text','.m7-text','.m7-text','.m9-text','.m9-text','.m11-text','.m11-text','.m13-text','.m13-text','.m15-text','.m15-text','.m17-text','.m17-text','',''];
    this.fadeArr = ['','','','',
        '.float5-fff','.float5-fff',
        '.float7-fff','.float7-fff',
        '.float9-fff','.float9-fff',
        '.float11-fff','.float11-fff',
        '.float13-fff','.float13-fff',
        '.float15-fff','.float15-fff',
        '.float17-fff','.float17-fff',
        '',''
    ];
    // this.musicSrcArr = ['','','','',
    //     'images/music/music1.mp3','images/music/music1.mp3',
    //     'images/music/music2.mp3','images/music/music2.mp3',
    //     'images/music/music3.mp3','images/music/music3.mp3',
    //     'images/music/music4.mp3','images/music/music4.mp3',
    //     'images/music/music5.mp3','images/music/music5.mp3',
    //     'images/music/music6.mp3','images/music/music6.mp3',
    //     'images/music/music7.mp3','images/music/music7.mp3',
    // ];
    this.musicSrcArr = ['','','','',
        'http://p171k42fg.bkt.clouddn.com/music1.mp3','http://p171k42fg.bkt.clouddn.com/music1.mp3',
        // 'http://p171k42fg.bkt.clouddn.com/music2.mp3','http://p171k42fg.bkt.clouddn.com/music2.mp3',
        'images/music/music2.mp3','images/music/music2.mp3',
        'http://p171k42fg.bkt.clouddn.com/music3.mp3','http://p171k42fg.bkt.clouddn.com/music3.mp3',
        'http://p171k42fg.bkt.clouddn.com/music4.mp3','http://p171k42fg.bkt.clouddn.com/music4.mp3',
        'http://p171k42fg.bkt.clouddn.com/music5.mp3','http://p171k42fg.bkt.clouddn.com/music5.mp3',
        'http://p171k42fg.bkt.clouddn.com/music6.mp3','http://p171k42fg.bkt.clouddn.com/music6.mp3',
        'http://p171k42fg.bkt.clouddn.com/music7.mp3','http://p171k42fg.bkt.clouddn.com/music7.mp3',
        '',''
    ];

    this.boxHeight = 280;
    this.speen = 15;
    this._page = null;
    this.addAudio = true;
    this.setIner = null;
    this.allowmove = true;
    this.movepage = new TimelineMax();
    // this.boxHeightMarg = 250;
    // this.fistHeight = $('.m5-text').height();
}
TranDocode.prototype = {
    constructor: TranDocode,
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'page1.png'},
            {src:loadingPath+'page3.png'},
            {src:loadingPath+'bg.png'},
            {src:loadingPath+'float-fff.png'},
            {src:loadingPath+'fram.png'},
            {src:loadingPath+'m5-1.png'},
            {src:loadingPath+'m5-text.png'},
            {src:loadingPath+'m5-title.png'},
            {src:loadingPath+'m7-text.png'},
            {src:loadingPath+'m7-title.png'},
            {src:loadingPath+'m9-text.png'},
            {src:loadingPath+'m9-title.png'},
            {src:loadingPath+'m11-text.png'},
            {src:loadingPath+'m11-title.png'},
            {src:loadingPath+'m13-text.png'},
            {src:loadingPath+'m13-title.png'},
            {src:loadingPath+'m15-text.png'},
            {src:loadingPath+'m15-title.png'},
            {src:loadingPath+'m17-text.png'},
            {src:loadingPath+'m17-title.png'},
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'p1-bg.jpg'},
            {src:loadingPath+'page-bg.png'}
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
        this.preolading();

        for(var i = 1; i < 20; i++){
            this.motionObj['page'+i] = new TimelineMax();
        }

        //阻止屏幕滑动
        $('html,body').on(this.touchmove,function (e){
            e.preventDefault()
        });

        //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
        this.initPreventPageDobuleTap(true);

        var _this = this;
        //音乐按钮
        $('.musicicon').on(this.touchstart,function (){
            // $(this).hasClass('musicrotate') ? _this.bg.pause() : _this.bg.play()
            $(this).hasClass('musicrotate') ? _this.bgmusic.pause() : _this.bgmusic.play()
            // if(_this._page > 3){
            //     if($(this).hasClass('musicrotate')){
            //         clearInterval(_this.setIner)
            //         _this.movepage.pause();
            //     }else {
            //         console.log(222)
            //         _this.animateTuex()
            //         _this.movepage.restart();
            //     }
            // }
            document.querySelector('.musicicon').classList.toggle('musicrotate')
        })

        var touchUp = new TouchDir({obj:'.page'})
        touchUp.touchMove(function (dir) {
            if(dir == 'left'){
                $('#magazine').turn('next');
            }
            if(dir == 'right'){
                $('#magazine').turn('previous');

            }
        })

    },
    //初始化动画
    initPageMotion: function () {
        var _this = this
        $(".main").fadeIn(500,function (){
            _this.addEventAudio();
            _this.bgmusic.play();
            _this.animatePage1();
        });
        this.turnPage()
        this.TweenMaxAnimate();
    },
    TweenMaxAnimate: function () {
        // S 动画
        // motionObj["page"+1].add(TweenMax.from('.p1',.6,{delay:.8,alpha:0,scale:2,ease:Expo.easeOut}))
        // motionObj["page"+1].pause();
        // E 动画
    },
    addEventAudio: function () {
        var _this = this;
        // 音乐播放结束
        this.bg.addEventListener('ended', function () {
            clearInterval(_this.setIner)
            $('.svg').fadeIn();
        })

    },
    animateTuex: function () {
        var st=0;
        this.setIner = setInterval(function () {
            TweenMax.to( '.fram,.fram-box>div', 0, {
                backgroundPosition: '-' + (408 * st) + 'px -' + 0 + 'px',
                ease: Linear.easeNone
            });
            st++;
            if ( st == 4 ) {
                st = 0;
            }
        },100)
    },
    animatePage1: function () {
        var st=0;
        var a = setInterval(function () {
            TweenMax.to( '.fram', 0, {
                backgroundPosition: '-' + (408 * st) + 'px -' + 0 + 'px',
                ease: Linear.easeNone
            });
            st++;
            if ( st == 4 ) {
                st = 0;
            }
        },100)
    },
    turnPage: function () {
        var _this = this;
        $('#magazine').turn({
            display: 'double',
            acceleration: true, //设置硬件加速模式，对于触摸设备这个值必须是真的
            gradients: true,  //在转换过程中显示渐变和阴影。
            elevation: 50, //设置过渡期间页面的高程
            when: {
                turning: function(event, page, pageObject) {
                    _this._page = page
                    console.log(page)
                    if(page > 3 && page < 19){
                        console.log(_this.setIner)
                        clearInterval(_this.setIner)
                        _this.musicFunc(page);
                        TweenMax.set(_this.pageArr[page], {y:0})
                        TweenMax.pauseAll()

                        $('.fram-box').on(_this.touchstart, function () {
                            _this.bg.play();
                            $('.svg').fadeOut();
                            // 音乐播放开始
                            if(_this.addAudio) {
                                _this.addAudio = false;
                                _this.bg.addEventListener('play', function () {
                                    _this.animateTuex();
                                    _this.pageMove(_this._page);
                                    // _this.pageMove(_this._page)
                                    // _this.movepage.restart()
                                })
                            }
                        })
                    }else if(page == 3 ){
                        _this.bg.src = '';
                        _this.bg.pause();

                        $('.svg').fadeOut(1000)
                    }else if(page == 2){
                        $('.movelr').fadeOut(1000)
                    }else if(page == 1){
                        $('.movelr').fadeIn(1000)
                    }
                },
                turned: function(e, page) {
                    if(page > 3){
                        $('.svg').fadeIn();
                    }
                }
            }
        });

    },
    pageMove: function (page) {
        // console.log(page)
        var t = $(this.pageArr[page]).height() / this.speen;
        // $(this.fadeArr[page]).show();
        // console.log(this.pageArr[page],this.bg.duration,this.boxHeight,$(this.pageArr[page]).height())
        var t = this.bg.duration || 69
        if( page == 16 ) {
            t = 15
        }
        // alert(t)
        TweenMax.to(this.pageArr[page], t / 2, {delay: 10, y: this.boxHeight - $(this.pageArr[page]).height(), ease:Linear.easeNone,onComplete:function () {
            // $(this.fadeArr[page]).fadeOut(1000);
        }})
        // this.movepage.pause();
    },
    musicFunc: function (page) {
        this.bg.pause();
        this.bg.src = '';
        this.bg.src = this.musicSrcArr[page];
        this.bg.pause();
        // this.movepage.pause();
    },
    musicBg: function () {
        this.bg.pause();
        this.bg.loop = true;
        this.bg.src = 'images/music/music-bg.mp3';
        this.bg.play();
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


