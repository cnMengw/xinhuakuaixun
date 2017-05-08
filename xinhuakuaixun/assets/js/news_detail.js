mui.init();
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady(){
	
}
document.getElementById("more").addEventListener("tap",function(){
	var wv=plus.webview.create("finance.html","finance.html");
	wv.addEventListener('loaded', function() {
		wv.show('slide-in-right');
	}, false);
})
