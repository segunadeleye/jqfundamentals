
$(document).ready(function() {
  
  $h3 = $('#blog').find('h3');

  $h3.click(function(event) {
    
    event.preventDefault();
    $p = $(this).siblings('p');
    $p.slideToggle();

    $(this).parent().siblings()
            .find('p').slideUp();
  });

});
