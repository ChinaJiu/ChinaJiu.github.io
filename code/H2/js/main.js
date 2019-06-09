$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });
    var bg = $('#bg')[0];
    var error = $('#error')[0];
    var myScroll;
    var Tween = {
        't1': new TimelineMax(),
        't2': new TimelineMax(),
    }

    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'bg.jpg'},
        {src:loadingPath+'c-1.png'},
        {src:loadingPath+'c-2.png'},
        {src:loadingPath+'c-3.png'},
        {src:loadingPath+'d-g.png'},
        {src:loadingPath+'d-k.png'},
        {src:loadingPath+'d-l.png'},
        {src:loadingPath+'d-y.png'},
        {src:loadingPath+'fontzkklt.TTF'},
        {src:loadingPath+'g-d-1.png'},
        {src:loadingPath+'g-d-2.png'},
        {src:loadingPath+'game-hero.png'},
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'p1-0.png'},
        {src:loadingPath+'p1-1.png'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-3.png'},
        {src:loadingPath+'p1-4.png'},
        {src:loadingPath+'p1-5.png'},
        {src:loadingPath+'p1-6.png'},
        {src:loadingPath+'p1-7.png'},
        {src:loadingPath+'p1-8.png'},
        {src:loadingPath+'p1-bg.jpg'},
        {src:loadingPath+'p2-1.png'},
        {src:loadingPath+'p2-2.png'},
        {src:loadingPath+'p2-3.png'},
        {src:loadingPath+'p2-4.png'},
        {src:loadingPath+'p2-5.png'}
    ];
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(false);
    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    }

    function handleComplete() {
        $('.loading').remove();
        initPageMotion();
    }
    //初始化动画
    function initPageMotion(){
        var g = initGame();
        var imgLeng = g.imgArry.length;
        $(".main").fadeIn(500,function(){
            $('.g-f-4').countdown('2017/10/19 15:00:00', function(event) {
                var a = event.offset.totalDays;
                $(this).html( a +'天'+event.strftime('%H:%M:%S'));
            });
        });
        Tween.t2.from('.gs-1',.6,{alpha:0})
        Tween.t2.from('.gs-2',.6,{alpha:0,x:-100},'-=1')
        Tween.t2.from('.gs-3',.6,{alpha:0,x:100,onComplete:function () {
            // 在玩一次
            $('.gs-3').on(touchstart,function () {
                if( g.beginBool ){
                    g.beginBool = false
                    Tween.t2.reverse()
                    $('.game-ul>li').remove();
                    TweenMax.set('.game-hero',{x: 0,y: 0,rotationY:0,rotationZ:0,scale:1});
                    TweenMax.set('.game-ul',{bottom:0});
                    $('.g-score>span').html('0')
                    g = initGame();
                    imgLeng = g.imgArry.length;
                    $('.game-succeed').delay(600).fadeOut(function () {
                        $('.game-screen').fadeIn(1200,function () {
                            init()
                        })
                        var a = 3;
                        countDown(a)
                    })
                }
            });
        }},'-=1')
        Tween.t2.pause();
        // 开始游戏
        var zz = true;
        $('.p1-5-4').on(touchstart,function () {
            if(zz){
                zz = false;
                $('.p1-5').fadeOut(function () {
                    $('.game-screen').fadeIn(function () {
                        init()
                    })
                })
            }


            var a = 3;
            countDown(a)
        })
        //提交成绩
        $('.p2-3').on(touchstart,function () {
            if( g.gameScreenBool ) {
                g.gameScreenBool = false
                $('.game-over').fadeOut();
                $('.game-screen').fadeOut(function () {
                    $('.game-form').fadeIn(function () {
                        initGame()
                    });
                });
            }
        })
        // 提交表单
        $('.g-f-5').on(touchstart,function () {
            $('.game-form').fadeOut(function () {
                $('.game-succeed').fadeIn(function () {
                    Tween.t2.restart()
                })
            });

        })
        function countDown(a) {
            var gcStop = setInterval(function () {
                $('.g-c-1>img').attr('src','images/c-'+a+'.png')
                a--;
                if( a == 0 ){
                    clearInterval(gcStop);
                    a = 3;
                    $('.g-count').delay(1000).fadeOut(function () {
                        // 游戏开始
                        g.touchBoor = true;
                        setTimeout(function () {
                            if(g.gameOverBool){
                                removeLi();
                            }
                        },3000);
                    })
                }
            },1000)
        }
        function init() {
            g.sa = true;
            g.sc = true;
            g.leftX = true;
            g.rightX = true;
            g.gameOverBool = true;
            g.gameScreenBool = true;
            $('.g-count').fadeIn();
            clearInterval(g.setstopadd)
            $('.game-hero').delay(500).fadeIn();
            gameBegin();
            g.hero.setAttribute('data-a',g.m)
        }
        function gameBegin() {
            addLisetInterVal(g.addTime);
        }

        $('.g-l,.g-r').on(touchstart,function (e) {
            e.stopPropagation()
            var _this = $(this).index();

            if(g.touchBoor){
                touchAll()
                if( _this == 3 && g.liArry[g.m].getAttribute('data-b') == 1){
                    removeImg(1);
                }else if( _this == 4 && g.liArry[g.m].getAttribute('data-b') == 2 ) {
                    removeImg(2);
                }else if( g.liArry[g.m].getAttribute('data-b') == 3 ) {
                    removeImg(3);
                }else {
                    gameOver()
                    clearInterval(g.stopInterval)
                }
            }

        })
        //移除金币  加分
        function removeImg(num) {
            TweenMax.to(g.liArry[g.m].children,.4,{scale: 0,onCompleteParams: ["{self}"],onComplete:function (e) {
                $(e.target[0]).remove()
            }})
            if( num == 1 || num == 2 ){
                g.scoreNum += 10;
            }else if( num == 3 ) {
                g.scoreNum += 50;
            }
            g.scoreHtml.innerHTML = g.scoreNum;
            scoreFn(g.scoreNum)
        }

        function scoreFn(score) {
            if(score <= 100 ){
            }else if(score > 300 && score <=400){
                if(g.sa){
                    g.sa = false
                    clearInterval(g.setstopadd)
                    g.diffTimeArry = 340
                    removeLi();
                }
            }else if(score > 700 && score <=800){
                if(g.sc) {
                    g.sc = false;
                    clearInterval(g.setstopadd)
                    g.diffTimeArry = 280
                    removeLi();
                }
            }
        }

        function appendLi() {

            var li = document.createElement('li');
            var img = document.createElement('img')
            var imgRand = Math.floor( Math.random() * imgLeng )

            if( (g.dataNum+1) % 10 == 0){
                img.src = g.imgLKGY[ g.imgLKGYIndex ].url
                li.setAttribute('data-b',g.imgLKGY[ g.imgLKGYIndex ].data_b);
                g.imgLKGYIndex++

                if( g.imgLKGYIndex >= g.imgLKGY.length ){
                    g.imgLKGYIndex = 0;
                }
            }else {
                img.src = g.imgArry[ imgRand ].url
                li.setAttribute('data-b',g.imgArry[ imgRand ].data_b);
            }
            li.className = 'l'+g.dataNum;
            li.style.width = g.lW + 'px';
            li.style.height = g.lH + 'px'
            li.style.background = g.backGroundColor[ Math.floor( Math.random() * g.backGroundColor.length ) ]
            li.setAttribute("data-a", g.dataNum)
            li.appendChild(img)
            g.ul.appendChild(li);
            TweenMax.from(li,.4,{scale: 0,alpha: 0})
            g.liArry.push(li)
            TweenMax.set(li,{x:g.col,y:g.row})
            if( probability(.5) > 0 && g.addTwoBool ){  // l or r
                if(probability(.5) > 0){ // l
                    if( g.leftX ){
                        g.rightX = false;
                        if( g.col <= 0 ){
                            heroTop(g.hero);
                            if( g.addTwoBool ){
                                g.rightX = true
                            }
                        }else if( g.addTwoBool ) {
                            heroLeft(g.hero);
                        }
                    }else {
                        heroTop(g.hero);
                    }
                }else {  // r
                    if( g.rightX ){
                        g.leftX = false;
                        if( g.col >= 480 ){
                            heroTop(g.hero);
                            if(g.addTwoBool){
                                g.leftX = true;
                            }
                        }else if( g.addTwoBool ){
                            heroRight(g.hero);
                        }
                    }else {
                        heroTop(g.hero);
                    }
                }
            }else {  //t
                heroTop(g.hero);
                if( g.addTwoBool ){
                    g.leftX = true
                    g.rightX = true
                }
            }
            g.dataNum++;
        }
        function touchAll() {
            g.m++;
            g.hero.setAttribute('data-a',g.m)
            TweenMax.to('.game-ul',.5,{bottom: g.mapArry[g.m].my,onStart: function () {
                clearInterval( g.stopInterval )
                if(g.mapArry[g.m].mx == g.mapArry[g.m-1].mx ){
                    addLisetInterVal( g.addTime );
                }
            }})
            TweenMax.set('.game-hero',{rotationY: g.mapArry[g.m-1].mrY,rotationZ: g.mapArry[g.m-1].mrZ});
            TweenMax.to('.game-hero',.4,{x: g.mapArry[g.m].mx});
        }
        function addLisetInterVal(time) {
            g.stopInterval = setInterval(function () {
                appendLi();
                $('.l0>img').attr({'src':''});
                if( g.row <= -560+g.mapArry[g.m].my ){
                    clearInterval( g.stopInterval );
                }
            },time)
        }
        function removeLi() {
            g.setstopadd = setInterval(function () {
                TweenMax.to('.game-ul>li:first-child',.2,{scale: 0,ease:Linear.easeNone,onStartParams: ["{self}"],onStart: function (e) {
                    if(e.target[0].getAttribute('data-a') == g.hero.getAttribute('data-a') ){
                        gameOver();
                        clearInterval(g.stopInterval)
                    }
                },onCompleteParams: ["{self}"],onComplete: function (e) {
                    $(e.target[0]).remove();
                    g.removeIndex++;
                }})

            },g.diffTimeArry)
        }
        function heroTop(hero) {
            g.mapArry.push({'mx': g.col,'my': g.row,'mrZ': -90,'mrY': 0})
            g.row -= 80;
            g.col += 0;
            g.addTwoBool = false
            g.addTwo += 1;
            if( g.addTwo >=2 ){
                g.addTwo = 0
                console.log('========')
                g.addTwoBool = true;
            }
        }
        function heroLeft(hero) {
            g.mapArry.push({'mx': g.col,'my': g.row,'mrZ': 0,'mrY': -180})
            g.col -= 80;  //l
            g.row += 0;
        }
        function heroRight(hero) {
            g.mapArry.push({'mx': g.col,'my': g.row,'mrZ': 0,'mrY': 0})
            g.col += 80; // r
            g.row += 0;
        }
        function gameOver() {
            if(g.gameOverBool){
                g.gameOverBool = false
                // 结束声音
                error.pause();
                error.play();

                g.beginBool = true;
                g.touchBoor = false;
                //将吃完金币的方格移除
                var d = 0;
                for( var i = g.removeIndex; i < g.m ; i++ ){
                    TweenMax.to('.l'+i,.4,{delay: d +=.05,scale: 0,onCompleteParams: ["{self}"],onComplete: function (e) {
                        $(e.target[0]).remove();
                    }})
                }
                TweenMax.to(g.liArry[g.m],.6,{scale:0})
                TweenMax.to('.game-hero',.6,{scale:0,onComplete:function () {
                    $('.game-hero').fadeOut();
                }})
                clearInterval(g.setstopadd)
                var gSocre = $('.g-score>span').text()
                $('.g-o-score>span').html(gSocre)
                if( gSocre <= 100 ){
                    $('.g-o-text').html('手速太慢了！');
                }else{
                    $('.g-o-text').html('哎哟，不错哦~');
                }
                $('.game-over').delay(1000).fadeIn();
            }
        }
        function probability(num) {
            return num - Math.random()
        }
        function initGame() {
            var g = {
                'hero': document.querySelector('.game-hero'),
                'scoreHtml': document.querySelector('.g-score>span'),
                'ul': document.querySelector('.game-ul'),
                'lW': 73,
                'lH': 73,
                'col': 0,
                'row': 0,
                'addTwo': 0,
                'addTwoBool': true,
                'backGroundColor': ['#40b8a8','#fba341','#e7e1c4','#f15773'],
                'mapArry': [],
                'mapIndex': -1,
                'liArry': [],
                'stopInterval': null,
                'setstopadd': null,
                'dataNum': 0,
                'addTime': 100,
                'imgArry': [{'url':'images/g-d-1.png','data_b':'1'},{'url':'images/g-d-2.png','data_b':'2'}],
                'imgLKGY': [{'url':'images/d-l.png','data_b':'3'},{'url':'images/d-k.png','data_b':'3'},{'url':'images/d-g.png','data_b':'3'},{'url':'images/d-y.png','data_b':'3'}],
                'imgLKGYIndex': 0,
                'scoreNum': 0,
                'removeIndex': 0,
                'touchBoor': false,
                'setTimeStop': null,
                'diffTimeArry': 400,
                'm': 0,
                'sa': false,
                'sc': false,
                'leftX': false,
                'rightX': false,
                'beginBool': false,
                'gameOverBool': false,
                'gameScreenBool': false
            }
            return g;
        }
    }
    // 游戏规则
    $('.p1-1').on(touchend,function () {
        $('.p1-5').fadeIn();
        $('.p1-0,.p1-1').fadeOut();
    })
    // 关闭游戏规则
    $('.p1-5-2').on(touchend,function () {
        $('.p1-5').fadeOut();
        $('.p1-0,.p1-1').fadeIn();
    })
    // 排行、
    $('.p1-5-3').on(touchend,function () {
        $('.p1-5').fadeOut(function () {
            $('.game-ranke').fadeIn(function () {
                isScrollFn('#wrapper');
            });
        })
    })
    var gsBool = true;
    $('.gs-2').on(touchend,function () {
        gsBool = false;
        Tween.t2.reverse()
        $('.game-ranke').delay(1000).fadeIn(function () {
            // isScrollFn('#wrapper');
        });
    })
    // 关闭排行
    $('.p1-6-2').on(touchend,function () {
        if(gsBool){
            $('.game-ranke').fadeOut(function () {
                $('.p1-5').fadeIn();
            });
        }else {
            $('.game-ranke').fadeOut(function () {
                $('.game-succeed').fadeIn(function () {
                    Tween.t2.restart()
                })
            });
        }
    })
    function isScrollFn(obj) {
        myScroll = new IScroll(obj, {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
    //是否允许用户滑动页面
    function initAllowUserMove(isMove){
        allowUserMove=isMove;
    }
    //阻止屏幕双击以后向上位移
    //当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(touchstart);
        }
    }
    //阻止屏幕双击以后向上位移
    //音乐按钮
    $('.musicicon').on(touchstart,function(){
        $(this).hasClass('musicrotate') ? bg.pause() : bg.play()
        document.querySelector('.musicicon').classList.toggle('musicrotate')
    })

});