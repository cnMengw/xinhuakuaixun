mui.init()
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady() {
//	postServer("/api/v1/global_index/stock_index_list",{},successfn)
//	setInterval(function(){
//		postServer("/api/v1/global_index/stock_index_list",{},successfn)
//		},120000);
}
function successfn(data){
	var resData=data.LIST;
	$(".zslist").empty();
	var str="";
	for(i=0;i<resData.length;i++){
		str+="<li><div class='mui-col-xs-4 mui-pull-left zd'><label>";
		str+=resData[i].index_name;
		str+="</label><span>"+resData[i].index_code+"</span></div>";
		if(resData[i].change_price>=0){
			str+="<div class='mui-col-xs-4 mui-pull-left price'><span class='up'>"+resData[i].latest_price+"</span></div>";
			str+="<div class='mui-col-xs-4 mui-pull-left range'><span class='up'>"+resData[i].change_rate+"</span><span class='up'>"+resData[i].change_price;
		}else{
			str+="<div class='mui-col-xs-4 mui-pull-left price'><span class='down'>"+resData[i].latest_price+"</span></div>";
			str+="<div class='mui-col-xs-4 mui-pull-left range'><span class='down'>"+resData[i].change_rate+"</span><span class='down'>"+resData[i].change_price;
		}
		str+=+"</span></div></li>";
	}
	document.getElementById("zslist").innerHTML=str;
	mui(".zslist").on("tap","li",function(){
		if($(this).children("div").find("label").text()=="上证指数"){
			alert("上证指数")
		}
	})
}

//保留两位小数
function TwoDecimal(d){
	var _d = parseFloat(d);
    if (isNaN(_d)) {
//      alert('function:changeTwoDecimal->parameter error');
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