var loginback=null;

jQuery.public = {
	isundefined:function(obj){
		if( typeof(obj) == "defined" || typeof(obj) == "undefined" || obj == "" || obj == null )
			return true;
		else 
			return false;
	},
	checkLogin:function (fn){
		return $.ajax({
		     type: "post",
		     url: "/mobile/uc/login.php?action=checkLogin&v="+new Date(),          
		     global: false,
		     success: function (data) {
		     	 if(data=="true"){
			     	fn();	
				 }else{
				 	if($.public.isApps()){
				 		loginback = fn;
				 		if($.public.isios()){
				 			document.location="cllios://?function=login&callback=loginback";
				 		}else{
				 			window.cllandroid.openLogin("jsCallback","loginback");
				 		}
				 	}else{
				 		cll_login('登录框',fn);
				 	}
					return false;
				 }  
		     },
		     error: function (msg) {
		    	 cll_alert(msg);
		     }
		});
	},
	request : function(url, param,successFn,retData){
		var loadObj = $("#loading");
		if(loadObj.length > 0){
			loadObj.show();
		}else{
			//$("body").append(loadingHtml);
			//loadObj = $("#loading");
		}
		if($.public.isundefined(retData)) 
			retData = "json";
		$.ajax({type:"POST", url:url, data:param, dataType:retData,success:function (data) {	 
			if($.public.isundefined(successFn)){
				reqSuccessFunction(data);
			}else if(data.code != 0 ){
				if(data.code == 10001){
					cll_login('登录框',function(){
						window.location.reload();
					});
				}else if(data.code == 2003){
					var part = data.msg.replace(/[^0-9]/ig,"");;
					if(part == 0){
						$.public.scoreExcharge();
					}else{
						$("#joinPart").val(part);
						$.public.scoreExchargeMore(data.msg);
					}
				}else{
					cll_alert(data.msg,function(){
						if(data.code == 10001 || data.code == 10002|| data.code == 99999|| data.code == 99999||data.code == 10020||data.code == 10030){
							window.location.href="/luck/";
						}
					});
				}
			}else
				successFn(data);
			loadObj.hide();
		}, error:function (e) {
			errorFn(e);
			loadObj.hide();
		}});	
	},
	urlParam:function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) {
			return unescape(r[2]); 
		}
		return null;
	},
	moveList:function (obj,type){
		 var o = typeof(obj)=="string" ? document.getElementById(obj) : obj;
		 if(o == null) {
			return;
		 }
		 var dltH = 0;
		 var currPos = 0;
		 var realPos = 0;
		 var liLength = $("ul.scroll li").length;
		 var count_=0;
		 setInterval(
		 function(){
		 	dltH = o.scrollHeight; //每次移动前要动态计算一次
		 	var height = dltH/liLength;
		 	var heightInt = parseInt(height);
		 	count_++;
		 	var xx = setInterval(
		 		function(){
		 			realPos++;
		 			if(++currPos >= (dltH*0.75)){
		 				currPos=0;
		 				realPos = 0;
		 			}
		 			if(currPos%heightInt==0){
		 				realPos = height-heightInt+realPos;
		 				clearInterval(xx);
		 			}
		 			o.scrollTop = realPos;
		 		}  	, 28 );
		 }, type );
	},
	showMoreList:function(list,html$,htmlContent,$select){//list数据列表 html$要追加到那个Html内 ,htmlContent追加的内容,$select显示更多的按钮; //由加载成功处调用		  
		 if($.public.isInitLoad){
		 	 $(html$).html(htmlContent);
		 }else{
		 	 $(html$).append(htmlContent);
		 }
		 var more = list.tp != list.np;
		 if(list.arr.length == 0 && list.tp == 1){
		 	more = "no-data";
		 }
			 
		var showMoreDivSpan = $(".add-more-data span");//默认
		var showMoreDiv = $(".add-more-data");//默认
		if(!$.public.isundefined($select)){
			showMoreDiv = $($select);
		}
		if(more=="no-data"){
			showMoreDivSpan.text("当前没有一条记录");
			showMoreDiv.show();
		}else if(more){
			showMoreDivSpan.text("点击加载更多");
			showMoreDiv.show();
		}else{
			showMoreDivSpan.text("没有更多记录");
			showMoreDiv.show();
		}
		$.public.isInitLoad = false;
	},
	loadList:function(){//初始化加载更多fn
		var text = $(this).text();
		if(text.indexOf("点击加载更多")>-1 || $.public.isInitLoad){
			$.public.request($.public.loadListParam.api,$.public.loadListParam.param,$.public.loadListParam.successFn)
		}
	},
	loadListParam:{api:"",param:{},successFn:""},//由需要加载处实现
	isInitLoad:true,
	init:function(){//所有需要初始化数据;
		//初始化所有加载更多
		$(".add-more-data").bind("fastClick",$.public.loadList);
		$.public.showHead();
		this.initFixedBlock();
		//alert(navigator.userAgent);
	},
	browser:{
		versions: function () {
		    var u = navigator.userAgent, app = navigator.appVersion;
		       	return { //移动终端浏览器版本信息 
		            trident: u.indexOf('Trident') > -1, //IE内核
		            presto: u.indexOf('Presto') > -1, //opera内核
		            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
		            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		            iPad: u.indexOf('iPad') > -1, //是否iPad
		            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		            weixin: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger", //微信
		            cllios: u.toLowerCase().indexOf('cllforios') > -1 || u.toLowerCase().indexOf('cllios') > -1 , //cll苹果客户端
		            cllandroid: u.toLowerCase().indexOf('cllforandroid') > -1 || u.toLowerCase().indexOf('cllandroid') > -1 //cll安卓客户端
		       };
		} (),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
		 ,isPC:function(){
		    	var flag=true;
		    	try{
			    	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){ 
						flag=false;
					}
				}catch(e){}
				return flag;
		    }()
	},
	showHead:function(){
		if(!$.public.isApps()){
			$(".topnavbar").show();
		}
	},
	isApps:function(){
		if(window.cllandroid || $.public.browser.versions.cllios)
			return true;
		return false;
	},
	isios:function(){
		if($.public.browser.versions.cllios)
			return true;
		return false;
	},
	cllCharge:function(){
		var confirmButtonTxtTemp = confirmButtonTxt;
		confirmButtonTxt = "充值";
		cll_confirm("余额不足!",function(){
			if($.public.isApps()){
				if($.public.isios()){
					window.location.href = "cllios://?function=recharge";
				}else{
					window.cllandroid.openRecharge();
				}
			}else{
				window.location.href = "http://m.cailele.com/member/recharge.shtml";
			}
		
		},function(){ confirmButtonTxt = confirmButtonTxtTemp});
	},
	scoreExcharge:function(){
		var confirmButtonTxtTemp = confirmButtonTxt;
		confirmButtonTxt = "兑换积分";
		cll_confirm("抱歉当前积分不足!",function(){
			window.location.href = "/uc/convert.shtml";
		},function(){confirmButtonTxt = confirmButtonTxtTemp});
		
	},
	scoreExchargeMore:function(msg){
		var confirmButtonTxtTemp = confirmButtonTxt;
		var cancelButtonTxtTemp = cancelButtonTxt;
		confirmButtonTxt = "兑换积分";
		cancelButtonTxt = "确定";
		cll_confirm(msg,function(){
			window.location.href = "/uc/convert.shtml";
		},function(){cancelButtonTxt = cancelButtonTxtTemp;confirmButtonTxt = confirmButtonTxtTemp});
		
	},
	initFixedBlock:function(){
		var startHeight = $(".sub-menu").attr("data-start-height");
		var submenu = $(".sub-menu").height();
		if(!$.public.isundefined(startHeight)){
			window.onscroll=function(){
				var scrollTop = $("body").scrollTop();
				if(scrollTop >=parseInt(startHeight)){
					$(".sub-menu").addClass("fixed-bolck");
					$(".myrecord").css("margin-top",submenu+"px");
					$(".index-product-list").css("margin-top",submenu+"px");
				}else{
					$(".sub-menu").removeClass("fixed-bolck");
					$(".myrecord").css("margin-top","0px");
					$(".index-product-list").css("margin-top","0px");
				}
			}
		}
	},
	openShare:function(title,content,url,iconURL){
		if($.public.isApps()){
			try{
				if($.public.isios()){
					var content = "cllios://?function=openShare&title="+encodeURIComponent(title)+"&content="+encodeURIComponent(content)+"&iconURL="+iconURL+"&url="+url;
					document.location= content;
				}else{
					cllandroid.openShare(title,content,url,iconURL)
				}
			}catch(e){}
		}
	},
	share:function(){
		var contentArr = config.share.content;
		var index = parseInt(Math.random()*contentArr.length)
		var content = contentArr[index];
		this.openShare(config.share.title,content,config.share.url,config.share.image_url);
	},
	buildJoinData:function(obj,termId,modPart,limitPart,multPart,coverImage,score){
		if(obj== null){
			return " class='join-btn' data-score='"+score+"'data-img='"+coverImage+"' data-limit-part='"+limitPart+"' data-mult-part='"+multPart+"'  data-term-id='"+termId+"' data-max-part='"+modPart+"'";
		}else{
			obj.attr("data-term-id",termId);
			obj.attr("data-max-part",modPart);
			obj.attr("data-limit-part",limitPart+"");
			obj.attr("data-mult-part",multPart+"");
			obj.attr("data-score",score);
			obj.attr("data-img",coverImage);
		}
	}
}
function errorFn(e){
	console.log(e);
}

$(document).ready(function(){
	$.public.init();
});


(function (doc, win) {
  var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
	};
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

jQuery.joinDiv = {
	show:function(){
		$("#joinDiv").css("opacity","1").css("display","block");;
	},
	hide:function(){
		$("#joinDiv").css("opacity","0").css("display","none");
	}
}

