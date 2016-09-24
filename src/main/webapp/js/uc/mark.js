$(function(){
	bindCancelFunction(function(){
		sd_remove();
		location.href="/index.shtml";
	});
	function _initParam(){
		var query=$(".sub-menu>li.current");
		var win=$(".sub-menu>li.current").attr("data-win-status");
		var param={}
		param.win=win;
		param.page = 1;
		return param;
	}
	function _init(){
		$.public.loadListParam.api = config.api.history;
		$.public.loadListParam.param = _initParam();
		$.public.loadListParam.successFn = function(data){
			loadData(data);
		}
		$.public.checkLogin(function(){
			//��ʼ������
			$.public.loadList();
		});
	}
	function loadData(data){
		if(data.code!=0){
			cll_alert(data.message);
			location.href="/uc/index.shtml";
		}else{
			var list = data.result.list.arr;
			var htmlContent = "";
			for(index in list){
				var record = list[index];
				var div = _buildDiv(record)//id=5&termNo=55&mId=10005440
				var li ="<li class='prodetail'>"+
		                "<div class='part-img'><a href='javascript:;'><img src='"+record.cimg+"'></a></div>"+
		                "<div class='part-txt'>"+
		                    "<h3><a href='javascript:;'>��"+record.tno+"�� "+record.pname+"</a></h3>"+
		                    "<p><a href='/joinRecord.shtml?id="+record.pid+"&termNo="+record.tno+"&mId="+record.mid+"' class='fr lnk partDetal'>��������</a> <a href='javascript:;'>���β���: <em class='red'>"+record.jcount+"</em>�˴�</a></p>"+
		                    div+
		                "</div>"+
		            "</li>";
		           htmlContent +=li;
			 }
			 
			 var html$=$("#tabCon");
			 var nextPage=$.public.loadListParam.param.page + 1;
			 $.public.loadListParam.param.page=nextPage;
			 $.public.showMoreList(data.result.list,html$,htmlContent);
			 
		}
	}
	
	function _buildDiv(record){
		var div = "";
		if($.public.isundefined(record.wacc)){
			div = "<div class='cards-operate'>"+
                        "<div class='cars-progress'>"+
                            "<a href='javascript:;'>"+
                                "<span class='progress-bar'>"+
                                    "<span class='bar' style='width:"+record.schedule+"%'></span>"+
                                "</span>"+
                                "<p class='cars-total'>"+
                                    "<span class='total-item'>����<em class='num'>"+record.tpart+"</em></span>"+
                                    "<span class='total-item'>ʣ��<em class='num red'>"+record.lpart+"</em></span>"+
                                "</p>"+
                            "</a>"+
                        "</div>";
                        if(record.status == 0){
                        	div += "<span class='cllbtn'><a href='/detail.shtml?id="+record.pid+"&term="+record.tno+"' class='default disable'><i></i><em>���˵�</em></a></span>";
                        }else{
                        	div += "<span class='cllbtn'><a href='/detail.shtml?id="+record.pid+"&term="+record.tno+"' class='default'><i></i><em>������</em></a></span>";
                        }
                  "</div>";
         }else{
        	div = "<div class='lucky' onclick='location.href=\"/detail.shtml?id="+record.pid+"&term="+record.tno+"\"'>"+
                        "<a href='javascript:;'>"+
                            "<p>����ߣ�"+record.wacc+"</p>"+
                            "<p>���˺��룺<em class='red'>"+record.openNum+"</em></p>"+
                        "</a>"+
                    "</div>";
         }
		return div;
	}
	
	$("#searchBtn").fastClick(function(){
		$.public.isInitLoad = true;
		$.public.loadListParam.param = _initParam();
		$.public.loadList();	
	
	});
	$(".sub-menu>li").bind("fastClick",function(){//�л�����
		$(".sub-menu>li").removeClass("current");
		$(this).addClass("current");
		$.public.isInitLoad = true;
		$.public.loadListParam.param = _initParam();
		$.public.loadList();		
	});

	_init();
	

});	