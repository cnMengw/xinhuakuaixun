/*
 * closeMainGes();  关闭情况下开关
 */

var mask = mui.createMask(_closeMenu);
var maskShow;
var maskHide;
//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swipeleft", function() {
	mask.close();
	maskShow = '';
	plus.webview.currentWebview().opener().evalJS('closeMenu()')
});

window.addEventListener("swiperight", function() {
	mask.show();
	maskShow = true;
	plus.webview.currentWebview().opener().evalJS('openMenu()')
});

function closeMask() {
	maskShow = '';
	mask.close();
}

function openMask() {
	maskShow = true;
	if(maskHide) {
		mask = mui.createMask(_closeMenu);
	}
	mask.show();
}

function _closeMenu() {
	if(maskShow) {
		plus.webview.currentWebview().opener().evalJS('closeMenu()');
	}
}

function closeMainGes() {
	maskHide = true;
	plus.webview.currentWebview().opener().evalJS('closeGesture()');
}