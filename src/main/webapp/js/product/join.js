var join = {
	init:function(a){
		join.params.id =  a.attr("data-term-id");
		join.partScore = a.attr("data-score");
		join.maxPart = a.attr("data-max-part").replace(",","");
		$("#joinDiv img").attr("src",a.attr("data-img"));
		//初始化 每份积分数
		if(!$.public.isundefined(a.attr("data-max-part-score"))){
			join.partScore = a.attr("data-max-part-score");	
		}
		var limitPart = a.attr("data-limit-part");
		//初始化 是否限购
		if(!$.public.isundefined(limitPart) && parseInt(limitPart) > 0){
			join.limitPart = true;
			if(limitPart < join.maxPart){
				join.maxPart = limitPart;
			}
		}else{
			join.limitPart = false;
		}
		
		var multPart = a.attr("data-mult-part");
		//初始化 是否限制倍数
		if(!$.public.isundefined(multPart) && parseInt(multPart) > 0){
			join.multPart = multPart;
		}else{
			join.multPart=0;
		}	
		$("#joinPart").attr("maxValue",this.maxPart);
	},
	params:{"id":"0","joinPart":"0"},
	maxPart:0,
	limitPart:false,
	multPart:0,
	partScore:1000,
	click:function(){
		if($("#join a").hasClass("disable"))	
			return;
		join.init($(this));
		$.public.checkLogin(function(){	
			$("#radio1").fastClick();
			$.joinDiv.show();
			//是否为最大份数
			if(join.maxPart<10){			
				join.setCountValue(join.maxPart,true);
			}
			//设置默认倍数
			if(parseInt(join.multPart) > 0){
				join.setCountValue(join.multPart,true);
			}
		});
	},
	exePay:function(){
		join.params.joinPart = $("#joinPart").val();
		$.public.request(config.api.join,join.params,function(data){
			if(data.code == 0){
				cll_alert("参与成功!",function(){
					window.location.reload();
				});
			}else{
				if(data.code == 2003){
					var part = data.msg.replace(/[^0-9]/ig,"");;
					if(part == 0){
						cll_alert("抱歉当前积分不足");
					}else{
						$("#joinPart").val(part);
						cll_alert(data.msg);
					}
				}else{
					cll_alert(data.msg);
				}
				
			}
		});	
	},
	
	selectCount:function(a){
		join.removeSelectClass();
		var count = a.attr("data-count");
		a.addClass("select");
		join.setCountValue(count);
	},
	setCountValue:function(count,keyup){
		var joinMultPart = parseInt(join.multPart)
		if(joinMultPart > 0 && !$.public.isundefined(count)){
			if(parseInt(count) > parseInt(join.maxPart)){
				count = join.maxPart;
			}
			count = count - count%joinMultPart;
		}
		if(keyup){
			join.removeSelectClass();
		}
		if(count == ""){
			$("#score").text(0);
			return;
		}
		count = parseInt(count);
	 	var reg = new RegExp("^[0-9]*$"); 
	    if(!reg.test(count)){
	        count = 1;
	        totalScore = 0;
	    }else{
	    	if(count > parseInt(join.maxPart)){
		    	count = join.maxPart;
		    }
		   	if(count < 1){
		    	count = 1;
		    }
		    totalScore = join.partScore*count;
	    }
		$("#joinPart").val(count);
		$("#score").text(totalScore);
	},
	add:function(){
		var count = $("#joinPart").val();
		join.removeSelectClass();	
		if((parseInt(count) + join.addOrMinusVal()) <= join.maxPart){			
			join.setCountValue(parseInt(count)+join.addOrMinusVal());
		}	
	},
	minus:function(){
		var count = $("#joinPart").val();
		join.removeSelectClass();
		if(parseInt(count) > join.addOrMinusVal()){
			join.setCountValue(parseInt(count)-join.addOrMinusVal());
		}
	},
	addOrMinusVal:function(){
		var addVal = 1;
		if(parseInt(join.multPart) > 0){
			addVal = parseInt(join.multPart);
		}
		return addVal;
	},
	removeSelectClass:function(){
		$(".cllradio a").removeClass("select").addClass("defalut");
	}
}

$(document).ready(function(){
	$("#close").bind("fastClick",function(){
		$.joinDiv.hide();
	});
	
	$(".pay-quick a").bind("fastClick",function(){
		if($("#join a").hasClass("disable")){		
			return;
		}else{
			join.selectCount($(this));
		}
	})
	//减少
	$(".pay-bettimes .minus").bind("fastClick",function(){
		join.minus();
	})
	//增加
	$(".pay-bettimes .add").bind("fastClick",function(){
		join.add();
	})
	//购买
	$("#buy-button").bind("fastClick",function(){
		var text = "本次兑换将扣除您"+$("#score").text()+"积分,兑换"+$("#joinPart").val()+"个幸运号码,是否确认兑换！";
		cll_confirm(text,join.exePay);
	})

})

