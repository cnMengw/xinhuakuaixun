document.querySelector('.mui-slider').addEventListener('slide', function(event) {
 	var index = event.detail.slideNumber;
 	var strindex=0;
 	if(index==1){
 		var word="随着美股再次触及历史新高，衡量市场波动性的华尔街恐慌指数跌至10年低位。";
 		setInterval(function(){
			document.getElementById("dcon").innerText=word.substring(0,strindex++);
		},30);
 	}
});
document.getElementById("gonext").addEventListener("tap",function(){
	var wv=plus.webview.create('login.html', 'login.html', {}, { 
			noteId:note_id
		});
	wv.addEventListener('loaded', function() {
		wv.show('slide-in-right');
	}, false);
})