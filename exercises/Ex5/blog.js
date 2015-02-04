function Blog() {
}

Blog.prototype.slide = function() {

  $h3 = $('#blog').find('h3');

  $h3.click(function(event) {

    event.preventDefault();

    $p = $(this)
          .next()
          .slideToggle();

    $('.excerpt')
      .not($p)
      .slideUp();
  });
}

$(document).ready(function() {
  var blog = new Blog();
  blog.slide();
});
