$(function(){
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});
	function _init(){
		$.public.checkLogin(function(){
			$(".user-face>img").attr("src",config.memberPic);
			loadData();
		});
	}
	function loadData(){
		$.public.request(config.api.scoreInfo,{},function(data){
			if(data.code!=0){
				cll_alert(data.message);
			}else{
				var result=data.result;
				buildDom(result);
			}
		});
		/*scoreTips("score");*/
	}
	function buildDom(result){
		var data=result.memberInfo;
		var score=data.score;
		var account=data.account;
		$("#score").text(score);
		$("#account").text(account);
	}
	_init();
});	