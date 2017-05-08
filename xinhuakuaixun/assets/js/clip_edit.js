mui.init({
	gestureConfig:{
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false
		swipe: true, //默认为true
		drag: true, //默认为true
		hold:false,//默认为false，不监听
		release:false//默认为false，不监听
	}
});
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
var news_id;
var news_title;
var clipContent;
function plusReady(){
	var self=plus.webview.currentWebview();
	news_title=self.news_title;
//	news_id=self.newsId;
	clipContent=JSON.parse(self.clipContent);
	console.log(clipContent);
	var str = "<ul id='clipcon' >";
	for(var i =0;i<clipContent.cuttime.length;i++) {
		str += "<li class='con'><img src='../src/img/dragupdown@2x.png' class='dragbtn'/><p class='scon'>" + clipContent.cuttext[i] + "</p><span class='stime'>[" + clipContent.cuttime[i] + "]　</span><span class='mui-pull-right del'>删除</span></li>"
	}
	str+="</ul>";
	document.getElementById("box").innerHTML=str;
	var len = $("li").length;
	for(var i = 0; i < len; i++) {
		var dragbtnY =$(".con").eq(i).height()
		$(".dragbtn").eq(i).css("top",(dragbtnY-25)/2)
		//删除
		$(".del").eq(i).on("tap", function() {
			$(this).parent().remove();
			$(this).css({
				"-webkit-transform": "translateX(0px)",
				"-webkit-transition": "all .5s"
			})
		})

	}
	
	//点击进入下一级页面
	var myClip;
	var notecount=0;
	document.getElementById("fixcon").addEventListener('tap', function() {
//		localStorage.removeItem("myNotes");
		var clonecon = $("#box").html();
		var talk = document.getElementById("toSay").value;
		var dT = new Date();
		var datetime=dT.toLocaleString();
		
//		console.log("news_id是"+news_id+"talk是"+talk+"news_title是"+news_title);
		if(localStorage.getItem("myNotes")){
			myClip=JSON.parse(localStorage.getItem("myNotes"));
			var s=myClip.noteId.length;
			notecount=myClip.noteId[s-1]
//			console.log(notecount);
			myClip.noteId.push(notecount+1);
			myClip.newsId.push(news_id);
			myClip.newsTitle.push(news_title);
			myClip.clipContent.push(clonecon);
			myClip.myTalk.push(talk);
			myClip.dateTime.push(datetime);
		}else{
			myClip={"noteId":[],"newsId":[],"newsTitle":[],"clipContent":[],"myTalk":[],"dateTime":[]};
			myClip.noteId.push(notecount);
			myClip.newsId.push(news_id);
			myClip.newsTitle.push(news_title);
			myClip.clipContent.push(clonecon);
			myClip.myTalk.push(talk);
			myClip.dateTime.push(datetime);
		}
		localStorage.setItem("myNotes",JSON.stringify(myClip));
//		console.log(myClip);
//		console.log(notecount);
//		console.log(myClip.newsTitle);
//		console.log(myClip.clipContent);
//		console.log(myClip.myTalk);
		
		var wv=plus.webview.create('board_detail.html', 'board_detail.html', {}, { 
				noteId: notecount+1
			});
		wv.addEventListener('loaded', function() {
			wv.show('slide-in-right');
		}, false);
//		mui.toast('已生成新的文章');
	});
	
}
//换位
function getMousePos(e){ 
	return { 
		x : e.detail.touches[0].clientX|| e.targetTouches[0].clientX + document.body.scrollLeft, 
		y : e.detail.touches[0].clientY || e.targetTouches[0].clientY + document.body.scrollTop 
	} 
} 
function getElementPos(el){ 
	return { 
		x : el.offsetParent ? el.offsetLeft + arguments.callee(el.offsetParent)['x'] : el.offsetLeft, 
		y : el.offsetParent ? el.offsetTop + arguments.callee(el.offsetParent)['y'] : el.offsetTop 
	} 
} 
function getElementSize(el){ 
	return { 
		width : el.offsetWidth, 
		height : el.offsetHeight 
	} 
} 
function preventD(event){
	event.preventDefault();
}
function draging(eve){
	eve = eve || window.event; 
	var current = getMousePos(eve);				
	for(var i = 0; i < lis.length; i++){ 
		if(current.x > lis[i]['pos']['x'] && current.x < lis[i]['pos']['x'] + lis[i]['size']['width'] && current.y+h > lis[i]['pos']['y'] && current.y +h< lis[i]['pos']['y'] + lis[i]['size']['height']/2){ 
//						console.log(lis[i].scrollTop)
			if(t != lis[i]){
				MOVE.isMove = true; 
				clipcon.insertBefore(adddiv,lis[i]); 
			}
		}else if(current.x > lis[i]['pos']['x'] && current.x < lis[i]['pos']['x'] + lis[i]['size']['width'] && current.y > lis[i]['pos']['y'] + lis[i]['size']['height']/2 && current.y < lis[i]['pos']['y'] + lis[i]['size']['height']){ 
			if(t != lis[i]){ 
				MOVE.isMove = true; 
				clipcon.insertBefore(adddiv,lis[i].nextSibling); 
			} 
		} 
	}
}
var MOVE = {}; 
MOVE.isMove = false;
var  t,p,pos,el,h;
var lis;
var adddiv = document.createElement('div'); 
adddiv.style.width = '100%'; 
adddiv.style.height = '5px'; 
adddiv.style.fontSize = '0'; 

//长按
mui('#box').on('longtap','.con',function(e){
	$(this).css('background','rgba(0,0,0,0.05)');
	$(this).find(".dragbtn").css("display","block");
	$(this).css("boxShadow","0px 0px 8px #AAAAAA");
	this.addEventListener('touchmove',preventD,false);
	lis=document.querySelectorAll(".con");
	for(var i = 0; i < lis.length; i++){ 
		lis[i]['pos'] = getElementPos(lis[i]); 
		lis[i]['size'] = getElementSize(lis[i]); 
	} 
	h=document.body.scrollTop;
	e = e || window.event;
	t = this; 
//			console.log(t);
	p = getMousePos(e);
	pos=getElementPos(this);
//	console.log(pos)
	el = t.cloneNode(true);
	el.style.position = 'absolute';
	el.style.display="none";
	el.style.left =(pos.x) + 'px'; 
	el.style.top =(pos.y) + 'px';
	document.body.appendChild(el);
	this.addEventListener("drag",draging,false);
	this.addEventListener('dragend',function(eve){
        eve = eve || window.event;
        this.removeEventListener('touchmove',preventD,false);
        this.removeEventListener("drag",draging,false)
		if(MOVE.isMove){ 
			el.style.display="block";
			clipcon.replaceChild(t,adddiv); 
			MOVE.isMove = false; 
		} 
		if(el){
			document.body.removeChild(el);
		}
		
		$(this).css('background','#ffffff');
	    $(this).find(".dragbtn").css("display","none");
	    $(this).css("boxShadow","none");
    },false);
   
	$(".mui-content").on("tap",function(){
	 	this.removeEventListener('touchmove',preventD,false);
    	document.body.removeChild(el);
		$("li").css('backgroundColor','#ffffff');
		$(".dragbtn").css("display","none")
	})
});
