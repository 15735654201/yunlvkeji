$(document).ready(function(){
	//解决ios :hover效果
	document.body.addEventListener('touchstart',function(){});
	/* 解决 移动设备 hover 二次点击 */
	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		$("a").on("click", function (e) {
			var el = $(this);
			var link = el.attr('href');
			window.location = link;
		});
    }
	
	//移动端导航
	$(".nav_btn").click(function(){
		if($(this).hasClass("open")){
			$("#black").hide();
			$(this).removeClass("open");
		}else{
			$("#black").show();
			$(this).addClass("open");
		}
	});
	//移动端导航滚动
	$(window).scroll(function(){
		var boxTop = $(".banner").height()-$("header").height();
		var scrollTop = $(window).scrollTop();
		if(scrollTop > boxTop){
			$("header").css("cssText","background-color:#000000!important");
		}else{
			if($(window).width()<=750){
				$("header").css("background-color","rgba(0,0,0,0.3)");
			}else{
				$("header").css("background-color","transparent");
			}
		}
	});
	$(window).scroll();
	//点击空白处关闭移动端导航
	$(document).on("touchend",function(event){
		var _con = $("header");   // 设置目标区域
		if(!_con.is(event.target) && _con.has(event.target).length === 0){ 
			$("#black").hide();
			$(".nav_btn").removeClass("open");
		}
	});
	//尾部
	$("footer dl").click(function(){
		if($(this).hasClass("open_list")){
			$(this).removeClass("open_list");
		}else{
			$(this).addClass("open_list");
		}
	});
	
//	申请弹窗
	$(".applybtn").click(function(){
		if($(window).width()>750){
//			$("#mask,.applyBox").show();
			$("#mask,.consult").show();
		}else {
//			window.location.href="apply.html";
			alert("请使用电话咨询，进行申请试用！");
		}
	});
	$(".shut").click(function(){
		var w=$(window).width();
		$("#mask,.applyBox").hide();
		$("#applyForm")[0].reset();
		$(".applyBox span").text("");
		if(w<=750){
			$(".applyBox input").css("borderColor","#d3d3d3");
		}else{
			$(".applyBox input").css("borderColor","transparent");
		}
	});
	
	var judge=true;
	var re=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	var mail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	$("#applyForm").find("input").on("blur",function(){
		var w=$(window).width();
		if($(this).val()=="" || $(this).val()==null){
			var txt=$(this).siblings("p").text();
			$(this).css("borderColor","#e10601");
			$(this).siblings("span").text(txt+"不可为空！");
		}else{
			var p=$(this).siblings("p").text();
			if((p=="手机号" && !re.test($(this).val())) || (p=="邮箱" && !mail.test($(this).val()))){
				$(this).css("borderColor","#f15533");
				$(this).siblings("span").text("请输入正确的"+p+"！");
			}else {
				if(w<=750){
					$(this).css("borderColor","#d3d3d3");
				}else{
					$(this).css("borderColor","transparent");
				}
				$(this).siblings("span").text("");
			}
		}
	});
	$("#applySubmit").click(function(index,even){
		$("#applyForm").find("input").each(function(){
			$(this).blur();
		});
		$("#applyForm").find(".formCon span").each(function(index){
			if($(this).text()!=""){
				return judge=false;
			}
		});
		if(judge){
			alert($("#applyForm").serialize());
//			$.ajax({
//              type: "POST",
//              dataType: "json",
//              url: "" ,
//              data: $("#applyForm").serialize(),
//              success: function (result) {
//                  console.log(result);
//                  if (result.resultCode == 200) {
//                      alert("成功！");
//                  }
//              },
//              error : function() {
//                  alert("异常！");
//              }
//         });
		}
		else{
			alert("提交失败，请重新提交！");
			return false;
		}
	});
//	侧边栏
	$(".toolbar-item-qq").click(function(){
		$("#mask,.consult").show();
	});
	$(".online").click(function(){
		if($(window).width()>750){
			$("#mask,.consult").show();
		}else {
			alert("请使用电话咨询，进行申请试用！");
		}
	});
	$(".toolbar-item-feedback").click(function(){
		$("#mask,.feedback").show();
	});
//	产品咨询与反馈
	$(".cancel").click(function(){
		$("#cancel").click();
	});
	$("#cancel").click(function(){
		$("#enterprise").prop("checked",true);
		$("#feedbackForm")[0].reset();
		$("#mask,.feedback").hide();
		$("#feedbackForm").find("input,select,textarea").css("borderColor","#c7c7c7");
	});
	$(".fTextarea").blur(function(){
		warning($(this));
	});
	$(".companyName").blur(function(){
		warning($(this));
	});
	$(".test").blur(function(){
		warning($(this));
	});
	var re=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	$(".phone").blur(function(){
		warning($(this));
	});
	$("#gain").click(function(){
		var time=30;
		var even=$(this);
		even.text(time+"s后可再次发送");
		even.attr("disabled","disabled");
		function timeCountDown(){
			if(time==0){
                clearInterval(timer);
				even.removeAttr('disabled');
                even.text("发送验证码");
                even.css("backgroundColor","#5e81e6");
                return;
           }else{
				time--;
				even.text(time+"s后可再次发送");
			}
		}
		var timer = setInterval(timeCountDown,1000);
	});
	function warning(even){
		if(even.val()=="" || even.val()==null){
			even.css("borderColor","#f15533");
			return false;
		}else {
			even.css("borderColor","#c7c7c7");
			if(even.attr("class")=="phone"){
				if(!re.test(even.val())){
					even.siblings("i.hao").text("手机号不正确！");
					even.css("borderColor","#f15533");
					return false;
				}else{
					even.siblings("i.hao").text("");
					even.css("borderColor","#c7c7c7");
					return true;
				}
			}
			return true;
		}
	}
	$("#submit").click(function(){
		if(warning($(".fTextarea")) && warning($(".companyName")) && warning($(".test")) && warning($(".phone"))){
			alert($("#feedbackForm").serialize());
//			$.ajax({
//              type: "POST",
//              dataType: "json",
//              url: "" ,
//              data: $("#feedbackForm").serialize(),
//              success: function (result) {
//                  console.log(result);
//                  if (result.resultCode == 200) {
//                      alert("成功！");
//                  }
//              },
//              error : function() {
//                  alert("异常！");
//              }
//         });
		}
		else{
			alert("提交失败，请重新提交！");
			return false;
		}
	});
	
//	在线咨询
	$(".close").click(function(){
		$("#mask").hide();
		$(this).parent().hide();
	});
	
//  到750px关闭弹窗
	$(window).resize(function(){
		if($(window).width()<=750){
			$(".close").click();
			$(".shut").click();
			$(".cancel").click();
		}
	});
});