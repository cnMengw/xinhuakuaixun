//展开单击事件
mui('.mui-table-view').on('tap','.list_more_left',function(){
	var listSubtitle = $(this).parent().parent().children('.list_subtitle')[0];
	if(listSubtitle.style.display == 'block'){
		listSubtitle.style.display = 'none';
		$(this).children('.icon').html('<use xlink:href="#mui-icon-down"></use>')
	}else{
		listSubtitle.style.display = 'block';
		$(this).children('.icon').html('<use xlink:href="#mui-icon-up"></use>')
	}
})
//list列表单击事件
mui('.mui-table-view').on('tap','.list_title',function(){
	var listSubtitle = $(this).next()[0];
	if(listSubtitle.style.display == 'block'){
		listSubtitle.style.display = 'none';
		$(this).siblings('.show_more').children('.list_more_left').children('.icon').html('<use xlink:href="#mui-icon-down"></use>')
	}else{
		listSubtitle.style.display = 'block';
		$(this).siblings('.show_more').children('.list_more_left').children('.icon').html('<use xlink:href="#mui-icon-up"></use>')
	}
})
//单个分享单击事件
mui('.mui-table-view').on('tap','.list_share',function(){
})

//单个语音播报单击事件
mui('.mui-table-view').on('tap','.list_speech',function(){
	var speechCont;
	var time = $(this).parents().children('.aside_left').children('p').html();
	time = getTime(time);
})
//所有列表语音播报事件




//时间转换：11:20:08 =》11点20分8秒
function getTime(str){
	var hourseTime;
	var mintuesTime;
	var secTime;
	var hourseNum = find(':',str,1);
	hourseTime = str.substr(0,hourseNum);
	hourseTime = wipeOff(hourseTime);
	var mintuesNum = find(':',str,2);
	mintuesTime = str.substr(hourseNum+1,mintuesNum);
	mintuesTime = wipeOff(mintuesTime);
	var secNum = find(':',str,3);
	secTime = str.substr(mintuesNum+1,secNum);
	secTime = wipeOff(secTime);
	str = hourseTime+'时'+ mintuesTime+'分'+ secTime+'秒';
	return str;
}
//查找第n次出现的子字符串
function find(cha,str,num){
   var x=str.indexOf(cha);
   for(var i=0;i<num;i++){
       x=str.indexOf(cha,x);
   }
   return x;
}
//去除第一个为0的字段, 03 => 3
function wipeOff(str){
	if(str[0] == '0'){
		str = str.substr(1,str.length);
	}
	return str;
}