//关闭back、menu按键监听，这样侧滑主界面会自动获得back和memu的按键事件，仅在主界面处理按键逻辑即可；
mui.init({
	keyEventBind: {
		backbutton: false,
		menubutton: false
	}
});
var main = null;
mui.plusReady(function () {
	main = plus.webview.currentWebview().opener();
//	postServer("/api/v1/news/kx/focus/note/count",{},countFn);
	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
		document.getElementById('version_num').innerHTML=wgtinfo.version;
	});
	getcalculate();
	
})
function countFn(data){
	document.getElementById("note_num").innerHTML=data.count;
}
function closeMenu () {
	plus.webview.currentWebview().opener().evalJS('closeMenu()')
}

//左滑显示出来的菜单，只需监听右滑，然后将菜单关闭即可；在该菜单上左滑，不做任何操作；
window.addEventListener("swipeleft",closeMenu);

//-----------------------字体大小的处理
mui('.size_set').on('tap','span',function(){
	if($('.size_set').children('.active').html() == $(this).html()){
		//点击相同的图标
	}else{
		$('.size_set').children('.active').removeClass('active');
		$(this).addClass('active');
		if($(this).html()=='小'){
			console.log('小');
			plus.storage.setItem('fontSize','0.12rem');
		}else if($(this).html()=='中'){
			console.log('中');
			plus.storage.setItem('fontSize','0.16rem');
		}else if($(this).html()=='大'){
			console.log('大');
			plus.storage.setItem('fontSize','0.24rem');
		}
	}
})






//-----------------------缓存的处理
//得到缓存
function getcalculate(){
	plus.cache.calculate( function ( size ) {
		var sortsize=size/1024/1024/1024;
	//	var localdownnum =localStorageLength(localStorage.getItem('down'));
	//	var localreportFilternum =localStorageLength(localStorage.getItem('reportFilter'));
	//	var localreportCachenum =localStorageLength(localStorage.getItem('reportCache'));
	//	var total = sortsize+localdownnum+localreportFilternum+localreportCachenum;
		var total = sortsize;
		total=TwoDecimal(Number(total));
		document.getElementById('cache_num').innerHTML=total+'M';
	});
}

//保留两位小数
function TwoDecimal(d){
	var _d = parseFloat(d);
    if (isNaN(_d)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
     var _d = Math.round(_d * 100) / 100;
     _data = _d.toString();
     var pos_decimal = _data.indexOf('.');
     if (pos_decimal < 0) {
         pos_decimal = _data.length;
        _data+= '.';
     }
     while (_data.length <= pos_decimal + 2) {
         _data += '0';
     }
     return _data;
}

/*
 * str string localStorage字符串
 * 计算localStorage 字符串大小
 */

function localStorageLength(str){
	if(str){
		var length = str.length;
		var num = (length*3)/1024/1024;
		var localnum = num.toFixed(2);
		return Number(localnum);
	}else{
		return 0;
	}
}

//清除缓存
document.getElementById('clear_cache').addEventListener('tap',function(){
	var btnArray = ['否', '是'];
		if(document.getElementById('cache_num').innerHTML!= '0M'){
		     mui.confirm('您确定要清除所有缓存么？', '温馨提示', btnArray, function(e) {
                if (e.index == 1) {
//              	localStorage.removeItem('down');
//              	localStorage.setItem('reportCache','');
                	plus.nativeUI.toast('清除缓存成功');
                	document.getElementById('cache_num').innerHTML='0M';
                } else {}
            });
		}else{
			console.log(document.getElementById('cache_num').innerHTML);
			return;
		}
},false)
//笔记
document.getElementById("note_set").addEventListener("tap",function(){
	var wv=plus.webview.create("mynotes.html","mynotes.html");
	plus.nativeUI.showWaiting();
	wv.addEventListener("loaded",function(){
		wv.show('slide-in-right');
	},false)
})
//关于
document.getElementById("introduce_project").addEventListener("tap",function(){
	var wv=plus.webview.create("about_us.html","about_us.html");
	plus.nativeUI.showWaiting();
	wv.addEventListener("loaded",function(){
		wv.show('slide-in-right');
	},false)
})