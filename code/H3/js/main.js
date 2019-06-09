$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });

    TweenMax.set('.p1-3,.p6-7-r,.p4-6-r,.p3-4-r',{rotationY:180})

    TweenMax.to('.load-img',1,{alpha:.5,repeat:-1,yoyo:true})
    var motionObj = {};
    var Tanimate = []
    var bg = $('#bg')[0];
    var  fadeOutTime = 2000;
    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    });
    var x0,y0;
    var Tp1 = new TimelineMax();
    var Tp2 = new TimelineMax();
    var Tp3 = new TimelineMax();
    var btn_boor = false;

    var stageW=$(window).width();
    var stageH=$(window).height();
    var allowMove=true;
    var allowUserMove=true;
    
    var firstClassName=$('.page>div:first-of-type').attr('class');
    var finalClassName=$('.page>div:last-of-type').attr('class');

    var nextPageClassName='';
    var isLoop=false;//页面是否可以循环滑动
    var pageMoveTimer=0.8;//页面滑动时间，不建议修改
    var oneUp = true;
    //滑动事件
    var hammertime = new Hammer(document.getElementById('page'), {
        preventDefault: true
    });
    hammertime.on('panmove', function(ev) {
        if(allowMove && allowUserMove){
            if(ev.direction==8){
                //向上滑动
                if($('.page>div').eq(1).attr('class')!=firstClassName || isLoop){
                    if(oneUp){
                        allowMove = false;
                        oneUp = false;
                        $('.p1-box').fadeOut(function () {
                            $('.p2-box').fadeIn(function () {
                                Tp2.play();
                                allowMove = true;
                            });
                        });
                    }else {
                        pageMove(-1)
                    }

                }
            }else if(ev.direction==16){
                //向下滑动
                if($('.page>div:last-of-type').attr('class')!=finalClassName){
                    // pageMove(1)
                }
            }
        }
    });
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    //滑动事件

    //预加载图片，音乐
    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'bottom-logo.png'},
        {src:loadingPath+'btn-affirm.png'},
        {src:loadingPath+'btn-apply.png'},
        {src:loadingPath+'btn-go.png'},
        {src:loadingPath+'exp-1.png'},
        {src:loadingPath+'exp-2.png'},
        {src:loadingPath+'exp-3.png'},
        {src:loadingPath+'exp-4.png'},
        {src:loadingPath+'hint.png'},
        {src:loadingPath+'musicicon.png'},
        {src:loadingPath+'p1-1.jpg'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-bg.jpg'},
        {src:loadingPath+'p2-bg.jpg'},
        {src:loadingPath+'p3-1.png'},
        {src:loadingPath+'p3-2.png'},
        {src:loadingPath+'p3-3.png'},
        {src:loadingPath+'p3-bg.jpg'},
        {src:loadingPath+'p4-1.png'},
        {src:loadingPath+'p4-2.png'},
        {src:loadingPath+'p4-3.png'},
        {src:loadingPath+'p4-4.png'},
        {src:loadingPath+'p4-5.png'},
        {src:loadingPath+'p4-bg.jpg'},
        {src:loadingPath+'p5-bg.jpg'},
        {src:loadingPath+'t1-1.png'},
        {src:loadingPath+'t1-2.png'},
        {src:loadingPath+'t1-a.png'},
        {src:loadingPath+'t1-b.png'},
        {src:loadingPath+'t1-c.png'},
        {src:loadingPath+'t1-d.png'},
        {src:loadingPath+'t2-1.png'},
        {src:loadingPath+'t2-a.png'},
        {src:loadingPath+'t2-b.png'},
        {src:loadingPath+'t2-c.png'},
        {src:loadingPath+'t2-d.png'},
        {src:loadingPath+'t3-1.png'},
        {src:loadingPath+'t3-a.png'},
        {src:loadingPath+'t3-b.png'},
        {src:loadingPath+'t3-c.png'},
        {src:loadingPath+'t3-d.png'},
        {src:loadingPath+'t4-a.png'},
        {src:loadingPath+'t4-b.png'},
        {src:loadingPath+'t4-c.png'},
        {src:loadingPath+'t4-d.png'},
        {src:loadingPath+'t5-a.png'},
        {src:loadingPath+'t5-c.png'},
        {src:loadingPath+'t5-d.png'},
        {src:loadingPath+'t6-a.png'},
        {src:loadingPath+'t6-b.png'},
        {src:loadingPath+'t6-c.png'},
        {src:loadingPath+'t6-d.png'},
        {src:loadingPath+'t7-a.png'},
        {src:loadingPath+'t7-b.png'},
        {src:loadingPath+'t7-c.png'},
        {src:loadingPath+'t7-d.png'},
        {src:loadingPath+'t8-a.png'},
        {src:loadingPath+'t8-b.png'},
        {src:loadingPath+'t8-c.png'},
        {src:loadingPath+'t8-d.png'},
        {src:loadingPath+'t9-a.png'},
        {src:loadingPath+'t9-b.png'},
        {src:loadingPath+'t9-c.png'},
        {src:loadingPath+'t9-d.png'},
        {src:loadingPath+'t10-a.png'},
        {src:loadingPath+'t10-b.png'},
        {src:loadingPath+'t10-c.png'},
        {src:loadingPath+'t10-d.png'},
        {src:loadingPath+'t11-a.png'},
        {src:loadingPath+'t11-b.png'},
        {src:loadingPath+'t11-c.png'},
        {src:loadingPath+'t11-d.png'},
        {src:loadingPath+'top.png'},
        {src:loadingPath+'top-logo.png'},
        {src:loadingPath+'touch-text.png'}
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
            motionObj["page1"].play();
            Tp1.play();
            var levels = [
                {
                    name: '五角星',
                    codes: [
                        {x1: 310, y1: 0, dot:1 },
                        {x1: 144, y1: 119, dot:2},
                        {x1: 471, y1: 119, dot:3},
                        {x1: 203, y1: 308, dot:4},
                        {x1: 406, y1: 308, dot:5}
                    ],
                    radius: 10 // 点的半径
                }
            ]

            var codeLength = levels[0].codes.length; // 获取点的数组长度
            var repCodes = levels[0].codes.slice(); // 复制数组并解除引用关系

            var startX,startY,endX,endY; // 记录每个条线段的起始点和结束点
            var firstX,firstY; // 记录第一个点的x，y坐标

            var nowIndex = 0; // 保存新的画好的线
            var curIndex = 0; // 记录当前的线
            var curNum;  //记录第一个点下标
            var curDot,curLine; // 当前的点当前的线
            var newLines = []; // 新得线
            var drawBoor = false; // 可否清除画布
            var pageNum;
            init(); // 初始化

            // pixi引擎
            var Container = PIXI.Container,
                autoDetectRenderer = PIXI.autoDetectRenderer,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                Sprite = PIXI.Sprite,
                Graphics = PIXI.Graphics;
            var stageY = 100;
            var h = (window.innerHeight - $('.canvas').height())/2 + stageY;
            var renderer = autoDetectRenderer(640, 1039,{transparent:true});
            var pixi_canvas = renderer.view;
            document.querySelector('.canvas').appendChild(pixi_canvas);
            var stage = new Container();
            // var canvsPositionY = (window.innerHeight - pixi_canvas.height)/2;
            renderer.render(stage);


            // S svg
            var path1 = 'M144 219 L203 408 L203 408 L310 100 L406 408 L471 219 L144 219'
            var path2 = 'M144 219 L203 408 L471 219 L310 100 L406 408 L144 219'
            var path3 = 'M144 219 L406 408 L310 100 L203 408 L471 219 L144 219'

            var path4 = 'M144 219 L406 408 L203 408 L310 100 L471 219 L144 219'
            var path5 = 'M144 219 L203 408 L406 408 L310 100 L471 219 L144 219'

            function svgPathPlay(el,path,time,callBack) {
                $(el).fadeIn();
                var svg = Snap(el);
                var pathsvg = svg.paper.path({d: path, stroke:'#fff', fill: 'rgba(0,0,0,0)'});
                var length = Snap.path.getTotalLength(pathsvg);
                pathsvg.attr({
                    'stroke-dashoffset': length,
                    'stroke-dasharray': length, // 用Snap的API计算复杂的path长度
                    'stroke-width': 4,
                    "fill-opacity": 0.5
                });
                $('.svg-box').fadeIn()
                TweenMax.to('.canvas',1,{alpha:1})
                Snap.animate(length, 0, function(val) {
                    pathsvg.attr({
                        'stroke-dashoffset': val
                    });
                }, time, mina.easeout(),callBack);
            }

            function svgCallback1() {
                $('#hand').fadeOut();
                $('.svg-box').fadeOut(1000,function () {
                    $('#svg1').fadeOut();
                    $('.touch-text').removeClass('hide');
                });
                TweenMax.to('.canvas',1,{alpha:0})
                $('.T12').fadeIn(fadeOutTime,function () {
                    Tanimate["Ta12"].play();
                })
                var touch_boor = 0;
                $('.canvas').on(touchstart,function () {

                    if ( touch_boor == 0 ) {
                        touch_boor = null;
                        // touch_boor = false;
                        $('.touch-text').addClass('hide');
                        TweenMax.to('.canvas',1,{alpha:1})
                        $( '.T12' ).fadeOut(1000,function () {
                            $('.btn-go').fadeIn();  //去远洋
                            $('.hint').fadeIn(function () {
                                touch_boor = 1
                            });
                            TweenMax.to('.hint-3',1,{x: 327,repeat:-1})
                            TweenMax.from('.hint-2',1,{width:0,repeat:-1})
                        });
                    }else if( touch_boor == 1 ){
                        $('.hint').fadeOut(function () {
                            touch_boor = 2
                            // 监听手指触摸
                            console.log('yes')
                            pixi_canvas.addEventListener( 'touchmove', touchDrawLine, false )
                        });
                    }else {
                        $('.hint').fadeOut();
                    }
                })
            }


            function svgCallback2() {
                $('.T8').fadeIn(fadeOutTime);
                Tanimate["Ta11"].play()
                TweenMax.to('.canvas',1,{alpha:0})
                $('.svg-box').fadeOut(1000,function () {
                    $('#svg2').fadeOut(function () {
                        setTimeout(function () {
                            $('.T8').fadeOut(1000);
                            svgPathPlay('#svg3',path3,2000,svgCallback3)
                        },3000)
                    });
                });
            }

            function svgCallback3() {
                $('.T9').fadeIn(fadeOutTime);
                Tanimate["Ta12"].play();
                TweenMax.to('.canvas',1,{alpha:0})
                $('.svg-box').fadeOut(1000,function () {
                    $('#svg2').fadeOut(function () {
                        setTimeout(function () {
                            $('.T9').fadeOut(1000);
                            pageMove(-1)
                            // initAllowUserMove(true)
                        },3000)
                    });
                });
            }

            function svgCallback4() {
                $('.T11').fadeIn(fadeOutTime);
                Tanimate["Ta11"].play()
                TweenMax.to('.canvas',1,{alpha:0})
                $('.svg-box').fadeOut(1000,function () {
                    $('#svg4').fadeOut(function () {
                        setTimeout(function () {
                            $('.T11').fadeOut(1000);
                            svgPathPlay('#svg5',path5,2000,svgCallback5)
                        },3000)
                    });
                });
            }

            function svgCallback5() {
                $('.T10').fadeIn(fadeOutTime);
                Tanimate["Ta10"].play()
                TweenMax.to('.canvas',1,{alpha:0})
                $('.svg-box').fadeOut(1000,function () {
                    $('#svg5').fadeOut(function () {
                        setTimeout(function () {
                            $('.T10').fadeOut(1000);
                            svgPathPlay('#svg2',path2,2000,svgCallback2)
                        },3000)
                    });
                });
            }

            // E svg

            drawCords(); // 画点
            function drawCords() {
                var d_l =levels[0];
                d_l.codes.forEach(function (_ref,index) {
                    var circle = new Graphics();
                    circle.alpha = .5;
                    circle.beginFill(0xffffff);
                    circle.drawCircle(0, 0, d_l.radius);
                    circle.endFill();
                    circle.x = d_l.codes[index].x1;
                    circle.y = d_l.codes[index].y1;
                    stage.addChild(circle);
                })
                stage.y = stageY;
                renderer.render(stage)
            }
            function touchDrawLine(e) {
                var d_l =levels[0];
                    x0 = e.targetTouches[0].clientX,
                    y0 = e.targetTouches[0].clientY - h;

                var r = d_l.radius * 3.5;
                repCodes.forEach(function (_ref,index) {
                    var x  = d_l.codes[index].x1;
                    var y  = d_l.codes[index].y1;
                    if( Math.sqrt( Math.pow(x - x0, 2) + Math.pow(y - y0, 2) ) <= r ){ // 判断手指是否经过点
                        if( x == repCodes[index].x1 && y == repCodes[index].y1 ){  // 手指滑动经过当前的点的坐标

                            var curDot = stage.getChildAt(index) // 获取到当前的端点
                            repCodes.splice(index,1,'')  // 经过后从数组中移除该点的坐标 避免重复划线
                            if(nowIndex == 0){  // 经过第一个点
                                curNum = index;
                                firstX = x;
                                firstY = y;
                                startX = x;
                                startY = y;
                                addDotAnimate(x,y); //给当前位置添加闪烁动画
                            }
                            if(nowIndex == 1){  // 经过第二个点
                                endX = x;
                                endY = y;
                                drawLine(startX,startY,endX,endY)  // 生成线段
                                console.log('------'+curIndex+'------'+startX,startY,endX,endY)
                                // newLines.push({x1: startX, y1: startY, x2: endX, y2: endY})
                                pushDot()

                                // codeLength +=1;  // 为容器加1
                                drawLine(endX,endY,x0,y0) // 从新的起始点开始画线
                                removeLine();
                                startX = endX;
                                startY = endY;
                                nowIndex = 0;
                                removeDotAnimate();
                                addDotAnimate(x,y);

                            }
                            if( curIndex == d_l.codes.length - 1 ){  // 在链接完倒数第一个点后为起始点恢复坐标
                                repCodes.splice(curNum,1,{x1:firstX,y1:firstY})
                            }
                            if( curIndex == d_l.codes.length ){  // 画好后事件
                                console.log('ok');
                                pixi_canvas.removeEventListener('touchmove',touchDrawLine)
                                removeDotAnimate();
                                drawSucess();  //画线成功
                            }
                            nowIndex++;
                            curIndex++;
                        }
                    }
                })
                // 划线
                drawLine(startX,startY,x0,y0)
                // 移除线段
                removeLine();
                // 清除多余的线
                if( curIndex == d_l.codes.length + 1 ){
                    drawLine(firstX,firstX,firstX,firstX)
                }
            }

            $('.T>div').each(function(i){
                Tanimate["Ta"+(i+1)] = new TimelineMax();
                Tanimate["Ta"+(i+1)].from('.t'+(i+1)+'-b',1,{alpha:0,yoyo:true,repeat:-1})
                Tanimate["Ta"+(i+1)].pause();
            });

            // 清除画布上的线段 重新回话
            function drawClear() {
                $('.T'+pageNum).fadeOut(function () {
                    if(btn_boor){
                        btn_boor = false;
                        $('.hint').fadeOut();
                    }else {
                        $('.hint').fadeIn();
                        pixi_canvas.addEventListener('touchmove',touchDrawLine,false)
                    }
                    $('.touch-text').removeClass('alphaBtn').addClass('hide');
                    TweenMax.to('.canvas',1,{alpha:1 })
                    stage.removeChildren(5,	11)
                    renderer.render(stage);
                    init();
                    console.log(stage.children.length)

                })
            }
            function btnGoEvent() {
                console.log(1)
                TweenMax.to('.canvas',.9 ,{alpha:0, onComplete:function () {
                    console.log(2)
                    drawClear();
                    svgPathPlay('#svg4',path4,2000,svgCallback4)
                }})
            }

            // 画线成功
            function drawSucess() {
                pageNum = sucessId();
                $('.T'+pageNum).fadeIn(fadeOutTime,function () {
                    $('.touch-text').addClass('alphaBtn').removeClass('hide');
                    drawBoor = true
                    TweenMax.to('.canvas',1,{alpha:0})
                    Tanimate["Ta"+pageNum].play()
                })

                // 清除画布
                $('.canvas').on(touchstart,function () {
                    if(drawBoor){
                        drawClear()
                    }
                })
                sucessIdAnimate(sucessId())
            }
            var m = ['1','1','1','1','1']
            function sucessIdAnimate(id) {
                if(id == 1 && m[id]){
                    m[id] = 0;
                    TweenMax.staggerTo('.t1-pp>div',2,{y:-100,alpha:0,repeat:-1},.5)
                }
                if(id == 2 && m[id]){
                    m[1] = 0;
                    TweenMax.to('.t2-1',1,{rotation:5, transformOrigin: "95% 100%",ease:Linear.easeNone,onComplete:function () {
                        TweenMax.to('.t2-1',2,{rotation:-5,repeat:-1,yoyo:true,ease:Linear.easeNone,})
                    }})
                }
                if(id == 3 && m[id]){
                    m[id] = 0;
                    TweenMax.to('.t3-1',1,{rotation:5, transformOrigin: "0% 0%",ease:Linear.easeNone,onComplete:function () {
                        TweenMax.to('.t3-1',2,{rotation:-5,repeat:-1,yoyo:true,ease:Linear.easeNone,})
                    }})
                }
            }
            // 画线后返回的id
            function sucessId() {
                for (var k = 0; k < dataLines.length; k++){
                    var a = 0;
                    var newDots = dataLines[k].dots;
                    for(var i = 0; i < newLines.length; i++ ){
                        for(var j = 0; j < newDots.length; j++ ){
                            if( newLines[i] == newDots[j] ){
                                a ++;
                                break;
                            }
                        }
                        if( a == newDots.length){
                            return dataLines[k].index;
                        }
                    }
                }
            }

            // 画线
            function drawLine(x,y,x0,y0) {
                if(x || y){  // 如果进过第一个点开始画线
                    // 画线
                    var line = new Graphics()
                    .lineStyle(5, 0xe2e2e2, 1)
                    .moveTo(x, y)
                    .lineTo(x0, y0)
                    .closePath();
                    line.alpha = .5
                    curLine = line
                    stage.addChild(line); // 添加到容器中
                    // stage.removeChildAt(codeLength) // 画新的线 移除旧的线
                    // stage.addChild(line); // 再将新的线添加到容器中
                    renderer.render(stage); // 将容器中的内容渲染
                }
            }

            // 移除当前的线段
            function removeLine() {
                stage.removeChild(curLine)
            }

            // 添加当前点的动画
            function addDotAnimate(x,y) {
                var vertex = new Graphics()
                .beginFill(0xe2e2e2, 1)
                .drawCircle(0, 0, 20);
                vertex.position.set(x,y);
                curDot = vertex;
                stage.addChild(vertex); // 添加到容器中
                renderer.render(stage);
                // 添加动画
                TweenMax.to(curDot, .2, {alpha: .4, scaleX: 1.6, scaleY: 1.6, yoyo: true, repeat: -1});
            }

            // 移除当前点的动画
            function removeDotAnimate() {
                stage.removeChild(curDot)
            }

            // 初始化
            function init() {
                startX = 0,startY = 0,endX = 0,endY = 0; // 记录每个条线段的起始点和结束点
                firstX = 0,firstY = 0; // 记录第一个点的x，y坐标
                nowIndex = 0; // 保存新的画好的线
                curIndex = 0; // 记录当前的线
                curNum = null;  //记录第一个点下标
                curDot = null,curLine = null; // 当前的点当前的线
                newLines = []; // 新得线
                drawBoor = false; // 可否清除画布
                repCodes = levels[0].codes.slice();
            }

            // 判断线段增加当前的点
            function pushDot() {
                if( (startX == 310 && startY == 0 && endX == 144 && endY == 119) || (startX == 144 && startY == 119 && endX == 310 && endY == 0)  ){
                    newLines.push('A1');
                }else if( (startX == 310 && startY == 0 && endX == 203 && endY == 308) || (startX == 203 && startY == 308 && endX == 310 && endY == 0) ){
                    newLines.push('A2');
                }
                else if( (startX == 310 && startY == 0 && endX == 203 && endY == 308) || (startX == 203 && startY == 308 && endX == 310 && endY == 0) ){
                    newLines.push('A2');
                }
                else if( (startX == 310 && startY == 0 && endX == 406 && endY == 308) || (startX == 406 && startY == 308 && endX == 310 && endY == 0) ){
                    newLines.push('A3');
                }
                else if( (startX == 310 && startY == 0 && endX == 471 && endY == 119) || (startX == 471 && startY == 119 && endX == 310 && endY == 0) ){
                    newLines.push('A4');
                }
                else if( (startX == 144 && startY == 119 && endX == 471 && endY == 119) || (startX == 471 && startY == 119 && endX == 144 && endY == 119) ){
                    newLines.push('B1');
                }
                else if( (startX == 144 && startY == 119 && endX == 406 && endY == 308) || (startX == 406 && startY == 308 && endX == 144 && endY == 119) ){
                    newLines.push('B2');
                }
                else if( (startX == 144 && startY == 119 && endX == 203 && endY == 308) || (startX == 203 && startY == 308 && endX == 144 && endY == 119) ){
                    newLines.push('B3');
                }
                else if( (startX == 203 && startY == 308 && endX == 406 && endY == 308) || (startX == 406 && startY == 308 && endX == 203 && endY == 308) ){
                    newLines.push('C1');
                }
                else if( (startX == 203 && startY == 308 && endX == 471 && endY == 119) || (startX == 471 && startY == 119 && endX == 203 && endY == 308) ){
                    newLines.push('C2');
                }
                else if( (startX == 406 && startY == 308 && endX == 471 && endY == 119) || (startX == 471 && startY == 119 && endX == 406 && endY == 308) ){
                    newLines.push('D1');
                }
            }




            motionObj["page2"].from('.touch-text',1,{alpha:0,onStart:function () {
                setTimeout(function () {
                    // svgPathPlay('#svg1',path1,2000,svgCallback1)

                    $('#svg1').fadeIn();
                    var svg = Snap('#svg1');
                    var hand = Snap("#handPath");
                    var pathsvg = svg.paper.path({d: path1, stroke:'#fff', fill: 'rgba(0,0,0,0)'});
                    var length = Snap.path.getTotalLength(pathsvg);
                    pathsvg.attr({
                        'stroke-dashoffset': length,
                        'stroke-dasharray': length, // 用Snap的API计算复杂的path长度
                        'stroke-width': 4,
                        "fill-opacity": 0.5
                    });
                    $('.svg-box').fadeIn()
                    TweenMax.to('.canvas',1,{alpha:1})
                    Snap.animate(length, 0, function(val) {
                        pathsvg.attr({
                            'stroke-dashoffset': val
                        });
                    }, 4000, mina.easeout(),svgCallback1);

                    Snap.animate(0, length, function(val2) {
                        var dot = pathsvg.getPointAtLength(val2);
                        hand.attr({
                            transform: "t" + [dot.x-20, dot.y-10]
                        });
                    }, 4000);

                },1000)
                initAllowUserMove(false)
                $('.up').fadeOut();
                $('.top-logo').fadeIn()
            }})
            motionObj["page2"].pause();

            motionObj["page3"].from('.p3-1',1,{alpha:0,onStart:function () {
                TweenMax.to('.p3-4',1.5,{alpha:0,yoyo:true,repeat:-1})
                TweenMax.to('.p3-4-r',1.5,{alpha:1,repeat:-1,yoyo:true})
                TweenMax.to('.p3-1-1',1,{alpha:.3,yoyo:true,repeat:-1})
            }})
            motionObj["page3"].from('.p3-2',1,{alpha:0,y:-20})
            motionObj["page3"].from('.p3-3', 6, {repeat:-1,repeatDelay:2,bezier:{curviness:1.25, values:[{x:0, y:0}, {x:120, y:0},{x:420, y:90}, {x:740, y:300}], autoRotate:true}, ease:Linear.easeNone},'-=2');
            motionObj["page3"].pause();

            motionObj["page4"].from('.p4-1',1,{alpha:0,onStart:function () {
                TweenMax.to('.p4-6',1.5,{alpha:0,yoyo:true,repeat:-1})
                TweenMax.to('.p4-6-r',1.5,{alpha:1,repeat:-1,yoyo:true})
                TweenMax.to('.p4-1-1',1,{alpha:.3,yoyo:true,repeat:-1})
                initAllowUserMove(false);
                $('.up').fadeOut();
            }})
            motionObj["page4"].from('.p4-2',1,{alpha:0,y:-20})
            motionObj["page4"].from('.p4-3',1,{alpha:0,y:-20})
            motionObj["page4"].from('.p4-4',1,{alpha:0,y:-20})
            motionObj["page4"].from('.btn-apply',1,{alpha:0})
            motionObj["page4"].from('.p4-5', 6, {repeat:-1,repeatDelay:2,bezier:{curviness:1.25, values:[{x:0, y:0}, {x:-120, y:0},{x:-420, y:60}, {x:-840, y:200}]}, ease:Linear.easeNone},'-=4');
            motionObj["page4"].pause();

            motionObj["page5"].from('.btn-affirm',1,{alpha:0})
            motionObj["page5"].pause()

            motionObj["page6"].from('.p6-1',1,{onStart:function () {
                TweenMax.to('.p6-2',1,{alpha:.3,repeat:-1,yoyo:true})
                TweenMax.to('.p6-7',1.5,{alpha:0,repeat:-1,yoyo:true})
                TweenMax.to('.p6-7-r',1.5,{alpha:1,repeat:-1,yoyo:true})
            }})
            motionObj["page6"].from('.p6-3',1,{alpha:0,y:-20})
            motionObj["page6"].from('.p6-4',1,{alpha:0,y:-20})
            motionObj["page6"].from('.p6-5',1,{alpha:0,y:-20})
            motionObj["page6"].from('.p6-6',1,{alpha:0})
            motionObj["page6"].from('.p6-8', 6, {repeat:-1,repeatDelay:2,bezier:{curviness:1.25, values:[{x:0, y:0}, {x:-120, y:0},{x:-420, y:60}, {x:-840, y:200}]}, ease:Linear.easeNone},'-=4');
            motionObj["page6"].pause();

            // 报名
            $('.btn-apply').on(touchstart,function () {
                pageMove(-1)
                initAllowUserMove(true)
            })
            // 去远洋
            $('.btn-go').on(touchstart,function () {
                $('.touch-text').removeClass('alphaBtn').addClass('hide');
                $(this).fadeOut();
                // $('.bottom-logo').fadeOut();
                pixi_canvas.removeEventListener('touchmove',touchDrawLine) // 移除画布监听
                btn_boor = true;
                btnGoEvent();
                $('.hint').fadeOut(function () {

                });
            })
            // 下一页
            $('.btn-next').on(touchstart,function () {
                pageMove(-1)
            })
            $('.p6-6').on(touchstart,function () {
                pageMove(-1)
            })
        });
        Tp1.staggerFrom('.p1-box>div',1,{alpha:0,y:-10},.5)
        Tp1.pause();

        Tp2.staggerFrom('.p2-box>div',1,{alpha:0,y:-10},.5)
        Tp2.pause();


        motionObj["page1"].from('.p1-2',1.5,{alpha:0,yoyo:true,repeat:-1,ease:Linear.easeNone,onStart:function () {
            TweenMax.to('.p1-3',1.5,{alpha:1,yoyo:true,repeat:-1})
        }})
        motionObj["page1"].pause();
    }

    // 确认起航
    $('.btn-affirm').on(touchstart,function () {
            var name1 = $('.name1').val()
            var iphone = $('.iphone').val()
            var peoples = $('.peoples').val()
            var name2 = $('.name2').val()

            if (name1 == '') {
                alert('嘉宾姓名不能为空!');
            }else if(iphone==''){
                alert('手机号不能为空');
            }else if(iphone.match(/^1[34578]\d{9}$/)==null){
                alert('请输入正确的手机号码！');
            }else if(peoples == ''){
                alert('来访人数不能为空!');
            }else {
                $.ajax({
                    url:'',
                    type:'POST',
                    dataType:'json',
                    data:{name1:name1,iphone:iphone,peoples:peoples,name2:name2},
                    success:function(data){
                        console.log(data)
                    },
                    error:function(){
                        alert('未知错误')
                    }
                });
            }
    })

    //滑动页面核心内容
    function pageMove(direction){
        allowMove = false
        var targetTop=stageH*direction;
        nextPageClassName=$('.page>div').eq(1).attr('class');
        var pageMove=$('.page>div').eq(1).attr('move');
        if(direction==1){
            $('.page>div:first-of-type').before($('.page>div:last-of-type'))
            TweenMax.set('.page',{y:-targetTop})
            nextPageClassName=$('.page>div').eq(0).attr('class');
            pageMove=$('.page>div').eq(0).attr('move');
            targetTop=0;
        }
        TweenMax.to('.page', pageMoveTimer, {y: targetTop, ease: Expo.easeInOut, onComplete: function () {
                TweenMax.set('.page',{y:0});
                if(direction==-1){
                    $('.page').append($('.page>div:first-of-type'))
                }
                allowMove = true;
        }})
        if(pageMove=='0'){
            initAllowUserMove(false);
        }
        motionObj[nextPageClassName].restart();
    }
    //滑动页面核心内容

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