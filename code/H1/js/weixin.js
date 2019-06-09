var toURL = window.location.href.substring(0,location.href.lastIndexOf('/'));

var wxDefault = {
	title:"",
	desc:"",
	imgUrl:toURL+"/images/share.jpg",
	link:toURL+"/index.html",
	success:function(){
	}
};

$(function(){
    var pageUrl = location.href;
    $.ajax({
        url:"",
        dataType:"jsonp",
        jsonp:"jsoncallback",
        data:{url:encodeURIComponent(pageUrl)},
        success:function(data){
            data.debug = false;
            wx.config(data);
            wx.ready(function(){
                wxShare();
            });
        }
    })
	
});

function wxShare(data){
	if(typeof(wx) == "undefined"){
		return;
	}
	var newData = $.extend({},wxDefault, data);
	wx.onMenuShareAppMessage(newData);
	wx.onMenuShareQQ(newData);
	wx.onMenuShareWeibo(newData);
	wx.onMenuShareTimeline({
		title:newData.title,
		imgUrl:newData.imgUrl,
		link:newData.link,
		success: newData.success
	});
}