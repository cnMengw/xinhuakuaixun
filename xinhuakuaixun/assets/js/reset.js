//rem 重置  1rem == 100px
(function () {
    var docEl = document.documentElement;
    var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var setRem = function () { 
        var screenWidth = docEl.clientWidth || window.screen.width || 360;
        // 375 PSD宽度(可变的) [1rem = 100px]
        docEl.style.fontSize = (100 * screenWidth / 375) + 'px';
    };
    window.addEventListener('resize', setRem, false);
    setRem();
//  console.log('rem执行完毕');
})();

//ajax请求
function postServer(route, data, successfn, errorfn,errortype) {
	console.log('请求参数：' + JSON.stringify(data));
	mui.ajax(XHCJ.postajax + route, {
		data: JSON.stringify(data),
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		timeout: 30000, //超时时间设置为30秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			console.log('请求成功返回的数据：' + JSON.stringify(data));
			if(parseInt(data.status.code) == 0) {
				successfn(data);
			} else {
				if(errorfn) {
					errorfn(data);
				} else {
					mui.alert(data.status.message,'温馨提示');
				};
				plus.nativeUI.closeWaiting();
			};
		},
		error: function(xhr, type, errorThrown) {
			console.log('通讯异常 xhr：' + xhr);
			console.log('通讯异常 type：' + type);
			console.log('通讯异常 errorThrown：' + errorThrown);
			plus.nativeUI.closeWaiting();
			mui.alert("通讯异常!", '温馨提示','确定', function() {
				if(errortype) {
					errortype();
					appError();
				};
			});
		}
	});
};

function appError() {
	if(mui.os.android) {
		plus.runtime.quit();
	} else {
		var mv = plus.webview.create('iosErrorpage.html', 'iosErrorpage.html', {
			left: 0,
			top: 0
		});
		mv.show();
	};
};