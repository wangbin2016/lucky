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
				 		cll_login('��¼��',fn);
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
					cll_login('��¼��',function(){
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
		 	dltH = o.scrollHeight; //ÿ���ƶ�ǰҪ��̬����һ��
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
	showMoreList:function(list,html$,htmlContent,$select){//list�����б� html$Ҫ׷�ӵ��Ǹ�Html�� ,htmlContent׷�ӵ�����,$select��ʾ����İ�ť; //�ɼ��سɹ�������		  
		 if($.public.isInitLoad){
		 	 $(html$).html(htmlContent);
		 }else{
		 	 $(html$).append(htmlContent);
		 }
		 var more = list.tp != list.np;
		 if(list.arr.length == 0 && list.tp == 1){
		 	more = "no-data";
		 }
			 
		var showMoreDivSpan = $(".add-more-data span");//Ĭ��
		var showMoreDiv = $(".add-more-data");//Ĭ��
		if(!$.public.isundefined($select)){
			showMoreDiv = $($select);
		}
		if(more=="no-data"){
			showMoreDivSpan.text("��ǰû��һ����¼");
			showMoreDiv.show();
		}else if(more){
			showMoreDivSpan.text("������ظ���");
			showMoreDiv.show();
		}else{
			showMoreDivSpan.text("û�и����¼");
			showMoreDiv.show();
		}
		$.public.isInitLoad = false;
	},
	loadList:function(){//��ʼ�����ظ���fn
		var text = $(this).text();
		if(text.indexOf("������ظ���")>-1 || $.public.isInitLoad){
			$.public.request($.public.loadListParam.api,$.public.loadListParam.param,$.public.loadListParam.successFn)
		}
	},
	loadListParam:{api:"",param:{},successFn:""},//����Ҫ���ش�ʵ��
	isInitLoad:true,
	init:function(){//������Ҫ��ʼ������;
		//��ʼ�����м��ظ���
		$(".add-more-data").bind("fastClick",$.public.loadList);
		$.public.showHead();
		this.initFixedBlock();
		//alert(navigator.userAgent);
	},
	browser:{
		versions: function () {
		    var u = navigator.userAgent, app = navigator.appVersion;
		       	return { //�ƶ��ն�������汾��Ϣ 
		            trident: u.indexOf('Trident') > -1, //IE�ں�
		            presto: u.indexOf('Presto') > -1, //opera�ں�
		            webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
		            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
		            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //�Ƿ�Ϊ�ƶ��ն�
		            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
		            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
		            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
		            iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
		            webApp: u.indexOf('Safari') == -1, //�Ƿ�webӦ�ó���û��ͷ����ײ�
		            weixin: u.toLowerCase().match(/MicroMessenger/i) == "micromessenger", //΢��
		            cllios: u.toLowerCase().indexOf('cllforios') > -1 || u.toLowerCase().indexOf('cllios') > -1 , //cllƻ���ͻ���
		            cllandroid: u.toLowerCase().indexOf('cllforandroid') > -1 || u.toLowerCase().indexOf('cllandroid') > -1 //cll��׿�ͻ���
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
		confirmButtonTxt = "��ֵ";
		cll_confirm("����!",function(){
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
		confirmButtonTxt = "�һ�����";
		cll_confirm("��Ǹ��ǰ���ֲ���!",function(){
			window.location.href = "/uc/convert.shtml";
		},function(){confirmButtonTxt = confirmButtonTxtTemp});
		
	},
	scoreExchargeMore:function(msg){
		var confirmButtonTxtTemp = confirmButtonTxt;
		var cancelButtonTxtTemp = cancelButtonTxt;
		confirmButtonTxt = "�һ�����";
		cancelButtonTxt = "ȷ��";
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

