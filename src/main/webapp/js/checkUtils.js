/**
* ��̨ͨ��JS
*
*/

$(function(){
       // ������ʾ����
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
	  
		// ����������
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
	   // ����Ϊ��
	   $(".notNull").live("blur",function(){
	     var val=$.trim($(this).val());
	     if(val==""){
	       $(this).siblings("span").text("����Ϊ�գ�").show();
	     }else{
	       $(this).siblings("span").hide();
	     }
	   });
	   // ������С�����ֵ
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
	   // ��������ȷ���ֻ�����
	   $(".mobileText").live("blur",function() {
			var mobile = $(this).val();
			if(mobile==""){
			   $(this).siblings("span").text("����Ϊ�գ�").show();
			}else{
			   if(!IsMobile(mobile)){
			     $(this).siblings("span").text("��������ȷ�ĵ绰���룡").show();
			   }else{
			     $(this).siblings("span").hide();
			   }
			}
	       
			
	   });
	   // ��������ȷ����ַ
	   $(".urlText").live("blur",function() {
			var url = $(this).val();
			if(url==""){
			  $(this).siblings("span").text("����Ϊ�գ�").show();
			}else{
			  if(IsURL(url)){
			     $(this).siblings("span").hide();
			  }else{
			     $(this).siblings("span").text("��������ȷ����ַ��").show();
			  }
			}
			
	   });
	   // ��������ȷ�������ʽ
	   $(".passwordText").live("blur",function() {
			var pass = $(this).val();
			if(pass==""){
			    $(this).siblings("span").text("����Ϊ�գ�").show();
			}else{
			  if(pass.length<6 || pass.length>20){
			    $(this).siblings("span").text("���볤��Ϊ6��20λ!").show();
			  }else{
			     if(!IsPassword(pass)){
			        $(this).siblings("span").text("����Ϊ��ĸ,���ֻ����»���!").show();
			      }else{
			        $(this).siblings("span").hide();
		          }
			  }
			  
			}
			
	   });
	   // ����ȷ��
	   $(".passwordSureText").live("blur",function() {
	        var pass = $(".PasswordText").val();
			var passsure = $(this).val();
			if(passsure!=pass){
			   $(this).siblings("span").text("�������һ��!").show();
			 }else{
			   $(this).siblings("span").hide();
			 }
	   });
	   // ����
	   $(".exportButton").click(function(){
	       var url=$(this).data("url");
	       $("#Query_Form").attr("action",url);
	       $("#Query_Form").submit();
	    });
		
		// ��֤ip4��ַ�Ϸ���
		$(".isIP").bind('blur',function(){
			var ip=$(this).val();
			if(ip&&isIP(ip)){
				   $(this).siblings("span").text("������ȷ��ipֵ����255.255.255.255!").show();
				}else{
				   $(this).siblings("span").hide();
			    }
		});
		//���ڵı༭��ť
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
function DateDiff(sDate1, sDate2) {  // sDate1��sDate2��yyyy-MM-dd��ʽ

    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  // ת��Ϊyyyy-MM-dd��ʽ
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // �����ĺ�����ת��Ϊ����

    return iDays;  // �����������
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
 // �ֻ�����
  var mobiletest=/^0*(13|15|18)\d{9}$/;
  // ��������
  var mobiletest1=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
  // 400����
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
 // ���ñ�
 function resetForm(){
	  var form=	$(':input').not(':button,:submit,:reset,:hidden,:radio,:disabled,:checkbox');
	  for(var i=0;i<form.length;i++){
		  $(form[i]).val('');
	  }	
	  $('.mutiliSel').combobox('clear');
	  $(':checkbox').attr("checked",false);
	}
 // �ж�ip4 ��ʽ
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
 