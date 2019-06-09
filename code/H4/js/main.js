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
    this.jump = new TimelineMax();

    // 倒计时 30s
    this.gc2 = 30;
    this.gameInter = null;

    // 分数
    this.score = 0;

    // 上  下  时间
    this.upTime = .5;
    this.downTime = 1;

    this.rankListIndex = null;

    this.screenListener = document.querySelector('.game-screen');

}
TranDocode.prototype = {
    preolading: function () {
        //预加载图片，音乐
        var loadingPath='images/';
        var manifest=[
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'animate1.png'},
            {src:loadingPath+'animate1-1.png'},
            {src:loadingPath+'animate2.png'},
            {src:loadingPath+'animate2-2.png'},
            {src:loadingPath+'animate3.png'},
            {src:loadingPath+'animate3-3.png'},
            {src:loadingPath+'float-div.png'},
            {src:loadingPath+'g-1.png'},
            {src:loadingPath+'g-2.png'},
            {src:loadingPath+'g-3.png'},
            {src:loadingPath+'game-bg.jpg'},
            {src:loadingPath+'game-submit-1.png'},
            {src:loadingPath+'game-submit-btn.png'},
            {src:loadingPath+'gameOver-1.png'},
            {src:loadingPath+'gameOver-bg.png'},
            {src:loadingPath+'gameOver-btn1.png'},
            {src:loadingPath+'gameOver-btn2.png'},
            {src:loadingPath+'gameOver-btn3.png'},
            {src:loadingPath+'hammer.png'},
            {src:loadingPath+'hammer-result.png'},
            {src:loadingPath+'logo.png'},
            {src:loadingPath+'menu-1.png'},
            {src:loadingPath+'menu-btn1.png'},
            {src:loadingPath+'menu-btn2.png'},
            {src:loadingPath+'menu-btn3.png'},
            {src:loadingPath+'musicicon.png'},
            {src:loadingPath+'p1-1.png'},
            {src:loadingPath+'p1-2.png'},
            {src:loadingPath+'p1-3.png'},
            {src:loadingPath+'p1-4.png'},
            {src:loadingPath+'p1-bg.jpg'},
            {src:loadingPath+'rankList.png'},
            {src:loadingPath+'rule.png'},
            {src:loadingPath+'ruleClose-btn.png'},
            {src:loadingPath+'rank-btn-1.png'},
            {src:loadingPath+'star-1.png'},
            {src:loadingPath+'star-2.png'},
            {src:loadingPath+'star-3.png'}
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

        // 创建动画对象
        for(var i = 1; i < 20; i++){
            this.motionObj['page'+i] = new TimelineMax();
        }

        // 点击事件
        _this.addEventListerBtn();
        // 下雪
        _this.snowDrop();

        // 加载
        Td.preolading();

        //阻止屏幕滑动
        $('html,body').on(this.touchmove,function (e){
            e.preventDefault()
        });

        //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
        this.initPreventPageDobuleTap(false);

        //音乐按钮
        $('.musicicon').on(this.touchstart,function (){
            $(this).hasClass('musicrotate') ? _this.bg.pause() : _this.bg.play()
            document.querySelector('.musicicon').classList.toggle('musicrotate')
        })

    },
    //初始化动画
    initPageMotion: function () {
        var _this = this
        $(".main").fadeIn(500,function (){
            _this.motionObj["page"+1].play();
            _this.motionObj["page"+2].play();
            _this.motionObj["page"+3].play();
            // 排行榜滑动
            _this.icrollRanke();

            // 监听游戏点击
            _this.gameScreen();

            _this.animateJump();
        });
        this.TweenMaxAnimate();
    },
    TweenMaxAnimate: function () {
        var _this = this;
        // S 动画
        this.motionObj["page"+1].from('.menu-1',1,{x: 100, yoyo: true, repeat:-1, ease:Linear.easeNone});
        this.motionObj["page"+1].pause();

        this.motionObj["page"+2].from('.p1-3',1,{rotation:-10, yoyo: true, repeat:-1, ease:Linear.easeNone});
        this.motionObj["page"+2].pause();

        this.motionObj["page"+3].from('.p1-4',1,{rotation:10, yoyo: true, repeat:-1, ease:Linear.easeNone});
        this.motionObj["page"+3].pause();

        this.motionObj["page"+8].from('.g-3',1,{alpha:0,scale:7,ease:Expo.easeOut});
        this.motionObj["page"+8].to('.g-3',1,{alpha:0,scale:7,ease:Expo.easeOut});
        this.motionObj["page"+8].from('.g-2',1,{alpha:0,scale:7,ease:Expo.easeOut},'-=1');
        this.motionObj["page"+8].to('.g-2',1,{alpha:0,scale:7,ease:Expo.easeOut});
        this.motionObj["page"+8].from('.g-1',1,{alpha:0,scale:7,ease:Expo.easeOut},'-=1');
        this.motionObj["page"+8].to('.g-1',1,{alpha:0,scale:7,ease:Expo.easeOut,onStart: function () {

            // 游戏开始
            // _this.gameInit();
            _this.gameBegin();
        }});
        this.motionObj["page"+8].pause();
        // E 动画
    },
    addEventListerBtn: function () {
        var _this = this;
        // 开始游戏
        $('.menu-btn1').on(_this.touchstart, function () {
            $('.menu-box').fadeOut();
            $('.game').fadeIn(function () {
                $('.menu').remove();
                _this.motionObj["page"+11].pause();
                _this.motionObj["page"+8].play();
            })
        })
        // 游戏规则
        $('.menu-btn2').on(_this.touchstart, function () {
            $('.menu-box').fadeOut();
            $('.rule').fadeIn();
        })
        // 排行榜
        $('.menu-btn3').on(_this.touchstart, function () {
            _this.rankListIndex = 1;
            $('.menu-box').fadeOut();
            $('.rankList').fadeIn();
        })

        // 关闭游戏规则
        $('.ruleClose-btn').on(_this.touchstart, function () {
            $('.menu-box').fadeIn();
            $('.rule').fadeOut();
        })
        // 关闭排行榜
        $('.rankClose-btn').on(_this.touchstart, function () {
            if(_this.rankListIndex == 1){
                $('.menu-box').fadeIn();
            }else {
                $('.game-over').fadeIn();
            }
            $('.rankList').fadeOut();
        })
        // 再次挑战
        $('.game-btn-1').on(_this.touchstart, function () {
            $('.game-over').fadeOut();
            // _this.gameBegin();
            _this.gameInit();
            _this.motionObj["page"+8].restart()
        })
        // 再次挑战后的排行榜
        $('.game-btn-2').on(_this.touchstart, function () {
            _this.rankListIndex = 2;
            $('.game-over').fadeOut();
            $('.rankList').fadeIn();
            $('.rank-btn-1').fadeIn();
        })
        // 叫朋友来玩
        $('.game-btn-3').on(_this.touchstart, function () {
            $('.float').fadeIn();
        })
        $('.float').on(_this.touchstart, function () {
            $(this).fadeOut();
        })
        // 提交信息
        $('.game-submit-btn').on(_this.touchstart, function () {
            _this.submitMessage()
            $('.rankList').fadeIn();
        })
        //点击领取
        $('.rank-btn-1').on(_this.touchstart, function () {
            // 提交信息页面
            if(_this.rankListIndex == 2){
                $('.game-submit').fadeIn();
            }
        })
        // 关闭填写信息
        $('.game-submit-close-btn').on(_this.touchstart, function () {
            $('.game-submit').fadeOut();
        })
    },
    submitMessage: function () {
        var name = $('.form-name').val();
        var iphone = $('.form-iphone').val();
        // if (name == '') {
        //     alert('姓名不能为空!');
        // }else if(iphone==''){
        //     alert('手机号不能为空');
        // }else if(iphone.match(/^1[34578]\d{9}$/)==null){
        //     alert('请输入正确的手机号码！');
        // }else {
        //     $.ajax({
        //         url:'',
        //         type:'POST',
        //         dataType:'json',
        //         data:{name:name,iphone:iphone},
        //         success:function(data){
        //             console.log(data)
        //         },
        //         error:function(){
        //             // alert('未知错误')
        //         }
        //     });
        // }
        $('.game-submit').fadeOut();

    },
    gameInit: function () {
        this.gc2 = 30;
        this.score = 0;
        $('.game-score>span').text(this.score);
        $('.game-time>span').text(this.gc2);
        // 上  下  时间
        this.upTime = .5;
        this.downTime = 1;
        this.jump.timeScale(1)
    },
    gameBegin: function () {
        this.gameInit();
        this.gameGc();
        this.jump.restart();
    },
    gameScreen: function () {
        var _this = this;
        this.screenListener.addEventListener('touchstart', function (e) {
            _this.gameScreenLister(e);
        }, false)
    },
    gameScreenLister: function (e) {
        var _this = this;
        this.screenListener = document.querySelector('.game-screen');
        var x = e.touches[0].pageX;
        var y = e.touches[0].pageY - this.screenListener.offsetTop;
        // console.log(x,y,e,this.screenListener.offsetTop)
        // 锤子
        var hammerDiv = '<div class="hammer" style="background: url(images/hammer.png) no-repeat; width: 176px; height: 167px;"></div>'
        // $('.hammer').append('<div class="hammer-score">+1</div>')
        if( $('.game-screen').children.length >= 2 ){
            $('.hammer').remove();
            $('.hammerscore').remove();
            // console.log('hammerscore')
        }
        $('.game-screen').append(hammerDiv)

        var hammer = document.querySelector('.hammer')
        hammer.style.transform = 'translate('+(x-88)+'px,'+(y-83)+'px)'
        // 锤子动画
        TweenMax.to(hammer, .3, {
            rotation:-30,
            onCompleteParams:["{self}"],
            onComplete:function(e){
                e.target.remove();
            }})
        // 砸上去了
        if( e.target.getAttribute('dataNum') == 1 ){
            e.target.setAttribute('dataNum', '0')
            $('.hammer').append('<div class="hammer-result"></div>')
            // e.target
            var a = e.target.getAttribute('dataSuffix');
            $(e.target).css('background-image','url(images/animate'+a+'-'+a+'.png)')

            TweenMax.to(e.target ,1 ,{ y:0 ,onCompleteParams:["{self}"],
                onComplete:function(e){
                    e.target.remove();
                }})
            var hammerScore;
            // 鸡加分
            if( e.target.getAttribute('dataType') == 3 ) {
                // hammerScore = '<div class="hammerscore" >+1</div>'
                hammerScore = this.gameScore(1);
            }else { // 猪 羊减分
                // hammerScore = '<div class="hammerscore" >-1</div>'
                hammerScore = this.gameScore(-1);
            }
            // 添加分值
            $('.game-screen').append(hammerScore)
            var hammerscore = document.querySelector('.hammerscore')
            hammerscore.style.transform = 'translate('+(x-37)+'px,'+(y-23)+'px)'
            // 分值动画
            TweenMax.to(hammerscore, 1, {
                top:-100,
                alpha:0,
                onCompleteParams:["{self}"],
                onComplete:function(e){
                    e.target.remove();
                }})
        }
    },
    animateJump: function () {  // 小动物跳起来
        var _this = this;
        this.jump.to('',1 ,{repeat:-1, onRepeat: function () {
            // var animateObj = '<div class="animate'+animateRd+'" dataSuffix="'+animateRd+'" data-num="1"></div>'
            var animateRd;
            // 概率
            var  proba = _this.randomTd(0, 1)
            if ( 0 < proba && proba < 0.75 ) {
                animateRd = 3
            }else {
                animateRd = Math.floor(_this.randomTd(1, 3));
            }
            var liRd = Math.floor(_this.randomTd(1, 10));
            if ($('.li'+liRd+'>div').length === 0  ) {
                var animateObj = $('<div/>',{
                    class: 'animate'+animateRd,
                    dataSuffix: animateRd,
                    dataNum: 1,
                    dataType: animateRd
                });
                $('.li'+liRd).append(animateObj)
                TweenMax.set(animateObj ,{y:0 })
                TweenMax.to(animateObj ,_this.upTime ,{y:-135 ,onComplete:function () {
                    TweenMax.to(animateObj ,_this.downTime ,{y:0 ,onCompleteParams:["{self}"],
                        onComplete:function(e){
                            e.target.remove();
                        }})
                }})
            }
            // console.log(animateObj)
            // console.log()
        }})
        this.jump.pause();
    },
    gameScore: function (_score) {
        var hammerScore;
        if(this.score <= 0 &&  _score < 0){
            this.score = 0
        }else if(this.score >= 0){
            this.score += _score
        }
        $('.game-score>span').text(this.score)
        if(_score > 0){
            hammerScore = '<div class="hammerscore" >+'+_score+'</div>'
        }else {
            hammerScore = '<div class="hammerscore" >'+_score+'</div>'
        }
        return hammerScore;
    },
    gameGc :function () {
        var _this = this;
        $('.game-time>span').text(30)
        this.gameInter = setInterval(function () {
            _this.gc2--;
            $('.game-time>span').text(_this.gc2)
            if(_this.gc2 < 10){
                $('.game-time>span').text('0'+_this.gc2)
            }
            _this.gameLevel();
        },1000)
    },
    gameOver: function () {
        var _this = this;
        clearInterval(this.gameInter);
        this.jump.pause();
        $('.game-over-2>span').text(this.score);

        this.screenListener.removeEventListener('touchstart', function (e) {
            _this.gameScreenLister(e);
        }, false);

        // 游戏结束页面
        $('.game-over').fadeIn(function () {
            TweenMax.to('.game-over-1', 1, {y: -10, onComplete: function () {
                TweenMax.to('.game-over-1', 1, {y: 0, repeat: -1, yoyo: true, ease:Bounce.ease, onComplete: function () {

                }})
            }})
        })
    },
    gameLevel: function () {
        if(this.gc2 == 25){
            this.jump.timeScale(2)
            // this.gameOver()
        }else if(this.gc2 == 20){
            this.jump.timeScale(3)
            this.upTime = .45;
            this.downTime = .9;
        }else if(this.gc2 == 15){
            this.jump.timeScale(4)
            this.upTime = .4;
            this.downTime = .8;
        }else if(this.gc2 == 10){
            this.jump.timeScale(5)
            // this.upTime = .4;
            // this.downTime = .8;
        }else if(this.gc2 == 5){
            this.jump.timeScale(10)
            // this.upTime = .3;
            // this.downTime = .6;
        }else if(this.gc2 == 0){
            this.gameOver()
        }
    },
    snowDrop: function () {
        var _this = this;
        var colorArray = ['#fff', '#f19816', '#7dcfcb'];
        var sizeArray = ['10', '15', '20', '25'];
        var dropTime = 10;
        this.motionObj["page"+11].to('', .2, {repeat:-1, onRepeat: function () {
            var dropObj;
            var c = Math.floor( _this.randomTd(0, 3) );
            var s = Math.floor( _this.randomTd(5, 25) );
            dropObj = "<div class='dropObj' style='background:"+colorArray[c]+"; width: "+s+"px; height: "+s+"px; ' >"
            $('.snow-box').append(dropObj);
            TweenMax.set('.snow-box div:last-of-type', {x: _this.randomTd(50, 590),y:-500 })
            TweenMax.to('.snow-box div:last-of-type',dropTime ,{
                y: _this.randomTd(300, 1539),
                x: _this.randomTd(-100, 690),
                alpha:0.5,
                ease:Linear.easeNone,
                onCompleteParams:["{self}"],
                onComplete:function(e){
                    e.target.remove();
                }})
        }})
        // this.motionObj["page"+11].pause();
    },
    icrollRanke: function () {
        this.myScroll = new iScroll('wrapper', { checkDOMChanges: true });
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


