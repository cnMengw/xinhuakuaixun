mui.init()
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady() {
	var zdList=document.querySelectorAll("li");
	for(i=0;i<zdList.length;i++){		
		var _height=$(".zd").eq(i).height();
		var liheight=$("li").eq(i).height();
		console.log(_height)
		console.log(liheight)
		var realh=(liheight-_height)/2/100;
		console.log(realh);
		$(".zd").eq(i).css("margin-top",realh+"rem");
	}
	
}

var zdList=document.querySelectorAll("li");
	for(i=0;i<zdList.length;i++){		
		var _height=$(".zd").eq(i).height();
		var liheight=$("li").eq(i).height();
		console.log(_height)
		console.log(liheight)
		var realh=(liheight-_height)/2/100;
		console.log(realh);
		$(".zd").eq(i).css("margin-top",realh+"rem");
	}

//var zdList=document.querySelectorAll("li");
//	for(i=0;i<zdList.length;i++){	
//		var liheight=$("li").eq(i).height();
//		var _height=$(".zd").eq(i).height();
//		var realh=(liheight-_height)/2/100;
//		console.log(realh);
//		$(".zd").eq(i).css("margin-top",realh+"rem");
//	}
//	