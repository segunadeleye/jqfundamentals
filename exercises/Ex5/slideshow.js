
function SlideShow() {
  this.totalSlides;
}

SlideShow.prototype.slide = function() {

  that = this;

  var $slides = $('#slideshow');
  this.totalSlides = $slides.find('li').length;
  
  $('#main')
    .prepend($slides)
    .find('li')
    .hide();

  $slides
    .find('li:first')
    .fadeIn(300, this.slideShow());

  this.createNavArea();
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
  
  slide.fadeOut(300, function() {
    nextSlide.fadeIn(300);
  });
}

SlideShow.prototype.createNavArea = function() {

  $span = $('<span />')
            .attr('id', 'imagePostion')
            .text();

  $('<div />')
    .html($span)
    .append(' of ' + this.totalSlides)
    .insertAfter('#slideshow');
}

$(document).ready(function() {
  var slideshow = new SlideShow();
  slideshow.slide();
});
