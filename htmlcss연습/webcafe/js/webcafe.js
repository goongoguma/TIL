jQuery(function($){ 
  $('.navigation') 
  // 마우스 올라갔을경우 
  .on('mouseenter', '.menu-item:has(.sub-menu)', function(){ // sub-menu를 하위로 가지는 menu-item에서만 이벤트 발생 
     $(this).find('.sub-menu').show(); // this는 이벤트가 발생된 menu-item을 의미 
  }) 
  // 마우스 나갔을경우 
  .on('mouseleave', '.menu-item:has(.sub-menu)', function(){ 
     $(this).find('.sub-menu').hide(); 
  }); 
}); 