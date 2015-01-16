$(document).ready(function() {

  $('#slideshow').find('li:gt(0)').hide();
  
  slideShow();

});

function slideShow() {

  $ul = $('#slideshow');
  $visibleSlide = $ul.find('li:visible');
  $nextSlide = $visibleSlide.next();

  if(!$nextSlide.length) {
    $nextSlide = $ul.children(':first');
    fadeInOut();
  }

  fadeInOut();    
  setTimeout(slideShow, 5000);
}

function fadeInOut() {
  $visibleSlide.fadeOut(800, function() {
    $nextSlide.fadeIn(800);
  });
}
