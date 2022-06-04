$(document).ready(function(){

    //  언어 선택 - 모바일 화면
    var opt_num = 1;

    $("#lang_wrap02 > dt").click(function(){

        if( opt_num == 1 ){
            $(this).addClass("sel");
            $(this).parent("dl").stop().animate( { height : "90px" },700 );

            opt_num = 0;
        }else{ // opt_num ==0
            $(this).removeClass("sel");
            $(this).parent("dl").stop().animate( { height : "30px" },700 );

            opt_num = 1;
        }
    });

    $("#lang_wrap02 > dd").click(function(){
        var prev_lang =  $("#lang_wrap02 > dt").text(); 
        var lang_option = $(this).text();

        $(this).text(prev_lang);
        $("#lang_wrap02 >dt").text(lang_option);

        $("#lang_wrap02 > dd").slideDown();
        $(this).parent("dl").animate( { height : "30px" },700);

        $("#lang_wrap02 > dt").removeClass("sel");
        opt_num = 1;
    });

    // nav 하위 메뉴 - 데스크탑 화면
    $( ".menu_sub" ).hide();

    $("#main_menu_wrap > ul > li").hover(function(){
        $(this).children(".menu_sub").stop().slideToggle();
    });

    // side 전체 메뉴 - 테블릿 모바일 화면
    $("#all_menu_btn, #mobile_nav ul li:eq(3)").click(function(){
        $("#all_menu_wrap").animate({ right: "0%" }, 400);

        $("#mobile_nav").stop().animate({
            bottom : "-60px"
        },200);
    });

    $("#all_menu_btn02").click(function(){ // x button
        $(this).parent("div").animate({ right: "-80%" }, 400);

        // 전체메뉴 열려
        $("#main_menu_side > ul > li > ul").stop().slideUp();
        $("#main_menu_side > ul > li > span").text("+");
    });

    // 모바일 하단 nav 
    $("#mobile_nav ul li:eq(1)").click(function(){
        $("html,body").stop().animate({
            scrollTop : "0"
        },1000);
        return false;
    });

    $("html,body").mousewheel(function(e,delta){
        if(delta > 0){
            $("#mobile_nav").stop().animate({
                bottom : "0px"
            },200);
        }else{
            $("#mobile_nav").stop().animate({
                bottom : "-60px"
            },200);
        }
    });

    // New & Recommend
    $("#product_list_wrap > li").hide();
    $(".pd_new").show();

    $("#product_list_type li").click(function(){
        $("#product_list_type li").removeClass("product_sel");
        $(this).addClass("product_sel");

        var pd_type_index = $(this).index();
        
        if( pd_type_index == 0){
            $("#product_list_wrap > li").hide();
            $(".pd_new").show();
        }else{
            $("#product_list_wrap > li").hide();
            $(".pd_recommend").show();
        }
        
    });

    // + 버튼 클릭 show hide
    $("#main_menu_side > ul > li").click(function(){
        var plus_minus = $(this).children("span").text();
    
        $("#main_menu_side > ul > li > ul").stop().slideUp();
        $(this).children("ul").stop().slideToggle();

        $("#main_menu_side > ul > li > span").text("+");
        if( plus_minus == "-" ){
            $(this).children("span").text("+");
        }else{
            $(this).children("span").text("-");
        }
        
        return false;
    });

    // 자료실 이미지 변경
    $( "#board_contents" ).css({
        marginLeft : "-100%", cursor : "pointer"});
    $( "#board_contents li:last" ).prependTo("#board_contents");
    
    board_img_move();
    var setInterval01;
    function board_img_move(){
       setInterval01 = setInterval(function(){

            $( "#board_contents" ).stop().animate({ marginLeft : "-200%"  },600,function(){
                $( "#board_contents li:first" ).appendTo("#board_contents");
                $( "#board_contents" ).css( "margin-left" , "-100%" );
            });
        },3000);
    };

    $( "#board_contents" ).mouseover(function(){
        clearInterval(setInterval01);
    }).mouseout(function(){
        board_img_move();
    });


    // 서초지점 층별 안내 
    var device_width= $(window).width();
    
    if( device_width >=1200 ){ // 데스크탑 화면
        $("#floor_part01 ul").mousewheel(function(event, delta){
            if( delta > 0 ){
                $("#floor_part01 ul").stop().animate({ scrollLeft : $("#floor_part01 ul").scrollLeft() + 1085 },500 )
             }else{
                 $("#floor_part01 ul").stop().animate({ scrollLeft : $("#floor_part01 ul").scrollLeft() + -1085 },500 )
             }
             return false; // 브라우져 스크롤 조작  
        });
    
        $("#floor_part02 ul").animate({scrollLeft : "2000px" },0);
        $("#floor_part02 ul").mousewheel(function(event, delta){
            if( delta > 0 ){
                $("#floor_part02 ul").stop().animate({ scrollLeft : $("#floor_part02 ul").scrollLeft() + 1085 },500 )
             }else{
                 $("#floor_part02 ul").stop().animate({ scrollLeft : $("#floor_part02 ul").scrollLeft() + -1085 },500 )
             }
             return false; // 브라우져 스크롤 조작 x
        });

    }else if( device_width < 1200 && device_width >= 768 ){
        device_width = $(window).width();
        $("#floor_part02 ul").animate({scrollLeft : "2500px" },0);
    }else{
        device_width = $(window).width();
        $("#floor_part02 ul").animate({scrollLeft : "2500px" },0);
    }

    // 전시 및 행사 스크롤 이벤트
    // desktop
    var scroll_val_current;
    $("html, body").on( "touchstart", function(){
        scroll_val_current = $(window).scrollTop();
    });
   
    $(window).scroll(function(){
        var html_height = $(window).scrollTop();
        var ofsset1 = $("#promotion_wrap").offset().top;
        var promotion_h = $("#promotion_wrap").height();
        
        //모바일 화면 하단 네비
        if( scroll_val_current < html_height ){
            $("#mobile_nav").stop().animate({
                bottom : "-60px"
            },500);
        }else{
            $("#mobile_nav").stop().animate({
                bottom : "0px"
            },500);
        }

        // 데스크탑 전시 및 행사
        if( html_height > ofsset1-800 &&  html_height <= ofsset1 + promotion_h){
            $("#promotion_poster_wrap").addClass("js_effect01");

            $("#promotion_poster_wrap figure").each(function(index){
                $(this).delay(100).animate({
                    opacity : 1
                },170*index);
            });
        }
    }); //scroll event end

});