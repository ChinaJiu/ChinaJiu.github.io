$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });

    var Ganmate=new TimelineMax();

    var motionObj = {};
    var sound_1;
    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    });
    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'bomb.png'},
        {src:loadingPath+'c-1.png'},
        {src:loadingPath+'c-2.png'},
        {src:loadingPath+'c-3.png'},
        {src:loadingPath+'c-4.png'},
        {src:loadingPath+'c-5.png'},
        {src:loadingPath+'c-6.png'},
        {src:loadingPath+'c1-bg.jpg'},
        {src:loadingPath+'chart-img.png'},
        {src:loadingPath+'chart-upBg.png'},
        {src:loadingPath+'g-1.png'},
        {src:loadingPath+'g-2.png'},
        {src:loadingPath+'g-3.png'},
        {src:loadingPath+'g-go.png'},
        {src:loadingPath+'game-1.png'},
        {src:loadingPath+'gameBegin-1.png'},
        {src:loadingPath+'gameBegin-2.png'},
        {src:loadingPath+'gameBegin-3.png'},
        {src:loadingPath+'gameBegin-4.png'},
        {src:loadingPath+'gameBegin-5.png'},
        {src:loadingPath+'gameBegin-bg.jpg'},
        {src:loadingPath+'gameChart-1.png'},
        {src:loadingPath+'gameRule-1.png'},
        {src:loadingPath+'gameRule-2.png'},
        {src:loadingPath+'gameWord-1.png'},
        {src:loadingPath+'gameWord-2.png'},
        {src:loadingPath+'gameWord-3.png'},
        {src:loadingPath+'gameWord-4.png'},
        {src:loadingPath+'loading-1.png'},
        {src:loadingPath+'loading-2.png'},
        {src:loadingPath+'loading-3.png'},
        {src:loadingPath+'loading-4.png'},
        {src:loadingPath+'loading1-1.png'},
        {src:loadingPath+'loading1-2.png'},
        {src:loadingPath+'m-1.png'},
        {src:loadingPath+'m-2.png'},
        {src:loadingPath+'m-3.png'},
        {src:loadingPath+'m-4.png'},
        {src:loadingPath+'m-5.png'},
        {src:loadingPath+'m-6.png'},
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'n-1.png'},
        {src:loadingPath+'n-2.png'},
        {src:loadingPath+'n-3.png'},
        {src:loadingPath+'n-4.png'},
        {src:loadingPath+'n-5.png'},
        {src:loadingPath+'n-6.png'},
        {src:loadingPath+'p1-1.png'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-3.png'},
        {src:loadingPath+'p1-4.png'},
        {src:loadingPath+'p2-1.png'},
        {src:loadingPath+'p2-2.png'},
        {src:loadingPath+'p2-3.png'},
        {src:loadingPath+'p2-4.png'},
        {src:loadingPath+'p2-5.png'},
        {src:loadingPath+'p2-6.png'},
        {src:loadingPath+'p2-7.png'},
        {src:loadingPath+'p2-8.png'},
        {src:loadingPath+'p2-bg.jpg'},
        {src:loadingPath+'p3-10.png'},
        {src:loadingPath+'p3-bg.jpg'},
        {src:loadingPath+'present-1.png'},
        {src:loadingPath+'present-2.png'},
        {src:loadingPath+'present-3.png'},
        {src:loadingPath+'v-1.png'},
        {src:loadingPath+'v-2.png'},
        {src:loadingPath+'v-3.png'},
        {src:loadingPath+'v-4.png'},
        {src:loadingPath+'v-5.png'},
        {src:loadingPath+'v-6.png'}


    ];
    var queue = new createjs.LoadQueue();
    //queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);
    //queue.loadFile({id:"sound_1", src:"images/bg.mp3"});

    //function intsound(){
    //    var sounds = [
    //        {src: "Public/images/musicicon.mp3", id: 2},
    //        {src: "Public/images/aa.mp3", id: 1}
    //
    //    ];
    //    createjs.Sound.alternateExtensions = ["ogg"];
    //    createjs.Sound.registerSounds(sounds, imagesurl);
    //}
    //intsound();

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);
    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
        $('.l-6').css("width", 2.56*Math.ceil(event.loaded*100));
    }

    $(".main").fadeIn(500,function(){
        motionObj['page'+1].play();
    });
    TweenMax.from('.l-1',.5,{alpha:0,repeat:-1,yoyo:true,ease:Linear.easeNone})

    function handleComplete() {
        $('.loading').remove();
        $('.l-5,.l-6').fadeOut();
        initPageMotion();
    }

    //初始化动画
    function initPageMotion(){

        TweenMax.to('.l-4',2,{delay:1,alpha:0,scale:30,ease:Linear.easeNone,onComplete: function () {
            $('.l-4').fadeOut();
            $('.p1-4').fadeIn();
            $('.p1-2,.p1-3').fadeIn(1000, function () {
                TweenMax.to('.p1-2',2,{alpha:0,repeat:-1,yoyo:true,ease:Linear.easeNone})
                TweenMax.to('.p1-3',2,{delay:1,alpha:0,repeat:-1,yoyo:true,ease:Linear.easeNone})
            });
        }})
        TweenMax.to('.gameBegin-1',6,{x:800,y:-136,repeat:-1,ease:Linear.easeNone})
        TweenMax.to('.gameBegin-2',6,{delay:1.8,x:800,y:-136,repeat:-1,ease:Linear.easeNone})
        TweenMax.to('.gameBegin-3',6,{delay:3.7,x:800,y:-136,repeat:-1,ease:Linear.easeNone})

        Ganmate.add(TweenMax.from('.g-3',1,{alpha:0,scale:7,ease:Expo.easeOut}));
        Ganmate.add(TweenMax.to('.g-3',1,{alpha:0,scale:7,ease:Expo.easeOut}));
        Ganmate.add(TweenMax.from('.g-2',1,{alpha:0,scale:7,ease:Expo.easeOut}),'-=1');
        Ganmate.add(TweenMax.to('.g-2',1,{alpha:0,scale:7,ease:Expo.easeOut}));
        Ganmate.add(TweenMax.from('.g-1',1,{alpha:0,scale:7,ease:Expo.easeOut}),'-=1');
        Ganmate.add(TweenMax.to('.g-1',1,{alpha:0,scale:7,ease:Expo.easeOut}));
        Ganmate.add(TweenMax.from('.g-go',1,{alpha:0,scale:7,ease:Expo.easeOut}),'-=1');
        Ganmate.add(TweenMax.to('.g-go',1,{alpha:0,scale:7,ease:Expo.easeOut,onComplete: function () {
            dropBing();
            $('.gameWord').fadeOut();
        }}));
        Ganmate.pause();
    }

    //测试
    //$('.gameBegin').on(touchstart, function () {
    //    console.log($('.gameBegin-3').offset().left,$('.gameBegin-3').offset().top);
    //})

    //生产频率
    var dropBingInterval= .3;
    //下落时间
    var dropBingSpeed= 4;
    var presentNum=0;
    //分数
    var presentScore=0;
    //倒计时
    var countdown=30;
    function dropBing(){
       var setTimeup=setInterval(function () {
            countdown--;
            $('.gameBegin-5>span').text(countdown);
            if(countdown<=0){
                clearInterval(setTimeup);
                $('.presents div').remove();
                TweenMax.killAll();
            }
        },1000);
        TweenMax.to(".presents",dropBingInterval,{repeat:-1,onRepeat:function(){
            var dropObj="<div class='present-"+Math.ceil(Math.random()*4)+"'>"
            presentNum=parseInt(Math.random()*3)+1;
            //presentNum=1;
                if(presentNum==1 && 0<$('.gameBegin-1').offset().left && $('.gameBegin-1').offset().left<640-$('.gameBegin-1').width()){
                    $('.presents').append(dropObj);
                    console.log(2);
                    TweenMax.set('.presents div:last-of-type',{scale:.8,x:$('.gameBegin-1').offset().left+25,y:$('.gameBegin-1').offset().top+170})
                    TweenMax.to('.presents div:last-of-type',dropBingSpeed,{scale:1,y:1100,ease:Linear.easeNone,onCompleteParams:["{self}"],onComplete:function(e){
                        e.target.remove();
                    }})
                }else if(presentNum==2 && 0<$('.gameBegin-2').offset().left && $('.gameBegin-2').offset().left<640-$('.gameBegin-2').width()){
                    $('.presents').append(dropObj);
                    TweenMax.set('.presents div:last-of-type',{scale:.8,x:$('.gameBegin-2').offset().left+25,y:$('.gameBegin-2').offset().top+177})
                    TweenMax.to('.presents div:last-of-type',dropBingSpeed,{scale:1,y:1100,ease:Linear.easeNone,onCompleteParams:["{self}"],onComplete:function(e){
                        e.target.remove();
                    }})
                }else if(presentNum==3 && 0<$('.gameBegin-3').offset().left && $('.gameBegin-3').offset().left<640-$('.gameBegin-3').width()){
                    $('.presents').append(dropObj);
                    TweenMax.set('.presents div:last-of-type',{scale:.8,x:$('.gameBegin-3').offset().left+50,y:$('.gameBegin-3').offset().top+220})
                    TweenMax.to('.presents div:last-of-type',dropBingSpeed,{scale:1,y:1100,ease:Linear.easeNone,onCompleteParams:["{self}"],onComplete:function(e){
                        e.target.remove();
                    }})
                }
            $('.present-1,.present-2,.present-3').on(touchstart,function(){
                TweenMax.to(this,0.1,{scaleX:0,scaleY:0,ease:Expo.easeIn,onComplete:function(){
                    presentScore++;
                    $('.gameBegin-4>span').text(presentScore);
                    $(this).remove();
                }})
            })
            $('.present-4').on(touchstart,function(){
                TweenMax.to(this,0.1,{scaleX:0,scaleY:0,ease:Expo.easeIn,onComplete:function(){
                    presentScore-=5;
                    if(presentScore<0){
                        presentScore=0
                    }
                    $('.gameBegin-4>span').text(presentScore);
                    $(this).remove();
                }})
            })
        }})
    }

    //游戏规则
    $('.gameWord-4').on(touchstart, function () {
        clouldAnimateJ();
        setTimeout(function () {
            $('.gameRule').fadeIn();
        },600);
    })
    //关闭游戏规则
    $('.gameRule-2').on(touchstart, function () {
        $('.gameRule').fadeOut(function () {
            clouldAnimateC();
        });
    })
    //排行榜
    $('.gameWord-2').on(touchstart, function () {
        clouldAnimateJ();
        setTimeout(function () {
            $('.gameChart').fadeIn(function () {
                initscroll();
            });
        },600);
    })
    //关闭排行榜
    $('.gameChart-2').on(touchstart, function () {
        $('.gameChart').fadeOut(function () {
            clouldAnimateC();
        });
    })

    //开始游戏
    $('.gameWord-3').on(touchstart, function () {
        gameBeginAnimate();
    })

    function gameBeginAnimate(){
        TweenMax.to('.gameWord-1',.6,{scale:5,alpha:0,ease:Expo.easeIn,onComplete: function () {
            Ganmate.restart();
        }})
        TweenMax.to('.gameWord-2',.6,{x:-300,ease:Expo.easeIn})
        TweenMax.to('.gameWord-3',.6,{scale:0,ease:Expo.easeIn})
        TweenMax.to('.gameWord-4',.6,{x:300,ease:Expo.easeIn})
    }
    //点击进入
    $('.p1-4').on(touchstart, function () {
        $('.l-3').fadeIn().delay(1000).fadeIn(1, function () {
            TweenMax.to('.container1',1,{alpha:0,scale:5,ease:Expo.easeIn,onComplete: function () {
                $('.container2').fadeIn(function () {
                    setTimeout(function () {
                        $('.p2-4,.p2-8').fadeOut();
                    },2000);
                });
            }});
        })
    })

        var indexOld=1;
    var touchBool=true;
    var touchTimes=0;
    $('.C-Box>div').on(touchstart, function () {
        if(touchBool){
            touchBool=false;
            touchTimes++;
        var index=$(this).index()+1;
        $('.n-'+indexOld).fadeOut(200, function () {
            console.log(index)
            $('.n-'+index).fadeIn(200);
        })
        indexOld=$(this).index()+1;

        var upTime=.4;
        var rotationTime=.5;
        if(index==1){


            TweenMax.to('.c-'+index,upTime,{rotation:20,bezier:{values:[{x:-10, y:-150},{x:0, y:-410}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{rotation:110,bezier:{values:[{x:20, y:-430},{x:40, y:-410}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }else if(index==2){
            TweenMax.to('.c-'+index,upTime,{rotation:20,bezier:{values:[{x:10, y:-150},{x:20, y:-400}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{scale:1,rotation:110,bezier:{values:[{x:80, y:-430},{x:120, y:-400}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }else if(index==3){
            TweenMax.to('.c-'+index,upTime,{scale:.9,rotation:20,bezier:{values:[{x:-10, y:-200},{x:-20, y:-290}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{scale:1,rotation:110,bezier:{values:[{x:40, y:-300},{x:73, y:-290}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }else if(index==4){
            TweenMax.to('.c-'+index,upTime,{rotation:-20,bezier:{values:[{x:10, y:-150},{x:20, y:-420}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{rotation:-110,bezier:{values:[{x:-70, y:-430},{x:-110, y:-420}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }else if(index==5){
            TweenMax.to('.c-'+index,upTime,{scale:.9,rotation:-20,bezier:{values:[{x:-10, y:-200},{x:-20, y:-250}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{scale:1,rotation:-110,bezier:{values:[{x:-70, y:-300},{x:-130, y:-250}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }else if(index==6){
            TweenMax.to('.c-'+index,upTime,{rotation:-20,bezier:{values:[{x:-10, y:-150},{x:-20, y:-300}]},ease:Linear.easeNone,onComplete: function () {
                TweenMax.to('.c-'+index,rotationTime,{scale:1,rotation:-110,bezier:{values:[{x:-100, y:-330},{x:-190, y:-300}]},ease:Linear.easeNone,onComplete: function () {
                    animateLighth(index);
                }});
            }});
        }
        }
    })
    function animateLighth(_index){
        $('.v-'+_index).fadeIn();
        TweenMax.from('.v-'+_index,.9,{transformOrigin: "50% 0%",scale:0,ease:Linear.easeIn,onComplete: function () {
            TweenMax.to('.v-'+_index,.5,{alpha:0,y:200,ease:Expo.easeIn,onComplete: function () {
                touchBool=true;
                $('.c-'+_index).fadeOut(function () {
                    if(touchTimes==6){
                        setTimeout(function () {
                            $('.n-'+_index).fadeOut();
                            $('.p2-7').fadeIn(1000,function () {
                                TweenMax.to('.p2-7',1.5,{scale:5,alpha:0,ease:Expo.easeIn,onComplete: function () {
                                    $('.p2-7').fadeOut();
                                }})
                            })
                            $('.p2-6').fadeIn(1000,function () {
                                TweenMax.to('.p2-6',1,{scale:2,transformOrigin: "50% 80%",ease:Expo.easeIn,onComplete: function () {
                                    $('.p2-6').fadeOut(function () {
                                        $('.p2-2').fadeOut();
                                        $('.p2-3').fadeIn(function () {
                                                $('.p2-5').fadeIn();
                                                $('.p2-8').fadeIn(function () {
                                                    $('.container3').delay(2000).fadeIn(1000);
                                                });
                                        });
                                    });
                                }})
                            })
                        },3000);
                    }
                });
                TweenMax.set('.m-'+_index,{alpha:0.8});
                $('.m-'+_index).fadeIn(function () {
                    TweenMax.to('.m-'+_index,1,{alpha:0,repeat:-1,yoyo:true,ease:Expo.easeIn});

                })
            }});
        }});
    }

    //云朵进动画
    function clouldAnimateJ(){
        TweenMax.to('.cloud-left-1',.6,{alpha:1,x:900,y:900,ease:Expo.easeOut})
        TweenMax.to('.cloud-left-2',.6,{alpha:1,x:-900,y:900,ease:Expo.easeOut})
        TweenMax.to('.cloud-right-1',.6,{alpha:1,x:900,y:-900,ease:Expo.easeOut})
        TweenMax.to('.cloud-right-2',.6,{alpha:1,x:-900,y:-900,ease:Expo.easeOut})
    }
    //云朵出动画
    function clouldAnimateC(){
        TweenMax.to('.cloud-left-1',.6,{alpha:0,x:0,y:0,ease:Linear.easeIn})
        TweenMax.to('.cloud-left-2',.6,{alpha:0,x:0,y:0,ease:Linear.easeIn})
        TweenMax.to('.cloud-right-1',.6,{alpha:0,x:0,y:0,ease:Linear.easeIn})
        TweenMax.to('.cloud-right-2',.6,{alpha:0,x:0,y:0,ease:Linear.easeIn})
    }

    //初始化滑动，必须元素处于显示状态 (#wrapper  必须处于显示状态然后调用initscroll函数才管用)
    function initscroll(){
        new IScroll('#wrapper', {
            scrollY: true
        });
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
            sound_1.pause();
            $(this).removeClass('musicrotate');
        }else{
            sound_1.play();
            $(this).addClass('musicrotate');
        }
    })
});