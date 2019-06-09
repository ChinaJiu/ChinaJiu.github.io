$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });

    // 动画
    var motionObj = {

    };
    var duration = 1.3;
    var a = {
        t1: new  TimelineMax(),
        t2: new  TimelineMax(),
        t3: new  TimelineMax(),
        t4: new  TimelineMax(),
        t5: new  TimelineMax(),
        t6: new  TimelineMax(),
        t7: new  TimelineMax(),
        t8: new  TimelineMax(),
        t9: new  TimelineMax(),
        t10: new  TimelineMax(),
        t11: new  TimelineMax(),
        t12: new  TimelineMax(),
        t13: new  TimelineMax(),
        g1: new  TimelineMax(),
        g2: new  TimelineMax(),
        music: new  TimelineMax()
    }
    var b = {
        b1 : new TimelineMax(),
        index: 0,
    }
    // 动画

    // 录音参数
    var misicId = '';  //录音id
    var m =0 ;
    var n = 30;
    var nastop;
    var islu = true;
    var isend = 0;  //还没有录音
    var istryStop = true;
    var isluStop = false;
    // 录音参数

    var bg = $('#bg')[0];

    var music2 = $('#music2')[0];

    var startBoor = new TimelineMax();

    //滑动事件
    var hammertime = new Hammer(document.getElementById('page'), {
        preventDefault: true
    });
    var isUp = false
    hammertime.on('panmove', function(ev) {
            if(ev.direction==8){
                if(isUp){
                    isUp = false;
                    $('.up').fadeOut();
                    a.t9.reverse();
                }
            }
    });
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    //滑动事件

    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'g-1.png'},
        {src:loadingPath+'g-2.png'},
        {src:loadingPath+'logo.png'},
        {src:loadingPath+'musicicon2.png'},
        {src:loadingPath+'p1-1.jpg'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-3.png'},
        {src:loadingPath+'p1-4.png'},
        {src:loadingPath+'p1-5.png'},
        {src:loadingPath+'p1-6.png'},
        {src:loadingPath+'p1-10.png'},
        {src:loadingPath+'p1-11.png'},
        {src:loadingPath+'p1-12.png'},
        {src:loadingPath+'p1-13.png'},
        {src:loadingPath+'p1-14.png'},
        {src:loadingPath+'p2-1.png'},
        {src:loadingPath+'p2-2.png'},
        {src:loadingPath+'p2-3.png'},
        {src:loadingPath+'p2-4.png'},
        {src:loadingPath+'p2-5.png'},
        {src:loadingPath+'p2-6.png'},
        {src:loadingPath+'p2-7.png'},
        {src:loadingPath+'p2-8.png'},
        {src:loadingPath+'p2-9.png'},
        {src:loadingPath+'p2-10.png'},
        {src:loadingPath+'p2-bg.jpg'},
        {src:loadingPath+'p3-1.png'},
        {src:loadingPath+'p3-2.png'},
        {src:loadingPath+'p3-3.png'},
        {src:loadingPath+'p3-5.png'},
        {src:loadingPath+'p3-6.png'},
        {src:loadingPath+'p3-7.png'},
        {src:loadingPath+'p3-8.png'},
        {src:loadingPath+'p3-9.png'},
        {src:loadingPath+'p3-10.png'},
        {src:loadingPath+'p3-11-1.png'},
        {src:loadingPath+'p3-11-2.png'},
        {src:loadingPath+'p3-12-2.png'},
        {src:loadingPath+'p3-13.png'},
        {src:loadingPath+'p4-1.png'},
        {src:loadingPath+'pl-1.png'},
        {src:loadingPath+'pl-2.png'},
        {src:loadingPath+'pl-3.png'},
        {src:loadingPath+'star.png'},
        {src:loadingPath+'star1.png'},
        {src:loadingPath+'p4-3.png'},
        {src:loadingPath+'up.png'}

    ];
    var queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    // initPreventPageDobuleTap(true);
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
        $(".main").fadeIn(500,function(){
            // motionObj['page'+1].play();
            // a.t6.play();
            bg.play();
            speedLine(1);
            setTimeout(function () {
                // startBoor.pause()


                setTimeout(function () {
                    music2.src = 'images/music2.mp3'
                    music2.play();
                },700)
                setTimeout(function () {
                    var numBoxArry =['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
                    var l = [2,9,9,7,9,2,4,5,8]
                    var s = 3
                    for(var i = 0,leg = l.length; i < leg; i++){
                        s+=.05
                        funAnimate(numBoxArry,i+1,l[i],0,s,200);
                    }
                    a.t3.play();
                })
            },5000)

            setTimeout(function () {
                a.t1.play();
                setTimeout(function () {
                    TweenMax.to('.p6',.6,{scale:10,y:50,alpha:0,ease:Expo.easeOut})
                },3000)
            },2000)
            a.t2.play();
        });


        $('.p2-1').addClass('f1')
        $('.p2-2').delay(1000).addClass('f1')

        setTimeout(function () {
            $('.p1-3').fadeIn();
            $('.p1-3').addClass('f2');
        },500)
        setTimeout(function () {
            $('.p1-5').fadeIn();
            $('.p1-5').addClass('f2');
        },1000)
        // TweenMax.from('.p1-3',4,{alpha:0,repeat:-1,yoyo:true,ease:Linear.easeNone})
        // TweenMax.from('.p1-4',5,{alpha:0,repeat:-1,yoyo:true,ease:Linear.easeNone})


        a.t1.from('.p6',.6,{alpha:0,scale:0,ease:Back.easeOut})
        a.t1.pause()

        a.t2.from('.p1-2',2,{alpha:0.7,repeat:-1,yoyo:true,ease:Linear.easeNone})
        a.t2.pause()

        a.t3.from('.box-2',.6,{delay:1,scale:0,alpha:0,ease:Expo.easeOut,onComplete:function () {
            TweenMax.to('.box-2',.6,{delay:3,scale:10,alpha:0,y:50,ease:Expo.easeOut,onComplete:function () {
                a.t4.play();
            }})

        }})
        a.t3.pause()

        a.t4.to('.p1-10',3,{rotation:360*5,alpha:0.3,transformOrigin: "0% 50%",ease:Power4.easeIn})
        a.t4.from('.box-3',.6,{alpha:0,scale:0},'-=3')
        a.t4.to('.p1-10',3,{rotation:360*25-90,alpha:0,transformOrigin: "0% 50%",ease:Linear.easeNone})
        a.t4.from('.p1-12',5,{alpha:0,ease:Power1.easeIn,onStart:function () {
            setTimeout(function () {
                a.t5.play();
            },3000)
            setTimeout(function () {
                a.t5.reverse();
            },5000)
        }},'-=6')
        a.t4.to('.box-3',1,{scale:10,y:400,ease:Power4.easeIn,onComplete:function () {
            // 时空穿越完毕
            startBoor.stop()
        }})
        // a.t4.to('.p1-11',2,{scale:2,ease:Power3.easeIn},'-=2')
        a.t4.to('.p1-11',2,{scale:70,ease:Expo.easeIn,onComplete:function () {

        },onStart:function () {
            setTimeout(function () {
                $('.box-4').fadeIn(function () {
                    $('.box-2,.box-3,.container').fadeOut(function () {
                        $('.container').remove()
                    });
                    a.t6.play();
                });
            },1500)

        }},'-=2')

        a.t4.pause();

        a.t5.from('.p1-13',.6,{alpha:0,y:-20})
        a.t5.from('.p1-14>div',.6,{alpha:0,y:20},.1)
        a.t5.pause();

        a.t6.from('.p2-3',.6,{alpha:0,y:-20,onComplete:function () {
            a.t7.play();
        }})
        a.t6.from('.p2-6-1',.6,{delay:.5,alpha:0})
        a.t6.from('.jn',2,{delay:1,alpha:0,ease:Linear.easeOut})
        a.t6.from('.p2-t-1',.6,{alpha:0,repeat:-1,yoyo:true,ease:Back.easeOut})
        a.t6.pause();

        a.t7.from('.p2-4',.6,{alpha:0,x:-50,y:-50})
        a.t7.from('.p2-5',.6,{alpha:0,x:50,y:50},'-=.6')
        a.t7.staggerFrom('.p2-6>div',.6,{delay:.5,alpha:0,rotationX:90},.1)
        a.t7.pause();

        a.t8.to('.jn',.6,{y:-300})
        a.t8.to('.p2-9',.6,{alpha:0})
        a.t8.to('.p2-7',.6,{x:-150})
        a.t8.to('.p2-8',.6,{x:150},'-=.6')
        a.t8.to('.p2-7',.6,{rotation:30},'-=.6')
        a.t8.to('.p2-8',.6,{rotation:-30,onStart:function () {
            music2.src = 'images/music3.mp3'
            music2.play();
            $('.g-2').delay(100).fadeIn()
            $('.g-1').delay(100).fadeIn(function () {
                a.g1.play();
                a.g2.play();
                a.t9.play();
            });

        }},'-=.6')
        a.t8.pause();

        a.t9.from('.k1',.6,{x:-200,y:-45,rotation:-45,scale:0,alpha:0})
        a.t9.from('.k2',.6,{x:200,y:-95,rotation:45,scale:0,alpha:0},'-=.5')
        a.t9.from('.k3',.6,{x:-200,y:-145,rotation:-45,scale:0,alpha:0},'-=.5')
        a.t9.from('.k4',.6,{x:200,y:-195,rotation:45,scale:0,alpha:0},'-=.5')
        a.t9.from('.k5',.6,{x:-200,y:-245,rotation:-45,scale:0,alpha:0},'-=.5')
        a.t9.from('.k6',.6,{x:200,y:-295,rotation:45,scale:0,alpha:0,onComplete:function () {
            $('.up').fadeIn(function () {
                isUp = true;
            });
        }},'-=.5')
        a.t9.pause();

        a.t10.staggerFrom('.p3-1>div',.6,{alpha:0,y:-10},.1)
        a.t10.from('.p3-2-1',.6,{alpha:0,y:-100})
        a.t10.from('.p3-2-2',.6,{alpha:0,y:100},'-=.6')
        a.t10.from('.p3-3',.6,{alpha:0,y:-10},'-=.6')
        a.t10.from('.p3-5',.6,{alpha:0,x:-100,ease:Back.easeOut})
        a.t10.from('.p3-6',.6,{alpha:0,x:100,ease:Back.easeOut},'-=.6')
        a.t10.pause();

        a.t11.from('.p4-3',.6,{alpha:0})
        a.t11.from('.p4-3-1',.6,{alpha:0,y:100},'-=.6')
        a.t11.from('.p4-3-2',.6,{alpha:0,y:-100},'-=.6')
        a.t11.from('.jn-end',.6,{alpha:0,y:-10})
        a.t11.staggerFrom(['.p4-2','.p4-4','.p4-6'],.6,{alpha:0,y:-10},.3);
        a.t11.pause();


        a.t12.from('.p3-7',.6,{alpha:0})
        a.t12.from('.p3-8',.6,{alpha:0})
        a.t12.from('.p3-8-1',.6,{alpha:0,y:-100})
        a.t12.from('.p3-8-2',.6,{alpha:0,y:100},'-=.6')
        a.t12.pause();

        a.t13.from('.p3-7-t',.6,{alpha:0})
        a.t13.from('.p3-8-t',.6,{alpha:0})
        a.t13.from('.p3-8-1-t',.6,{alpha:0,y:-100})
        a.t13.from('.p3-8-2-t',.6,{alpha:0,y:100},'-=.6')
        a.t13.pause();

        a.g1.to('.g-1',1,{alpha:0.3,repeat:-1,yoyo:true})
        a.g1.pause();

        a.g2.to('.g-2',1,{alpha:0.3,repeat:-1,yoyo:true})
        a.g2.pause();


        a.music.to('.musicicon2',1,{alpha:0,scale:2,rotation:30,x:20,y:-20,repeat:-1},.5)
        a.music.to('.musicicon3',1,{delay:.5,alpha:0,scale:2,rotation:-30,x:20,y:-20,repeat:-1},.5)
        // a.music.pause();
    }
    
    b.b1.from('.p3-11-2',.5,{alpha:0,repeatDelay:.1,width:0,repeat:-1})
    b.b1.pause();


    // 监听返回
    a.t6.eventCallback('onComplete',function () {
        a.t7.play();
    })
    a.t7.eventCallback('onReverseComplete',function () {
        a.t8.play();

    })
    a.t8.eventCallback('onReverseComplete',function () {
        $('.jn').fadeOut();
        $('.p2-6-1').fadeOut()
        $('.box-5').fadeIn(function () {
            a.t10.play();
        })
    })

    a.t9.eventCallback('onReverseComplete',function () {
        a.t8.reverse();
        a.g1.stop();
        $('.g-1,.g-2').delay(500).fadeOut(1000);
    })

    a.t10.eventCallback('onReverseComplete',function () {
        $('.box-6').fadeIn(function () {
            if(b.index){
                a.t12.play();
            }else {
                a.t13.play();
            }
        })
    })

    // 点击胶囊
    var jnBoor = true;
    $('.jn').on(touchstart,function () {
        if(jnBoor){
            jnBoor = false
            $('.p2-t-1').fadeOut(function () {
                $(this).remove();
                a.t7.timeScale(2)
                a.t7.reverse()
            });
        }
    })

        
    // 返回录音
    $('.back').on(touchstart,function () {
        $('.box-6').fadeOut(function () {
            $('.box-5').fadeIn(function () {
                a.t10.play();
                a.t12.restart()
                a.t12.stop()
                a.t13.restart()
                a.t13.stop()
            });
        })
    })
    
    // 装进胶囊
    $('.p3-13').on(touchstart,function () {
        if(misicId != ''){
            $('.box-6').fadeOut(function () {
                $('.box-7').fadeIn(function () {
                    a.t11.play();
                    $('.p4-1').addClass('flu')
                    // 停止录音接口
                    wx.stopRecord({
                        success: function (res) {
                            misicId = res.localId;
                        }
                    });
                });
            })
        }else {
            alert('请录音')
        }

    })


    // 点击录音
    $('.p3-5,.p3-6').on(touchstart,function () {
        a.t10.timeScale(1.3)
        a.t10.reverse()
        if(this.getAttribute('d-date') == 'l'){
            b.index = true;
            $('.p4-3').css({"background-image":" url(./images/p4-3.png)"})
            $('.p-4').text('收藏或为自己保留，献给未来的你')
        }else{
            b.index = false;
            $('.p4-3').css({"background-image":" url(./images/p4-3-1.png)"})
            $('.p-4').text('寄送好友，献给未来的TA')
        }
    })



    var url_QiongHe_SB = "http://h5.trando9.cn/api/wx/index.php?w=jssdk";
    var imgUrl = "test.trando.com.cn/xiaojiu/20171019-lt1.5/images";

    var toURL = window.location.href.substring(0,location.href.lastIndexOf('/'));
    var wxDefault;
    var titileArr='MOMA';
    var descArr='MOMA';

    wxDefault = {
        title:titileArr,
        desc:descArr,
        imgUrl:imgUrl+"share.jpg",
        link:"test.trando.com.cn/xiaojiu/20171019-lt1.5/index.html",
        success:function(){

        }
    };

    var pageUrl = location.href;
    $.ajax({
        url:url_QiongHe_SB,
        dataType:"jsonp",
        jsonp:"jsoncallback",
        data:{url:encodeURIComponent(pageUrl)},
        success:function(data){
            console.log(data);
            data.debug = false;
            wx.config(data);
            wx.ready(function(){
                wxShare();
                // alert('success');
                bg.play();
                // bg.pause();

                music2.play();
                music2.pause();

                // 监听语音播放完毕接口
                wx.onVoicePlayEnd({
                    success: function (res) {
                        // islu = true;
                        // $('.p3-11-3').addClass('hide')
                        // b.b1.restart()
                        // b.b1.stop()

                        $('.p3-11-3').removeClass('hide')
                        b.b1.stop()
                    }
                });

                // 试听
                $('.p3-11').on(touchstart,function () {
                    if( $('.p3-11-3').hasClass('hide') ){  //试听完毕
                        // islu = true;

                        // 暂停播放接口
                        wx.pauseVoice({
                            localId: misicId // 需要暂停的音频的本地ID，由stopRecord接口获得
                        });

                        $('.p3-11-3').removeClass('hide')
                        b.b1.stop()
                    }else {  //试听中
                        if(isend == 0){
                            alert('请开始录音')
                        }else {
                            if(istryStop){
                                istryStop = false
                                isluStop = false
                                // 停止录音接口
                                wx.stopRecord({
                                    success: function (res) {
                                        misicId = res.localId;
                                    }
                                });
                            }
                            // 播放语音接口
                            if(misicId){
                                wx.playVoice({
                                    localId: misicId
                                });
                                $('.p3-11-3').addClass('hide')
                                b.b1.restart()
                            }
                            $('.p3-10').removeClass('flu')
                            clearInterval(nastop)


                        }
                    }
                })



                // 正式录音
                $('.p3-9').on(touchstart,function () {
                    if( islu ){  //录音
                        islu = false;
                        // 开始录音接口
                        wx.startRecord();
                        isend = 1;
                        isluStop = true;
                        $('.p3-10').addClass('flu')
                        $('.p3-11-3').removeClass('hide')
                        b.b1.stop()
                        clearInterval(nastop)
                        nastop = setInterval(function () {
                            n--;
                            $('.p3-9').text(n+'s');
                            if(n == 0){
                                istryStop = false;
                                isluStop = false;
                                $('.p3-10').removeClass('flu')
                                clearInterval(nastop)
                                setTimeout(function () {
                                        alert('录音结束')
                                },1000)
                                // 停止录音接口
                                wx.stopRecord({
                                    success: function (res) {
                                        misicId = res.localId;
                                    }
                                });
                            }

                        },1000);
                    }else {  //停止录音
                        if(isluStop ){
                            isluStop = false;
                            istryStop = false;
                            $('.p3-10').removeClass('flu')
                            clearInterval(nastop)
                            // 停止录音接口
                            wx.stopRecord({
                                success: function (res) {
                                    misicId = res.localId;
                                }
                            });
                        }
                    }
                })

                // 重录
                $('.p3-12').on(touchstart,function () {
                    isend = 0;
                    istryStop = true;
                    islu = true;
                    // 停止播放接口
                    wx.stopVoice({
                        localId: misicId // 需要停止的音频的本地ID，由stopRecord接口获得
                    });
                    misicId = ''  //录音id为空;

                    TweenMax.to('.p3-12-1',1,{rotation:m-=360})
                    clearInterval(nastop)
                    $('.p3-10').removeClass('flu')
                    n = 30;

                    $('.p3-9').text(n+'s');
                    $('.p3-11-3').removeClass('hide')
                    b.b1.stop();
                })



            });

        }
    })
    function wxShare(data){
        if(typeof(wx) == "undefined"){
            return;
        }
        var newData = $.extend({},wxDefault, data);
        wx.onMenuShareAppMessage({
            title:newData.title,
            desc:newData.desc,
            imgUrl:newData.imgUrl,
            link:newData.link,
            success: newData.success
        });
        wx.onMenuShareQQ(newData);
        wx.onMenuShareWeibo(newData);
        wx.onMenuShareTimeline({
            title:newData.title,
            imgUrl:newData.imgUrl,
            link:newData.link,
            success: newData.success
        });
    }



    // 流线速度
    function speedLine(num) {
        timeLine(0.1);
        if(num <= 6){
            num+=1;
            duration -=0.03;
            console.log(duration,num)
            setTimeout(function () {
                startBoor.timeScale(num)
                return speedLine(num)
            },500)
        }
    }

    // 时间效果
    //_numArry 数组  _index 榕容器下标  _firstIndex数组第一个数   _lastIndex 数组最后一个数 _numDelay动画时间  _bool最后一个动画
    function funAnimate(_numArry,_index,_firstIndex,_lastIndex,numDelay,speen) {
        for (var i = 0; i < _numArry.length; i++) {
            var numRand = parseInt(Math.random() * 10 - 1)
            _numArry[i] = numRand;
            _numArry[0] = _firstIndex;
            _numArry[_numArry.length - 1] = _lastIndex;
            var dropObj = "<div class='d-number-" + _numArry[i] + "'>"+_numArry[i]+"</div>"
            $('.numBox-page' + _index).append(dropObj);
        }
        var dropObjc = "<div class='d-number-" + _numArry[0] + "'>"
        $('.numBox' + _index + '-up').append(dropObjc);
        $('.numBox-page' + _index).css({"margin-top": -_numArry.length * speen}, {"height": _numArry.length * speen});
        TweenMax.to('.numBox-page' + _index, numDelay, {y: _numArry.length * speen});
    }

    // 穿越效果
    function timeLine(d) {
        var objBox = $('#container');
        var centerX = objBox.width() / 2 - 390,
            centerY = objBox.height() / 2 - 11,
            radius = 1500; //半径
        var star = null;
        startBoor.to('',d,{repeat:-1,onRepeat:function(){
            star = document.createElement("img");
            if( line() ){
                star.src = "./images/star1.png";
            }else {
                star.src = "./images/pl-"+randNum(1,3)+".png";
            }

            star.style.transform = star.style.webkittransform = 'translateZ(0)'
            star.width = 771;
            star.height = 12;
            star.style.cssText = "position:absolute; left:" + centerX + "px; top:" + centerY+"px";
            objBox.append(star);
            var angle = Math.random()*Math.PI*2;
            TweenMax.set(star, {
                // alpha:0.6,
                x:0,
                y:0,
                scaleX:0,
                scaleY:0,
                rotationZ:(angle/Math.PI)*180
            });
            TweenMax.to(star,duration, {
                x:(Math.cos(angle) *radius),
                y:(Math.sin(angle) * radius),
                scaleX:1.5,
                scaleY:2.5,
                alpha:0.6,
                ease:Expo.easeIn,
                onCompleteParams:["{self}"],
                onComplete:function(e){
                    e.target.remove();
                }})
        }})
    }

    function line() {
        return Math.random() > 0.5 ? true : false
    }
    // 返回随机数
    function randNum(min,max) {
        return parseInt(Math.random()*(max-min+1)+min)
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

        if($(this).hasClass('musicrotate')){

            a.music.restart()
            a.music.stop()
            bg.pause()
        }else {
            bg.play()
            a.music.play()
        }
        // $(this).hasClass('musicrotate') ? bg.pause() : bg.play()
        // $(this).hasClass('musicrotate') ? a.music.restart() : a.music.play()
        document.querySelector('.musicicon').classList.toggle('musicrotate')
    })
});