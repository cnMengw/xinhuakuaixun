var mySwiper = new Swiper('.swiper-container', {
	direction: 'horizontal',
	// 如果需要分页器
	pagination: '.swiper-pagination',
	// 如果需要前进后退按钮
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	observer:true,

})

var clipContent= { "cuttime": [], "cuttext": [] };
var tArea = document.querySelectorAll("textarea");
for(var i =0; i < tArea.length-1; i++) {
	tArea[i].addEventListener("blur", function(){
		if(this.value) {
//			alert("存");
			var date = new Date();
			var dd=date.toLocaleString();
			clipContent.cuttime.push(dd);
			clipContent.cuttext.push(this.value);
			console.log(clipContent.cuttime);
			console.log(clipContent.cuttext);
		}
	},false)
	
}
	function add() {
		var textarea = $("textarea");
		console.log(textarea.length)
		textarea.last().focus(function() {
			$("#group").append("<div class='swiper-slide'><textarea></textarea></div>")
			$(this).blur(function(){
					if(this.value) {
					var date = new Date();
					var dd=date.toLocaleString();
					clipContent.cuttime.push(dd);
					clipContent.cuttext.push(this.value);
					console.log(clipContent.cuttime);
					console.log(clipContent.cuttext);
					}
			})
			add();
		})
	}
		
	add();

document.getElementById("edit").addEventListener("click",function(){
	var neirong=JSON.stringify(clipContent.cuttext);
	console.log(neirong);
	var wv = plus.webview.create('clip_edit.html', 'clip_edit.html', {}, { 
//		newsId: newsId, 
		news_title: $("#news_title h3").html(), 
		clipContent:JSON.stringify(clipContent)
	});
	wv.addEventListener('loaded', function() {
		wv.show('slide-in-right');
	}, false);
},false)		


//弹出弹回的状态
var flag = false;
$(".mui-content").on("click", function() {
	$("#board-con").css({
		"-webkit-transform": "scale3d(0,0,0)",
		"opacity": 0,
		"-webkit-transition": "all 0.5s"
	})
	flag = false;
})
$("#board").on("click", function() {
	$("#board-con").on("click", function(event) {
		event.stopPropagation();
	})
	if(flag == false) {
		$("#board-con").css({
			"-webkit-transform": "scale3d(1,1,1)",
			"opacity": 1,
			"-webkit-transition": "all 0.5s"
		})
		flag = true;
	} else {
		$("#board-con").css({
			"-webkit-transform": "scale3d(0,0,0)",
			"opacity": 0,
			"-webkit-transition": "all 0.5s"
		})
		flag = false;
	}
})


