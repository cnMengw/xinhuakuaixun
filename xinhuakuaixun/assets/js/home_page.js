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
var tag;
var self;

//	底部导航的 页面切换
function plusReady() {
	plus.screen.lockOrientation('portrait-primary');
	var subpage = ['home.html', 'import_news.html', 'market.html'];
	self = plus.webview.currentWebview();
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
	tag = 'home.html';
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		tag = this.getAttribute('data');
		if(tag == activeTab) {
			return
		}
		tabInit();
		closeMenu();
		openGesture();
		if(tag == 'home.html'){
			$('#kx').attr('xlink:href','#mui-icon-flash_active');
			$('#header_title').html('快讯');
			$('#news_speech').css({'display':'block'});
		}else if(tag == 'import_news.html'){
			$('#yw').attr('xlink:href','#mui-icon-news_active');
			$('#header_title').html('要闻');
			$('#news_speech').css({'display':'none'});
			closeGesture();
		}else if(tag == 'market.html'){
			$('#hq').attr('xlink:href','#mui-icon-market_active');
			$('#header_title').html('行情');
			$('#news_speech').css({'display':'none'});
		}
		plus.webview.show(tag);
		plus.webview.hide(activeTab);
		activeTab = tag;
	})
	ws = self;
	ws.addEventListener("maskClick", function() {
		wc.close("auto");
	}, false);
}

function tabInit(){
	$('#kx').attr('xlink:href','#mui-icon-flash');
	$('#yw').attr('xlink:href','#mui-icon-news');
	$('#hq').attr('xlink:href','#mui-icon-market');
}

//语音播报
window.onload=function(){
	document.getElementById("news_speech").addEventListener("tap", function(){
		console.log(1);
		plus.webview.getWebviewById('home.html').evalJS('speech_all()');
	});
}

var first = null;
mui.back = function() {
	if(showMenu) {
		console.log('执行关闭蒙版');
		closeMenu();
	}else{
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
}