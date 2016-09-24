var termInfo = {
	totalPage:0,
	params:{"id":"0","termNo":"0","page":"1","pageSize":"20"},
	successFn:function(data){
		if(termInfo.params.page == 1){
			var term_info = data.result.termInfo;
			var product = term_info.product;
			termInfo.initImage(term_info);//初始化图片数据
			$("#term").text("第"+term_info.term+"期 "+product.subtitle);
			$(".pro-intro").html(product.title);
			$(".totalPart").text(term_info.totalPart);
			$(".lessPart").text(term_info.modPart);
			var val = term_info.soldPart/term_info.totalPart*100;
			if(val == 100 && (term_info.status == 4 || term_info.status == 5)){//已开奖
				$(".pro-name .state").addClass("state-ed").text("已结束");
				var termHtml = termInfo.finishHtml(term_info);
				$("#announced").html(termHtml);
				$("#announced").show();
				$("#join em").text("参与最新期次");
				if(!$.public.isundefined(term_info.sellTerm)){
					var forwardurl = "detail.shtml?id="+product.id+"&term="+term_info.sellTerm+"&show=true";
					$("#join a").attr("href",forwardurl);
					$("#join").show();
					$(".add-more-data").css("margin-bottom",".85rem");
				}
			}else if(term_info.status == 6){//已完成 未开奖
				$(".pro-opening").show();
				$(".pro-name .state").addClass("state-ing").text("开奖中");
			}else if(term_info.status == 0){//已退单
				$(".pro-name .state").addClass("state-ing").text("已退单");
				$(".progress-bar span").css("width",val+"%");
				//$("#join a").attr("href","buying.shtml?term="+termInfo.params.termId);
				$("#join a").bind("fastClick",join.click);
				$("#join a").addClass("disable").text("已退单");
				$("#progress").show();//进行中的div
				$(".agreement").show();
				$("#join").show();
				var showBet = $.public.urlParam("show");
			}else{//进行中
				$(".pro-name .state").addClass("state-ing").text("进行中");
				$(".progress-bar span").css("width",val+"%");
				//$("#join a").attr("href","buying.shtml?term="+termInfo.params.termId);
				$.public.buildJoinData($("#join a"),term_info.termId,term_info.modPart,product.limitPart,product.multPart,product.coverImage,term_info.perScore)
				$("#join a").bind("fastClick",join.click);
				$("#progress").show();//进行中的div
				$(".agreement").show();
				$("#join").show();
				var showBet = $.public.urlParam("show");
				if(!$.public.isundefined(showBet)){
					$("#join a").fastClick();
				}
			}
			$("#history").attr("href","pasthistory.shtml?id="+termInfo.params.id);//历史开奖
			$(".pro-name .state").show();
			var detailUrl = product.detailUrl;
			if($.public.isundefined(detailUrl)){
				detailUrl = "txtimg.shtml";
			}
			$("#picDetail").attr("href",detailUrl);//图文详情
			
			if(data.result.join > 2){//用户已参与
				$("#hasJoin").show();
				$("#hasJoin").bind("fastClick",function(){
					location.href = termInfo.getUrl(data.result.join);
				});
			}else if(data.result.join == 1){//用户未参与
				$("#notJoin").show();
			}else{//用户未登录
				$("#notLogin").show();
				$("#notLogin").bind("fastClick",function(){
					$.public.checkLogin(function(){window.location.reload()});
				});
			}
			//是否显示分享 重写config
		 	if(product.shareTitle != null && product.shareContent != null){
		 		config.share.title = product.shareTitle;
		 		config.share.content = [product.shareContent];
		 		config.share.url = window.location.href;
		 		$.public.share();
		 	}
			termInfo.totalPage = data.result.list.tp;
		}
		var arr = data.result.list.arr;
		var htmlContent = "";
		for(var i = 0 ;i<arr.length;i++){
		   	var record = arr[i];
		   	var url_ = termInfo.getUrl(record.mId);
			var li = "<li onclick='location.href=\""+url_+"\"'>"+
		            	"<span class='avatar'><img src='"+config.memberPic+"'></span>"+
		                "<div class='txt'>"+
							"<h3><span class='fr timer'>参与<em class='red'>"+record.num+"</em>人次</span><a href='javascript:;' class='lnk'>"+record.account+"</a></h3>"+
							"<p>"+record.ipAddr+"&nbsp;IP:"+record.ip+"</p>"+
							"<p>"+record.buyTime+"</p>"+
						"</div>"+
		            "</li>";
			htmlContent+=li;
		}
		
		 var html$ =  $(".part-record");
	 	termInfo.params.page++;
	 	$.public.showMoreList(data.result.list,html$,htmlContent);
	},
	initImage:function(term_info){
		if($.public.isundefined(term_info.product.picArr)){
			return ;
		}
		var imageArr = term_info.product.picArr.split(",");
		var imageLi = "";
		var divPoint = "";
		for(index in imageArr){
			var image = imageArr[index];
			imageLi += "<li><img src='"+image+"' style='max-width:100%;'></li>";
			var current = "";
			if(index == 0){
				current = "current";
			}
			divPoint += "<span index='"+index+"' class='dot "+current+"'>&nbsp;</span>";
		}
		$("#slider-banner ul").html(imageLi);		
		if(imageArr.length > 1){
			$("#slider-banner .point").html(divPoint);
			$("#slider-banner .point").show();
		}
	},
	getUrl:function(mId){
		return "joinRecord.shtml?id="+termInfo.params.id+"&termNo="+termInfo.params.termNo+"&mId="+mId;
	},
	finishHtml:function(term){
		var param_ = "id="+term.product.id+"&termNo="+term.term+"&mId="+term.mId;
		var html = "<div class='lucky-num'>"+
		                "<a href='caldetail.shtml?"+param_+"' class='fr btn btn-weak'>计算详情</a>"+
		                "幸运号码：<em class='num'>"+term.luckNum+"</em>"+
		            "</div>"+
		            "<div class='lucky-person'>"+
		                "<div class='lucky-person-inner'>"+
		                    "<div class='avatar'>"+
		                        "<img src='"+config.memberPic+"'>"+
		                    "</div>"+
							"<div class='winner-txt'>"+
		                        "<h3><span class='more'>"+term.ip+"</span>"+term.account+"</h3>"+
		                        "<p>揭晓时间："+term.openTimeStr+"</p>"+
		                        "<p>"+
		                            "<span class='fr'><a href='joinRecord.shtml?"+param_+"' class='lnk partdetail'>参与详情</a></span>"+
		                            "本期参与<em class='red'>"+term.buyNum+"</em>人次"+
		                        "</p>"+
		                    "</div>"+
		                "</div>"+
		                "<div class='btn-wrap lucky-person-quick-exchange'>"+
		                "</div>"+
		            "</div>";
		   return html;
	},
	loadMore:function(){
		termInfo.params.page ++;
		if(totalPage.totalPage <= termInfo.params.page){
			this.init();
		}
	}
}

$(document).ready(function(){
	termInfo.params.id = $.public.urlParam("id");
	termInfo.params.termNo = $.public.urlParam("term");
	
	$.public.loadListParam.api = config.api.detail;
	$.public.loadListParam.param = termInfo.params;
	$.public.loadListParam.successFn = termInfo.successFn;
	
	$.public.loadList();
	$.public.isInitLoad = false;
	
})