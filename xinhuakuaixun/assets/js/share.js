
/*
 * plusready里面调用：sharePlate();
 * 调用：onclick=shareAction("weixin","WXSceneSession")；
 */

	var shares = null;	
	function sharePlate(){
		plus.share.getServices(function(s) {
			shares = {};
			for (var i in s) {
				var t = s[i];
				shares[t.id] = t;
			}
		 	console.log("获取分享服务列表成功");
		}, function(e) {
			console.log("获取分享服务列表失败：" + e.message);
		});
	}
	
	/**
	 * Share
	 * @id {[string]} 分享元素id		必选   	 "weixin", "qq"，"tencentweibo"，"sinaweibo"
	 * @ex  {[string]} ex	必选 	 "WXSceneSession"， "WXSceneTimeline"
	 * @headMsg {[string]} 分享内容头信息 	可选
	 * @contMsg {[string]} 分享内容信息	可选
	 * @picHref {[string]} 分享图片链接	可选
	 * @goHref {[string]} 分享跳转链接	可选
	 */
	function shareAction(id, ex,headMsg,contMsg,picHref,goHref) {
		plus.nativeUI.showWaiting("正在分享");
		var headMsgXL =contMsg;
		setTimeout(function(){
			plus.nativeUI.closeWaiting();
		},3000);
		if(headMsg == "" || headMsg == undefined){
			headMsg="新华快讯APP"
		}
//		if(contMsg == "" || contMsg == undefined){
			if(mui.os.android){
				contMsg="每天学习一点，生活更加美好。";
			}else{
				contMsg="每天学习一点，生活更加美好。"+contMsg;
			}
//		}
		if(picHref == "" || picHref == undefined){
//			picHref=XHCJ.postajax+'/public/xhcj_120x120.png';
//			picHref="http://img3.3lian.com/2013/v10/4/87.jpg"
		}
		if(goHref == "" || goHref == undefined){
			goHref=""
		}
		if(picHref == "none"){
			picHref='';
		}
		if(id == "sinaweibo"){
			if(mui.os.android){
				contMsg="";
				contMsg=headMsg;
			}else{
				contMsg=headMsg+headMsgXL;
			}
		}
		var s = null;
		if (!id || !(s = shares[id])) {
			mui.toast("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			console.log("---已授权---");
			shareMessage(s, ex, headMsg,contMsg,picHref,goHref);
		} else {
			console.log("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex, headMsg,contMsg,picHref,goHref);
			}, function(e) {
				plus.nativeUI.closeWaiting();
				mui.toast("认证授权失败");
			});
		}
	}
	
	/**
	 * 发送分享消息
	 */
	function shareMessage(s, ex,headMsg,contMsg,picHref,goHref) {
		var msg = {
			content: '分享-详情',
			href: goHref,
			title: headMsg,
			content: contMsg,
			thumbs: [picHref],
			pictures: [picHref],
			extra: {
				scene: ex
			}
		};
		s.send(msg, function() {
			plus.nativeUI.closeWaiting();
			mui.toast("分享成功!");
		}, function(e) {
			plus.nativeUI.closeWaiting();
//			alert("分享失败原因:"+e);
//			alert("分享失败原因:"+JSON.stringify(e));
			mui.toast("分享失败!");
		});
	}
	
	