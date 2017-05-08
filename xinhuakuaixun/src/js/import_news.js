mui.init();
			(function($){
				var deceleration=mui.os.ios?0.003:0.0009;
				$(".mui-scroll-wrapper").scroll({
					bounce:false,
					indicators:true,
					deceleration:deceleration
				});
				
				
				$.ready(function(){
					$.each(document.querySelectorAll(".mui-slider-group .mui-scroll"), function(index,pullRefreshE1) {
						$(pullRefreshE1).pullToRefresh({
							down:{
								auto: false,
								callback:function(){
									var self = this;
									setTimeout(function() {
											
											self.endPullDownToRefresh();
										}, 1000);
									
								}
							},
							up:{
								auto: false,
								contentnomore: '没有更多数据了',
								callback:function(){
									var self=this;
									setTimeout(function() {
											
											self.endPullUpToRefresh();
										}, 1000);
								}
							}
						})
					});
					
				})
			})(mui);
