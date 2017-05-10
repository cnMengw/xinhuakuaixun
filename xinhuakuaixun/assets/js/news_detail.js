mui.init();
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
var newsid;
function plusReady(){
	var self=plus.webview.currentWebview();
	newsid=self.newsId;
	var param={
		news_id: newsId,
//		user_id: XHCJ.user_id
	}
//	postServer("/api/v1/news/get",param,successfn);
}
function successfn(data){
	var newsContent = data.data_content;
	var isWebp = false;
	var imgNewAdd = [];
	var newTotalImgSrc = [];
	document.getElementById("title").innerHTML=data.news_title;
	document.getElementById("source").innerHTML=data.source;
	document.getElementById("date").innerHTML=data.issued_date;
//	document.getElementById("adimg").src=data.LIST2.ad_photo;
//	document.getElementById("data_content").innerHTML=data.data_content;
	//附件处理--渲染
	if(data.annex) {
		var fuJianData = data.annex;
		if(fuJianData.charAt(fuJianData.length - 1) == ',') {
			fuJianData = fuJianData.substr(0, fuJianData.length - 1)
		}
		console.log('本条咨询有附件')
		var fuJianArr = fuJianData.split(',');
		var str = "";
		var j = 0;
		for(var i = 0; i < fuJianArr.length; i++) {
			j++;
			var attachmentType = fuJianArr[i].substring(fuJianArr[i].lastIndexOf('.')+1).toLowerCase();
			var attachmentName = fuJianArr[i].substring(fuJianArr[i].lastIndexOf('/')+1);
			var attachmentImgSrc = "../img/attachment_"+attachmentType+".png";
			var attachmentSize = data.annex_size;
			if(attachmentSize != ''){
				attachmentSize = Number(attachmentSize)
				if(attachmentSize > 1024){
					 attachmentSize = (attachmentSize/1024).toFixed(2);
					 attachmentSize = attachmentSize+'Mb';
				}else{
					attachmentSize = attachmentSize+'Kb';
				}
			}
			str += "<span class='attachment_body'><img onerror='this.src =&quot;../img/attachment_unknow.png&quot;' href=" + fuJianArr[i] + " class='attachmentImg attachmentDown' src="+attachmentImgSrc+" ><span><br />"+attachmentName+"</span>\n<span class='attachmentSize'>"+attachmentSize+"</span></span>";
			//取得附件类型
		}
		str = "<span class='attachment_header'><i class='mui-icon mui-icon-paperclip attachmentLianJie'></i>附件</span><br />"+str;
		newsContent = newsContent + str;
	}
	
	//判断是否有视频
	if(data.video_list){
		document.getElementById("data_content").innerHTML = newsContent;
		for(var i=0;i<data.video_list.length;i++){
			$('#data_content').prepend($("<div id='myVideo"+i+"'></div>"));
			playerArr = [];
			playerArr[i] = cyberplayer("myVideo"+i).setup({
				fullscreen:false,
				width:'92%',
				height:200,
				playlist:[{
					image:data.video_list[i].thumbnail_url_list[0].thumbnail_url,
					sources:[
					{
						file:data.video_list[i].playable_list[2].playable_url,
						label:'标清'
					},
					{
						file:data.video_list[i].playable_list[0].playable_url,
						label:'高清'
					},
					{
						file:data.video_list[i].playable_list[1].playable_url,
						label:'超清'
					}
					]
				}]
			});
			playerArr[0].play();
		}
	}else{
		document.getElementById("data_content").innerHTML = newsContent;
	}
	
}




document.getElementById("more").addEventListener("tap",function(){
	var wv=plus.webview.create("finance.html","finance.html");
	wv.addEventListener('loaded', function() {
		wv.show('slide-in-right');
	}, false);
})
