mui.init();
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	var shareCon;
	function plusReady(){
		sharePlate();
		var self=plus.webview.currentWebview();
		var current_id=self.noteId;
		var noteData =JSON.parse(localStorage.getItem("myNotes"));
		for(var i=0;i<noteData.noteId.length;i++){
			if(current_id==noteData.noteId[i]){
				document.getElementById("current_title").innerHTML=noteData.newsTitle[i];
				document.getElementById("box").innerHTML = noteData.clipContent[i];
				if(noteData.myTalk[i]!==""){
					document.getElementById("meTalk").innerHTML="<p>我的感想</p>"+noteData.myTalk[i];
				}else{
					document.getElementById("meTalk").setAttribute("style","border:none");
					}
				break;
			}
		}
		shareCon=document.getElementById("main").innerText;
		plus.nativeUI.closeWaiting();
	}

	//分享
	//朋友
	document.getElementById('shareWxFriend').addEventListener('tap', function() {
			shareAction("weixin", "WXSceneSession", shareCon)
	}, false);
	//朋友圈
	document.getElementById('shareWx').addEventListener('tap', function() {
		shareAction("weixin", "WXSceneTimeline", shareCon)
	}, false);
