$(document).ready(function(){
	var traitTop = $(".trait").offset().top;
	$(window).resize(function(){
		var traitTop = $(".trait").offset().top;
	});
	
	//banner 轮播
	var mySwiper = new Swiper ('.banner', {
	    loop: true,
	    autoplay: 3000,
	    paginationClickable: true,
	    
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
		//  nextButton: '.swiper-button-next',
		//	prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
		//	scrollbar: '.swiper-scrollbar',
	});
	$(".banner").hover(function(){
		mySwiper.stopAutoplay();
	},function(){
		mySwiper.startAutoplay();
	});
	
	//为什么选择云旅科技？
    var move;
    $(".select li").hover(function(){
    	var x=1;
    	var obj=$(this);
    	var i=obj.index()+1;
    	move=setInterval(function(){
			x+=1;
			obj.find("img").attr("src","images/index/select/select"+i+"_"+x+".jpg");
			if(x==18){
				clearInterval(move);
			}
		},80);
    },function(){
    	var obj=$(this);
    	var i=obj.index()+1;
    	obj.find("img").attr("src","images/index/select/select"+i+"_1.jpg");
    	clearInterval(move);
    });
    
    //服务介绍-选项卡
    $(".box_nav").children("li").mouseover(function() {
        var n=$(this).index();
        $(this).addClass("checked");
        $(this).siblings().removeClass("checked");
        $(".box_body").children("li:nth-child(2n+2)").eq(n).css("display","block").siblings("li:nth-child(2n+2)").css("display","none");
    });
    $(".box_body").children("li:nth-child(2n+1)").click(function(){
    	$(this).toggleClass("open").siblings().removeClass("open");
    });
    
    
    //服务特色
	var istrue = true;
	$(window).on("scroll",function() {
	    var s = $(window).scrollTop();
	    if(s > traitTop-500){
    		$(".bigCricle").animate({opacity: '1'},500,function(){
    			$(".leftCricle").animate({left: '-90px',opacity: '1'},1000);
	    		$(".rightCricle").animate({right: '-90px',opacity: '1'},1000);
	    		$(".middleCricle").animate({opacity: '1'},1000);
    		});
    	}
	});
	
	//云旅系统
	$(".system_text .operate").click(function(){
		if($(this).text()=="[展开]"){
			$(this).text("[收起]");
			$(this).parent().addClass("take");
		}else{
			$(this).text("[展开]");
			$(this).parent().removeClass("take");
		}
	})
	
	//新闻动态
    var newSwiper = new Swiper ('.news_con', {
	    loop: true,
	    autoplay: 3000,
	    paginationClickable: true,
	    
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
		//  nextButton: '.swiper-button-next',
		//	prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
		//	scrollbar: '.swiper-scrollbar',
	});
	$(".news_con").hover(function(){
		newSwiper.stopAutoplay();
	},function(){
		newSwiper.startAutoplay();
	});
});