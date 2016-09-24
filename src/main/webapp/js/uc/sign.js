$(function(){
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});

	function _init(){
		$.public.checkLogin(function(){
			//初始化数据
			$.public.request(config.api.signInInfo,{},function(data){
				console.log(data);
				var result = data.result;
				if(!result.isSignIn){
					$("#sign").hide();
					$("#notsign").show();
					$(".sign-oper>a").bind("fastClick",function(){
						$.public.request(config.api.signIn,{},function(signInResult){
							if(signInResult.code==0){
								$("#sign").show();
								$("#notsign").hide();
								$('.sign-alert').show();
								$(".sign-oper>a").unbind("fastClick");
								var $count = $("#count")
								$count.text(parseInt($count.text())+1);
							}
						});
					})
				}
				$("#count").text(data.result.signInCount);
			});
		});
	}
	
	$('.sign-alert .operate').click(function(){
		$('.sign-alert').hide();
	});
	_init();
});	