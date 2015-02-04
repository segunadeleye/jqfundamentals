function SlideShow() {
  this.totalSlides;
  this.currentImagePosition;
  this.fadeSpeed = 500;
}

SlideShow.prototype.slide = function() {
  that = this;
  var $slides = $('#slideshow');
  this.totalSlides = $slides.find('li').length;

  $slides
    .prependTo('#main')
    .find('li')
    .hide();

  $slides
    .find('li:first')
    .fadeIn(this.fadeSpeed, this.slideShow());

  this.createNavArea();
}

SlideShow.prototype.slideShow = function() {
  var $slides = $('#slideshow');
  var $visibleSlide = $slides.find('li:visible');
  var $nextSlide = $visibleSlide.next();

  that.getCurrentImagePosition($nextSlide);
  if (!$nextSlide.length) {
    $nextSlide = $slides.children(':first');
  }
  that.fadeInOut($visibleSlide, $nextSlide);
  setTimeout(that.slideShow, 5000);
}

SlideShow.prototype.fadeInOut = function(visibleSlide, nextSlide) {
  visibleSlide.fadeOut(this.fadeSpeed, function() {
    nextSlide.fadeIn(this.fadeSpeed);
  });
}

SlideShow.prototype.createNavArea = function() {
  $span = $('<span />')
            .attr('id', 'imagePostion')
            .text(this.currentImagePosition);
  $('<div />')
    .html($span)
    .append(' of ' + this.totalSlides)
    .insertAfter('#slideshow');
}

SlideShow.prototype.getCurrentImagePosition = function(nextSlide) {
  this.currentImagePosition = nextSlide.prevAll().length + 1;
  $('#imagePostion').text(this.currentImagePosition);
}

$(document).ready(function() {
  var slideshow = new SlideShow();
  slideshow.slide();
});
