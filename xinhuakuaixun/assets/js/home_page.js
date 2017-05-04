mui.init()
//	添加导航子页面
//	 监听plusReady事件
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

var wc = null;
var ws;

//		底部导航的 页面切换
function plusReady() {
	plus.screen.lockOrientation('portrait-primary');
	var subpage = ['home.html', 'import_news.html', 'market.html'];
	var self = plus.webview.currentWebview();
	var index = 0;
	var sub;
	for(var i = 0; i < subpage.length; i++) {
		sub = plus.webview.create(subpage[i], subpage[i], {
			top: '45px',
			bottom: '51px',
			background: 'transparent'
		})
		if(i != index) {
			sub.hide();
		}
		self.append(sub);
	};
	//点击切换webview
	var activeTab = subpage[index];
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var tag = this.getAttribute('data');
		if(tag == activeTab) {
			return
		}
		
		if($(this).children().find('img').attr('src').indexOf('tab-no-') != -1) {
			$(this).children().find('img').attr('src', $(this).children().find('img').attr('src').replace('tab-no-', 'tab-'));
			$.each($(this).siblings(), function(index, dom) {
				if($(dom).children().find('img').attr('src').indexOf('tab-no-') == -1) {
					$(dom).children().find('img').attr('src', $(dom).children().find('img').attr('src').replace('tab-', 'tab-no-'));
				}
			})
		}
		
		plus.webview.show(tag);
		plus.webview.hide(activeTab);
		activeTab = tag;
		var xinhuaInformation = plus.webview.getWebviewById('xinHuaInformation.html');
		xinhuaInformation.evalJS('stopVideo()')
	})
	ws = self;
	ws.addEventListener("maskClick", function() {
		wc.close("auto");
	}, false);
}

//侧滑显示设置界面
function showSide() {
	if(wc) {
		return;
	}
	// 开启遮罩
	ws.setStyle({
		mask: "rgba(0,0,0,0.5)"
	});
	// 创建侧滑页面
	plus.nativeUI.showWaiting();
	wc = plus.webview.create("mine.html", "mine", {
		right: "10%",
		width: "90%",
		popGesture: "none"
	});
	// 侧滑页面关闭后关闭遮罩
	wc.addEventListener('close', function() {
		ws.setStyle({
			mask: "none"
		});
		wc = null;
	}, false);
	// 侧滑页面加载后显示（避免白屏）
	wc.addEventListener("loaded", function() {
		wc.show("slide-in-left");
	}, false);
}

var first = null;
mui.back = function() {
	if(!first) {
		first = new Date().getTime();
		mui.toast('再按一次退出应用');
		setTimeout(function() {
			first = null;
		}, 2000);
	} else {
		if(new Date().getTime() - first < 1000) {
			plus.runtime.quit();
		}
	}
}