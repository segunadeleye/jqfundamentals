
function SlideShow() {
}

SlideShow.prototype.slide = function() {

  that = this;
  
  $('#slideshow').prependTo('#main');
  $('#slideshow').find('li:gt(0)').hide();
  that.slideShow();
}

SlideShow.prototype.slideShow = function() {

  var $ul = $('#slideshow');
  var $visibleSlide = $ul.find('li:visible');
  var $nextSlide = $visibleSlide.next();

  if (!$nextSlide.length) {
    $nextSlide = $ul.children(':first');
    that.fadeInOut($visibleSlide, $nextSlide);
  }

  that.fadeInOut($visibleSlide, $nextSlide);

  setTimeout(that.slideShow, 5000);
}

SlideShow.prototype.fadeInOut = function(slide, nextSlide) {
  
  slide.fadeOut(800, function() {
    nextSlide.fadeIn(800);
  });
}

$(document).ready(function() {
  var slideshow = new SlideShow();
  slideshow.slide();
});
