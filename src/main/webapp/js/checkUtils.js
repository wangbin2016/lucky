/**
* 后台通用JS
*
*/

$(function(){
       // 控制显示字数
       $(".subwordnum").each(function() {
		var str = $(this).html();
		var len = str.length;
		var sublen = $(this).data("wordnum");
		var dianflag = $(this).data("dianflag");
		var text = str.substr(0, sublen);
		if (len > sublen) {
			if(dianflag!="no"){
				text = text + "...";
			}
		}
		$(this).html(text);
	  });
	  
		// 必须是数字
		$(".numberText").live("keyup",function() {
			var number = $(this).val();
			if(isNaN(number)){
			  $(this).val("");
			}
		});
		$(".numberText1").live("blur",function() {
			var number = $(this).val();
			if(isNaN(number)){
			  $(this).val("");
			}
		});
	   // 不能为空
	   $(".notNull").live("blur",function(){
	     var val=$.trim($(this).val());
	     if(val==""){
	       $(this).siblings("span").text("不能为空！").show();
	     }else{
	       $(this).siblings("span").hide();
	     }
	   });
	   // 设置最小，最大值
	   $(".setMinVal").live("blur",function(){
	     var val=$.trim($(this).val());
	     var min=$(this).data("min");
	     var max=$(this).data("max");
	     if(val==""){
	        $(this).val(min);
	     }else{
	       if(max!=""){
	         if(parseInt(max)<parseInt(val)){
	            $(this).val(max);
	          }
	       }
	       if(parseInt(min)>parseInt(val)){
	            $(this).val(min);
	       }
	       
	     }
	   });
	   // 必须是正确的手机号码
	   $(".mobileText").live("blur",function() {
			var mobile = $(this).val();
			if(mobile==""){
			   $(this).siblings("span").text("不能为空！").show();
			}else{
			   if(!IsMobile(mobile)){
			     $(this).siblings("span").text("请输入正确的电话号码！").show();
			   }else{
			     $(this).siblings("span").hide();
			   }
			}
	       
			
	   });
	   // 必须是正确的网址
	   $(".urlText").live("blur",function() {
			var url = $(this).val();
			if(url==""){
			  $(this).siblings("span").text("不能为空！").show();
			}else{
			  if(IsURL(url)){
			     $(this).siblings("span").hide();
			  }else{
			     $(this).siblings("span").text("请输入正确的网址！").show();
			  }
			}
			
	   });
	   // 必须是正确的密码格式
	   $(".passwordText").live("blur",function() {
			var pass = $(this).val();
			if(pass==""){
			    $(this).siblings("span").text("不能为空！").show();
			}else{
			  if(pass.length<6 || pass.length>20){
			    $(this).siblings("span").text("密码长度为6到20位!").show();
			  }else{
			     if(!IsPassword(pass)){
			        $(this).siblings("span").text("密码为字母,数字或是下划线!").show();
			      }else{
			        $(this).siblings("span").hide();
		          }
			  }
			  
			}
			
	   });
	   // 密码确认
	   $(".passwordSureText").live("blur",function() {
	        var pass = $(".PasswordText").val();
			var passsure = $(this).val();
			if(passsure!=pass){
			   $(this).siblings("span").text("密码必须一致!").show();
			 }else{
			   $(this).siblings("span").hide();
			 }
	   });
	   // 导出
	   $(".exportButton").click(function(){
	       var url=$(this).data("url");
	       $("#Query_Form").attr("action",url);
	       $("#Query_Form").submit();
	    });
		
		// 验证ip4地址合法性
		$(".isIP").bind('blur',function(){
			var ip=$(this).val();
			if(ip&&isIP(ip)){
				   $(this).siblings("span").text("输入正确的ip值，如255.255.255.255!").show();
				}else{
				   $(this).siblings("span").hide();
			    }
		});
		//行内的编辑按钮
		$(".rowEditButton").click(function(e){
			var id=$(this).attr("data-id");
			var url=$(this).attr("data-url");
			location.href=url+"?id="+id;
			e.stopPropagation();
		});
		if($('#message')&&$('#message').val()){
			jQnotice($('#message').val());
		}
		
});
function DateDiff(sDate1, sDate2) {  // sDate1和sDate2是yyyy-MM-dd格式

    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  // 转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数

    return iDays;  // 返回相差天数
}
 function IsURL(str_url){
  var strRegex = "^(http|https|ftp)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-"   
           + "Z0-9\\.&%\\$\\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{"   
           + "2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}"   
           + "[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|"   
           + "[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-"   
           + "4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0"   
           + "-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,4})(\\:[0-9]+)?(/"   
           + "[^/][a-zA-Z0-9\\.\\,\\?\\'\\\\/\\+&%\\$\\=~_\\-@]*)*$";   
        var re=new RegExp(strRegex); 
        if (re.test(str_url)){
            return (true); 
        }else{ 
            return (false); 
        }
 }
 function IsMobile(mobile){
 // 手机号码
  var mobiletest=/^0*(13|15|18)\d{9}$/;
  // 座机号码
  var mobiletest1=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  // 400号码
  var mobiletest2=/^400\d{7}$/;  
  if(mobiletest.test(mobile)){
      return (true); 
  }else if(mobiletest1.test(mobile)){
  	return true; 
  }else if(mobiletest2.test(mobile)){
  	return true; 
  }else{ 
      return (false); 
  }
 }
 function IsPassword(pass){
  var passparrent=/^[0-9a-zA-Z_]{1,}$/;
  if(passparrent.test(pass)){
      return (true); 
  }else{ 
      return (false); 
  }
 }
 // 重置表单
 function resetForm(){
	  var form=	$(':input').not(':button,:submit,:reset,:hidden,:radio,:disabled,:checkbox');
	  for(var i=0;i<form.length;i++){
		  $(form[i]).val('');
	  }	
	  $('.mutiliSel').combobox('clear');
	  $(':checkbox').attr("checked",false);
	}
 // 判断ip4 格式
 function isIP(ip)   
 {   
     var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;   
     return !re.test(ip);   
 }  
 (function($) {
		$.notice = {
			show: function(message) {
				var top = 20;
				var left = 25;
				var fadeoutDuration = 500;
				$('html, body').animate({scrollTop:0});
				$('<div></div>').attr('id', 'notice').css('left',(50-left)

	+'%').css('top', (50-top)+'%').appendTo('body').text(message);
				
				setTimeout(function() {$('#notice').remove();}, 1500);
			}
		};
		
		jQnotice = function(message) { $.notice.show(message); };
		
	})(jQuery);
 