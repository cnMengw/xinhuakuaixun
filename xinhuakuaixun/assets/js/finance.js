mui.init();

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady(){
	document.getElementById("copy").addEventListener("tap",copyUrl);
}
function copyUrl(){
	var copyurl=document.getElementById("copy").getAttribute("url");
		if(copyurl){
       		mui.toast("复制链接成功!");
        }else{
        	mui.toast('复制链接失败');
        }
        if(plus.os.name == "Android"){
        	var Context = plus.android.importClass("android.content.Context");
	        var main = plus.android.runtimeMainActivity();
	        var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
	        plus.android.invoke(clip,"setText",copyurl);
        }else{
        	var UIPasteboard = plus.ios.importClass("UIPasteboard");
			var generalPasteboard = UIPasteboard.generalPasteboard();
			// 设置/获取文本内容:
			generalPasteboard.setValueforPasteboardType(copyurl, "public.utf8-plain-text");
        }
	}