
function SlideShow() {
}

SlideShow.prototype.slide = function() {

  that = this;

  var $slides = $('#slideshow');
  
  $('#main')
    .prepend($slides)
    .find('li')
    .hide();

  $slides
    .find('li:first')
    .fadeIn(800, that.slideShow());
}

SlideShow.prototype.slideShow = function() {

  var $slides = $('#slideshow');
  var $visibleSlide = $slides.find('li:visible');
  var $nextSlide = $visibleSlide.next();

  if (!$nextSlide.length) {
    $nextSlide = $slides.children(':first');
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
