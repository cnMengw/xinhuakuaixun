
/*
 * plusready里面调用：sharePlate();
 * 调用：onclick=shareAction("weixin","WXSceneSession")；
 */

	var shares = null;
	var Intent=null,File=null,Uri=null,main=null;
	function sharePlate(){
		if(plus.os.name=="Android"){
			main = plus.android.runtimeMainActivity();
			Intent = plus.android.importClass("android.content.Intent");
			File = plus.android.importClass("java.io.File");
			Uri = plus.android.importClass("android.net.Uri");
		}
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
	function shareAction(id, ex,contMsg) {
		console.log(id+"------------"+typeof(id));
		plus.nativeUI.showWaiting("正在分享");
		var s = null;
		if (!id || !(s = shares[id])) {
			mui.toast("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			console.log("---已授权---");
			shareMessage(s, ex,contMsg);
		} else {
			console.log("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex,contMsg);
			}, function(e) {
				plus.nativeUI.closeWaiting();
				mui.toast("认证授权失败");
			});
		}
	}
	
	/**
	 * 发送分享消息
	 */
	function shareMessage(s, ex,contMsg) {
		var msg = {
			content: contMsg,
			href:"",
			extra: {
				scene: ex
			}
		};
		s.send(msg, function() {
			plus.nativeUI.closeWaiting();
			mui.toast("分享成功!");
		}, function(e) {
			plus.nativeUI.closeWaiting();
			mui.toast("分享失败!");
			alert(e.message)
		});
	}
	
	