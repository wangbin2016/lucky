$.public.moveList("newlyPrizeGp",4000);
var param = {id:-1,page:1};
$.public.loadListParam.api = config.api.termList;
$.public.loadListParam.param = param;
$.public.loadListParam.successFn = function(data){
	var list = data.result.list.arr;
	var htmlContent = "";
	for(var i = 0; i < list.length ;i++ ){
		var term = list[i];
		var product = term.product;
		var schedule = parseInt(term.soldPart)/parseInt(term.totalPart)*100;
		if(schedule < 1){
			schedule = 1;
		}
		var lazyImageUrl = config.productPic
		if(param.page == 1 && i<4){//第一页的前4条不用延迟加载
			lazyImageUrl = product.coverImage;
		}
		
		var paramStr = "?id="+product.id+"&term="+term.term;
		var prize = term.totalPart/(config.scoreBamount/term.perScore);
		htmlContent += "<li class='product-item' >"+
		            "<a href='detail.shtml"+paramStr+"'><span class='product-img'>"+
		                "<img class='scrollLoading' src='"+lazyImageUrl+"' data-url='"+product.coverImage+"'>"+
		            "</span></a>"+
		            "<div class='cards-details'>"+
		                "<p class='cards-name'>"+product.subtitle+"</p>"+
		                "<p class='price'>夺宝价<span>￥"+prize+"</span></p>"+
		                "<div class='cards-operate'>"+
		                    "<div class='cars-progress'>"+
		                        "<span class='progress-bar'>"+
		                            "<span class='bar' style='width: "+schedule+"%'></span>"+
		                        "</span>"+
		                        "<p class='cars-total'>"+
		                            "<span class='total-item'>"+
		                                "<em class='num'>"+term.totalPart+"</em><br>"+
		                                "总需</span>"+
		                            "<span class='total-item' style='float:right;'>"+
		                                "<em class='num red'>"+term.modPart+"</em><br>"+
		                                "剩余</span>"+
		                        "</p>"+
		                    "</div>"+
		                    "<a href='javascript:;'"+$.public.buildJoinData(null,term.termId,term.modPart,product.limitPart,product.multPart,product.coverImage,term.perScore)+"'>参与</a>"+
		                "</div>"+
		            "</div>"+
		        "</li>";
	 }
	 
	 var html$ =  $(".index-product-list");
	 param.page++;
	 $.public.showMoreList(data.result.list,html$,htmlContent);
	//
	setTimeout(function(){$(function() {
		$(".scrollLoading").scrollLoading();	
	});},"800");
}
$(document).ready(function(){
	$(".index-product-list").delegate("a","fastClick",join.click);   
	$(".sub-menu li").bind("fastClick",function(){//切换加载
		$(".sub-menu li").removeClass("current");
		$(this).addClass("current");
		param.id = $(this).attr("data-type");
		param.page = 1;
		$.public.isInitLoad = true;
		$.public.loadListParam.param = param;
		$.public.loadList();		
	});
	
	//初始化数据
	$.public.loadList();
	//初始化所有参与购买button


	
	if($.public.isApps() == false) {
		$('#luckIntroduceBox').click(function(){
			closeLuckIntroduceTip();
			$('#luckIntroduceBox').hide();
		});

		$.post("/checkLuckIntroduceTip.php", 
		   function(data){
				 var ret = eval("(" + data + ")");
				 var code = ret.code;
				 if(code == "0"){
					$("#luckIntroduceBox").show();
				 }
		 });
	}
	$.public.share();
})