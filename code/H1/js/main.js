$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });


    var motionObj = {};
    var motionObj_page1 = new TimelineMax();
    var mo_p2_0 = new TimelineMax();
    //var mo_p2_1 = new TimelineMax();
    //var mo_p2_2 = new TimelineMax();
    //var mo_p2_3 = new TimelineMax();
    //var mo_p2_4 = new TimelineMax();
    //var mo = ["mo_p2_0","mo_p2_1","mo_p2_2","mo_p2_3","mo_p2_4"];

    var nearNum=1939;
    var closeNum=0;
    var sound_1;
    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    });
    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'}

    ];
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);
    queue.loadFile({id:"sound_1", src:"images/bg_1.mp3"});

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);
    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    }

    function handleComplete() {
        $('.loading').remove();
        initPageMotion();
        sound_1 = createjs.Sound.play("sound_1");  // 使用id。也可以使用完整路径或event.src来源。
        sound_1.loop=true;
    }
    //初始化动画
    function initPageMotion(){
        $(".main").fadeIn(500,function(){
            motionObj['page'+1].play();
        });

        motionObj_page1.add(TweenMax.to('.p1_1', 5,{transformOrigin: "53.3% 54.8%",rotation:3600,ease:Cubic.easeIn,onStart: function () {
            var nearStop=setInterval(function () {
                nearNum++;
                $('.p1_1_1').html(nearNum);
                if( nearNum>=2015 ){
                    clearInterval(nearStop);
                    console.log(1);
                }
            },74);
        },onComplete: function () {
        }}));
        motionObj_page1.add(TweenMax.to('.p1_1', .8,{alpha:0,scale:0, ease:Linear.ease,onComplete: function () {
        }}),'-=.8');
        motionObj_page1.add(TweenMax.from('.p1_2', .8,{alpha:0,scale:0, ease:Linear.ease}))
        motionObj_page1.add(TweenMax.to('.p1_1_1,.logo_1', .8,{scale:0, ease:Linear.ease}));
        motionObj_page1.add(TweenMax.from('.p1_3', .5,{x:100,alpha:0,ease:Linear.ease,onComplete: function () {
            var hNum=0;
            setInterval(function () {
                hNum++;
                $('.h2_0'+hNum).fadeIn(500);
            },100);
        }}))
        motionObj_page1.add(TweenMax.from('.p1_4', .5,{delay:.8,x:-100,alpha:0,ease:Linear.ease,onComplete: function () {
            var hNum=0;
            setInterval(function () {
                hNum++;
                $('.h3_0'+hNum).fadeIn(500);
            },100);
        }}))
        motionObj_page1.add(TweenMax.from('.p1_5', .5,{delay:.8,x:100,alpha:0,ease:Linear.ease,onComplete: function () {
            var hNum=0;
            setInterval(function () {
                hNum++;
                $('.h4_0'+hNum).fadeIn(500);
            },100);
            //$('.p1_3').css("animation-play-state","paused");
        }}))
        motionObj_page1.add(TweenMax.to('.p1_6', .3,{delay:2,x:240,y:-335,ease:Linear.ease,onComplete: function () {
            TweenMax.to('.p1_6', .3,{scale:0,ease:Linear.ease})
        }}))
        motionObj_page1.add(TweenMax.from('.p1_7', .3,{alpha:0,scale:0,ease:Linear.ease}),'-=.1')

        motionObj_page1.add(TweenMax.to('.p1_8', .3,{x:-244,y:-533,ease:Linear.ease,onComplete: function () {
            TweenMax.to('.p1_8', .3,{scale:0,ease:Linear.ease})
        }}),'-=.1')
        motionObj_page1.add(TweenMax.from('.p1_9', .3,{alpha:0,scale:0,ease:Linear.ease}),'-=.1')

        motionObj_page1.add(TweenMax.from('.p1_10_tu', .8,{alpha:0,ease:Linear.ease,onStart: function () {
            initFog(".p1_10_tu","p1_10_2.png","p1_10.png");
            $('.p1_2,.p2_1').fadeOut(500);
            $('.p2_3').fadeIn(500);
            $('.p1_3,.p1_4,.p1_5,.p1_7,.p1_9').fadeOut(500);
            for(var i=0;i<13;i++){
                $('.h2_0'+i).fadeOut(500);
                $('.h3_0'+i).fadeOut(500);
                $('.h4_0'+i).fadeOut(500);
            }
            //$()
        }}))
        motionObj_page1.add(TweenMax.from('.p1_11', .8,{alpha:0,ease:Linear.ease}),'-=.8')
        motionObj_page1.add(TweenMax.from('.p2_1', .8,{alpha:0,ease:Linear.ease}),'-=.8')
    }


    var obj2 =$(".page_data");
    var cliX;
    var cliY;
    var moveX;
    var moveY;
    var objIndex;
    var panduanX;
    var panduanY;

    var scilBool=true;
    obj2.on(touchstart, function(event) {
        if(scilBool){
            objIndex=$(this).attr("data-id");
            cliX=event.originalEvent.targetTouches[0].pageX;
            cliY=event.originalEvent.targetTouches[0].pageY;
        }

    })
    obj2.on(touchmove, function(event) {
        if(scilBool){
            moveX=event.originalEvent.targetTouches[0].pageX-cliX;
            moveY=event.originalEvent.targetTouches[0].pageY-cliY;
            $('.p3_'+objIndex).css("left",moveX+"px");
            $('.p3_'+objIndex).css("top",moveY+"px");
            panduanX=$('.p3_'+objIndex).offset().left;
            panduanY=$('.p3_'+objIndex).offset().top;
        }
    })

    obj2.on(touchend, function(event) {
        if(scilBool){
            if(panduanX >= 190 && panduanX <= 400 && panduanY >= 250 && panduanY <= 550 ){
                //bottomcount();
                scilBool=false;
                $('.p3_'+objIndex).hide().remove();

                $('.p2_'+objIndex+'_1').fadeIn(500, function () {

                    TweenMax.from('.p2_'+objIndex+'_2', .4,{alpha:0,repeat:2,ease:Expo.ease,onStart: function () {
                        $('.p2_'+objIndex+'_2').show();
                    },onComplete: function () {
                        $('.p2_'+objIndex+'_3').fadeIn(500, function () {
                            TweenMax.from('.p2_'+objIndex+'_3_1', .8,{ease:Expo.ease,onStart: function () {
                                $('.p2_'+objIndex+'_3_1').fadeIn(500);
                            }})
                            TweenMax.from('.p2_'+objIndex+'_3_2', .8,{x:-100,ease:Expo.ease,onStart: function () {
                                $('.p2_'+objIndex+'_3_2').fadeIn(500);
                            }})
                            TweenMax.from('.p2_'+objIndex+'_3_3', .8,{x:100,ease:Expo.ease,onStart: function () {
                                $('.p2_'+objIndex+'_3_3').fadeIn(500);
                            },onComplete: function () {
                                TweenMax.from('.p2_'+objIndex+'_3_4', .8,{ease:Expo.ease,onStart: function () {
                                    $('.p2_'+objIndex+'_3_4').fadeIn(500);
                                }})
                            }})

                            $('.p2_'+objIndex+'_3_1').on(touchstart, function () {
                                closeNum++;
                                $('.p2_'+objIndex+'_3').fadeOut(500);
                                $('.p2_'+objIndex+'_2').fadeOut(500);
                                scilBool=true;
                                bottomcount();
                                if(closeNum==5){
                                    $('.p3_bottom,.p2_2,.p2_3_s').fadeOut(500);
                                }
                            })

                        })
                    }})
                });
            }else{
                $('.p3_'+objIndex).css("left","0px");
                $('.p3_'+objIndex).css("top","0px");
            }
        }

    })



    function bottomcount(){
        var iscount = $(".p3_bottom div").length;
        var pageWidth = (530/iscount)-106;
        for (var i = 0; i <= iscount; i++) {
            if(i == 0){
                var left = pageWidth/2;
            }else{
                var left = ((530/iscount)*i)+pageWidth/2;
            }
            $(".p3_bottom div").eq(i).animate({"margin-left":left});
        };
    }
    //bottomcount();


    //离开
    //$('#tape').on(touchend, function(){
    //    nolocal();
    //})
    //var this_div;
    //$('.p3_bottom>div').on(touchstart, function (e,event) {
    //    console.log(e.clientX, e.clientY);
    //    this_div=$(this).index();
    //    var startX=$('.p3_'+this_div).offset().left;
    //    var startY=$('.p3_'+this_div).offset().top;
    //    console.log(startX,startY);
    //})
    //$('.p3_bottom>div').on(touchmove, function (e,event) {
    //    console.log(e.clientX, e.clientY);
    //    $('.musicicon').html(e.clientX);
    //})

    //涂抹
    //initFog(".p10_tu","car_red_2.jpg","car_red_1.jpg");
    var ininBool=false;
    function initFog(toch,t_bg,t_fg){

            $(toch).wScratchPad({
                bg:loadingPath+t_bg,
                fg:loadingPath+t_fg,
                size:100,
                scratchUp:function(e, percent) {
                    $('.ts').fadeOut(500);
                    if(percent >=85) {
                        this.clear();
                        //涂抹结束
                        if(ininBool==false){
                            ininBool=true;
                            $('.p1_10_tu,.p2_3').fadeOut(500);
                            $('.p1_11').fadeOut(500, function () {
                                $('.p2_bg,.p3_bottom,.p2_2,.p2_3_s,.p2_1').fadeIn(500);

                            });

                        }
                    }
                }
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