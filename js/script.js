$(function(){
    // 윈도우크기(높이) 인식, 섹션 높이지정, 이동폭 계산  
    // 카운트변수 선언 ( 제한 length )
    // #wrap top좌표 목표 변수 = 윈도우높이*카운트변수 
    let winH = $(window).height();
    $('section').height(winH);
    const sectNum = $('section').length;  //console.log( winH, sectNum);
    let num = 0; // winH 배수 정의변수 ( 마우스휠 제어 - 증가,감소 )
    let targetPosition = 0;  // winH*num
    let movingState = false;
    $(window).on('resize',function(){
      winH = $(window).height();
      $('section').height(winH);
      targetPosition = winH*num*(-1);
      if( num==sectNum ){
        targetPosition = ( $('#wrap').height()-winH )*(-1);
      }
      $('#wrap').css('top', targetPosition );
    });
  
    const btnControl=(n)=>{
      $('#snb a').filter('.on').removeClass('on');
      $('#snb>ul>li').eq(n).find('a').addClass('on');
    }
  
    $(window).on('mousewheel', function(event){
      if( movingState==false ){ // (!movingState)
        movingState = true;
        if( event.deltaY<0 ){
          num++; //sectNum보다 크면 안됨
          if( num>=sectNum ){          num=sectNum;        }
        }else{
          num--; // 0보다 작으면 안됨 
          if( num<=0 ){          num=0;        }
        }
        btnControl(num);
        targetPosition = winH*num*(-1); // console.log(event.deltaY, num);
        if( num==sectNum ){
          targetPosition = ( $('#wrap').height()-winH )*(-1); //winH-$('#wrap').height()
        }
        $('#wrap').stop().animate({ top:targetPosition},750,'easeOutCubic',function(){
          movingState = false;
        });
      }
    });
  
    $('#snb a').on('click', function(event){
      event.preventDefault();
      // 지정개체 순번 인식 -- selector.index()
      movingState = true;
      num = $(this).parent().index();  // console.log(num);
      btnControl(num);
      targetPosition = winH*num*(-1);  console.log(event.deltaY, num);
      if( num==sectNum ){
        targetPosition = ( $('#wrap').height()-winH )*(-1); //winH-$('#wrap').height()
      }
      $('#wrap').stop().animate({ top:targetPosition},750,'easeOutCubic',function(){
        movingState = false;
      });
    });
  
    // $(document).on('keydown', function(event){    console.log(event.keyCode)    })
    $(document).on('keydown', function(event){
      if( movingState==false ){
        movingState = true;
        if( event.keyCode==40 ){
          num++; 
          if( num>=sectNum ){          num=sectNum;        }
        }else if( event.keyCode==38 ){
          num--; 
          if( num<=0 ){          num=0;        }
        }
        btnControl(num);
        targetPosition = winH*num*(-1); 
        if( num==sectNum ){       targetPosition = ( $('#wrap').height()-winH )*(-1);       }
        $('#wrap').stop().animate({ top:targetPosition},750,'easeOutCubic',function(){
          movingState = false;
        });
      }
    });
  });


//===========================================================================
const progressLine = document.querySelector(".autoplay-progress svg");
const currentLabel = document.querySelector(".current");
const totalLabel = document.querySelector(".total");                

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "custom",
        renderCustom: function(swiper, current, total) {
            // 두 자리 형식으로 표시
            currentLabel.textContent = String(current).padStart(2, '0');
            totalLabel.textContent = String(total).padStart(2, '0');
            return '';
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressLine.style.setProperty("--progress", 1 - progress);
        }
    }
});