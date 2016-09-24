$(function(){
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});
	function _initParam(){
		var query=$(".sub-menu>.current>a").attr("query");
		var param={}
		param.query=query;
		param.page = 1;
		return param;
	}
	function _init(){
		$.public.loadListParam.api = config.api.scoreHistory;
		$.public.loadListParam.param = _initParam();
		$.public.loadListParam.successFn = function(data){
			loadData(data);
		}
		
		$.public.checkLogin(function(){
			//初始化数据
			$.public.loadList();
		});
	}
	function loadData(data){
		if(data.code!=0){
			cll_alert(data.message);
			location.href="/uc/index.shtml";
		}else{
			var list = data.result.list.arr;
			var memberInfo=data.result.memberInfo;
			$("#accountText").text(memberInfo.account);
			$("#scoreText").text(memberInfo.score);
			var dom=[];
			for(var i = 0; i < list.length ;i++ ){
				var html="<li><div class=\"info\"><span class=\"order_num\">订单编号：{0}</span><span class=\"order_ino\"><em class=\"item\">{1}</em><em class=\"time\">{2}</em></span></div>"
				html+="<div class=\"money\"><span class=\"scores\"><strong style=\"color:{3}\">{4}</strong></span><span class=\"classes\">类型：{5}</span></div></li>";
				var info=list[i];
				var param=[];
				param.push(info.lineNo);
				param.push(info.remark);
				param.push(info.buyTime.substring(0,10));
				var isOut=info.isOut;
				var score=info.score;
				var style="red";
				if(isOut){
					style="green";
					score=-score;
				}else{
					score="+"+score;
				}			
				param.push(style);
				param.push(score);
				param.push(info.type);
				html=html.format(param);
				dom.push(html);
			 }
			 var html$=$("#tabCon");
			 var htmlContent=dom.join("");
			 
			 var nextPage=$.public.loadListParam.param.page + 1;
			 $.public.loadListParam.param.page=nextPage;
			 $.public.showMoreList(data.result.list,html$,htmlContent);
		}
	}
	
	$("[name='group']").bind("fastClick",function(){//切换加载
		$(".sub-menu li").removeClass("current");
		$(this).parent("li").addClass("current");
		$.public.isInitLoad = true;
		$.public.loadListParam.param = _initParam();
		$.public.loadList();		
	});
	_init();
});	