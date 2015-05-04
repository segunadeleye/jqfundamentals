function SlideShow() {
  this.fadeSpeed = 500;
}

SlideShow.prototype.slide = function() {
  that = this;
  var $slides = $('#slideshow');

  $slides
    .prependTo('#main')
    .find('li')
    .hide();

  this.createNavArea();

  $slides
    .find('li:first')
    .fadeIn(this.fadeSpeed, this.slideShow());
}

SlideShow.prototype.slideShow = function() {
  var $slides = $('#slideshow');
  var $visibleSlide = $slides.find('li:visible');
  var $nextSlide = $visibleSlide.next();
  if (!$nextSlide.length) {
    $nextSlide = $slides.children(':first');
  }
  that.setCurrentImagePosition($nextSlide);
  that.fadeInOut($visibleSlide, $nextSlide);
  setTimeout(that.slideShow, 5000);
}

SlideShow.prototype.fadeInOut = function(visibleSlide, nextSlide) {
  visibleSlide.fadeOut(this.fadeSpeed, function() {
    nextSlide.fadeIn(this.fadeSpeed);
  });
}

SlideShow.prototype.createNavArea = function() {
  var totalSlides = $('#slideshow').find('li').length;
  $span = $('<span />')
            .attr('id', 'imagePostion')
            .text(1);
  $('<div />')
    .html($span)
    .append(' of ' + totalSlides)
    .insertAfter('#slideshow');
}

SlideShow.prototype.setCurrentImagePosition = function(nextSlide) {
  var currentImagePosition = nextSlide.index() + 1;
  $('#imagePostion').text(currentImagePosition);
}

$(document).ready(function() {
  var slideshow = new SlideShow();
  slideshow.slide();
});
