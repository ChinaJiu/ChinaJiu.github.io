/**
 * Created by xiaojiu on 2017/12/28.
 */
function TouchDir(option) {
    this.obj = option.obj;
    this.allowmove = true;
}
TouchDir.prototype = {
    constructor: TouchDir,
    touchStart: function () {

    },
    touchMove: function (callback) {

        var dir = null;
        var obj = document.querySelector(this.obj);
        var startx,starty;
        obj.addEventListener('touchstart',function (e) {
            startx = e.changedTouches[0].pageX;
            starty = e.changedTouches[0].pageY;

        })
        obj.addEventListener('touchend',function (e) {
            var endx = e.changedTouches[0].pageX;
            var endy = e.changedTouches[0].pageY;
            if( Math.abs(endx - startx) > Math.abs(endy - starty)) {  //x
                if( endx - startx > 0){ //right
                    dir = 'right'
                    callback(dir)
                }else { //left
                    dir = 'left'
                    callback(dir)
                }
            }else { //y
                if( endy - starty > 0){ //down
                    dir = 'down'
                    callback(dir)
                }else { //up
                    dir = 'up'
                    callback(dir)
                }
            }
        })

        callback();
    }
}




// var touchUp = new TouchDir({obj:'.page'})
//         touchUp.touchMove(function (dir) {
//             if(dir == 'up'){
//                
//             }
//         })