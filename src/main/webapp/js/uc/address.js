var _method="LIST"; //LIST/ADD/EDIT
$(function(){
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});
	var urlM=$.public.urlParam("m");
	if(urlM=="add"){
		_method="ADD";
	}else if(urlM=="edit"){
		_method="EDIT";
	}else{
		_method="LIST";
	}
	
	var _api="";
	var _param={};
	if(_method=="LIST"){
		_api=config.api.addressList;
	}else if(_method=="ADD"){
		_api=config.api.scoreInfo;
		loadCity();
	}else if(_method=="EDIT") {
		_api=config.api.address;
		loadCity();
	}

	function _init(){
		$.public.checkLogin(function(){
			loadData();
		});
	}
	function loadData(){
		$.public.request(_api,_param,function(data){
			if(data.code!=0){
				cll_alert(data.message);
				location.href="/uc/index.shtml";
			}else{
				var result=data.result;
				if(_method=="LIST"){
					buildDom_LIST(result);
				}else if(_method=="ADD"){
					buildDom_ADD(result);
				}else if(_method=="EDIT") {
					buildDom_EDIT(result);
				}
			}
		});
	}
	function buildDom_ADD(result){
		var obj=result.memberInfo;
		$("#name").val(obj.name);
		$("#mobile").val(obj.telephone);
	}
	
	function buildDom_EDIT(result){
		var obj=result.address;
		$("#name").val(obj.name);
		$("#mobile").val(obj.telephone);
		$("#zipCode").val(obj.zipCode);
		$("#address").val(obj.address);
		$("#s_province").val(obj.province).change();
		$("#s_city").val(obj.city).change();
		$("#s_area").val(obj.area);
		$("#addressId").val(obj.id);
	}
	
	function buildDom_LIST(result){
		var arr=result.list.arr;
		if(arr.length==0){
			$("#add").show();
		}else{
			var dom=[];
			for(var i=0;i<arr.length;i++){
				var html="<div class=\"easebuy-m\"><p class=\"smt\"><span class=\"name\">{0}</span><span class=\"number\">{1}</span></p><p class=\"number\">{2}</p></div>"
				html+="<div class=\"supervise\"><div class=\"extra\"><a class=\"ml10\" href=\"addressInfo.shtml?m=edit\">编辑</a></div></div>";
				var data=arr[i];
				var param=[];
				param.push(data.name);
				param.push(data.telephone);
				param.push(data.full);
				param.push(data.id);
				html=html.format(param);
				dom.push(html);
			}
			$("#addressDiv").html(dom.join(","));
			$("#add,#no-data").remove();
		}
	}

	$("#saveBtn").fastClick(function(){
		var nos=$(".notNull");
		for(var i=0;i<nos.length;i++){
			var $tmp=$(nos[i]);
			var data=$tmp.attr("data");
			if($tmp.val()==""){
				cll_alert(data+"不能为空!");
				return;
			}
		};
		if($("#s_province").val()=="省份"){
			cll_alert("省份不能为空!");
			return;
		
		} if($("#s_city").val()=="地级市"){
			cll_alert("城市不能为空!");
			return;
		
		}
		if($("#s_area").val()=="市、县级市"){
			cll_alert("地区不能为空!");
			return;
		}
			
		var param=$("#subForm").serializeArray();
		for(var key in param){
			param[key].value=encodeURI(param[key].value);
		}
		var action=config.api.addAddress;
		if(_method=="EDIT"){
			action=config.api.upAddress;
		}
		if($(this).hasClass("disable")){
			return;
		}else{
			$(this).addClass("disable")
		}
		$.public.request(action,param,function(data){
			if(data.code==0){
				cll_alert("操作成功!",function(){
					location.href="/uc/address.shtml";
				});
			}else{
				$(this).removeClass("disable")
				cll_alert(data.message);
			}
		
		});
		
	});
	$("#zipCode").keydown(function(e){
		var val=$(this).val()+"";
		if(e.keyCode==8)return true;
		if(val.length==6){
			return false;
		}else{
			return true;
		} 
	});
	_init();
});	