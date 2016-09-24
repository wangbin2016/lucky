$(function(){
	var firstExchange = false;
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});
	var _maxMoney=100000;//最大可兑换10w
	var _rate=2000;// 汇率
	function _init(){
		$.public.checkLogin(function(){
			$.public.request(config.api.scoreInfo,{},function(data){
				if(data.code!=0){
					cll_alert(data.message);
				}else{
					var memberInfo=data.result.memberInfo;
					var money=memberInfo.money;
					var ableMoney=parseInt(money);
					ableMoney=ableMoney>_maxMoney?_maxMoney:ableMoney;
					var ableScore=ableMoney*_rate;
					$("#scoreText").text(memberInfo.score);
					$("#moneyText").text(money);
					$("#maxScoreText").text(ableScore);
					$("#useMoney").data("money",ableMoney);
					if(ableMoney>0){
						var minScore=_rate*parseInt($("#useMoney").attr("default"));
						$("#useScore").text(minScore);
					}else{
						$(".guide-recharge").show();
					}
					
					
					//活动已结束
					/*$.public.request(config.api.exchangeCount,{},function(data){
						if(data.code == 0 && data.result.count == 0){
							$("#gift").show();
							firstExchange = true;
						}
					});*/
				}
			});
		});
	}
	$("#useMoney").keyup(function(e){
		var money=$(this).val()*1;
		var max=$(this).data("max")*1;
		var min=$(this).data("min")*1;
		if(parseInt(money)>=_maxMoney){
			$("#tips").show();
		}
		money=money>max?max:money;
		money=money<min?min:money;
		
		if(money != 20 || money != 50 || money != 100 || money != 200){
			if(quickPay!=null){
				quickPay.removeClass();
			}
		}
		
		$(this).val(money);
		var score=_rate*money;
		
		if(money >= 20 && firstExchange){
			$("#giftScore>em").text(score*0.2);
			$("#giftScore").show();
		}else{
			$("#giftScore>em").text(0);
			$("#giftScore").hide();
		}
		$("#useScore").text(score);
	});

	$("#allChange").fastClick(function(){
		var money=$("#useMoney").data("money") || 1;
		$(this).toggleClass("select");
		if($(this).hasClass("select")){
			var score=money*_rate;
			$("#useMoney").val(money).keyup();
		}
	});
	var sub=false;
	$("#submitBtn").fastClick(function(){
		var useMoney=$("#useMoney").val()*1;
		var currentMoney=$("#useMoney").data("money")*1;
		var useScore=$("#useScore").text()*1;
		if(useMoney>currentMoney){
			$.public.cllCharge();
		}else if(useMoney>_maxMoney){
			cll_alert("超过最大兑换金额"+_maxMoney+"元!");
		}else if(useMoney*_rate != useScore){
			cll_alert("金额和积分数据错误!");
		}else{
			if(sub){
				return false;
			}
			sub=true;
			
			var showScore = useScore + $("#giftScore>em").text()*1;
			
			cll_confirm("你是否确认"+useMoney+"元兑换"+showScore+"积分?",function(){
				var param={};
				param.score=useScore;
				param.money=useMoney;
				$.public.request(config.api.exchange,param,function(data){
					sub=false;
					if(data.code!=0){
						cll_alert("兑换失败:"+data.message);
					}else{
						cll_alert("兑换成功",function(){
							location.href="/uc/index.shtml";
						});
					}
				});
			},function(){sub=false;});
		}
	});
	_init();
	
});	
quickPay = null;