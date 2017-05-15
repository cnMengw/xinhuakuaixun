mui.init();
//mui("#bannerslider").slider({interval: 1000});
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady(){
	var bParam={
		classify_code:"XCYWTP",
		page_num:"1",
		page_size:"4"
	};
	postServer("/api/v1/news/kx/focus/menu/list",{},menuSfn);
	postServer("/api/v1/news/kx/focus/list",bParam,bannerfn);
	
	closeMainGes();
}
$(function(){
	var bParam={
		classify_code:"XCYWTP",
		page_num:"1",
		page_size:"4"
	};
	postServer("/api/v1/news/kx/focus/list",bParam,bannerfn);
	postServer("/api/v1/news/kx/focus/menu/list",{},menuSfn);
//	$.ajax({
//		type:"post",
//		url:"http://172.17.20.115/api/v1/news/kx/focus/menu/list",
//		async:true,
//		success:function(data){
//			console.log(data);
//		},
//		error:function(data){
//			console.log(data);
//		}
//	});

})
function menuSfn(data){
	console.log(data);
	var resData=data;
	var menustr="";
	var sliderstr="";
	for(var i=0;i<resData.LIST.length;i++){
		menustr+="<a class='mui-control-item' href='#item"+i+"' datacode='"+resData.LIST[i].classify_code+"'>"+resData.LIST[i].classify_name+"</a>";
		sliderstr+="<div id='item"+i+"' class='mui-slider-item mui-control-content'><div id='scroll"+i+"' class='mui-scroll-wrapper'><div class='mui-scroll'></div></div></div>"
	}
	document.getElementById("menuControl").innerHTML=menustr;
	document.getElementById("news").innerHTML=sliderstr;
	newsinit();
}
function bannerfn(data){
	var resData=data;
	console.log(resData)
	var imgcount=resData.LIST.length;
	var bannerstr="<div class='mui-slider-item mui-slider-item-duplicate'><a newsid='"+resData.LIST[resData.LIST.length-1].news_id+"'><img src='"+resData.LIST[resData.LIST.length-1].pic_url+"' />";
		bannerstr+="<p class='mui-slider-title'>"+resData.LIST[resData.LIST.length-1].news_title+"</p></a></div>";
	var banicon="";
	for(var i=0;i<resData.LIST.length;i++){
		bannerstr+="<div class='mui-slider-item'><a newsid='"+resData.LIST[i].news_id+"'><img src='"+resData.LIST[i].pic_url+"'><p class='mui-slider-title'>"+resData.LIST[i].news_title+"</p></a></div>";
		banicon+="<div class='mui-indicator'></div>"
	}
	bannerstr+="<div class='mui-slider-item mui-slider-item-duplicate'><a newsid='"+resData.LIST[0].news_id+"'><img src='"+resData.LIST[0].pic_url+"' /><p class='mui-slider-title'>"+resData.LIST[0].news_title+"</p></a></div>";
	document.getElementById("banner_con").innerHTML=bannerstr;
	document.getElementById("banslider").iinnerHTML=banicon;
}
function newsinit(){
//	document.querySelector("#menuControl")[0].classList.add("mui-active");
//	document.querySelector("#news .mui-slider-item")[0].classList.add("mui-active");
	
	var classifyCode=document.querySelector("#menuControl .mui-active").getAttribute("datacode");
	console.log(classifyCode);
	var param={
			classify_code:classifyCode,
			page_num:"1",
			page_size:"10"
		};
	console.log(param);
//	plus.nativeUI.closeWaiting();
	postServer("/api/v1/news/kx/focus/list",param,newsListFn);
}
document.querySelector('#slider').addEventListener('slide', function(event) {
//	plus.nativeUI.showWaiting();
	var eIndex=event.detail.slideNumber;
	var classifyCode=document.querySelectorAll("#menuControl a")[eIndex].getAttribute("datacode");
	console.log(classifyCode);
	var param={
			classify_code:classifyCode,
			page_num:"1",
			page_size:"10"
		};
	console.log(param);
//	plus.nativeUI.closeWaiting();
	postServer("/api/v1/news/kx/focus/list",param,newsListFn);
})
function newsListFn(data){
	var resData=data;
	var curitem=document.querySelector("#menuControl .mui-active").getAttribute("href");
	console.log(curitem);
	curitem=curitem.substring(1);
	console.log(curitem);
	var newsstr="<ul class='mui-table-view'>";
	for(var i=0;i<resData.LIST.length;i++){
		newsstr+="<li class='mui-table-view-cell' newsid='"+resData.LIST[i].news_id+"'>";
		newsstr+="<img src='"+resData.LIST[i].pic_url+"' class='newsimg'/>"
		newsstr+="<div class='mui-pull-right'><h4>"+resData.LIST[i].news_title+"</h4><span>"+resData.LIST[i].issued_date+"</span>"
		newsstr+="</div></li>";
	}
	newsstr+="</ul>";
	document.getElementById(curitem).innerHTML=newsstr;
}



(function($){
	var deceleration=mui.os.ios?0.003:0.0009;
	$(".mui-scroll-wrapper").scroll({
		bounce:false,
		indicators:true,
		deceleration:deceleration
	});	
	$.ready(function(){
		
		$.each(document.querySelectorAll(".news .mui-scroll"), function(index,pullRefreshE1) {
			$(pullRefreshE1).pullToRefresh({
				down:{
					auto: false,
					callback:function(){
						var self = this;
						setTimeout(function() {
								self.endPullDownToRefresh();
							}, 1000);
						
					}
				},
				up:{
					auto: false,
					contentnomore: '没有更多数据了',
					callback:function(){
						var self=this;
						setTimeout(function() {
								
								self.endPullUpToRefresh();
							}, 1000);
					}
				}
			})
		});
		
	})
})(mui);

mui("#bannerslider").on("tap","a",function(){
	plus.nativeUI.showWaiting();
	var wv=plus.webview.create("news_detail.html","news_detail.html",{},{
		newsId:this.getAttribute("newsid")
	});
	wv.addEventListener("loaded",function(){
		wv.show('slide-in-right');
	},false);
})
mui("#news").on("tap","li",function(){
	plus.nativeUI.showWaiting();
	var wv=plus.webview.create("news_detail.html","news_detail.html",{},{
		newsId:this.getAttribute("newsid")
	});
	wv.addEventListener("loaded",function(){
		wv.show('slide-in-right');
	},false);
})