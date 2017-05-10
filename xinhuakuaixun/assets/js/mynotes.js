mui.init();
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady(){
	postServer("/api/v1/news/kx/focus/note/list",{},successfn);
//	var self=plus.webview.currentWebview();
//	var current_id=self.newsId;
//	var noteData =JSON.parse(localStorage.getItem("myNotes"));
//	var str="";
//	for(var i=0;i<noteData.newsId.length;i++){
//		str+="<li class='mui-table-view-cell'>";
//		str+="<div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red' newsid='"+noteData.newsId[i]+"' noteid='"+noteData.noteId[i]+"'><span>删除</span></a></div>";
//		str+="<div class='mui-slider-handle title' newsid='"+noteData.newsId[i]+"' noteid='"+noteData.noteId[i]+"'><div class='mui-media-body'>";
//		str+="<span>"+noteData.newsTitle[i]+"</span>";
//		str+="<p>"+noteData.dateTime[i]+"</p></div></div></li>"
//	}
	
}
function successfn(data){
	var str="";
	for(var i=0;i<data.LIST.length;i++){
		str+="<li class='mui-table-view-cell'>";
		str+="<div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red' noteid='"+data.LIST[i].note_id+"'><span>删除</span></a></div>";
		str+="<div class='mui-slider-handle title' noteid='"+data.LIST[i].note_id+"'><div class='mui-media-body'>";
		str+="<span>"+data.LIST[i].title+"</span>";
		str+="<p>"+data.LIST[i].create_time+"</p></div></div></li>"
	}
	
	document.getElementById("news_title").innerHTML=str;
	
	var newsList=document.querySelectorAll(".title");
	for(var i=0;i<newsList.length;i++){
		newsList[i].addEventListener("tap",function(){
			plus.nativeUI.showWaiting();
			var note_id=this.getAttribute("noteid");
			var wv=plus.webview.create('board_detail.html', 'board_detail.html', {}, { 
			noteId: note_id
				});
			wv.addEventListener('loaded', function() {
				wv.show('slide-in-right');
			}, false);
		},false)
	}
	
}
	//删除菜单操作
	mui('#news_title').on('tap',".mui-btn", function(event) {
		var elem = this;
		var li = elem.parentNode.parentNode;
		var delId=elem.getAttribute("noteid");
		console.log(delId);
		var btnArray = ['取消', '删除'];
		mui.confirm('确认删除该条记录？', '温馨提示', btnArray, function(e) {
			if(e.index == 0) {
				setTimeout(function() {
					mui.swipeoutClose(li);
				}, 0);
			} else {
				li.parentNode.removeChild(li);
				postServer("POST /api/v1/news/kx/focus/note/delete",{note_id:delId},delSfn);
//				for(j=0;j<noteData.noteId.length;j++){
//					if(delId==noteData.noteId[j]){
//						console.log(j);
//						noteData.noteId.splice(j,1);
//						noteData.newsId.splice(j,1);
//						noteData.newsTitle.splice(j,1);
//						noteData.clipContent.splice(j,1);
//						noteData.myTalk.splice(j,1);
//						noteData.dateTime.splice(j,1);
//					}
//				}
//				console.log(noteData.noteId);
//				
//				localStorage.setItem("myNotes",JSON.stringify(noteData));
//				console.log(localStorage.getItem("myNotes"))
			}
		},'div');
	});
	function delSfn(data){
		console.log(data.status.msg)
	}
